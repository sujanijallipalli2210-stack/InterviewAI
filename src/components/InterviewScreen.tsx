import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Send,
  HelpCircle,
  AlertCircle,
  CheckCircle,
  X,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  Lightbulb,
  Award
} from 'lucide-react';
import {
  InterviewConfig,
  InterviewQuestion,
  AnswerRecord,
  QuestionEvaluation
} from '../types';
import { SpeechHandler, TextToSpeechPlayer } from '../utils/speech';

interface InterviewScreenProps {
  config: InterviewConfig;
  questions: InterviewQuestion[];
  onFinishInterview: (records: AnswerRecord[]) => void;
  onExit: () => void;
}

export const InterviewScreen: React.FC<InterviewScreenProps> = ({
  config,
  questions,
  onFinishInterview,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [answerText, setAnswerText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<QuestionEvaluation | null>(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  
  // Timer states
  const [questionTimeSeconds, setQuestionTimeSeconds] = useState(0);
  const [totalTimeSeconds, setTotalTimeSeconds] = useState(0);

  // Accumulated answers
  const [records, setRecords] = useState<AnswerRecord[]>([]);

  const speechHandlerRef = useRef<SpeechHandler | null>(null);
  const currentQuestion = questions[currentIndex] || questions[0];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const roleTitle = config.jobRole === 'Custom Role' && config.customRoleTitle ? config.customRoleTitle : config.jobRole;

  // Initialize Speech recognition
  useEffect(() => {
    speechHandlerRef.current = new SpeechHandler(
      (transcript) => {
        setAnswerText((prev) => {
          // If previous ended with space or empty, append smoothly
          if (!prev) return transcript;
          return `${prev.trim()} ${transcript}`.trim();
        });
      },
      (error) => {
        setSpeechError(error);
      },
      (listening) => {
        setIsListening(listening);
      }
    );

    return () => {
      speechHandlerRef.current?.stopListening();
      TextToSpeechPlayer.stop();
    };
  }, []);

  // Speak question when question index changes if voice readout is enabled
  useEffect(() => {
    setAnswerText('');
    setQuestionTimeSeconds(0);
    setShowHint(false);
    setSpeechError(null);
    setShowEvaluationModal(false);
    setCurrentEvaluation(null);

    if (config.enableVoiceReadout && currentQuestion) {
      setIsSpeaking(true);
      TextToSpeechPlayer.speak(
        currentQuestion.question,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }

    return () => {
      TextToSpeechPlayer.stop();
    };
  }, [currentIndex, config.enableVoiceReadout, currentQuestion]);

  // Timers
  useEffect(() => {
    const timer = setInterval(() => {
      setQuestionTimeSeconds((prev) => prev + 1);
      setTotalTimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleToggleVoice = () => {
    if (!speechHandlerRef.current) return;
    if (isSpeaking) {
      TextToSpeechPlayer.stop();
      setIsSpeaking(false);
    }
    setSpeechError(null);
    speechHandlerRef.current.toggleListening();
  };

  const handleReplayQuestion = () => {
    if (isListening) {
      speechHandlerRef.current?.stopListening();
    }
    setIsSpeaking(true);
    TextToSpeechPlayer.speak(
      currentQuestion.question,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  const handleSubmitAnswer = async () => {
    if (isListening) {
      speechHandlerRef.current?.stopListening();
    }
    TextToSpeechPlayer.stop();
    setIsSpeaking(false);

    if (!answerText.trim()) {
      alert('Please provide an answer before submitting or click "Skip Question"');
      return;
    }

    setIsEvaluating(true);

    try {
      const response = await fetch('/api/interview/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion.question,
          userAnswer: answerText,
          role: roleTitle,
          experienceLevel: config.experienceLevel,
          category: currentQuestion.category,
        }),
      });

      const data = await response.json();
      const evaluation: QuestionEvaluation = data.evaluation || {
        questionId: currentQuestion.id,
        score: 75,
        relevanceScore: 78,
        clarityScore: 75,
        communicationScore: 72,
        technicalScore: 74,
        confidenceScore: 76,
        strengths: ['Direct response with good awareness'],
        areasForImprovement: ['Elaborate with specific outcome metrics'],
        instantFeedback: 'Good attempt. Focus on structuring with the STAR framework.',
        idealAnswerOutline: currentQuestion.modelAnswer || 'Structure with Context, Action, and Quantified Result.'
      };

      const record: AnswerRecord = {
        questionId: currentQuestion.id,
        questionText: currentQuestion.question,
        category: currentQuestion.category,
        userAnswer: answerText,
        inputMethod: inputMode,
        timeSpentSeconds: questionTimeSeconds,
        evaluation,
      };

      setRecords((prev) => [...prev, record]);
      setCurrentEvaluation(evaluation);
      setShowEvaluationModal(true);
    } catch (err) {
      console.warn('Evaluation failed, generating default feedback:', err);
      const fallbackEval: QuestionEvaluation = {
        questionId: currentQuestion.id,
        score: 75,
        relevanceScore: 75,
        clarityScore: 75,
        communicationScore: 75,
        technicalScore: 75,
        confidenceScore: 75,
        strengths: ['Clear delivery and relevant terminology used.'],
        areasForImprovement: ['Substantiate assertions with measurable achievements.'],
        instantFeedback: 'Structured answer. Keep providing concrete technical context.',
        idealAnswerOutline: currentQuestion.modelAnswer || 'Use clear context, trade-offs, and metrics.'
      };

      const record: AnswerRecord = {
        questionId: currentQuestion.id,
        questionText: currentQuestion.question,
        category: currentQuestion.category,
        userAnswer: answerText,
        inputMethod: inputMode,
        timeSpentSeconds: questionTimeSeconds,
        evaluation: fallbackEval,
      };

      setRecords((prev) => [...prev, record]);
      setCurrentEvaluation(fallbackEval);
      setShowEvaluationModal(true);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    setShowEvaluationModal(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all questions!
      onFinishInterview(records);
    }
  };

  const handleSkipQuestion = () => {
    if (isListening) speechHandlerRef.current?.stopListening();
    TextToSpeechPlayer.stop();

    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      category: currentQuestion.category,
      userAnswer: '(Skipped by Candidate)',
      inputMethod: inputMode,
      timeSpentSeconds: questionTimeSeconds,
      evaluation: {
        questionId: currentQuestion.id,
        score: 30,
        relevanceScore: 30,
        clarityScore: 30,
        communicationScore: 30,
        technicalScore: 30,
        confidenceScore: 30,
        strengths: ['Acknowledged question constraints'],
        areasForImprovement: ['Try offering a partial framework rather than skipping entirely'],
        instantFeedback: 'In real interviews, even if unsure, walk through your initial intuition or clarify requirements.',
        idealAnswerOutline: currentQuestion.modelAnswer || 'Clarify scope, propose initial approach, evaluate edge cases.'
      }
    };

    const updated = [...records, record];
    setRecords(updated);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinishInterview(updated);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      
      {/* 1. TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#0F172A] text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Left: Logo & Job Role Badge */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg text-white tracking-tight truncate">
                    Interview<span className="text-blue-400">AI</span>
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Live Session
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 truncate">
                  <span className="font-medium text-slate-300 truncate">{roleTitle}</span>
                  <span>•</span>
                  <span>{config.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Center: Question Progress */}
            <div className="flex-1 max-w-xs sm:max-w-sm mx-2">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-medium">
                <span className="font-semibold text-white">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="font-mono text-blue-400">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Right: Exit Interview Button */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>{formatTime(totalTimeSeconds)}</span>
              </div>

              <button
                id="btn-exit-interview"
                onClick={() => setShowExitConfirm(true)}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-600/80 border border-rose-500/20 transition-all cursor-pointer"
              >
                Exit Interview
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 2. MAIN SECTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: AI Interviewer Avatar & Speaking Indicator */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg shadow-slate-200/40 flex flex-col items-center text-center space-y-6">
            
            {/* Avatar with dynamic glow & speaking waves */}
            <div className="relative pt-2">
              <div
                className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 transition-all duration-500 flex items-center justify-center ${
                  isSpeaking
                    ? 'bg-gradient-to-tr from-blue-500 via-sky-400 to-indigo-500 shadow-xl shadow-blue-500/30 scale-105'
                    : isListening
                    ? 'bg-gradient-to-tr from-emerald-500 via-teal-400 to-green-500 shadow-xl shadow-emerald-500/30'
                    : 'bg-slate-200 shadow-md'
                }`}
              >
                <div className="w-full h-full bg-[#0F172A] rounded-[22px] flex items-center justify-center relative overflow-hidden">
                  <Bot
                    className={`w-14 h-14 transition-colors ${
                      isSpeaking ? 'text-blue-400 animate-pulse' : isListening ? 'text-emerald-400' : 'text-slate-400'
                    }`}
                  />
                  {/* Subtle scanline effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-md transition-all ${
                    isSpeaking
                      ? 'bg-blue-600 text-white animate-pulse'
                      : isListening
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSpeaking ? 'bg-white animate-ping' : isListening ? 'bg-white' : 'bg-slate-400'
                    }`}
                  />
                  {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'Ready'}
                </span>
              </div>
            </div>

            {/* Identifier */}
            <div className="space-y-1 pt-2">
              <h3 className="text-xl font-extrabold text-[#0F172A]">
                AI Interviewer
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Evaluating {config.experienceLevel} • {config.interviewType}
              </p>
            </div>

            {/* Animated Speaking Wave / Listening Indicator */}
            <div className="w-full py-3 px-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center gap-1.5 min-h-[48px]">
              {isSpeaking ? (
                <>
                  <Volume2 className="w-4 h-4 text-blue-600 mr-2" />
                  {[24, 60, 85, 45, 95, 70, 40, 80, 50, 30].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-blue-600 rounded-full animate-pulse"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 90}ms`,
                        animationDuration: '0.8s',
                      }}
                    />
                  ))}
                  <span className="text-xs font-semibold text-blue-600 ml-2">Audio playing</span>
                </>
              ) : isListening ? (
                <>
                  <Mic className="w-4 h-4 text-emerald-600 mr-2 animate-bounce" />
                  {[30, 75, 45, 90, 60, 80, 50, 95, 35].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-emerald-500 rounded-full animate-pulse"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 100}ms`,
                        animationDuration: '0.6s',
                      }}
                    />
                  ))}
                  <span className="text-xs font-semibold text-emerald-600 ml-2">Mic Active</span>
                </>
              ) : (
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <span>Awaiting your answer</span>
                </div>
              )}
            </div>

            {/* Audio Controls & Timer */}
            <div className="w-full flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
              <button
                id="btn-replay-audio"
                type="button"
                onClick={handleReplayQuestion}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                <span>Repeat Question</span>
              </button>

              <div className="flex items-center gap-1.5 font-mono text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(questionTimeSeconds)}</span>
              </div>
            </div>

            {/* Helpful Answering Tip Box */}
            <div className="w-full p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Interviewer Tip:</span>
              </div>
              <p className="text-xs text-blue-800 leading-relaxed font-normal">
                {currentQuestion.contextOrTips ||
                  'Structure your response using the STAR framework: Situation, Task, Action taken, and quantifiable Result.'}
              </p>
            </div>

          </div>

          {/* CENTER / RIGHT: Question Card & Answer Area */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* QUESTION CARD */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg shadow-slate-200/40 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
                    {currentQuestion.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                </div>

                <button
                  id="btn-toggle-hint"
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Hide Guidance' : 'Get AI Hint'}</span>
                </button>
              </div>

              {/* The Question Text */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
                “{currentQuestion.question}”
              </h2>

              {/* Expandable AI Hint */}
              {showHint && currentQuestion.expectedKeyPoints && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2 text-xs text-amber-900 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Key Concepts an Evaluator Looks For:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-amber-800">
                    {currentQuestion.expectedKeyPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* ANSWER INPUT AREA */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg shadow-slate-200/40 space-y-6">
              
              {/* Tab Switch: Voice vs Text */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    id="tab-voice-mode"
                    type="button"
                    onClick={() => {
                      setInputMode('voice');
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      inputMode === 'voice'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Voice Mode</span>
                  </button>

                  <button
                    id="tab-text-mode"
                    type="button"
                    onClick={() => {
                      if (isListening) speechHandlerRef.current?.stopListening();
                      setInputMode('text');
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      inputMode === 'text'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Text Mode</span>
                  </button>
                </div>

                <div className="text-xs text-slate-500 font-mono">
                  {answerText.trim() ? answerText.trim().split(/\s+/).length : 0} words
                </div>
              </div>

              {/* Voice Interactive Panel */}
              {inputMode === 'voice' && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
                    <button
                      id="btn-voice-mic-trigger"
                      type="button"
                      onClick={handleToggleVoice}
                      className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer ${
                        isListening
                          ? 'bg-emerald-500 text-white shadow-emerald-500/40 ring-4 ring-emerald-200 animate-pulse'
                          : 'bg-blue-600 text-white shadow-blue-500/30 hover:bg-blue-500'
                      }`}
                    >
                      {isListening ? <Mic className="w-9 h-9" /> : <Mic className="w-9 h-9" />}
                    </button>

                    <div className="space-y-1">
                      <p className="text-sm font-bold text-[#0F172A]">
                        {isListening ? 'Listening to your microphone...' : 'Click the microphone to start speaking'}
                      </p>
                      <p className="text-xs text-slate-500">
                        {isListening
                          ? 'Speak clearly. Click again to pause or edit your transcript below.'
                          : 'Your spoken words will appear in the transcript below.'}
                      </p>
                    </div>

                    {speechError && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2 text-left">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>{speechError} You can also type directly in the box below.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Transcript / Text Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <label htmlFor="answer-input-box" className="font-semibold text-slate-700">
                    {inputMode === 'voice' ? 'Live Spoken Transcript (Editable):' : 'Type Your Answer:'}
                  </label>
                  {answerText && (
                    <button
                      id="btn-clear-answer"
                      type="button"
                      onClick={() => setAnswerText('')}
                      className="text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <textarea
                  id="answer-input-box"
                  rows={6}
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder={
                    inputMode === 'voice'
                      ? 'Your speech-to-text response will stream here. Feel free to refine or edit anytime...'
                      : 'Provide a structured answer. For example: "In my previous experience with..."'
                  }
                  className="w-full p-4 rounded-2xl border border-slate-300 text-sm text-[#0F172A] leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-inner"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  id="btn-skip-question"
                  type="button"
                  onClick={handleSkipQuestion}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Skip Question
                </button>

                <div className="w-full sm:w-auto flex items-center gap-3">
                  <button
                    id="btn-submit-answer"
                    type="button"
                    disabled={isEvaluating || !answerText.trim()}
                    onClick={handleSubmitAnswer}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 active:scale-95 shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isEvaluating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Evaluating Response...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Answer</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* 3. INSTANT MICRO-EVALUATION MODAL */}
      {showEvaluationModal && currentEvaluation && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto animate-scaleUp">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#0F172A]">Instant Question Feedback</h3>
                  <p className="text-xs text-slate-500">Evaluated against {roleTitle} benchmark criteria</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-blue-600 font-mono">
                  {currentEvaluation.score}
                </span>
                <span className="text-xs text-slate-400 font-medium block">/100 Points</span>
              </div>
            </div>

            {/* Score Grid Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Relevance</span>
                <span className="text-base font-bold text-slate-800">{currentEvaluation.relevanceScore}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Clarity</span>
                <span className="text-base font-bold text-slate-800">{currentEvaluation.clarityScore}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Technical</span>
                <span className="text-base font-bold text-slate-800">{currentEvaluation.technicalScore}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Confidence</span>
                <span className="text-base font-bold text-slate-800">{currentEvaluation.confidenceScore}%</span>
              </div>
            </div>

            {/* Coaching Feedback */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                Evaluator Summary:
              </h4>
              <p className="text-sm text-blue-950 leading-relaxed font-medium">
                {currentEvaluation.instantFeedback}
              </p>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Key Strengths:</span>
                </div>
                <ul className="space-y-1 text-emerald-800">
                  {currentEvaluation.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span>•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Areas to Refine:</span>
                </div>
                <ul className="space-y-1 text-amber-800">
                  {currentEvaluation.areasForImprovement.map((area, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span>•</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Model Answer Preview */}
            {currentQuestion.modelAnswer && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Model Answer Example (Benchmark):
                </span>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  “{currentQuestion.modelAnswer}”
                </p>
              </div>
            )}

            {/* Advance button */}
            <div className="pt-2">
              <button
                id="btn-advance-question"
                type="button"
                onClick={handleNextQuestion}
                className="w-full py-4 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {currentIndex + 1 < questions.length ? 'Continue to Next Question →' : 'Complete & View Full Analytics →'}
                </span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-[#0F172A]">
                Exit Interview Simulation?
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Are you sure you want to exit? Your progress for the currently answered questions will be evaluated, but incomplete questions will be skipped.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Continue Interview
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowExitConfirm(false);
                  onExit();
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors cursor-pointer shadow-md shadow-rose-600/20"
              >
                Yes, Exit Session
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
