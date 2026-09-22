import React, { useState } from 'react';
import { Bot, Sparkles, Menu, X, History, Award, Play } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: 'landing' | 'setup' | 'history') => void;
  onOpenAuth: () => void;
  onOpenPricing: () => void;
  onScrollToSection: (sectionId: string) => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAuth,
  onOpenPricing,
  onScrollToSection,
  historyCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div
            id="brand-logo"
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Interview<span className="text-blue-400">AI</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  PRO
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                Next-Gen Mock Simulator
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              id="nav-link-home"
              onClick={() => onNavigate('landing')}
              className={`hover:text-white transition-colors cursor-pointer ${
                currentView === 'landing' ? 'text-blue-400 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              id="nav-link-features"
              onClick={() => {
                if (currentView !== 'landing') onNavigate('landing');
                setTimeout(() => onScrollToSection('features'), 80);
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              id="nav-link-how-it-works"
              onClick={() => {
                if (currentView !== 'landing') onNavigate('landing');
                setTimeout(() => onScrollToSection('how-it-works'), 80);
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              id="nav-link-pricing"
              onClick={onOpenPricing}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <button
              id="nav-link-history"
              onClick={() => onNavigate('history')}
              className={`flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer ${
                currentView === 'history' ? 'text-blue-400 font-semibold' : ''
              }`}
            >
              <History className="w-4 h-4" />
              <span>History</span>
              {historyCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center font-bold">
                  {historyCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="btn-nav-login"
              onClick={onOpenAuth}
              className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Login
            </button>
            <button
              id="btn-nav-start"
              onClick={() => onNavigate('setup')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Interview</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0F172A] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => {
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-blue-400"
          >
            Home
          </button>
          <button
            onClick={() => {
              if (currentView !== 'landing') onNavigate('landing');
              setTimeout(() => onScrollToSection('features'), 80);
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-blue-400"
          >
            Features
          </button>
          <button
            onClick={() => {
              if (currentView !== 'landing') onNavigate('landing');
              setTimeout(() => onScrollToSection('how-it-works'), 80);
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-blue-400"
          >
            How It Works
          </button>
          <button
            onClick={() => {
              onOpenPricing();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-blue-400"
          >
            Pricing
          </button>
          <button
            onClick={() => {
              onNavigate('history');
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between w-full py-2 text-sm font-medium text-slate-200 hover:text-blue-400"
          >
            <span className="flex items-center gap-2">
              <History className="w-4 h-4" />
              Interview History
            </span>
            {historyCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center font-bold">
                {historyCount}
              </span>
            )}
          </button>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700"
            >
              Login
            </button>
            <button
              onClick={() => {
                onNavigate('setup');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-md shadow-blue-500/20"
            >
              Start Interview
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
