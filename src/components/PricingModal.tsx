import React from 'react';
import { X, Check, Sparkles, Zap, Shield, Bot } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: string) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-10 shadow-2xl border border-slate-200 space-y-8 max-h-[90vh] overflow-y-auto relative animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
            Flexible Plans for Job Seekers
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Accelerate Your Interview Readiness
          </h2>
          <p className="text-slate-500 text-sm">
            Choose the plan that fits your career goals. Practice realistic questions and walk into your next interview with conviction.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Starter Plan */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Free Starter</h3>
                <p className="text-xs text-slate-500">Perfect for exploring the simulation experience.</p>
              </div>
              <div className="text-3xl font-extrabold text-[#0F172A] font-mono">
                $0
                <span className="text-xs text-slate-400 font-normal"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>3 practice interviews / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Standard 6 tech & business roles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Speech-to-text recognition</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Basic performance scorecard</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                onSelectPlan('Free Starter');
                onClose();
              }}
              className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Current Active Plan
            </button>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="p-6 rounded-2xl border-2 border-blue-600 bg-gradient-to-b from-blue-50/50 to-white space-y-5 flex flex-col justify-between relative shadow-lg shadow-blue-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider">
              Most Popular
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-blue-900">Career Pro</h3>
                <p className="text-xs text-slate-500">For active job seekers who want to stand out.</p>
              </div>
              <div className="text-3xl font-extrabold text-[#0F172A] font-mono">
                $19
                <span className="text-xs text-slate-400 font-normal"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Unlimited interview simulations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Custom role and job title generator</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Deep Gemini 3.8 Flash evaluation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>AI voice audio readouts (natural TTS)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>5-axis radar metrics & exportable reports</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                onSelectPlan('Career Pro');
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
            >
              Upgrade to Career Pro
            </button>
          </div>

          {/* Enterprise / Coach Plan */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Enterprise / Team</h3>
                <p className="text-xs text-slate-500">For university bootcamps, recruiting teams & cohorts.</p>
              </div>
              <div className="text-3xl font-extrabold text-[#0F172A] font-mono">
                $79
                <span className="text-xs text-slate-400 font-normal"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>All Career Pro features included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Custom company question rubrics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Bulk cohort analytics & benchmarks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Dedicated support & SSO</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                onSelectPlan('Enterprise');
                onClose();
              }}
              className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Contact Sales
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
