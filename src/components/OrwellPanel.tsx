import React, { useState } from 'react';
import { ORWELL_FACTORS, ORWELL_ASSESSMENT_METADATA } from '../data/orwellFactors';
import { OrwellFactor } from '../types';
import { OrwellFactorDrawer } from './OrwellFactorDrawer';
import { BookOpen, ChevronRight, Eye, Clock } from 'lucide-react';

interface OrwellPanelProps {
  onOpenMethodology: () => void;
}

const STATUS_CONFIG = {
  FLAGGED:               { label: 'Confirmed',    css: 'status-flagged',     shortLabel: '✓'          },
  NOT_FLAGGED:           { label: 'Coming Soon',  css: 'status-not-flagged', shortLabel: 'COMING SOON' },
  INSUFFICIENT_EVIDENCE: { label: 'Coming Soon',  css: 'status-insufficient',shortLabel: 'COMING SOON' },
};

export const OrwellPanel: React.FC<OrwellPanelProps> = ({ onOpenMethodology }) => {
  const [selectedFactor, setSelectedFactor] = useState<OrwellFactor | null>(null);

  const flaggedCount = ORWELL_FACTORS.filter((f) => f.status === 'FLAGGED').length;
  const total        = ORWELL_FACTORS.length; // always 7
  const pct          = Math.round((flaggedCount / total) * 100);

  return (
    <div className="orwell-section">

      {/* ── SUMMARY CARD ──────────────────────────────────────────── */}
      <div className="orwell-summary-card">

        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider
              text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full mb-1">
              <Eye className="w-2.5 h-2.5" /> WAS ORWELL RIGHT?
            </span>
            <h4 className="text-xs font-black uppercase tracking-wide mt-1 mb-0.5 text-slate-950 dark:text-white" style={{ color: 'inherit' }}>
              TODAY'S INDIA
            </h4>
            <p className="text-[10px] text-slate-400 font-semibold italic leading-tight">
              100% Satire &bull; Just here for the laughs
            </p>
          </div>

          {/* Big score */}
          <div className="text-right flex-shrink-0">
            <span className="font-display font-black text-2xl text-rose-600 leading-none">
              {flaggedCount}<span className="text-slate-300">/{total}</span>
            </span>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-wide mt-0.5">ACHIEVED</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-bar mb-2.5">
          <div className="progress-bar-fill" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #F59E0B, #F43F5E)' }} />
        </div>

        {/* Counts row */}
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <span className="status-pill status-flagged">
            <span className="status-dot" /> {flaggedCount} ACHIEVED
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold
            text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
            <Clock className="w-2.5 h-2.5" /> {total - flaggedCount} COMING SOON
          </span>
        </div>

        <button onClick={onOpenMethodology} className="btn-secondary w-full justify-center gap-1.5">
          <BookOpen className="w-3 h-3 text-emerald-600" />
          <span>Who is George Orwell?</span>
        </button>
      </div>

      {/* ── FACTOR LIST ───────────────────────────────────────────── */}
      <div className="orwell-factors-card">
        <div className="flex items-center justify-between mb-2 flex-shrink-0 w-full">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest">
            7 Orwellian Factors
          </span>
          <span className="text-[9.5px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider">
            TAP TO INSPECT
          </span>
        </div>

        <div className="orwell-factors-list">
          {ORWELL_FACTORS.map((factor) => {
            const cfg = STATUS_CONFIG[factor.status];
            return (
              <button
                key={factor.id}
                onClick={() => setSelectedFactor(factor)}
                className="orwell-factor-row"
                aria-label={`Factor ${factor.numberCode}: ${factor.title}: ${cfg.label}`}
              >
                {/* Number */}
                <span className={`w-6 h-6 rounded-lg font-black text-[11px] flex items-center
                  justify-center flex-shrink-0 border ${cfg.css}
                  ${factor.status === 'FLAGGED' ? 'status-flagged' : factor.status === 'NOT_FLAGGED' ? 'status-not-flagged' : 'status-insufficient'}`}
                  style={{
                    background: 'var(--status-bg)',
                    border: '1.5px solid var(--status-border)',
                    color: 'var(--status-text)',
                  }}>
                  {factor.numberCode}
                </span>

                {/* Title */}
                <span className="flex-1 font-bold text-[11px] text-slate-800 leading-tight text-left truncate">
                  {factor.title}
                </span>

                {/* Status — ✓ if achieved, clock icon if coming soon */}
                {factor.status === 'FLAGGED' ? (
                  <span className="status-pill status-flagged flex-shrink-0 font-black text-[11px]">
                    ✓
                  </span>
                ) : (
                  <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                )}

                <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── FACTOR DETAIL MODAL ───────────────────────────────────── */}
      {selectedFactor && (
        <OrwellFactorDrawer
          factor={selectedFactor}
          onClose={() => setSelectedFactor(null)}
        />
      )}
    </div>
  );
};
