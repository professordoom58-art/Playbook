import React, { useState } from 'react';
import { BingoSquareState, LabelEvidence } from '../types';
import { LABEL_CATEGORIES } from '../data/labels';
import { X, ExternalLink, Plus, Trash2, Calendar, Check, BookOpen, Target, AlertCircle } from 'lucide-react';

interface LabelDetailModalProps {
  square: BingoSquareState;
  onClose: () => void;
  onToggleMark: () => void;
  onAddEvidence: (evidence: LabelEvidence) => void;
  onRemoveEvidence: (evidenceId: string) => void;
}



const CAT_BADGE_STYLES: Record<string, React.CSSProperties> = {
  NATIONALISM: { background: '#FFF1F2', color: '#BE123C', border: '1.5px solid #FECDD3' },
  FOREIGN:     { background: '#EFF6FF', color: '#1D4ED8', border: '1.5px solid #BFDBFE' },
  EXTREMISM:   { background: '#FFFBEB', color: '#92400E', border: '1.5px solid #FDE68A' },
  RELIGION:    { background: '#FAF5FF', color: '#7E22CE', border: '1.5px solid #E9D5FF' },
  MEDIA:       { background: '#ECFEFF', color: '#0E7490', border: '1.5px solid #A5F3FC' },
  CLASS:       { background: '#F0FDF4', color: '#15803D', border: '1.5px solid #BBF7D0' },
};

export const LabelDetailModal: React.FC<LabelDetailModalProps> = ({
  square,
  onClose,
  onToggleMark,
  onAddEvidence,
  onRemoveEvidence,
}) => {
  const { label, marked, evidence } = square;
  const catInfo = LABEL_CATEGORIES[label.category];
  const badgeStyle = CAT_BADGE_STYLES[label.category] || {};

  const [showAddEvidence, setShowAddEvidence] = useState(false);
  const [evidenceUrl, setEvidenceUrl]       = useState('');
  const [evidenceNote, setEvidenceNote]     = useState('');
  const [evidenceDate, setEvidenceDate]     = useState('');
  const [evidenceSource, setEvidenceSource] = useState('');

  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceUrl.trim() && !evidenceNote.trim()) return;
    onAddEvidence({
      id: `ev-${Date.now()}`,
      url: evidenceUrl.trim() || undefined,
      note: evidenceNote.trim() || undefined,
      date: evidenceDate.trim() || undefined,
      source: evidenceSource.trim() || undefined,
      addedAt: Date.now(),
    });
    setEvidenceUrl('');
    setEvidenceNote('');
    setEvidenceDate('');
    setEvidenceSource('');
    setShowAddEvidence(false);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-content" style={{ maxWidth: '640px' }}>

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 p-5 border-b-2 border-slate-100">
          <div className="flex-1 min-w-0">
            {/* Category row */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span
                style={badgeStyle}
                className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
              >
                {catInfo?.label || label.category}
              </span>
              <span className="text-[9px] font-bold text-slate-400">{label.code}</span>
            </div>

            {/* The label — big */}
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight tracking-tight">
              {label.shortLabel}
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-0.5 italic">
              {label.fullLabel} · {label.country}
            </p>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 flex-shrink-0" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── SCROLLABLE BODY ───────────────────────────────────────── */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4 text-sm">

          {/* Mark / Unmark CTA */}
          <button
            onClick={onToggleMark}
            className={`w-full flex items-center justify-center gap-2 rounded-2xl font-black text-sm
              py-2.5 border-2 transition-all
              ${marked
                ? 'bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100'
                : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-700'
              }`}
          >
            <Check className="w-4 h-4" />
            {marked ? '✓ Marked: click to unmark' : 'Mark as spotted'}
          </button>

          {/* Definition */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">How It's Used</span>
            </div>
            <p className="text-sm text-slate-700 font-medium leading-relaxed bg-purple-50 border border-purple-100 rounded-xl p-3">
              {label.definition}
            </p>
          </div>

          {/* Used Against */}
          {label.usedAgainst.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Target className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-700">Typically Used Against</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {label.usedAgainst.map((target, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-full text-xs font-semibold">
                    {target}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Documented Examples */}
          {label.examples.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Calendar className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Documented Examples</span>
              </div>
              <div className="space-y-2">
                {label.examples.map((example, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3 space-y-1.5">
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">{example.description}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {example.speaker && (
                        <span className="text-[10px] font-semibold text-slate-500">
                          🎤 {example.speaker}
                        </span>
                      )}
                      {example.target && (
                        <span className="text-[10px] font-semibold text-slate-500">
                          → {example.target}
                        </span>
                      )}
                      {example.date && (
                        <span className="text-[10px] font-semibold text-slate-400">
                          📅 {example.date}
                        </span>
                      )}
                      {example.outlet && (
                        <span className="text-[10px] font-semibold text-slate-400">
                          📰 {example.outlet}
                        </span>
                      )}
                      {example.url && (
                        <a href={example.url} target="_blank" rel="noopener noreferrer"
                          className="text-[10px] font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-0.5">
                          <ExternalLink className="w-2.5 h-2.5" /> Source
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {label.note && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 font-medium">{label.note}</p>
            </div>
          )}

          {/* ── YOUR EVIDENCE ──────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Your Evidence ({evidence.length})
              </span>
              {!showAddEvidence && (
                <button
                  onClick={() => setShowAddEvidence(true)}
                  className="flex items-center gap-1 text-[10px] font-black text-purple-700
                    hover:text-purple-900 px-2 py-1 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add link or note
                </button>
              )}
            </div>

            {/* Evidence list */}
            {evidence.length > 0 && (
              <div className="space-y-1.5 mb-2">
                {evidence.map((ev) => (
                  <div key={ev.id}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-start gap-2">
                    <div className="flex-1 min-w-0 space-y-0.5">
                      {ev.url && (
                        <a href={ev.url} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-semibold flex items-center gap-1 truncate">
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{ev.url}</span>
                        </a>
                      )}
                      {ev.note && <p className="text-xs text-slate-700 font-medium">{ev.note}</p>}
                      <div className="flex items-center gap-2">
                        {ev.date && <span className="text-[10px] text-slate-400 font-semibold">📅 {ev.date}</span>}
                        {ev.source && <span className="text-[10px] text-slate-400 font-semibold">📰 {ev.source}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveEvidence(ev.id)}
                      className="p-1 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 flex-shrink-0"
                      aria-label="Remove this entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add evidence form */}
            {showAddEvidence && (
              <form onSubmit={handleAddEvidence} className="space-y-2 bg-slate-50 border-2 border-purple-200 rounded-2xl p-3">
                <p className="text-[10px] font-black text-purple-700 uppercase tracking-wider">
                  Add evidence: link, quote, or notes.
                </p>
                <input
                  type="url"
                  value={evidenceUrl}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                  placeholder="Source URL (article, video, tweet…)"
                  className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-purple-400
                    focus:outline-none text-xs font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={evidenceSource}
                    onChange={(e) => setEvidenceSource(e.target.value)}
                    placeholder="Publication / Speaker"
                    className="px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-purple-400
                      focus:outline-none text-xs font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal"
                  />
                  <input
                    type="text"
                    value={evidenceDate}
                    onChange={(e) => setEvidenceDate(e.target.value)}
                    placeholder="Date (e.g. 2024-03-15)"
                    className="px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-purple-400
                      focus:outline-none text-xs font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>
                <textarea
                  value={evidenceNote}
                  onChange={(e) => setEvidenceNote(e.target.value)}
                  placeholder="What happened? Quote, context, or notes…"
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-purple-400
                    focus:outline-none text-xs font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal resize-none"
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddEvidence(false)} className="btn-secondary text-xs">
                    Cancel
                  </button>
                  <button type="submit" className="btn-purple text-xs">
                    Save Evidence
                  </button>
                </div>
              </form>
            )}

            {evidence.length === 0 && !showAddEvidence && (
              <p className="text-xs text-slate-400 font-medium italic">
                No notes or links added yet.
              </p>
            )}
          </div>

          {/* Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
            <p className="text-[11px] text-slate-500 font-medium leading-snug">
              My name is walter white yo
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
