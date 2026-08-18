import React from 'react';
import { X, Target, Paperclip, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface HowItWorksModalProps {
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content max-w-lg">
        
        {/* Header */}
        <div className="p-5 border-b-2 border-slate-100 bg-amber-50/60 flex items-center justify-between">
          <div>
            <h3 className="font-display font-black text-xl text-slate-900 leading-tight">How Playbook Bingo Works</h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">A pattern-recognition game grounded in historical evidence.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:bg-slate-200 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm font-medium text-slate-700">
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-base mb-1">Select a Movement or Build a Card</h4>
                <p>
                  Pick a movement or type in your own title. You get a 5x5 card with 25 labels pulled from a big ol database of documented rhetoric.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-black text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-base mb-1">Mark Observed Labels</h4>
                <p>
                  Spot a label being used in the wild? Click that square. Watch your progress creep toward BINGO.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-base mb-1">Inspect the Orwell Check</h4>
                <p>
                  The side panel has 7 Orwellian factors, a satirical checklist loosely inspired by Orwell's own writings. Tap any factor to see what it actually means.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-base mb-1">Complete the Card</h4>
                <p>
                  Fill a row of 5 or mark all 25 to get BINGO. Hit Shuffle for a fresh random layout or Clear to wipe it clean and start over.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black text-sm flex-shrink-0">
                5
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-base mb-1">Share the Card</h4>
                <p>
                  Hit Share Card whenever you want to grab a high res PNG of your board. Chuck it on X, Instagram, WhatsApp, Reddit, wherever.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
            I am a non partisan.
          </div>

        </div>

      </div>
    </div>
  );
};
