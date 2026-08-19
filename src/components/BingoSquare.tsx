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
  const shortCat = CAT_SHORT[label.category] || label.category.slice(0, 4);

  const [isBouncing, setIsBouncing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressRef = useRef<boolean>(false);

  const triggerBounce = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 350);
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
    }, 450);
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

  const handleClick = (e: React.MouseEvent) => {
    if (isLongPressRef.current) {
      e.preventDefault();
      e.stopPropagation();
      isLongPressRef.current = false;
      return;
    }
    triggerBounce();
    if (e.detail === 2) {
      onOpenDetail();
    } else {
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

  // Determine typography profile based on word count & character length
  const words = label.shortLabel.trim().split(/\s+/);
  const wordCount = words.length;
  const longestWord = Math.max(...words.map((w) => w.length));
  const isSingleWord = wordCount === 1;

  let fontSize: string;
  let letterSpacing = '-0.02em';
  let lineHeight = '1.04';

  if (isSingleWord) {
    // Single-word labels: ALWAYS 1 line, NEVER split or break words
    if (longestWord >= 11) {
      // 11-12 chars (e.g. PROPAGANDIST, COCKROACHES)
      fontSize = 'clamp(7.8px, 1.85vw + 1.8px, 12.8px)';
      letterSpacing = '-0.038em';
    } else if (longestWord >= 9) {
      // 9-10 chars (e.g. COMMUNIST, EXTREMIST, SEPARATIST, KHALISTANI, SEDITIOUS, ECOSYSTEM)
      fontSize = 'clamp(8.8px, 2.1vw + 2.0px, 14.2px)';
      letterSpacing = '-0.03em';
    } else {
      // <= 8 chars (e.g. MAOIST, APPEASER, JIHADI, NAXAL, FRANDS)
      fontSize = 'clamp(9.5px, 2.3vw + 2.2px, 15.5px)';
      letterSpacing = '-0.02em';
    }
  } else {
    // Multi-word phrases: Max 2 lines balanced, NEVER break inside words
    if (longestWord >= 11) {
      // e.g. MINORITY APPEASEMENT
      fontSize = 'clamp(8.2px, 1.95vw + 2.0px, 13.5px)';
      letterSpacing = '-0.025em';
    } else {
      // e.g. KHAN MARKET GANG, WESTERN STOOGE, CHINESE AGENT, PAKISTAN BACKED
      fontSize = 'clamp(9.2px, 2.2vw + 2.2px, 14.8px)';
      letterSpacing = '-0.02em';
    }
  }

  // Format 3-word phrases like "KHAN MARKET GANG" cleanly into 2 balanced lines
  let displayLabel = label.shortLabel;
  if (wordCount === 3 && words[0].length + words[1].length <= 12) {
    displayLabel = `${words[0]} ${words[1]}\n${words[2]}`;
  }

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
      {/* TOP ROW: Unobtrusive category badge & ID code */}
      <div className="w-full flex items-center justify-between gap-0.5 flex-shrink-0 h-3 sm:h-3.5 px-0.5 overflow-hidden">
        <span
          className={`cat-badge-${label.category} text-[6px] sm:text-[7.5px] font-black uppercase tracking-tight px-1 py-0.5 rounded leading-none truncate max-w-[55%] flex-shrink-0 transition-opacity duration-150 ${
            marked ? 'opacity-100' : 'opacity-0 sm:group-hover:opacity-100'
          }`}
        >
          {shortCat}
        </span>

        <div className="w-3.5 h-3.5 flex items-center justify-end flex-shrink-0">
          {marked ? (
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-xs">
              <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
            </span>
          ) : (
            <span className="text-[6px] sm:text-[7.5px] font-bold text-slate-300 dark:text-slate-500 leading-none opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150">
              {label.code}
            </span>
          )}
        </div>
      </div>

      {/* CENTER: THE LABEL — DOMINANT, USES 93% USABLE CELL WIDTH */}
      <div className="flex-1 flex items-center justify-center w-[93%] max-w-[94%] mx-auto my-0 min-h-0 overflow-hidden">
        <span
          className={`
            font-black uppercase text-center w-full block
            transition-colors duration-150
            ${marked ? 'text-amber-950' : 'text-slate-950'}
          `}
          style={{
            fontSize,
            lineHeight,
            letterSpacing,
            hyphens: 'none',
            WebkitHyphens: 'none',
            wordBreak: 'normal',
            overflowWrap: 'normal',
            whiteSpace: isSingleWord ? 'nowrap' : 'pre-line',
            textWrap: isSingleWord ? 'nowrap' : 'balance',
            WebkitTextWrap: isSingleWord ? 'nowrap' : 'balance',
          } as React.CSSProperties}
        >
          {displayLabel}
        </span>
      </div>

      {/* BOTTOM ROW: Evidence indicator (unobtrusive) */}
      <div className="w-full flex items-end justify-between flex-shrink-0 h-2 sm:h-2.5 px-0.5">
        {hasEvidence ? (
          <span className="text-[7px] font-black text-emerald-600 leading-tight">
            📎 {evidence.length}
          </span>
        ) : (
          <span />
        )}
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
