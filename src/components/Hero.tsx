import React from 'react';
import { Play, HelpCircle, FileCheck, ShieldCheck, Flame, Users } from 'lucide-react';

interface HeroProps {
  onPlayClick: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlayClick, onHowItWorksClick }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 px-4 sm:px-8 border-b-2 border-slate-200 bg-white">
      
      {/* Decorative Blob Accents */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-4 right-1/4 w-80 h-80 bg-rose-300/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Pitch & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 font-extrabold text-xs tracking-wide uppercase mb-6 shadow-sm"
            style={{ backgroundColor: '#FEF3C7', borderColor: '#FDE68A', color: '#78350F' }}
          >
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span style={{ color: '#78350F' }}>please dont sue me prettty please</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Governments have a playbook.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 underline decoration-amber-400 decoration-wavy decoration-2">
              See how many moves
            </span>{' '}
            they’ve played.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed mb-8 max-w-2xl">
            A fun, satirical game to track wild political buzzwords and viral accusations. Spot the labels and play along for the laughs!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
            <button
              onClick={onPlayClick}
              className="btn-play-primary text-lg py-4 px-8 w-full sm:w-auto"
            >
              <Play className="w-6 h-6 fill-slate-950 stroke-none" />
              <span>PLAY BINGO</span>
            </button>
            <button
              onClick={onHowItWorksClick}
              className="btn-play-secondary text-lg py-4 px-8 w-full sm:w-auto"
            >
              <HelpCircle className="w-6 h-6 text-slate-600" />
              <span>HOW IT WORKS</span>
            </button>
          </div>

          {/* Stat Pill Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 border-t-2 border-slate-200">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="font-display font-black text-2xl text-amber-600">36+</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Tactics Tracked</div>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="font-display font-black text-2xl text-rose-600">14</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Movements</div>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="font-display font-black text-2xl text-purple-600">12,940+</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Notes Added</div>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="font-display font-black text-2xl text-emerald-600">4,820+</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Bingo Cards</div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Miniature Preview Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="card-playbook p-5 max-w-sm w-full bg-white relative rotate-1 hover:rotate-0 transition-transform duration-300">
            
            {/* Top Card Badge */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <span className="font-extrabold text-xs text-slate-700 uppercase tracking-wide">
                  WHO ARE YOU??
                </span>
              </div>
              <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300">
                13 / 25 MOVES
              </span>
            </div>

            {/* Miniature 3x3 Grid Visual */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { title: 'FOREIGN HAND', cat: 'RHETORIC', marked: true, bg: 'bg-rose-100 text-rose-800 border-rose-300' },
                { title: 'EXTREMIST LABEL', cat: 'RHETORIC', marked: true, bg: 'bg-rose-100 text-rose-800 border-rose-300' },
                { title: 'SLAPP SUIT', cat: 'LEGAL', marked: false, bg: 'bg-blue-100 text-blue-800 border-blue-300' },
                { title: 'TRANSIT BLOCK', cat: 'POLICING', marked: true, bg: 'bg-amber-100 text-amber-800 border-amber-300' },
                { title: 'FREEZE ACCOUNTS', cat: 'ECONOMIC', marked: true, bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
                { title: 'FACIAL REC', cat: 'SURVEILLANCE', marked: false, bg: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
                { title: 'DIVIDE & CO-OPT', cat: 'ORGANIZATIONAL', marked: true, bg: 'bg-teal-100 text-teal-800 border-teal-300' },
                { title: 'NET BLACKOUT', cat: 'PSYCHOLOGICAL', marked: true, bg: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
                { title: 'ASTROTURF FRONT', cat: 'POLITICAL', marked: false, bg: 'bg-orange-100 text-orange-800 border-orange-300' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    item.marked
                      ? 'bg-amber-100 border-amber-400 font-extrabold shadow-[0_2px_0_0_#D97706]'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="text-[9px] font-black uppercase text-slate-500 mb-0.5">{item.cat}</div>
                  <div className="text-[11px] font-bold leading-tight">{item.title}</div>
                  {item.marked && <div className="text-[10px] text-emerald-600 font-black mt-1">✓ MARKED</div>}
                </div>
              ))}
            </div>

            {/* Bottom Card Footer */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-700">5 Supporting Links</span>
              </div>
              <span className="text-xs font-black text-rose-600 uppercase tracking-wide">
                7 Orwell Flags
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
