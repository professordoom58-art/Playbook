import React from 'react';
import { X, BookOpen, ShieldAlert, FileText, CheckCircle2, Scale } from 'lucide-react';
import { ORWELL_ASSESSMENT_METADATA } from '../data/orwellFactors';

interface MethodologyModalProps {
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content max-w-2xl">
        
        {/* Header */}
        <div className="p-5 border-b-2 border-slate-100 bg-rose-50/40 flex items-center justify-between">
          <div>
            <h3 className="font-display font-black text-xl text-slate-900 leading-tight">Who is George Orwell?</h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">7 recurring themes from Orwell's classic books turned into a fun checklist.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:bg-slate-200 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm font-medium text-slate-700">
          
          {/* Key Factual Statement */}
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 font-semibold text-xs leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm font-black mb-1">Did Orwell write an official test?</strong>
              Nope. George Orwell never created a formal scoring system. I just collected 7 recurring themes from 1984 and his essays to see if his warnings show up in real life.
            </div>
          </div>

          {/* Scoring Process Steps */}
          <div>
            <h4 className="font-black text-slate-900 text-base mb-3 flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-600" />
              How each factor is checked
            </h4>
            
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">1</span>
                <div>
                  <h5 className="font-extrabold text-slate-900 text-xs">Find the Orwell warning</h5>
                  <p className="text-xs text-slate-600">Pick an actual warning from Orwell's books like rewording history or doublethink.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <h5 className="font-extrabold text-slate-900 text-xs">Spot real world signs</h5>
                  <p className="text-xs text-slate-600">List 2 to 4 clear signs that anyone can easily recognize today.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">3</span>
                <div>
                  <h5 className="font-extrabold text-slate-900 text-xs">Gather real evidence</h5>
                  <p className="text-xs text-slate-600">Look at court orders, official news releases, public reports, and documented events.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">4</span>
                <div>
                  <h5 className="font-extrabold text-slate-900 text-xs">Check both sides</h5>
                  <p className="text-xs text-slate-600">Take note of critical reports plus official government explanations such as public safety.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">5</span>
                <div>
                  <h5 className="font-extrabold text-slate-900 text-xs">Tag the status</h5>
                  <p className="text-xs text-slate-600">Mark as <strong>FLAGGED</strong> when confirmed, or <strong>COMING SOON</strong> when still looking into it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
