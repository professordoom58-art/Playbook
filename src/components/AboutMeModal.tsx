import React from 'react';
import { X, Crown, Sparkles } from 'lucide-react';

interface AboutMeModalProps {
  onClose: () => void;
}

export const AboutMeModal: React.FC<AboutMeModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content max-w-lg p-0 overflow-hidden rounded-3xl">
        
        {/* Header */}
        <div className="p-5 border-b-2 border-slate-100 dark:border-slate-800 bg-gradient-to-r from-purple-600 via-rose-600 to-amber-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-300" />
            <h3 className="font-display font-black text-lg sm:text-xl leading-tight">
              About Creator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
          
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700/60">
              <Sparkles className="w-3 h-3 text-purple-500" /> ALIAS & INTRO
            </span>
            <h4 className="font-display font-black text-2xl sm:text-3xl text-purple-600 dark:text-purple-400 tracking-tight">
              kakarothunter
            </h4>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700/80 text-center shadow-xs">
            <p className="text-xs sm:text-sm font-medium italic text-slate-700 dark:text-slate-200 leading-relaxed">
              "I am an intrinsically self-abasing, perpetually self-disparaging, and thoroughly contemptible cipher of negligible consequence: an ineffectual dilettante possessing superficial competency across innumerable disciplines while attaining mastery in none. Should you ever elect to pursue my demise, I respectfully request that the undertaking be executed with maximal discretion and alacrity, preferably accomplishing my termination within an interval of no more than two seconds. Your prompt compliance would be sincerely appreciated."
            </p>
          </div>

          <div className="text-center">
            <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              100% Satire &bull; Made for friends & laughs
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
