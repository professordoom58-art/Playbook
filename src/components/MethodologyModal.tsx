import React from 'react';
import { X, BookOpen, ShieldAlert, User, CheckCircle2 } from 'lucide-react';
import { ORWELL_FACTORS } from '../data/orwellFactors';

interface MethodologyModalProps {
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content max-w-2xl max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b-2 border-slate-100 dark:border-slate-800 bg-rose-50/40 dark:bg-rose-950/20 flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="font-display font-black text-lg sm:text-xl text-slate-900 dark:text-white leading-tight">
              Who is George Orwell?
            </h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              An overview of George Orwell, his warnings, and our 7-factor editorial framework.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          
          {/* 1. START: BRIEF ABOUT GEORGE ORWELL */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-rose-50 to-amber-50 dark:from-purple-950/40 dark:via-rose-950/30 dark:to-amber-950/30 border-2 border-purple-200 dark:border-purple-800/60">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <h4 className="font-black text-slate-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider">
                Who was George Orwell?
              </h4>
            </div>
            <p className="text-xs font-medium leading-relaxed text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">George Orwell</strong> (pen name of Eric Arthur Blair, 1903–1950) was a renowned English novelist, essayist, and political critic. Famous for his sharp warnings against totalitarianism, state surveillance, and language manipulation, his most influential works include the classic dystopian novels <em>1984</em> and <em>Animal Farm</em>, alongside seminal essays like <em>Politics and the English Language</em> and <em>Notes on Nationalism</em>.
            </p>
          </div>

          {/* 2. MIDDLE: DISCUSSION OF THE 7 ORWELLIAN FACTORS */}
          <div>
            <h4 className="font-black text-slate-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-rose-500" />
              The 7 Orwellian Factors Discussed
            </h4>

            <div className="space-y-2.5">
              {ORWELL_FACTORS.map((factor) => (
                <div
                  key={factor.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-lg bg-rose-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    {factor.numberCode}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h5 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-tight">
                        {factor.title}
                      </h5>
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${
                          factor.status === 'FLAGGED'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                            : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                        }`}
                      >
                        {factor.status === 'FLAGGED' ? 'CONFIRMED' : 'COMING SOON'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-snug mb-1">
                      {factor.plainMeaning}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-400 italic">
                      Source: {factor.orwellSource}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. END: DISCLAIMER */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/60 text-amber-950 dark:text-amber-200 text-xs leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-1">
                Official Disclaimer
              </strong>
              George Orwell never created an official 7-factor test or formal scoring system. These 7 factors are not official academic metrics — we created them based on our own editorial interpretation of recurring themes, warnings, and concepts found across Orwell's published novels and essays.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
