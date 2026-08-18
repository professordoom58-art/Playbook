import React, { useState, useRef } from 'react';
import { BingoSquareState } from '../types';
import { Check } from 'lucide-react';
import { LABEL_CATEGORIES } from '../data/labels';

interface BingoSquareProps {
  square: BingoSquareState;
  onToggleMark: () => void;
  onOpenDetail: () => void;
  index: number;
}

const CAT_SHORT: Record<string, string> = {
  NATIONALISM: 'NAT',
  FOREIGN:     'FRNG',
  EXTREMISM:   'EXTR',
  RELIGION:    'REL',
  MEDIA:       'MED',
  CLASS:       'CLS',
};

export const BingoSquare: React.FC<BingoSquareProps> = ({
  square,
  onToggleMark,
  onOpenDetail,
  index,
}) => {
  const { label, marked, evidence } = square;
  const hasEvidence = evidence.length > 0;
  const catInfo = LABEL_CATEGORIES[label.category];
  const shortCat = CAT_SHORT[label.category] || label.category.slice(0, 4);

  const [isBouncing, setIsBouncing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressRef = useRef<boolean>(false);

  const triggerBounce = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 450);
    }
  };

  const handleTouchStart = () => {
    isLongPressRef.current = false;
    timerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate?.(40);
        } catch {
          // Ignore vibration API errors on unsupported browsers
        }
      }
      triggerBounce();
      onOpenDetail();
    }, 450); // 450ms long press threshold
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTouchMove = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Right-click or long-press opens detail; left-click toggles mark
  const handleClick = (e: React.MouseEvent) => {
    if (isLongPressRef.current) {
      e.preventDefault();
      e.stopPropagation();
      isLongPressRef.current = false;
      return;
    }
    triggerBounce();
    if (e.detail === 2) {
      // Double-click → open detail modal
      e.preventDefault();
      onOpenDetail();
    } else {
      // Single click → toggle mark
      onToggleMark();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerBounce();
      onToggleMark();
    }
    if (e.key === 'i' || e.key === 'I') {
      triggerBounce();
      onOpenDetail();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchCancel={handleTouchEnd}
      onContextMenu={(e) => { e.preventDefault(); triggerBounce(); onOpenDetail(); }}
      onKeyDown={handleKeyDown}
      title={`${label.shortLabel} — tap/click to mark, long-press or double-click to inspect`}
      className={`bingo-cell group ${marked ? 'is-marked' : ''} ${isBouncing ? 'cell-spring-bounce' : ''}`}
      aria-pressed={marked}
      aria-label={`${label.shortLabel}: ${marked ? 'marked' : 'not marked'}. Press I to inspect.`}
    >
      {/* TOP ROW: category badge + check or code — hidden when idle, visible on hover or when marked */}
      <div className="w-full flex items-center justify-between gap-0.5 flex-shrink-0 min-h-[11px] sm:min-h-[14px]">
        <span
          className={`cat-badge-${label.category} text-[6.5px] sm:text-[7px] font-black uppercase tracking-wide px-0.5 sm:px-1 py-px rounded leading-none truncate max-w-[60%] flex-shrink-0 transition-opacity duration-150 ${
            marked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {shortCat}
        </span>

        {marked ? (
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Check className="w-2 h-2 text-white stroke-[3.5]" />
          </span>
        ) : (
          <span className="text-[6.5px] sm:text-[7px] font-bold text-slate-300 dark:text-slate-500 leading-none flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            {label.code}
          </span>
        )}
      </div>

      {/* CENTER: THE LABEL — dominant element of the cell */}
      <div className="flex-1 flex items-center justify-center w-full px-0.5 overflow-hidden my-0.5 min-h-0">
        <span
          className={`
            font-black uppercase text-center w-full block
            transition-colors duration-150
            ${marked ? 'text-amber-950' : 'text-slate-950'}
          `}
          style={{
            fontSize: 'clamp(9px, 2.5vw, 13.5px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            hyphens: 'none',
            WebkitHyphens: 'none',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          } as React.CSSProperties}
        >
          {label.shortLabel}
        </span>
      </div>

      {/* BOTTOM ROW: evidence indicator + inspect hint */}
      <div className="w-full flex items-end justify-between flex-shrink-0">
        {hasEvidence ? (
          <span className="text-[7px] font-black text-emerald-600 leading-tight">
            📎 {evidence.length}
          </span>
        ) : (
          <span />
        )}
        {/* Inspect hint — only visible on hover */}
        <span
          className="text-[6px] font-bold text-slate-300 group-hover:text-slate-400
            leading-tight transition-colors opacity-0 group-hover:opacity-100"
        >
          ⓘ
        </span>
      </div>

      {/* Marked overlay accent */}
      {marked && (
        <div className="absolute inset-0 rounded-[10px] pointer-events-none border-2 border-amber-400 opacity-50" />
      )}
    </button>
  );
};
