import React from 'react';
import {
  Bot,
  Sparkles,
  Play,
  Mic,
  Cpu,
  CheckCircle2,
  TrendingUp,
  History,
  ShieldCheck,
  Brain,
  MessageSquare,
  BarChart3,
  Award,
  ArrowRight,
  Volume2,
  Zap,
  Users,
  Clock,
  Briefcase
} from 'lucide-react';

interface LandingPageProps {
  onStartInterview: () => void;
  onOpenPricing: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartInterview,
  onOpenPricing,
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#0B132B] to-[#0F172A] text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Subtle background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Next-Gen Job Preparation Powered by Gemini</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Practice Interviews. <br className="hidden sm:inline" />
                Build Confidence. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                  Get Hired.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                An AI-powered interview simulator that helps you practice realistic interviews, improve your answers, and identify your strengths and weaknesses.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="btn-hero-start-free"
                  onClick={onStartInterview}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Start Free Interview</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  id="btn-hero-explore-features"
                  href="#features"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-base bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Explore Features
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Voice or Text Input</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instant In-Depth Rubrics</span>
                </div>
              </div>
            </div>

            {/* Right Visual: AI Interviewer Interface Mockup */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-md bg-[#0F172A] rounded-2xl border border-slate-700/70 shadow-2xl shadow-blue-900/30 overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                
                {/* Header Mockup */}
                <div className="px-5 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                      Live Simulation Active
                    </span>
                  </div>
                  <span className="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                    Senior Software Dev
                  </span>
                </div>

                {/* Progress Bar Component */}
                <div className="px-5 pt-4 pb-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
                    <span>Interview Progress</span>
                    <span className="text-white font-semibold">Question 3 of 10</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: '30%' }}
                    />
                  </div>
                </div>

                {/* AI Interviewer Avatar & Speech Section */}
                <div className="p-5 space-y-4">
                  <div className="flex items-start gap-4">
                    {/* Animated Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 p-[2px] shadow-lg shadow-blue-500/30">
                        <div className="w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center">
                          <Bot className="w-7 h-7 text-blue-400 animate-bounce" style={{ animationDuration: '3s' }} />
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0F172A] flex items-center justify-center">
                        <Volume2 className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>

                    {/* Question Bubble */}
                    <div className="flex-1 bg-slate-800/90 rounded-2xl rounded-tl-sm p-4 border border-slate-700/60 shadow-sm">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                          AI Interviewer
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">01:24</span>
                      </div>
                      <p className="text-sm text-slate-100 font-medium leading-relaxed">
                        “Can you describe a challenging technical project you led, and how you navigated trade-offs under tight deadlines?”
                      </p>
                    </div>
                  </div>

                  {/* Candidate Input Preview with Mic Icon & Audio Wave */}
                  <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">Your Response (Voice Active)</span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Listening...
                      </span>
                    </div>

                    {/* Audio Wave Visualizer Simulation */}
                    <div className="flex items-center justify-center gap-1.5 h-8 py-1 px-4 bg-slate-950/60 rounded-lg border border-slate-800/80">
                      {[18, 32, 48, 24, 52, 68, 40, 20, 56, 36, 64, 28, 44, 20].map((h, i) => (
                        <div
                          key={i}
                          className="w-1 bg-blue-500 rounded-full animate-pulse"
                          style={{
                            height: `${h}%`,
                            animationDelay: `${i * 80}ms`,
                            animationDuration: '1s',
                          }}
                        />
                      ))}
                    </div>

                    <p className="text-xs text-slate-300 italic line-clamp-2">
                      “In my last project migrating our database to PostgreSQL, we faced a 25% read latency spike during peak traffic...”
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px] text-slate-400">
                      <div className="flex items-center gap-1.5 text-blue-400">
                        <Mic className="w-3.5 h-3.5" />
                        <span>High-Fidelity Audio Capture</span>
                      </div>
                      <span className="font-mono text-emerald-400 font-medium">Speech-to-Text Live</span>
                    </div>
                  </div>

                  {/* Real-time score snippet */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-xs">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300 font-medium">Real-time clarity index:</span>
                    </div>
                    <span className="font-bold text-emerald-400 font-mono">94% (Exceptional)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-slate-200 py-12 relative z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                10K+
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-600">
                Interviews Practiced
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
                50+
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-600">
                Job Roles Supported
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                AI-Powered
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-600">
                Deep Instant Feedback
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
                24/7
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-600">
                Instant Availability
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section (6 Cards Required) */}
      <section id="features" className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Engineered For Career Growth
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Everything You Need to Master Any Interview
            </p>
            <p className="text-slate-600 text-base sm:text-lg">
              InterviewAI combines state-of-the-art language models with speech technology to replicate the pressure and structure of real hiring loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* 1. AI-Generated Questions */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  1. AI-Generated Questions
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Generate realistic, industry-vetted questions tailored specifically to your chosen job role, seniority level, and target difficulty.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600">
                <span>Role-aware prompt engine</span>
              </div>
            </div>

            {/* 2. Real-Time Evaluation */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  2. Real-Time Evaluation
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Analyze your answers on the spot. Get instant feedback on structure, depth, technical accuracy, and adherence to the STAR framework.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600">
                <span>Micro-evaluations after each question</span>
              </div>
            </div>

            {/* 3. Voice Interviews */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                  <Mic className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  3. Voice Interviews
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Answer questions naturally with your microphone. Our speech recognition converts your spoken thoughts into text with real-time audio wave feedback.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-sky-600">
                <span>Hands-free voice recognition</span>
              </div>
            </div>

            {/* 4. Personalized Feedback */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  4. Personalized Feedback
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Receive an exhaustive audit of your strengths and concrete weaknesses, complete with recommended phrasing and model answers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-600">
                <span>Actionable improvement roadmap</span>
              </div>
            </div>

            {/* 5. Performance Analytics */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  5. Performance Analytics
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Display multi-axis scores across 5 core competencies: Communication, Confidence, Relevance, Technical Knowledge, and Clarity.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-amber-600">
                <span>Granular radar & metric breakdowns</span>
              </div>
            </div>

            {/* 6. Interview History */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <History className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  6. Interview History
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Compare previous interview attempts over time, inspect past transcripts, and track how your readiness metric progresses session by session.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-purple-600">
                <span>Longitudinal progress tracking</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Simple 4-Step Process
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              How InterviewAI Prepares You
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="relative text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                1
              </div>
              <h4 className="text-lg font-bold text-[#0F172A]">Select Role & Depth</h4>
              <p className="text-sm text-slate-600">
                Choose your job title, experience level, interview style (Technical, Behavioral, HR), and question count.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-900 text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
                2
              </div>
              <h4 className="text-lg font-bold text-[#0F172A]">AI Generates Scenarios</h4>
              <p className="text-sm text-slate-600">
                The AI synthesizes realistic questions based on real interview rubrics from top global employers.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                3
              </div>
              <h4 className="text-lg font-bold text-[#0F172A]">Speak or Type Answers</h4>
              <p className="text-sm text-slate-600">
                Answer live using speech recognition or structured text. Hear questions spoken naturally aloud.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                4
              </div>
              <h4 className="text-lg font-bold text-[#0F172A]">Get Comprehensive Review</h4>
              <p className="text-sm text-slate-600">
                Inspect your 5-axis score, identify delivery blindspots, and review top-tier model answers.
              </p>
            </div>

          </div>

          <div className="mt-16 text-center">
            <button
              onClick={onStartInterview}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Try A Free Simulation Now</span>
            </button>
          </div>

        </div>
      </section>

      {/* Role Showcase */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Tailored for every profession
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                Prepare for any high-demand technical or business role
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you are a developer answering system design questions, a product manager prioritizing roadmaps, or an HR leader resolving workplace disputes, InterviewAI adapts to your domain.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'Software Developer',
                  'Data Analyst',
                  'UI/UX Designer',
                  'Product Manager',
                  'Digital Marketing Specialist',
                  'HR Executive',
                  'Custom Target Roles',
                ].map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-200"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-slate-400 py-12 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-white font-bold text-base">
              Interview<span className="text-blue-400">AI</span>
            </span>
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} InterviewAI Inc. Practice realistic interviews. Build unshakeable confidence.
          </p>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <button onClick={onOpenPricing} className="hover:text-white transition-colors cursor-pointer">
              Pricing Plans
            </button>
            <button onClick={onStartInterview} className="hover:text-white transition-colors cursor-pointer">
              Setup Simulator
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
