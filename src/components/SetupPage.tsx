import React, { useState } from 'react';
import {
  Briefcase,
  Layers,
  Sparkles,
  Sliders,
  HelpCircle,
  Volume2,
  VolumeX,
  ArrowRight,
  ArrowLeft,
  Check,
  Bot
} from 'lucide-react';
import {
  JobRole,
  ExperienceLevel,
  InterviewType,
  DifficultyLevel,
  QuestionCount,
  InterviewConfig
} from '../types';

interface SetupPageProps {
  onBack: () => void;
  onStart: (config: InterviewConfig) => void;
  isLoading: boolean;
}

const JOB_ROLES: JobRole[] = [
  'Software Developer',
  'Data Analyst',
  'UI/UX Designer',
  'Product Manager',
  'Digital Marketing Specialist',
  'HR Executive',
  'Custom Role',
];

const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  'Fresher',
  '1–2 Years',
  '3–5 Years',
  '5+ Years',
];

const INTERVIEW_TYPES: { type: InterviewType; description: string }[] = [
  { type: 'Technical', description: 'Domain-specific problem solving & system questions' },
  { type: 'Behavioral', description: 'STAR method, leadership & collaboration' },
  { type: 'HR', description: 'Culture fit, career aspirations & salary expectations' },
  { type: 'Mixed', description: 'Comprehensive simulation combining all 3 areas' },
];

const DIFFICULTIES: { level: DifficultyLevel; description: string; color: string }[] = [
  { level: 'Easy', description: 'Foundational concepts & straightforward scenarios', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { level: 'Medium', description: 'Standard industry bar with edge-case considerations', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { level: 'Hard', description: 'High-bar scrutiny, architecture trade-offs & tough scenarios', color: 'text-amber-600 bg-amber-50 border-amber-200' },
];

const QUESTION_COUNTS: QuestionCount[] = [5, 10, 15, 20];

export const SetupPage: React.FC<SetupPageProps> = ({
  onBack,
  onStart,
  isLoading,
}) => {
  const [jobRole, setJobRole] = useState<JobRole>('Software Developer');
  const [customRoleTitle, setCustomRoleTitle] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('3–5 Years');
  const [interviewType, setInterviewType] = useState<InterviewType>('Mixed');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Medium');
  const [questionCount, setQuestionCount] = useState<QuestionCount>(5);
  const [enableVoiceReadout, setEnableVoiceReadout] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobRole === 'Custom Role' && !customRoleTitle.trim()) {
      alert('Please specify your custom target role');
      return;
    }

    onStart({
      jobRole,
      customRoleTitle: jobRole === 'Custom Role' ? customRoleTitle.trim() : undefined,
      experienceLevel,
      interviewType,
      difficulty,
      questionCount,
      enableVoiceReadout,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            id="btn-back-setup"
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Mock Interview Configuration</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 overflow-hidden">
          
          {/* Header Banner */}
          <div className="p-8 sm:p-10 border-b border-slate-100 bg-gradient-to-br from-slate-900 via-[#0F172A] to-blue-950 text-white">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Set Up Your Interview
            </h1>
            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
              Customize the simulator to match your target job requirements. Our AI interviewer will calibrate questions and scoring criteria to your exact specifications.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-9">
            
            {/* 1. Job Role */}
            <div className="space-y-3">
              <label htmlFor="select-job-role" className="block text-sm font-bold text-[#0F172A] uppercase tracking-wide">
                Job Role
              </label>
              
              <div className="relative">
                <select
                  id="select-job-role"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value as JobRole)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-[#0F172A] font-semibold text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                >
                  {JOB_ROLES.map((role) => (
                    <option key={role} value={role} className="text-[#0F172A]">
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Role Input */}
              {jobRole === 'Custom Role' && (
                <div className="pt-2">
                  <label htmlFor="input-custom-role" className="block text-xs font-semibold text-slate-600 mb-1">
                    Specify Your Custom Role Title
                  </label>
                  <input
                    id="input-custom-role"
                    type="text"
                    required
                    placeholder="e.g. DevOps Engineer, Cybersecurity Architect, Clinical Researcher"
                    value={customRoleTitle}
                    onChange={(e) => setCustomRoleTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              )}
            </div>

            {/* 2. Experience Level */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#0F172A] uppercase tracking-wide">
                Experience Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {EXPERIENCE_LEVELS.map((level) => {
                  const isSelected = experienceLevel === level;
                  return (
                    <button
                      key={level}
                      id={`btn-level-${level.replace(/\s+/g, '-').toLowerCase()}`}
                      type="button"
                      onClick={() => setExperienceLevel(level)}
                      className={`py-3 px-4 rounded-xl text-sm font-semibold border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Interview Type */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#0F172A] uppercase tracking-wide">
                Interview Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTERVIEW_TYPES.map(({ type, description }) => {
                  const isSelected = interviewType === type;
                  return (
                    <div
                      key={type}
                      id={`card-type-${type.toLowerCase()}`}
                      onClick={() => setInterviewType(type)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-base font-bold ${isSelected ? 'text-blue-900' : 'text-[#0F172A]'}`}>
                          {type}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        {description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Difficulty */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#0F172A] uppercase tracking-wide">
                Difficulty
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DIFFICULTIES.map(({ level, description, color }) => {
                  const isSelected = difficulty === level;
                  return (
                    <div
                      key={level}
                      id={`btn-diff-${level.toLowerCase()}`}
                      onClick={() => setDifficulty(level)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 ring-2 ring-blue-600/20 bg-white shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${color}`}>
                          {level}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-blue-600 font-bold" />}
                      </div>
                      <p className="text-xs text-slate-500 mt-2 font-medium">
                        {description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Number of Questions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-[#0F172A] uppercase tracking-wide">
                  Number of Questions
                </label>
                <span className="text-xs text-slate-500">
                  Approx. {questionCount * 2} - {questionCount * 3} minutes
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {QUESTION_COUNTS.map((count) => {
                  const isSelected = questionCount === count;
                  return (
                    <button
                      key={count}
                      id={`btn-count-${count}`}
                      type="button"
                      onClick={() => setQuestionCount(count)}
                      className={`py-3 rounded-xl text-base font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {count}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Voice Audio Readout Option */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  {enableVoiceReadout ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">AI Voice Readout</h4>
                  <p className="text-xs text-slate-500">Have the AI Interviewer speak each question aloud</p>
                </div>
              </div>
              <button
                id="toggle-voice-readout"
                type="button"
                onClick={() => setEnableVoiceReadout(!enableVoiceReadout)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  enableVoiceReadout ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enableVoiceReadout ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                id="btn-start-ai-interview"
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-2xl font-bold text-lg text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.99] shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Synthesizing Realistic Simulation...</span>
                  </>
                ) : (
                  <>
                    <span>Start AI Interview →</span>
                  </>
                )}
              </button>
              
              <p className="mt-3 text-center text-xs text-slate-500">
                You will be able to answer each prompt using your live voice microphone or text input.
              </p>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
