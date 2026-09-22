/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { SetupPage } from './components/SetupPage';
import { InterviewScreen } from './components/InterviewScreen';
import { FeedbackAnalytics } from './components/FeedbackAnalytics';
import { HistoryPage } from './components/HistoryPage';
import { AuthModal } from './components/AuthModal';
import { PricingModal } from './components/PricingModal';
import {
  InterviewConfig,
  InterviewQuestion,
  AnswerRecord,
  OverallEvaluation,
  InterviewSessionHistory
} from './types';
import { getExpandedQuestions } from './data/questionBank';

const STORAGE_KEY = 'interviewai_session_history_v1';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'setup' | 'interview' | 'analytics' | 'history'>('landing');
  const [config, setConfig] = useState<InterviewConfig>({
    jobRole: 'Software Developer',
    experienceLevel: '3–5 Years',
    interviewType: 'Mixed',
    difficulty: 'Medium',
    questionCount: 5,
    enableVoiceReadout: true,
  });

  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [overallEvaluation, setOverallEvaluation] = useState<OverallEvaluation | null>(null);
  const [history, setHistory] = useState<InterviewSessionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to load history from localStorage:', e);
    }
  }, []);

  // Save history to localStorage
  const saveSessionToHistory = (
    sessionConfig: InterviewConfig,
    sessionRecords: AnswerRecord[],
    evaluation: OverallEvaluation
  ) => {
    const newSession: InterviewSessionHistory = {
      id: `session-${Date.now()}`,
      timestamp: Date.now(),
      config: sessionConfig,
      overallScore: evaluation.overallScore,
      hiringRecommendation: evaluation.hiringRecommendation,
      metrics: evaluation.metrics,
      records: sessionRecords,
      overallEvaluation: evaluation,
    };

    const updated = [newSession, ...history];
    setHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  // Start interview from Setup page
  const handleStartInterview = async (newConfig: InterviewConfig) => {
    setConfig(newConfig);
    setIsLoading(true);

    try {
      // Attempt backend Gemini generation
      const response = await fetch('/api/interview/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });

      const data = await response.json();

      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        // Use curated local fallback
        const localQuestions = getExpandedQuestions(
          newConfig.jobRole,
          newConfig.customRoleTitle,
          newConfig.experienceLevel,
          newConfig.interviewType,
          newConfig.questionCount
        );
        setQuestions(localQuestions);
      }
    } catch (err) {
      console.warn('Using local question presets due to network/api fallback:', err);
      const localQuestions = getExpandedQuestions(
        newConfig.jobRole,
        newConfig.customRoleTitle,
        newConfig.experienceLevel,
        newConfig.interviewType,
        newConfig.questionCount
      );
      setQuestions(localQuestions);
    } finally {
      setIsLoading(false);
      setRecords([]);
      setOverallEvaluation(null);
      setCurrentView('interview');
    }
  };

  // Complete interview
  const handleFinishInterview = async (finalRecords: AnswerRecord[]) => {
    setRecords(finalRecords);
    setIsLoading(true);

    try {
      const response = await fetch('/api/interview/full-evaluation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config,
          records: finalRecords,
        }),
      });

      const data = await response.json();
      const evaluation: OverallEvaluation = data.evaluation;
      setOverallEvaluation(evaluation);
      saveSessionToHistory(config, finalRecords, evaluation);
    } catch (err) {
      console.warn('Failed to compute full evaluation, generating default synthesis:', err);
      // Aggregate fallback
      let sumScore = 0;
      finalRecords.forEach((r) => {
        sumScore += r.evaluation?.score || 70;
      });
      const avg = Math.round(sumScore / (finalRecords.length || 1));
      const fallbackEval: OverallEvaluation = {
        overallScore: avg,
        hiringRecommendation: avg >= 85 ? 'Strong Hire' : avg >= 72 ? 'Hire' : 'Needs Practice',
        summary: `The candidate demonstrated solid competence in their responses for ${config.jobRole}. Technical fundamentals were articulated clearly and answers followed structured logic.`,
        metrics: {
          communication: Math.min(95, avg + 2),
          confidence: Math.min(92, avg - 2),
          relevance: Math.min(96, avg + 3),
          technicalKnowledge: avg,
          clarity: Math.min(94, avg + 1),
        },
        topStrengths: [
          'Effective communication of practical solutions',
          'Structured approach to problem solving under simulated pressure'
        ],
        criticalWeaknesses: [
          'Could elaborate more on edge case trade-offs and quantitative results'
        ],
        actionableTips: [
          'Incorporate the STAR methodology explicitly in behavioral answers',
          'Highlight specific metrics (percentages, latency, throughput, ROI)'
        ],
        totalTimeSeconds: 300,
      };

      setOverallEvaluation(fallbackEval);
      saveSessionToHistory(config, finalRecords, fallbackEval);
    } finally {
      setIsLoading(false);
      setCurrentView('analytics');
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navbar (hidden during active interview for full immersion) */}
      {currentView !== 'interview' && (
        <Navbar
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          onOpenAuth={() => setAuthModalOpen(true)}
          onOpenPricing={() => setPricingModalOpen(true)}
          onScrollToSection={handleScrollToSection}
          historyCount={history.length}
        />
      )}

      {/* View routing */}
      {currentView === 'landing' && (
        <LandingPage
          onStartInterview={() => setCurrentView('setup')}
          onOpenPricing={() => setPricingModalOpen(true)}
        />
      )}

      {currentView === 'setup' && (
        <SetupPage
          onBack={() => setCurrentView('landing')}
          onStart={handleStartInterview}
          isLoading={isLoading}
        />
      )}

      {currentView === 'interview' && (
        <InterviewScreen
          config={config}
          questions={questions}
          onFinishInterview={handleFinishInterview}
          onExit={() => setCurrentView('setup')}
        />
      )}

      {currentView === 'analytics' && overallEvaluation && (
        <FeedbackAnalytics
          config={config}
          records={records}
          overallEvaluation={overallEvaluation}
          onRetake={() => handleStartInterview(config)}
          onNewInterview={() => setCurrentView('setup')}
          onGoToHistory={() => setCurrentView('history')}
        />
      )}

      {currentView === 'history' && (
        <HistoryPage
          history={history}
          onSelectSession={(session) => {
            setConfig(session.config);
            setRecords(session.records);
            setOverallEvaluation(session.overallEvaluation);
            setCurrentView('analytics');
          }}
          onClearHistory={handleClearHistory}
          onStartNew={() => setCurrentView('setup')}
        />
      )}

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(email) => {
          setCurrentUser(email);
        }}
      />

      <PricingModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        onSelectPlan={(plan) => {
          alert(`You selected the ${plan} plan!`);
        }}
      />
    </div>
  );
}
