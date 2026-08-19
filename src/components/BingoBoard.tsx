import React, { useState, useEffect, useRef } from 'react';
import { BingoSquareState, Movement, LabelEvidence } from '../types';
import { BingoSquare } from './BingoSquare';
import { LabelDetailModal } from './LabelDetailModal';
import { WINNING_LINES, checkIsBingo } from '../utils/generator';
import { Shuffle, RotateCcw, Share2, Trophy, Edit2, X } from 'lucide-react';
import { useIsMobile } from '../utils/useIsMobile';
import confetti from 'canvas-confetti';

interface BingoBoardProps {
  movement: Movement;
  board: BingoSquareState[];
  onToggleSquare: (labelId: string) => void;
  onShuffleBoard: () => void;
  onResetMarkings: () => void;
  onOpenShareModal: () => void;
  onRenameMovement: (name: string) => void;
  onAddEvidence: (labelId: string, evidence: LabelEvidence) => void;
  onRemoveEvidence: (labelId: string, evidenceId: string) => void;
  isDarkMode?: boolean;
}

export const BingoBoard: React.FC<BingoBoardProps> = ({
  movement,
  board,
  onToggleSquare,
  onShuffleBoard,
  onResetMarkings,
  onOpenShareModal,
  onRenameMovement,
  onAddEvidence,
  onRemoveEvidence,
  isDarkMode = false,
}) => {
  const isMobile      = useIsMobile(767);
  const markedCount   = board.filter((s) => s.marked).length;
  const evidenceCount = board.reduce((sum, s) => sum + s.evidence.length, 0);

  const completedLinesCount = WINNING_LINES.filter((line) =>
    line.every((idx) => board[idx]?.marked)
  ).length;

  const isBingo            = completedLinesCount > 0 || markedCount === 25;
  const prevLinesCountRef  = useRef(0);
  const prevBingoRef       = useRef(false);
  const isInitialMount     = useRef(true);
  const pct                = Math.round((markedCount / 25) * 100);

  const [showRenameModal, setShowRenameModal]     = useState(false);
  const [showBingoModal, setShowBingoModal]       = useState(false);
  const [renameValue, setRenameValue]             = useState(movement.name);
  const [detailSquare, setDetailSquare]           = useState<BingoSquareState | null>(null);

  // Confetti & victory popup when line completed or bingo transition occurs
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevLinesCountRef.current = completedLinesCount;
      prevBingoRef.current = isBingo;
      return;
    }

    if (completedLinesCount > prevLinesCountRef.current || (isBingo && !prevBingoRef.current)) {
      setShowBingoModal(true);
      try {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 70,
          origin: { x: 0.1, y: 0.5 },
          colors: ['#F59E0B', '#F43F5E', '#8B5CF6', '#10B981', '#3B82F6'],
        });
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 70,
          origin: { x: 0.9, y: 0.5 },
          colors: ['#F59E0B', '#F43F5E', '#8B5CF6', '#10B981', '#3B82F6'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 100,
            origin: { x: 0.5, y: 0.4 },
            colors: ['#F59E0B', '#EC4899', '#8B5CF6', '#10B981'],
          });
        }, 200);
      } catch {}
    }

    prevLinesCountRef.current = completedLinesCount;
    prevBingoRef.current = isBingo;
  }, [completedLinesCount, isBingo]);

  useEffect(() => { setRenameValue(movement.name); }, [movement.name]);

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (renameValue.trim()) {
      onRenameMovement(renameValue.trim());
      setShowRenameModal(false);
    }
  };

  return (
    <div className="bingo-section">

      {isMobile ? (
        /* ═══════════════════════════════════════════════════════════════
           MOBILE LAYOUT — Clean, intentional hierarchy (Single Instance)
           ═══════════════════════════════════════════════════════════════ */
        <div className="flex flex-col items-center w-full max-w-md mx-auto gap-2.5 py-1">

          {/* 1. CENTERED HEADING */}
          <div className="w-full text-center px-2">
            <h2
              className="font-display font-black text-xs sm:text-sm tracking-widest uppercase leading-tight select-none"
              style={{ color: '#FFFFFF', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
            >
              GOVERNMENT'S PLAYBOOK BINGO
            </h2>
          </div>

          {/* 2. PROGRESS BAR DIRECTLY BELOW TITLE */}
          <div className="w-full flex flex-col items-center gap-1 px-1">
            <div className="w-full flex items-center justify-between text-[10px] font-black tracking-wider uppercase px-0.5">
              <span className="font-black drop-shadow-sm" style={{ color: isDarkMode ? '#CBD5E1' : '#FFFFFF' }}>
                PROGRESS
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[9px] font-black transition-colors ${
                  isBingo ? 'bg-amber-400 text-slate-950 border border-amber-500 shadow-sm' : ''
                }`}
                style={!isBingo ? {
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  color: isDarkMode ? '#E2E8F0' : '#0F172A',
                  border: isDarkMode ? '2px solid #334155' : '2px solid #E2E8F0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                } : undefined}
              >
                {markedCount} / 25 LABELS
              </span>
            </div>
            <div
              className="w-full h-2.5 rounded-full overflow-hidden shadow-inner transition-colors"
              style={{
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                border: isDarkMode ? '2px solid #334155' : '2px solid #E2E8F0',
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 transition-all duration-300 rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* 3. SEPARATE FIXED-SIZE AGENDA & SCORECARD PILLS FOR MOBILE (Zero Overflow) */}
          <div className="w-full flex items-center gap-1.5 max-w-full">
            {/* LEFT PILL: FIXED AGENDA TITLE & RENAME */}
            <div
              className="flex-1 min-w-0 h-[40px] flex flex-col justify-center px-2 rounded-xl border-2 shadow-sm transition-colors"
              style={{
                backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                borderColor: isDarkMode ? '#1E293B' : '#E2E8F0',
              }}
            >
              <div className="flex items-center gap-1">
                <span
                  className="text-[8px] font-black uppercase tracking-wider block leading-none"
                  style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
                >
                  AGENDA
                </span>
                <button
                  onClick={() => setShowRenameModal(true)}
                  title="Edit card title"
                  className="p-0.5 rounded transition-colors text-slate-400 hover:text-purple-600 flex-shrink-0"
                  aria-label="Edit card title"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
              <h3
                className="font-display font-black text-xs leading-tight truncate mt-0.5"
                style={{ color: isDarkMode ? '#FFFFFF' : '#0F172A' }}
                title={movement.name}
              >
                {movement.name}
              </h3>
            </div>

            {/* RIGHT PILL: CLEAN & SPACIOUS SCORECARD METRICS */}
            <div
              className="flex-shrink-0 h-[40px] flex items-center gap-1.5 px-2 rounded-xl border-2 shadow-sm transition-colors"
              style={{
                backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                borderColor: isDarkMode ? '#1E293B' : '#E2E8F0',
              }}
            >
              <div className="scorecard-metric-box border px-2 py-0.5 rounded-lg text-center flex flex-col items-center justify-center h-[30px] min-w-[42px]">
                <span className="scorecard-num text-[11px] font-black block leading-none">
                  {markedCount * 100}
                </span>
                <span className="scorecard-label text-[7px] font-extrabold uppercase block leading-none mt-0.5">
                  PTS
                </span>
              </div>

              <div className="scorecard-metric-box border px-2 py-0.5 rounded-lg text-center flex flex-col items-center justify-center h-[30px] min-w-[48px]">
                <span className="scorecard-num-purple text-[11px] font-black block leading-none">
                  {isBingo ? 'BINGO' : `${pct}%`}
                </span>
                <span className="scorecard-label text-[7px] font-extrabold uppercase block leading-none mt-0.5">
                  PROG
                </span>
              </div>
            </div>
          </div>

          {/* 4. 5×5 BINGO BOARD */}
          <div className="bingo-board-card w-full">
            <div className="bingo-grid-wrapper">
              {board.slice(0, 25).map((square, idx) => (
                <BingoSquare
                  key={square.label.id}
                  square={square}
                  index={idx}
                  onToggleMark={() => onToggleSquare(square.label.id)}
                  onOpenDetail={() => setDetailSquare(square)}
                />
              ))}
            </div>
          </div>

          {/* 5. REWORKED MOBILE ACTION CONTROLS */}
          <div className="w-full flex flex-col gap-2 pt-1">
            <div className="grid grid-cols-2 gap-2 w-full">
              <button onClick={onShuffleBoard} className="btn-secondary w-full justify-center gap-1.5 py-2.5 px-3" title="Shuffle — new random 25 labels">
                <Shuffle className="w-4 h-4 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                <span className="text-xs font-extrabold tracking-wide">SHUFFLE</span>
              </button>
              <button onClick={onResetMarkings} className="btn-secondary w-full justify-center gap-1.5 py-2.5 px-3" title="Clear all marks">
                <RotateCcw className="w-4 h-4 text-rose-500 dark:text-rose-400 flex-shrink-0" />
                <span className="text-xs font-extrabold tracking-wide">CLEAR</span>
              </button>
            </div>

            <button onClick={onOpenShareModal} className="btn-primary w-full justify-center gap-2 py-3 px-4 text-sm font-black rounded-xl shadow-md" title="Share card">
              <Share2 className="w-4 h-4 flex-shrink-0" />
              <span className="tracking-wide">SHARE CARD</span>
              {markedCount > 0 && (
                <span className="share-badge-count bg-slate-950 text-white text-[10px] w-5 h-5 rounded-full font-black flex items-center justify-center border border-amber-300/40 shadow-xs leading-none ml-1">
                  {markedCount}
                </span>
              )}
            </button>
          </div>

        </div>
      ) : (
        /* ═══════════════════════════════════════════════════════════════
           DESKTOP LAYOUT — 100% Unchanged Desktop View
           ═══════════════════════════════════════════════════════════════ */
        <div className="bingo-layout-wrapper">

        {/* ── LEFT SIDEBAR (METER + VERTICAL TITLE) ────────────────── */}
        <div className="bingo-left-sidebar">
          {/* Vertical text */}
          <div className="bingo-vertical-title" style={{ color: '#FFFFFF', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
            GOVERNMENT'S PLAYBOOK BINGO
          </div>

          {/* Vertical meter */}
          <div className="bingo-vertical-meter">
            <div className={`meter-badge ${isBingo ? 'bg-amber-400 text-slate-950 border-amber-500 font-black' : ''}`}>
              {markedCount} / 25
            </div>
            <div className="vertical-progress-track">
              <div
                className="vertical-progress-fill"
                style={{
                  height: `${pct}%`,
                  minHeight: markedCount > 0 ? '8px' : '0px',
                  '--pct': `${pct}%`,
                } as React.CSSProperties}
              />
            </div>
          </div>
        </div>

        {/* ── CENTER BINGO GRID CARD ────────────────────────────────── */}
        <div className="bingo-board-card">
          <div className="bingo-grid-wrapper">
            {board.slice(0, 25).map((square, idx) => (
              <BingoSquare
                key={square.label.id}
                square={square}
                index={idx}
                onToggleMark={() => onToggleSquare(square.label.id)}
                onOpenDetail={() => setDetailSquare(square)}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT SIDEBAR (ACTIONS & TITLE) ───────────────────────── */}
        <div className="bingo-right-sidebar">

          {/* Card title & rename */}
          <div className="w-full flex flex-col items-center gap-1">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center w-full">
              NAME OF YOUR AGENDA
            </span>
            <div className="right-sidebar-header flex items-center justify-between w-full">
              <h2 className="font-display font-black text-slate-900 text-xs text-center leading-tight truncate flex-1" title={movement.name}>
                {movement.name}
              </h2>
              <button
                onClick={() => setShowRenameModal(true)}
                title="Set card title"
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-purple-600 transition-colors flex-shrink-0"
                aria-label="Edit card title"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* SCORECARD WIDGET */}
          <div className="scorecard-widget w-full border-1.5 rounded-xl p-2 flex flex-col gap-1 shadow-sm transition-colors justify-between">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
              <span className="scorecard-title text-[9px] font-black uppercase tracking-wider">
                SCORECARD
              </span>
              <span className="bg-amber-500 dark:bg-amber-400 text-white dark:text-slate-950 border border-amber-600 dark:border-amber-500 text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
                {markedCount === 0
                  ? 'CLEAN'
                  : markedCount <= 5
                  ? 'MILD'
                  : markedCount <= 12
                  ? 'ELEVATED'
                  : markedCount <= 20
                  ? 'HEAVY'
                  : 'FULL PLAYBOOK'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1 text-center">
              <div className="scorecard-metric-box border p-1 rounded-lg flex flex-col items-center justify-center">
                <span className="scorecard-num text-xs font-black block leading-tight truncate w-full">
                  {markedCount * 100}
                </span>
                <span className="scorecard-label text-[7.5px] font-extrabold uppercase block tracking-wider truncate w-full">
                  Score
                </span>
              </div>

              <div className="scorecard-metric-box border p-1 rounded-lg flex flex-col items-center justify-center">
                <span className="scorecard-num-purple text-xs font-black block leading-tight truncate w-full">
                  {isBingo ? 'BINGO' : `${pct}%`}
                </span>
                <span className="scorecard-label text-[7.5px] font-extrabold uppercase block tracking-wider truncate w-full">
                  Progress
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons — stacked column on desktop */}
          <div className="flex flex-col gap-2 w-full mt-auto">
            <button onClick={onShuffleBoard} className="btn-secondary w-full justify-center gap-1.5 py-2 px-2" title="Shuffle — new random 25 labels">
              <Shuffle className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400 flex-shrink-0" />
              <span className="text-xs font-bold truncate">Shuffle</span>
            </button>
            <button onClick={onResetMarkings} className="btn-secondary w-full justify-center gap-1.5 py-2 px-2" title="Clear all marks">
              <RotateCcw className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 flex-shrink-0" />
              <span className="text-xs font-bold truncate">Clear</span>
            </button>
            <button onClick={onOpenShareModal} className="btn-primary w-full justify-center gap-1.5 py-2.5 px-2" title="Share card">
              <Share2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-xs font-black truncate">Share</span>
            </button>
          </div>
        </div>
      </div>
    )}

      {/* Helper instruction caption */}
      <div className="text-[11px] font-bold text-slate-400 mt-1 text-center select-none">
        {isMobile
          ? '💡 Tip: Tap square to mark · Long-press for details'
          : '💡 Tip: Click square to mark · Double-click for details'}
      </div>

      {/* ── RENAME MODAL ────────────────────────────────────────── */}
      {showRenameModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowRenameModal(false); }}>
          <div className="modal-content max-w-md">
            <div className="p-5 border-b-2 border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-display font-black text-lg text-slate-900 dark:text-white">Set Card Title</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Name of your agenda
                </p>
              </div>
              <button onClick={() => setShowRenameModal(false)} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleRenameSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  NAME OF YOUR AGENDA
                </label>
                <input
                  type="text"
                  required
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  placeholder="e.g. Farmers' Protest 2020-21"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700
                    focus:border-amber-500 focus:outline-none font-bold text-slate-800 dark:text-slate-100 text-sm
                    bg-white dark:bg-slate-800 placeholder:text-slate-400 placeholder:font-normal"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowRenameModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Title</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── LABEL DETAIL MODAL ──────────────────────────────────── */}
      {detailSquare && (
        <LabelDetailModal
          square={detailSquare}
          onClose={() => setDetailSquare(null)}
          onToggleMark={() => {
            onToggleSquare(detailSquare.label.id);
            // Update the local detailSquare reference
            setDetailSquare((prev) => prev ? { ...prev, marked: !prev.marked } : null);
          }}
          onAddEvidence={(ev) => {
            onAddEvidence(detailSquare.label.id, ev);
            setDetailSquare((prev) => prev ? { ...prev, evidence: [...prev.evidence, ev] } : null);
          }}
          onRemoveEvidence={(evId) => {
            onRemoveEvidence(detailSquare.label.id, evId);
            setDetailSquare((prev) => prev ? {
              ...prev,
              evidence: prev.evidence.filter((e) => e.id !== evId),
            } : null);
          }}
        />
      )}

      {/* ── BINGO VICTORY POPUP MODAL ────────────────────────────── */}
      {showBingoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => { if (e.target === e.currentTarget) setShowBingoModal(false); }}
        >
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-400 dark:border-amber-500 shadow-2xl p-6 overflow-hidden text-center animate-in zoom-in-95 duration-200">
            
            {/* Background Glow */}
            <div className="absolute -top-20 -left-20 w-44 h-44 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={() => setShowBingoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close victory popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Trophy Badge Container */}
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-0.5 shadow-lg flex items-center justify-center animate-bounce">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Trophy className="w-8 h-8 text-amber-500" />
              </div>
            </div>

            {/* Sub-badge */}
            <span className="inline-flex items-center gap-1.5 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              🏆 BINGO! AUTOCRACY ACHIEVED
            </span>

            {/* Main Title */}
            <h3 className="font-display font-black text-2xl tracking-tight text-slate-900 dark:text-white leading-tight mb-2">
              PLAYBOOK COMPLETE!
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              I have achieved <span className="font-extrabold text-rose-600 dark:text-rose-400">{markedCount}/25</span> labels for <span className="font-extrabold text-purple-600 dark:text-purple-400">"{movement.name}"</span>,<br />
              it's time for an international trip! ✈️
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-2.5 text-center">
                <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-0.5">
                  TOTAL SCORE
                </span>
                <span className="font-display font-black text-lg text-amber-600 dark:text-amber-400">
                  {markedCount * 100} PTS
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-2.5 text-center">
                <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-0.5">
                  LABELS MATCHED
                </span>
                <span className="font-display font-black text-lg text-rose-600 dark:text-rose-400">
                  {markedCount} / 25
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowBingoModal(false);
                  onOpenShareModal();
                }}
                className="btn-primary w-full justify-center py-3 px-4 text-xs font-black rounded-xl shadow-lg gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>SHARE VICTORY CARD</span>
              </button>

              <button
                onClick={() => setShowBingoModal(false)}
                className="btn-secondary w-full justify-center py-2 px-4 text-xs font-bold rounded-xl"
              >
                Keep Playing
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
