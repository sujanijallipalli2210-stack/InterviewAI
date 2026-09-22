import React from 'react';
import {
  History,
  Calendar,
  Award,
  ArrowRight,
  TrendingUp,
  Trash2,
  Play,
  Briefcase,
  ChevronRight,
  CheckCircle2,
  BarChart3
} from 'lucide-react';
import { InterviewSessionHistory } from '../types';

interface HistoryPageProps {
  history: InterviewSessionHistory[];
  onSelectSession: (session: InterviewSessionHistory) => void;
  onClearHistory: () => void;
  onStartNew: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onSelectSession,
  onClearHistory,
  onStartNew,
}) => {
  const getBadgeStyle = (rec: string) => {
    switch (rec) {
      case 'Strong Hire':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Hire':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Borderline / Potential':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-rose-100 text-rose-800 border-rose-200';
    }
  };

  const averageScore = history.length
    ? Math.round(history.reduce((acc, h) => acc + h.overallScore, 0) / history.length)
    : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <History className="w-5 h-5 text-blue-600" />
              <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Interview History & Performance Logs
              </h1>
            </div>
            <p className="text-sm text-slate-500">
              Review your previous simulation attempts, track your progression, and inspect past AI evaluations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {history.length > 0 && (
              <button
                id="btn-clear-history"
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to clear your entire interview history?')) {
                    onClearHistory();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}

            <button
              id="btn-history-start-new"
              type="button"
              onClick={onStartNew}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start New Interview</span>
            </button>
          </div>
        </div>

        {/* Analytics Summary Banner */}
        {history.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Total Completed</span>
                <span className="text-2xl font-extrabold text-[#0F172A]">{history.length} Session{history.length === 1 ? '' : 's'}</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Average Score</span>
                <span className="text-2xl font-extrabold text-[#0F172A] font-mono">{averageScore}%</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Latest Recommendation</span>
                <span className="text-base font-extrabold text-purple-700">
                  {history[0].hiringRecommendation}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* History List or Empty State */}
        {history.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <History className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-[#0F172A]">No Interview Sessions Yet</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Take your first simulated interview to generate analytics, identify weak spots, and benchmark your progress.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onStartNew}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
              >
                Launch Your First Simulation →
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((session) => {
              const roleTitle = session.config.jobRole === 'Custom Role' && session.config.customRoleTitle
                ? session.config.customRoleTitle
                : session.config.jobRole;

              return (
                <div
                  key={session.id}
                  onClick={() => onSelectSession(session)}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">
                        {roleTitle}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getBadgeStyle(session.hiringRecommendation)}`}>
                        {session.hiringRecommendation}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(session.timestamp).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <span>•</span>
                      <span>Level: {session.config.experienceLevel}</span>
                      <span>•</span>
                      <span>{session.config.interviewType}</span>
                      <span>•</span>
                      <span>{session.records.length} Questions</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-left sm:text-right">
                      <span className="text-2xl font-black font-mono text-blue-600">
                        {session.overallScore}%
                      </span>
                      <span className="text-[11px] text-slate-400 block font-medium">Readiness Score</span>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
