import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Download,
  RotateCcw,
  Sparkles,
  ArrowRight,
  MessageSquare,
  HelpCircle,
  Clock,
  Layers,
  BarChart3,
  Share2,
  Briefcase
} from 'lucide-react';
import {
  InterviewConfig,
  AnswerRecord,
  OverallEvaluation
} from '../types';

interface FeedbackAnalyticsProps {
  config: InterviewConfig;
  records: AnswerRecord[];
  overallEvaluation: OverallEvaluation;
  onRetake: () => void;
  onNewInterview: () => void;
  onGoToHistory: () => void;
}

export const FeedbackAnalytics: React.FC<FeedbackAnalyticsProps> = ({
  config,
  records,
  overallEvaluation,
  onRetake,
  onNewInterview,
  onGoToHistory,
}) => {
  const { overallScore, hiringRecommendation, summary, metrics, topStrengths, criticalWeaknesses, actionableTips } = overallEvaluation;

  // Trigger celebration confetti if score is high
  useEffect(() => {
    if (overallScore >= 75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }
  }, [overallScore]);

  const roleTitle = config.jobRole === 'Custom Role' && config.customRoleTitle ? config.customRoleTitle : config.jobRole;

  // Recommendation Badge Styling
  const getBadgeStyle = (rec: string) => {
    switch (rec) {
      case 'Strong Hire':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30';
      case 'Hire':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
      case 'Borderline / Potential':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/30';
      default:
        return 'bg-rose-500/10 text-rose-600 border-rose-500/30';
    }
  };

  const handleExportText = () => {
    const reportText = `===========================================
InterviewAI Performance Report
===========================================
Role: ${roleTitle}
Level: ${config.experienceLevel} | Difficulty: ${config.difficulty}
Date: ${new Date().toLocaleDateString()}
Overall Score: ${overallScore}/100 (${hiringRecommendation})

COMPETENCY METRICS:
- Communication: ${metrics.communication}%
- Confidence: ${metrics.confidence}%
- Relevance: ${metrics.relevance}%
- Technical Knowledge: ${metrics.technicalKnowledge}%
- Clarity: ${metrics.clarity}%

EXECUTIVE SUMMARY:
${summary}

TOP STRENGTHS:
${topStrengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

AREAS FOR IMPROVEMENT:
${criticalWeaknesses.map((w, i) => `${i + 1}. ${w}`).join('\n')}

ACTIONABLE TIPS:
${actionableTips.map((t, i) => `${i + 1}. ${t}`).join('\n')}

QUESTION-BY-QUESTION BREAKDOWN:
${records
  .map(
    (r, i) => `\n[Question ${i + 1}] (${r.category})
Q: ${r.questionText}
Your Answer: ${r.userAnswer}
Score: ${r.evaluation?.score || 'N/A'}/100
Feedback: ${r.evaluation?.instantFeedback || 'None'}
`
  )
  .join('\n')}
===========================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `InterviewAI_Report_${roleTitle.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                  Performance Evaluation
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                {roleTitle} Simulation Report
              </h1>
              <p className="text-sm text-slate-500 mt-1 font-medium">
                {config.experienceLevel} • {config.interviewType} Format • {config.difficulty} Mode
              </p>
            </div>

            {/* Overall Score Badge */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0F172A] text-white text-center flex-shrink-0 shadow-lg shadow-slate-900/20 border border-slate-800">
              <span className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
                Overall Score
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-blue-400 mt-1">
                {overallScore}
                <span className="text-xl text-slate-400 font-normal">/100</span>
              </div>
              <div className="mt-2">
                <span
                  className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold border ${getBadgeStyle(
                    hiringRecommendation
                  )}`}
                >
                  {hiringRecommendation}
                </span>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-900">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Executive Hiring Manager Assessment:</span>
            </div>
            <p className="text-sm text-blue-950 leading-relaxed font-medium">
              {summary}
            </p>
          </div>

          {/* 5-AXIS PERFORMANCE ANALYTICS */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Core Competency Analytics</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Communication', score: metrics.communication, color: 'bg-blue-600' },
                { label: 'Confidence', score: metrics.confidence, color: 'bg-indigo-600' },
                { label: 'Relevance', score: metrics.relevance, color: 'bg-emerald-600' },
                { label: 'Technical Depth', score: metrics.technicalKnowledge, color: 'bg-sky-600' },
                { label: 'Clarity', score: metrics.clarity, color: 'bg-purple-600' },
              ].map(({ label, score, color }) => (
                <div
                  key={label}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">{label}</span>
                    <span className="text-sm font-extrabold font-mono text-[#0F172A]">{score}%</span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color} transition-all duration-500`}
                      style={{ width: `${score}%` }}
                    />
                  </div>

                  <span className="text-[11px] text-slate-500">
                    {score >= 85 ? 'Exceptional' : score >= 70 ? 'Proficient' : 'Needs Practice'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Weaknesses Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Top Strengths */}
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Identified Strengths</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-800">
                {topStrengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical Weaknesses */}
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>Areas for Immediate Improvement</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-amber-800">
                {criticalWeaknesses.map((weak, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-amber-600">•</span>
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Actionable Tips */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-400">
              <Sparkles className="w-5 h-5" />
              <span>Recommended Next Steps Before Your Real Interview:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {actionableTips.map((tip, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
                  <span className="font-bold text-blue-400">Step {idx + 1}</span>
                  <p className="text-slate-300 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <button
                id="btn-export-report"
                type="button"
                onClick={handleExportText}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4 text-blue-600" />
                <span>Export Report (.txt)</span>
              </button>

              <button
                id="btn-view-history"
                type="button"
                onClick={onGoToHistory}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors cursor-pointer shadow-sm"
              >
                <span>View All History</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="btn-retake-same"
                type="button"
                onClick={onRetake}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Session</span>
              </button>

              <button
                id="btn-practice-new-role"
                type="button"
                onClick={onNewInterview}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Practice Another Role →</span>
              </button>
            </div>
          </div>

        </div>

        {/* QUESTION BY QUESTION BREAKDOWN */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              Detailed Question-by-Question Breakdown
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {records.length} Question{records.length === 1 ? '' : 's'} Evaluated
            </span>
          </div>

          <div className="space-y-4">
            {records.map((record, index) => {
              const ev = record.evaluation;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                        Q{index + 1}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {record.category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        ({record.inputMethod === 'voice' ? 'Voice Captured' : 'Text Input'})
                      </span>
                    </div>

                    {ev && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500">Score:</span>
                        <span className="text-lg font-black font-mono text-blue-600">
                          {ev.score}/100
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Question Title */}
                  <h4 className="text-base sm:text-lg font-bold text-[#0F172A]">
                    “{record.questionText}”
                  </h4>

                  {/* Candidate Answer */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      Your Response:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic">
                      “{record.userAnswer}”
                    </p>
                  </div>

                  {/* Feedback notes */}
                  {ev && (
                    <div className="space-y-3 pt-1">
                      <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                        <span className="font-bold">Evaluation Feedback: </span>
                        {ev.instantFeedback}
                      </div>

                      {/* Strengths & Improvements */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                          <span className="font-bold text-emerald-900 block mb-1">Strengths:</span>
                          <ul className="text-emerald-800 space-y-0.5">
                            {ev.strengths.map((s, i) => (
                              <li key={i}>• {s}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100">
                          <span className="font-bold text-amber-900 block mb-1">Areas to Refine:</span>
                          <ul className="text-amber-800 space-y-0.5">
                            {ev.areasForImprovement.map((a, i) => (
                              <li key={i}>• {a}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Benchmark Outline */}
                      {ev.idealAnswerOutline && (
                        <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700">
                          <span className="font-bold text-slate-800 block mb-1">
                            Model Benchmark Response / Framework:
                          </span>
                          <p className="text-slate-600 leading-relaxed">
                            {ev.idealAnswerOutline}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
