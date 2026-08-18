import React from 'react';
import { Target, Heart, Shield, Github } from 'lucide-react';

interface FooterProps {
  onOpenHowItWorks: () => void;
  onOpenMethodology: () => void;
  onOpenShare: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenHowItWorks,
  onOpenMethodology,
  onOpenShare
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-8 border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 rounded-2xl border-2 border-amber-600 flex items-center justify-center text-slate-950 font-black">
              🎯
            </div>
            <span className="font-display font-black text-2xl text-white tracking-tight">
              PLAYBOOK BINGO
            </span>
          </div>

          <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-sm">
            "Governments have a playbook. See how many moves they've played."
          </p>

          <p className="text-xs text-slate-500 font-normal leading-relaxed">
            A satirical political pattern-recognition game. Grounded in documented historical evidence, not political accusations.
          </p>
        </div>

        {/* Navigation Column */}
        <div className="md:col-span-3 space-y-3 font-extrabold text-sm">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-black">
            Navigation & Tools
          </h4>
          <ul className="space-y-2">
            <li>
              <button onClick={onOpenHowItWorks} className="hover:text-amber-400 transition-colors">
                How It Works
              </button>
            </li>
            <li>
              <button onClick={onOpenMethodology} className="hover:text-amber-400 transition-colors">
                Orwell Assessment Methodology
              </button>
            </li>
            <li>
              <button onClick={onOpenShare} className="hover:text-amber-400 transition-colors">
                Generate Shareable Card
              </button>
            </li>
          </ul>
        </div>

        {/* Disclaimer & Transparency Column */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-black">
            Civic Literacy Disclaimer
          </h4>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-400 leading-relaxed">
            <Shield className="w-4 h-4 text-amber-400 inline mr-1.5" />
            Playbook Bingo is an educational, research-backed framework designed to recognize documented tactics across political contexts. All Orwell factors cite published legal, statutory, and media sources.
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-semibold gap-4">
        <span>© 2026 Playbook Bingo. Built for civic pattern-recognition & public education.</span>
        <span className="flex items-center gap-1">
          Crafted with care & political satire 🎯
        </span>
      </div>
    </footer>
  );
};
