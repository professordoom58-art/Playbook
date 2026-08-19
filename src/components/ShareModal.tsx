import React, { useState, useEffect } from 'react';
import { BingoSquareState } from '../types';
import { generateShareCardCanvas, downloadPngFromCanvas } from '../utils/canvasShare';
import { checkIsBingo } from '../utils/generator';
import { X, Download, Copy, Share2, Check } from 'lucide-react';

interface ShareModalProps {
  movementName: string;
  squares: BingoSquareState[];
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ movementName, squares, onClose }) => {
  const markedCount   = squares.filter((s) => s.marked).length;
  const evidenceCount = squares.reduce((sum, s) => sum + s.evidence.length, 0);
  const isBingo       = checkIsBingo(squares);

  const [pngTheme, setPngTheme] = useState<'light' | 'dark'>('light');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [copied,   setCopied]   = useState(false);

  // Scorecard stats
  const intensityLevel = markedCount === 0
    ? 'CLEAN BOARD'
    : markedCount <= 5
    ? 'MILD TACTIC USE'
    : markedCount <= 12
    ? 'ELEVATED PLAYBOOK'
    : markedCount <= 20
    ? 'HEAVY TACTIC USE'
    : 'FULL PLAYBOOK CERTIFIED';

  const categoryCounts = squares.reduce((acc, sq) => {
    if (sq.marked) {
      acc[sq.label.category] = (acc[sq.label.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  useEffect(() => {
    // Generate on next tick to avoid blocking render
    const timer = setTimeout(() => {
      const url = generateShareCardCanvas(movementName, squares, markedCount, isBingo, pngTheme === 'dark');
      setImageUrl(url);
    }, 60);
    return () => clearTimeout(timer);
  }, [movementName, squares, markedCount, isBingo, pngTheme]);

  const handleDownload = () =>
    downloadPngFromCanvas(movementName, squares, markedCount, isBingo, pngTheme === 'dark');

  const shareText = isBingo
    ? `🎯 BINGO: 25/25 dissent labels documented for "${movementName}". Full playbook unlocked! Play Playbook Bingo:`
    : `🎯 ${markedCount}/25 dissent labels documented for "${movementName}". How many labels can they fit on one movement? Play Playbook Bingo:`;

  const handleCopyLink = () => {
    const text = `${shareText}\n${window.location.origin}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`${shareText}`);
    const url  = encodeURIComponent(window.location.origin);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${shareText} ${window.location.origin}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content max-w-xl">

        {/* Header */}
        <div className="modal-header-bar p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black
                px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                {isBingo ? '🏆 BINGO' : 'SHARE CARD'}
              </span>
              <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                {markedCount} / 25 labels
              </span>
              {evidenceCount > 0 && (
                <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60
                  border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                  📎 {evidenceCount} link{evidenceCount !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <h3 className="modal-header-title font-display font-black text-xl leading-tight">
              {isBingo ? 'Full playbook unlocked!' : "GOVERNMENT'S PLAYBOOK BINGO"}
            </h3>
            <p className="modal-header-sub text-xs font-bold mt-0.5">
              Agenda: {movementName}
            </p>
          </div>
          <button onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body-area p-3.5 sm:p-5 overflow-y-auto space-y-3 flex-1 text-center flex flex-col justify-between">

          {/* PNG THEME TOGGLE (☀️ vs 🌙) */}
          <div className="modal-selector-box flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex-shrink-0">
            <span className="modal-selector-title text-xs font-black uppercase tracking-wide text-slate-600 dark:text-slate-300">
              Theme:
            </span>
            <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-300/80 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setPngTheme('light')}
                title="Light Theme"
                aria-label="Light Theme"
                className={`px-3 py-1 rounded-md text-sm font-black transition-all ${
                  pngTheme === 'light'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                ☀️
              </button>
              <button
                type="button"
                onClick={() => setPngTheme('dark')}
                title="Dark Theme"
                aria-label="Dark Theme"
                className={`px-3 py-1 rounded-md text-sm font-black transition-all ${
                  pngTheme === 'dark'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                🌙
              </button>
            </div>
          </div>

          {/* Card preview */}
          {imageUrl ? (
            <div className="relative inline-block rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-md max-w-xs mx-auto group my-auto flex-shrink">
              <img
                src={imageUrl}
                alt="Government's Playbook Bingo share card"
                className="w-auto max-h-[35vh] sm:max-h-[44vh] object-contain mx-auto"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={handleDownload} className="btn-primary text-xs py-2 px-4 gap-1.5">
                  <Download className="w-4 h-4" /> Download {pngTheme.toUpperCase()} PNG
                </button>
              </div>
            </div>
          ) : (
            <div className="h-44 sm:h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400 text-sm font-bold gap-2 my-auto">
              <div className="w-8 h-8 border-4 border-slate-300 border-t-purple-500 rounded-full animate-spin" />
              Generating card…
            </div>
          )}

          {/* Action buttons — Single Horizontal Row on Mobile (4 Columns) */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 w-full">
            {/* Download PNG: Amber Yellow */}
            <button
              onClick={handleDownload}
              className="btn-primary text-[10px] sm:text-xs py-2.5 sm:py-3 px-1 flex-col gap-1 w-full justify-center rounded-xl sm:rounded-2xl font-black shadow-[0_3px_0_0_#D97706] active:translate-y-0.5 transition-all"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 flex-shrink-0" />
              <span className="truncate max-w-full">Download</span>
            </button>

            {/* Copy Link: Tactile Slate/White */}
            <button
              onClick={handleCopyLink}
              className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white text-[10px] sm:text-xs py-2.5 sm:py-3 px-1 flex-col gap-1 w-full justify-center rounded-xl sm:rounded-2xl font-black shadow-[0_3px_0_0_#94A3B8] active:translate-y-0.5 transition-all flex items-center"
            >
              {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 dark:text-slate-200 flex-shrink-0" />}
              <span className="truncate max-w-full">{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>

            {/* Share on X: Slate Dark */}
            <button
              onClick={handleTwitterShare}
              className="bg-slate-900 hover:bg-slate-800 border-2 border-slate-950 text-white text-[10px] sm:text-xs py-2.5 sm:py-3 px-1 flex-col gap-1 w-full justify-center rounded-xl sm:rounded-2xl font-black shadow-[0_3px_0_0_#0F172A] active:translate-y-0.5 transition-all flex items-center"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="truncate max-w-full">X</span>
            </button>

            {/* WhatsApp: Emerald Green */}
            <button
              onClick={handleWhatsAppShare}
              className="bg-emerald-500 hover:bg-emerald-400 border-2 border-emerald-600 text-white text-[10px] sm:text-xs py-2.5 sm:py-3 px-1 flex-col gap-1 w-full justify-center rounded-xl sm:rounded-2xl font-black shadow-[0_3px_0_0_#059669] active:translate-y-0.5 transition-all flex items-center"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
              </svg>
              <span className="truncate max-w-full">WhatsApp</span>
            </button>
          </div>

          <p className="modal-caption-text text-[11px] font-semibold">
            Download the 1200×1200 {pngTheme.toUpperCase()} PNG for Instagram & Twitter. The image is
            readable without visiting the site.
          </p>

        </div>
      </div>
    </div>
  );
};
