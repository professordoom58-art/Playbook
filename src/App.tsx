import React, { useState, useEffect, useRef } from 'react';
import { Movement, BingoSquareState, LabelEvidence } from './types';
import { PRESET_MOVEMENTS } from './data/movements';
import { MASTER_LABELS } from './data/labels';
import { generateDefaultBoard, generateBalancedBoard, shuffleArray } from './utils/generator';
import {
  saveBoardState, loadBoardState,
  saveCurrentMovement, loadCurrentMovement,
  loadCustomMovements,
} from './utils/localStorage';

import { Header }           from './components/Header';
import { LandingPage }      from './components/LandingPage';
import { BingoBoard }       from './components/BingoBoard';
import { OrwellPanel }      from './components/OrwellPanel';
import { ShareModal }       from './components/ShareModal';
import { HowItWorksModal }  from './components/HowItWorksModal';
import { MethodologyModal } from './components/MethodologyModal';
import { DramaticOverlay }  from './components/DramaticOverlay';

const MICROCOPIES = [
  'Seen this one before.',
  'Classic.',
  'Another square.',
  'Three more.',
  'They\'ve got a name for you.',
  'That\'s familiar.',
  'The playbook in action.',
  'Called it.',
  'Spot the labels & play along.',
  'Bro got another one.',
];

export function App() {
  const [currentView,       setCurrentView]       = useState<'LANDING' | 'GAME'>('LANDING');
  const [currentMovement,   setCurrentMovement]   = useState<Movement>(PRESET_MOVEMENTS[0]);
  const [board,             setBoard]             = useState<BingoSquareState[]>([]);
  const [toastMessage,      setToastMessage]      = useState<string | null>(null);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isDarkMode,        setIsDarkMode]        = useState(false);
  const [isDramatic,        setIsDramatic]        = useState(false);

  const [showShareModal,        setShowShareModal]       = useState(false);
  const [showHowItWorksModal,   setShowHowItWorksModal]  = useState(false);
  const [showMethodologyModal,  setShowMethodologyModal] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  /* ── Init from localStorage ────────────────────────────────── */
  useEffect(() => {
    loadCustomMovements();
    const activeMov = loadCurrentMovement() || PRESET_MOVEMENTS[0];
    setCurrentMovement(activeMov);

    const labelMap = new Map(MASTER_LABELS.map((l) => [l.id, l]));
    const saved = loadBoardState(activeMov.id);
    
    const validSaved = saved && Array.isArray(saved) && saved.length === 25 
      && saved.every(s => s.label && labelMap.has(s.label.id));

    if (validSaved) {
      // Re-map saved tiles against current MASTER_LABELS definitions so label changes (like ANDOLAN-JEEVI) update instantly
      const refreshed = saved.map((s) => ({
        ...s,
        label: labelMap.get(s.label.id) || s.label,
      }));
      setBoard(refreshed);
      saveBoardState(activeMov.id, refreshed);
    } else {
      const nb = generateDefaultBoard(activeMov);
      setBoard(nb);
      saveBoardState(activeMov.id, nb);
    }
  }, []);

  /* ── Rename movement ───────────────────────────────────────── */
  const handleRenameMovement = (name: string) => {
    const updated: Movement = { ...currentMovement, name };
    setCurrentMovement(updated);
    saveCurrentMovement(updated);
  };

  /* ── Toggle square mark ─────────────────────────────────────── */
  const handleToggleSquare = (labelId: string) => {
    let wasMarked = false;
    const updated = board.map((s) => {
      if (s.label.id === labelId) {
        wasMarked = s.marked;
        return { ...s, marked: !s.marked, markedAt: !s.marked ? Date.now() : undefined };
      }
      return s;
    });
    setBoard(updated);
    saveBoardState(currentMovement.id, updated);

    if (!wasMarked) {
      const msg = MICROCOPIES[Math.floor(Math.random() * MICROCOPIES.length)];
      setToastMessage(msg);
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => setToastMessage(null), 2800);
    }
  };

  /* ── Add evidence to a square ──────────────────────────────── */
  const handleAddEvidence = (labelId: string, evidence: LabelEvidence) => {
    const updated = board.map((s) => {
      if (s.label.id === labelId) {
        return { ...s, evidence: [...s.evidence, evidence] };
      }
      return s;
    });
    setBoard(updated);
    saveBoardState(currentMovement.id, updated);
  };

  /* ── Remove evidence from a square ────────────────────────── */
  const handleRemoveEvidence = (labelId: string, evidenceId: string) => {
    const updated = board.map((s) => {
      if (s.label.id === labelId) {
        return { ...s, evidence: s.evidence.filter((e) => e.id !== evidenceId) };
      }
      return s;
    });
    setBoard(updated);
    saveBoardState(currentMovement.id, updated);
  };

  /* ── Shuffle board (new 25 from master pool) ───────────────── */
  const handleShuffleBoard = () => {
    const newBoard = generateBalancedBoard(currentMovement);
    setBoard(newBoard);
    saveBoardState(currentMovement.id, newBoard);
  };

  /* ── Clear all marks ───────────────────────────────────────── */
  const handleResetMarkings = () => {
    const reset = board.map((s) => ({
      ...s,
      marked: false,
      markedAt: undefined,
    }));
    setBoard(reset);
    saveBoardState(currentMovement.id, reset);
  };

  const markedCount = board.filter((s) => s.marked).length;

  /* ── LANDING PAGE ─────────────────────────────────────────── */
  if (currentView === 'LANDING') {
    return (
      <>
        <DramaticOverlay active={isDramatic} />
        <LandingPage
          onPlayBingo={() => setCurrentView('GAME')}
          onOpenMethodology={() => setShowMethodologyModal(true)}
          onOpenHowItWorks={() => setShowHowItWorksModal(true)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          isDramatic={isDramatic}
          onToggleDramatic={() => setIsDramatic(!isDramatic)}
        />
        {showMethodologyModal && <MethodologyModal onClose={() => setShowMethodologyModal(false)} />}
        {showHowItWorksModal  && <HowItWorksModal  onClose={() => setShowHowItWorksModal(false)} />}
      </>
    );
  }

  /* ── GAME PAGE ────────────────────────────────────────────── */
  return (
    <div className="game-root">
      <DramaticOverlay active={isDramatic} />

      <Header
        currentView={currentView}
        onNavigateView={(v) => setCurrentView(v)}
        onOpenHowItWorks={() => setShowHowItWorksModal(true)}
        onOpenMethodology={() => setShowMethodologyModal(true)}
        onOpenShare={() => setShowShareModal(true)}
        markedCount={markedCount}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isDramatic={isDramatic}
        onToggleDramatic={() => setIsDramatic(!isDramatic)}
      />

      <div className="game-main">

        {/* LEFT 65%: Bingo */}
        <BingoBoard
          movement={currentMovement}
          board={board}
          onToggleSquare={handleToggleSquare}
          onShuffleBoard={handleShuffleBoard}
          onResetMarkings={handleResetMarkings}
          onOpenShareModal={() => setShowShareModal(true)}
          onRenameMovement={handleRenameMovement}
          onAddEvidence={handleAddEvidence}
          onRemoveEvidence={handleRemoveEvidence}
          isDarkMode={isDarkMode}
        />

        {/* RIGHT 35%: Orwell Check */}
        <OrwellPanel onOpenMethodology={() => setShowMethodologyModal(true)} />

      </div>

      {/* Satirical toast */}
      {toastMessage && (
        <div className="toast fixed bottom-6 left-1/2 z-40 pointer-events-none
          bg-slate-900 text-amber-300 font-black text-xs px-5 py-2.5
          rounded-full shadow-xl border-2 border-slate-700 whitespace-nowrap
          flex items-center gap-2">
          🎯 {toastMessage}
        </div>
      )}

      {showShareModal       && <ShareModal      movementName={currentMovement.name} squares={board} onClose={() => setShowShareModal(false)} />}
      {showHowItWorksModal  && <HowItWorksModal onClose={() => setShowHowItWorksModal(false)} />}
      {showMethodologyModal && <MethodologyModal onClose={() => setShowMethodologyModal(false)} />}

    </div>
  );
}
