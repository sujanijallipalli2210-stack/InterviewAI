import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { getExpandedQuestions } from './src/data/questionBank';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialize Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Endpoint: Generate Interview Questions
app.post('/api/interview/generate-questions', async (req, res) => {
  const { jobRole, customRoleTitle, experienceLevel, interviewType, difficulty, questionCount } = req.body;
  const count = Number(questionCount) || 5;
  const roleName = jobRole === 'Custom Role' && customRoleTitle ? customRoleTitle : jobRole || 'Software Developer';

  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `You are a Principal Tech Recruiter and Hiring Manager at a top-tier tech firm.
Generate an interview question set for:
- Role: ${roleName}
- Experience Level: ${experienceLevel || '3–5 Years'}
- Interview Type: ${interviewType || 'Mixed'}
- Difficulty: ${difficulty || 'Medium'}
- Number of Questions: ${count}

Return a valid JSON array of objects with EXACTLY this structure for each question:
[
  {
    "id": "q-1",
    "questionNumber": 1,
    "category": "Technical" (or "Behavioral", "HR", "Situational"),
    "question": "Full question text",
    "contextOrTips": "A brief 1-2 sentence tip or framework (e.g. STAR method) to help the candidate structure their answer",
    "expectedKeyPoints": ["Point 1", "Point 2", "Point 3"],
    "modelAnswer": "An exemplary high-caliber answer demonstrating how a top candidate would respond."
  }
]
Do not wrap in markdown or backticks, just return raw valid JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text || '';
      const cleanJson = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
      const parsed = JSON.parse(cleanJson);

      if (Array.isArray(parsed) && parsed.length > 0) {
        return res.json({
          success: true,
          source: 'gemini',
          questions: parsed.slice(0, count).map((q, idx) => ({
            ...q,
            questionNumber: idx + 1,
            id: q.id || `gen-${idx + 1}`,
          })),
        });
      }
    } catch (err: any) {
      console.warn('Gemini question generation error, falling back to local bank:', err?.message || err);
    }
  }

  // Graceful fallback: return curated questions
  const fallbackQuestions = getExpandedQuestions(
    jobRole || 'Software Developer',
    customRoleTitle,
    experienceLevel || '3–5 Years',
    interviewType || 'Mixed',
    count
  );

  return res.json({
    success: true,
    source: 'preset',
    fallback: true,
    questions: fallbackQuestions,
  });
});

// Endpoint: Evaluate Single Answer
app.post('/api/interview/evaluate-answer', async (req, res) => {
  const { question, userAnswer, role, experienceLevel, category } = req.body;

  if (!userAnswer || userAnswer.trim().length < 5) {
    return res.json({
      success: true,
      evaluation: {
        score: 30,
        relevanceScore: 35,
        clarityScore: 40,
        communicationScore: 30,
        technicalScore: 25,
        confidenceScore: 30,
        strengths: ['Attempted to provide a response'],
        areasForImprovement: ['Answer was too brief. Expand with concrete details, context, and outcomes.'],
        instantFeedback: 'Your response was too brief for an interviewer to gauge your competence. Aim to elaborate on specific projects, technical decisions, and measurable results.',
        idealAnswerOutline: 'Structure with Context -> Action Taken -> Technical/Domain details -> Quantifiable outcome.'
      }
    });
  }

  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `You are an expert interview evaluator evaluating a candidate for ${role || 'Job Candidate'} (${experienceLevel || 'Mid-Level'}).
Question Category: ${category || 'General'}
Question: "${question}"
Candidate Answer: "${userAnswer}"

Evaluate this answer strictly and constructively. Return a valid JSON object matching EXACTLY this schema:
{
  "score": number (0-100),
  "relevanceScore": number (0-100),
  "clarityScore": number (0-100),
  "communicationScore": number (0-100),
  "technicalScore": number (0-100),
  "confidenceScore": number (0-100),
  "strengths": ["string", "string"],
  "areasForImprovement": ["string", "string"],
  "instantFeedback": "A concise, actionable 2-3 sentence coaching feedback on how the candidate did.",
  "idealAnswerOutline": "A high-level outline showing how to structure a 10/10 response using the STAR or appropriate framework."
}
Do not wrap in markdown codeblocks. Return valid JSON only.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.4,
        },
      });

      const text = response.text || '';
      const cleanJson = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
      const parsed = JSON.parse(cleanJson);

      return res.json({
        success: true,
        source: 'gemini',
        evaluation: parsed,
      });
    } catch (err: any) {
      console.warn('Gemini answer evaluation error, using heuristic evaluator:', err?.message || err);
    }
  }

  // Heuristic linguistic evaluator fallback
  const wordCount = userAnswer.trim().split(/\s+/).length;
  let baseScore = 65;
  if (wordCount > 60) baseScore += 15;
  else if (wordCount > 30) baseScore += 10;
  else if (wordCount < 15) baseScore -= 20;

  const hasMetrics = /\d+%|\d+\s*(users|teams|seconds|ms|k|million|x|times)/i.test(userAnswer);
  if (hasMetrics) baseScore += 10;

  const hasSTAR = /situation|task|action|result|because|when|decided|implemented|impact/i.test(userAnswer);
  if (hasSTAR) baseScore += 8;

  const finalScore = Math.min(95, Math.max(40, baseScore));

  return res.json({
    success: true,
    source: 'heuristic',
    evaluation: {
      score: finalScore,
      relevanceScore: Math.min(96, finalScore + 4),
      clarityScore: Math.min(94, finalScore + 2),
      communicationScore: Math.min(92, finalScore - 2),
      technicalScore: Math.min(95, finalScore),
      confidenceScore: Math.min(90, finalScore - 3),
      strengths: [
        wordCount > 40 ? 'Well-developed answer with sufficient context' : 'Direct, focused response',
        hasMetrics ? 'Included concrete quantifiable impact and metrics' : 'Addressed core premise of the question',
      ],
      areasForImprovement: [
        !hasMetrics ? 'Add specific data, metrics, or percentages to substantiate impact' : 'Refine pacing to highlight key takeaways faster',
        'Use the STAR method (Situation, Task, Action, Result) to make narrative progression sharper'
      ],
      instantFeedback: `Solid delivery! Your response addresses the main question directly. To elevate this to a top 5% candidate response, weave in specific business metrics and concrete trade-offs you evaluated.`,
      idealAnswerOutline: '1. Problem & Context (15%) -> 2. Your specific leadership & architectural decisions (50%) -> 3. Quantifiable business outcome (35%).'
    }
  });
});

// Endpoint: Full Interview Evaluation & Analytics
app.post('/api/interview/full-evaluation', async (req, res) => {
  const { config, records } = req.body;
  const role = config?.jobRole === 'Custom Role' ? config?.customRoleTitle : config?.jobRole || 'General';

  const ai = getGeminiClient();

  if (ai && Array.isArray(records) && records.length > 0) {
    try {
      const summaryPrompt = `You are a Principal Recruiting Director synthesizing the final interview assessment for a candidate.
Role: ${role} (${config?.experienceLevel || 'Mid-Level'})
Difficulty: ${config?.difficulty || 'Medium'}

Here are the questions and candidate answers:
${records.map((r: any, i: number) => `Q${i + 1} (${r.category}): "${r.questionText}"\nCandidate Answer: "${r.userAnswer}"\n`).join('\n')}

Produce a comprehensive final performance evaluation report. Return valid JSON matching EXACTLY this format:
{
  "overallScore": number (0-100),
  "hiringRecommendation": "Strong Hire" (or "Hire", "Borderline / Potential", "Needs Practice"),
  "summary": "A 3-4 sentence holistic evaluation of the candidate's strengths, demeanor, and technical depth.",
  "metrics": {
    "communication": number (0-100),
    "confidence": number (0-100),
    "relevance": number (0-100),
    "technicalKnowledge": number (0-100),
    "clarity": number (0-100)
  },
  "topStrengths": ["string", "string", "string"],
  "criticalWeaknesses": ["string", "string", "string"],
  "actionableTips": ["string", "string", "string"]
}
Return raw JSON only, no markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: summaryPrompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.4,
        },
      });

      const text = response.text || '';
      const cleanJson = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
      const parsed = JSON.parse(cleanJson);

      return res.json({
        success: true,
        source: 'gemini',
        evaluation: parsed,
      });
    } catch (err: any) {
      console.warn('Gemini full evaluation error, using fallback:', err?.message || err);
    }
  }

  // Fallback calculation across individual evaluations
  let sumScore = 0;
  let sumRel = 0;
  let sumClar = 0;
  let sumComm = 0;
  let sumTech = 0;
  let sumConf = 0;
  let count = (records && records.length) || 1;

  if (Array.isArray(records)) {
    records.forEach((r: any) => {
      const ev = r.evaluation;
      if (ev) {
        sumScore += ev.score || 70;
        sumRel += ev.relevanceScore || 72;
        sumClar += ev.clarityScore || 70;
        sumComm += ev.communicationScore || 68;
        sumTech += ev.technicalScore || 72;
        sumConf += ev.confidenceScore || 68;
      } else {
        sumScore += 75;
        sumRel += 75;
        sumClar += 75;
        sumComm += 75;
        sumTech += 75;
        sumConf += 75;
      }
    });
  }

  const avgScore = Math.round(sumScore / count);
  let recommendation: 'Strong Hire' | 'Hire' | 'Borderline / Potential' | 'Needs Practice' = 'Hire';
  if (avgScore >= 88) recommendation = 'Strong Hire';
  else if (avgScore >= 75) recommendation = 'Hire';
  else if (avgScore >= 60) recommendation = 'Borderline / Potential';
  else recommendation = 'Needs Practice';

  return res.json({
    success: true,
    source: 'aggregate',
    evaluation: {
      overallScore: avgScore,
      hiringRecommendation: recommendation,
      summary: `The candidate demonstrated strong foundational knowledge for the ${role} position. Communication was structured and answers directly addressed the key parameters of each question with thoughtful context.`,
      metrics: {
        communication: Math.round(sumComm / count),
        confidence: Math.round(sumConf / count),
        relevance: Math.round(sumRel / count),
        technicalKnowledge: Math.round(sumTech / count),
        clarity: Math.round(sumClar / count),
      },
      topStrengths: [
        'Clear articulation of core principles and methodology',
        'Structured problem-solving approach during technical questions',
        'Ability to communicate complex ideas in a digestible manner'
      ],
      criticalWeaknesses: [
        'Could include more specific quantifiable KPIs and outcome metrics',
        'Opportunity to dive deeper into edge cases and trade-off considerations'
      ],
      actionableTips: [
        'Utilize the STAR framework (Situation, Task, Action, Result) consistently on behavioral prompts',
        'Quantify achievements with percentages, team velocity improvements, or latency reductions',
        'Proactively highlight constraints and why alternative choices were discarded'
      ]
    }
  });
});

// Vite Middleware for development & static serving for production
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`InterviewAI Server listening on http://0.0.0.0:${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
});
