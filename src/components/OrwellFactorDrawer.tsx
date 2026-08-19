import React from 'react';
import { OrwellFactor } from '../types';
import { X, BookOpen, ExternalLink, Calendar, Eye, AlertTriangle, Clock } from 'lucide-react';

interface OrwellFactorDrawerProps {
  factor: OrwellFactor;
  onClose: () => void;
}

const STATUS_LABEL: Record<string, { text: string; cls: string }> = {
  FLAGGED:               { text: 'ACHIEVED',    cls: 'status-flagged'     },
  NOT_FLAGGED:           { text: 'COMING SOON', cls: 'status-not-flagged' },
  INSUFFICIENT_EVIDENCE: { text: 'COMING SOON', cls: 'status-not-flagged' },
};

export const OrwellFactorDrawer: React.FC<OrwellFactorDrawerProps> = ({ factor, onClose }) => {
  const status = STATUS_LABEL[factor.status];

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content max-w-2xl" style={{ maxWidth: '640px' }}>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 border-b-2 border-slate-100 bg-rose-50/40">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider
                text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                FACTOR {factor.numberCode} / 07
              </span>
              <span className={`status-pill ${status.cls} inline-flex items-center gap-1`}
                style={{
                  background: 'var(--status-bg)',
                  border: '1.5px solid var(--status-border)',
                  color: 'var(--status-text)',
                  fontSize: '10px',
                  padding: '2px 8px',
                }}>
                {factor.status === 'FLAGGED'
                  ? <span className="font-black text-sm">✓</span>
                  : <Clock className="w-2.5 h-2.5" />}
                {status.text}
              </span>
            </div>
            <h3 className="font-display font-black text-slate-900 text-xl leading-tight">
              {factor.title}
            </h3>
            <p className="text-xs font-semibold text-slate-600 mt-1 italic leading-snug">
              {factor.plainMeaning}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-200 hover:text-slate-700 flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4 text-sm">

          {/* Orwell quote */}
          <div className="p-4 rounded-2xl bg-amber-50 border-l-4 border-amber-400">
            <div className="flex items-center gap-1.5 mb-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                Orwell Concept: {factor.orwellSource}
              </span>
            </div>
            <p className="text-xs text-slate-700 font-semibold italic leading-relaxed">
              {factor.orwellText}
            </p>
          </div>

          {/* What I look for */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Eye className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">
                Observable Indicators
              </span>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 space-y-1.5">
              {factor.lookForIndicators.map((indicator, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-800">
                  <span className="text-purple-500 font-black mt-0.5">•</span>
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Current Assessment & Reasoning
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {factor.evidenceDate}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border-2 border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-500 uppercase">Status:</span>
                <span className={`status-pill ${status.cls} inline-flex items-center gap-1`}
                  style={{
                    background: 'var(--status-bg)',
                    border: '1.5px solid var(--status-border)',
                    color: 'var(--status-text)',
                  }}>
                  {factor.status === 'FLAGGED'
                    ? <span className="font-black text-sm">✓</span>
                    : <Clock className="w-2.5 h-2.5" />}
                  {status.text}
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {factor.reasoning}
              </p>
            </div>
          </div>

          {/* Sources */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-2">
              Sources & Citations
            </span>
            <div className="space-y-1.5">
              {factor.sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50
                    hover:bg-purple-50 border border-slate-200 hover:border-purple-200
                    transition-colors text-xs font-semibold text-slate-700 group"
                >
                  <span className="truncate mr-2 group-hover:text-purple-700 transition-colors">
                    {src.title}
                    <span className="text-slate-400 font-normal ml-1">— {src.publisher}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-500 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
            <p className="text-[11px] text-slate-500 font-medium leading-snug">
              <strong className="text-slate-600">Real Talk:</strong> Pure satire for the laughs. Orwell dropped classics back in the day but I built this game for fun. No cap just jokes!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
