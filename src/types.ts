export type JobRole =
  | 'Software Developer'
  | 'Data Analyst'
  | 'UI/UX Designer'
  | 'Product Manager'
  | 'Digital Marketing Specialist'
  | 'HR Executive'
  | 'Custom Role';

export type ExperienceLevel = 'Fresher' | '1–2 Years' | '3–5 Years' | '5+ Years';

export type InterviewType = 'Technical' | 'Behavioral' | 'HR' | 'Mixed';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type QuestionCount = 5 | 10 | 15 | 20;

export interface InterviewConfig {
  jobRole: JobRole;
  customRoleTitle?: string;
  experienceLevel: ExperienceLevel;
  interviewType: InterviewType;
  difficulty: DifficultyLevel;
  questionCount: QuestionCount;
  enableVoiceReadout: boolean;
}

export interface InterviewQuestion {
  id: string;
  questionNumber: number;
  category: 'Technical' | 'Behavioral' | 'HR' | 'Situational';
  question: string;
  contextOrTips?: string;
  expectedKeyPoints?: string[];
  modelAnswer?: string;
}

export interface QuestionEvaluation {
  questionId: string;
  score: number; // 0 - 100
  relevanceScore: number;
  clarityScore: number;
  communicationScore: number;
  technicalScore: number;
  confidenceScore: number;
  strengths: string[];
  areasForImprovement: string[];
  instantFeedback: string;
  idealAnswerOutline: string;
}

export interface AnswerRecord {
  questionId: string;
  questionText: string;
  category: string;
  userAnswer: string;
  inputMethod: 'voice' | 'text';
  timeSpentSeconds: number;
  evaluation?: QuestionEvaluation;
}

export interface OverallEvaluation {
  overallScore: number;
  hiringRecommendation: 'Strong Hire' | 'Hire' | 'Borderline / Potential' | 'Needs Practice';
  summary: string;
  metrics: {
    communication: number; // 0 - 100
    confidence: number;
    relevance: number;
    technicalKnowledge: number;
    clarity: number;
  };
  topStrengths: string[];
  criticalWeaknesses: string[];
  actionableTips: string[];
  totalTimeSeconds: number;
}

export interface InterviewSessionHistory {
  id: string;
  timestamp: number;
  config: InterviewConfig;
  overallScore: number;
  hiringRecommendation: string;
  metrics: OverallEvaluation['metrics'];
  records: AnswerRecord[];
  overallEvaluation: OverallEvaluation;
}
