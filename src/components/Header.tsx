import React, { useState } from 'react';
import { Target, HelpCircle, BookOpen, Share2, Menu, X, Moon, CloudRain, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: 'LANDING' | 'GAME';
  onNavigateView: (view: 'LANDING' | 'GAME') => void;
  onOpenHowItWorks: () => void;
  onOpenMethodology: () => void;
  onOpenAboutMe?: () => void;
  onOpenShare: () => void;
  markedCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isDramatic: boolean;
  onToggleDramatic: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateView,
  onOpenHowItWorks,
  onOpenMethodology,
  onOpenAboutMe,
  onOpenShare,
  markedCount,
  isDarkMode,
  onToggleDarkMode,
  isDramatic,
  onToggleDramatic,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="game-header bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 px-4 sm:px-6 transition-colors"
      style={{ boxShadow: '0 1px 3px 0 rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-center justify-between h-12 gap-3">

        {/* Brand */}
        <button
          onClick={() => onNavigateView('LANDING')}
          className="flex items-center gap-2 focus:outline-none group flex-shrink-0"
          aria-label="Go to home page"
        >
          <div className="w-8 h-8 bg-amber-400 rounded-xl border-2 border-amber-500
            flex items-center justify-center shadow-[0_2px_0_0_#D97706]
            group-hover:scale-105 transition-transform">
            <Target className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          </div>
          <span className="font-display font-black text-lg tracking-tight text-slate-900 dark:text-white leading-none hidden sm:block">
            PLAYBOOK BINGO
          </span>
          <span className="font-display font-black text-base tracking-tight text-slate-900 dark:text-white leading-none sm:hidden">
            PB
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-200">
          <button onClick={onOpenHowItWorks}
            className="btn-ghost flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            How it Works
          </button>
          <button onClick={onOpenMethodology}
            className="btn-ghost flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            Who is George Orwell?
          </button>
          {onOpenAboutMe && (
            <button onClick={onOpenAboutMe} className="btn-ghost flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              About Me
            </button>
          )}
        </nav>

        {/* Right: Toggles + share button + mobile menu */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            type="button"
            className={`h-9 inline-flex items-center justify-center rounded-xl border-2 text-xs font-black transition-all duration-200 cursor-pointer select-none px-2.5 sm:px-3.5 ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-600 via-rose-600 to-purple-700 border-purple-400 text-white shadow-[0_2.5px_0_0_#3B0764] hover:border-purple-300'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-[0_2.5px_0_0_#CBD5E1] hover:border-slate-300'
            }`}
            title="Toggle Dark Mode"
            aria-label={`Dark mode: ${isDarkMode ? 'on' : 'off'}`}
          >
            <Moon className={`w-3.5 h-3.5 transition-transform duration-200 ${isDarkMode ? 'text-purple-200 fill-purple-200 scale-110' : 'text-slate-500'}`} />
            {/* Desktop-only text label */}
            <span className="hidden sm:inline font-black tracking-wide ml-1.5">Dark</span>
            {/* Desktop-only miniature ON/OFF switch track */}
            <div className={`hidden sm:flex w-7 h-3.5 rounded-full p-0.5 transition-all duration-200 items-center ml-2 ${
              isDarkMode ? 'bg-purple-400 justify-end shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]' : 'bg-slate-300 justify-start'
            }`}>
              <div className={`w-2.5 h-2.5 rounded-full transition-transform duration-200 ${isDarkMode ? 'bg-purple-950 shadow-md' : 'bg-slate-600'}`} />
            </div>
          </button>

          {/* Dramatic Mode Toggle (Rain & Thunder) */}
          <button
            onClick={onToggleDramatic}
            type="button"
            className={`h-9 inline-flex items-center justify-center rounded-xl border-2 text-xs font-black transition-all duration-200 cursor-pointer select-none px-2.5 sm:px-3.5 ${
              isDramatic
                ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 border-amber-300 text-white shadow-[0_2.5px_0_0_#B45309] animate-pulse'
                : isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 shadow-[0_2.5px_0_0_#0F172A]'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-[0_2.5px_0_0_#CBD5E1] hover:border-slate-300'
            }`}
            title="Toggle Dramatic Rain & Thunder Mode"
            aria-label={`Dramatic mode: ${isDramatic ? 'on' : 'off'}`}
          >
            <CloudRain className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isDramatic ? 'text-amber-200 scale-110' : isDarkMode ? 'text-amber-400' : 'text-slate-500'
            }`} />
            {/* Desktop-only text label */}
            <span className="hidden sm:inline font-black tracking-wide ml-1.5">Dramatic</span>
            {/* Desktop-only miniature ON/OFF switch track */}
            <div className={`hidden sm:flex w-7 h-3.5 rounded-full p-0.5 transition-all duration-200 items-center ml-2 ${
              isDramatic ? 'bg-amber-300 justify-end shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]' : isDarkMode ? 'bg-slate-700 justify-start' : 'bg-slate-300 justify-start'
            }`}>
              <div className={`w-2.5 h-2.5 rounded-full transition-transform duration-200 ${
                isDramatic ? 'bg-amber-950 shadow-md' : isDarkMode ? 'bg-slate-400' : 'bg-slate-600'
              }`} />
            </div>
          </button>

          {/* Share Card Button */}
          <button onClick={onOpenShare} className="btn-primary h-9 !py-0 px-2.5 sm:px-4 text-xs font-black gap-1 rounded-xl inline-flex items-center justify-center flex-shrink-0">
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share Card</span>
            <span className="sm:hidden">Share</span>
            {markedCount > 0 && (
              <span className="share-badge-count bg-slate-950 text-white text-[10px] w-5 h-5 rounded-full font-black flex items-center justify-center border border-amber-300/40 shadow-xs leading-none">
                {markedCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-xl border-2 border-slate-200 text-slate-700"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden py-2 border-t-2 border-slate-100 flex flex-col gap-1">
          <button
            onClick={() => { onNavigateView('LANDING'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50
              font-bold text-sm text-slate-700 flex items-center gap-2"
          >
            🏠 Home
          </button>
          <button
            onClick={() => { onOpenHowItWorks(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50
              font-bold text-sm text-slate-700 flex items-center gap-2"
          >
            ❓ How it Works
          </button>
          <button
            onClick={() => { onOpenMethodology(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50
              font-bold text-sm text-slate-700 flex items-center gap-2"
          >
            📖 Methodology
          </button>
        </div>
      )}
    </header>
  );
};
