import { BingoSquareState } from '../types';

/* ═══════════════════════════════════════════════════════════════
   PLAYBOOK BINGO — High-Res Deterministic Social Share Card
   
   Canvas Specifications:
   - Width: 1200 px
   - Height: 1500 px (4:5 Social Media Portrait Ratio)
   - Bingo Grid: 1000 × 1000 px Hero Board (~67% of visual area)
   - Typography: Clean, bold sans-serif (Outfit & Inter)
   - Aesthetic: Modern Game UI + Colorful Poster + Polished Social Graphic
   ═══════════════════════════════════════════════════════════════ */

const CANVAS_W = 1200;
const CANVAS_H = 1500;

/* ── Category Palette (Subtle & Restrained Accents) ─────────── */
const CAT_COLORS: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  NATIONALISM: { bg: '#FFF1F2', text: '#BE123C', border: '#FECDD3', accent: '#F43F5E' },
  FOREIGN:     { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE', accent: '#3B82F6' },
  EXTREMISM:   { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A', accent: '#F59E0B' },
  RELIGION:    { bg: '#FAF5FF', text: '#7E22CE', border: '#E9D5FF', accent: '#A855F7' },
  MEDIA:       { bg: '#ECFEFF', text: '#0E7490', border: '#A5F3FC', accent: '#06B6D4' },
  CLASS:       { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0', accent: '#10B981' },
};

const CAT_SHORT: Record<string, string> = {
  NATIONALISM: 'NAT',
  FOREIGN:     'FRNG',
  EXTREMISM:   'EXTR',
  RELIGION:    'REL',
  MEDIA:       'MED',
  CLASS:       'CLS',
};

/* ── Word Wrap Helper ────────────────────────────────────────── */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const tokens = text.split(/(\s+|-)/);
  const lines: string[] = [];
  let current = '';

  for (const token of tokens) {
    const candidate = current + token;
    if (ctx.measureText(candidate).width > maxWidth && current.trim()) {
      lines.push(current.trim());
      current = token.replace(/^\s+/, '');
    } else {
      current = candidate;
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines.filter(Boolean);
}

/* ── Rounded Rectangle Helper ────────────────────────────────── */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number
) {
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}

/* ── Draw Accent Sparkle Star (✦) ────────────────────────────── */
function drawAccentStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - size);
  ctx.quadraticCurveTo(cx, cy, cx + size, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy + size);
  ctx.quadraticCurveTo(cx, cy, cx - size, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy - size);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Creates the deterministic 1200 × 1500 px Canvas Element.
 */
export function createShareCardCanvasElement(
  cardTitle: string,
  squares: BingoSquareState[],
  markedCount: number,
  isBingo: boolean,
  isDarkMode: boolean = false
): HTMLCanvasElement {

  const canvas = document.createElement('canvas');
  canvas.width  = CANVAS_W;
  canvas.height = CANVAS_H;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  /* ── Color Palette ───────────────────────────────────────────── */
  const colorBg             = isDarkMode ? '#0B0F19' : '#FAF8F5'; // Warm cream in light, navy slate in dark
  const colorOuterBorder    = isDarkMode ? '#1E293B' : '#E2E8F0';
  const colorHeaderBadgeBg  = isDarkMode ? '#1E293B' : '#FFFFFF';
  const colorHeaderBadgeText= isDarkMode ? '#FDE68A' : '#D97706';
  const colorTitle          = isDarkMode ? '#FFFFFF' : '#0F172A';
  const colorSubtitle       = isDarkMode ? '#94A3B8' : '#64748B';
  const colorBoardCardBg    = isDarkMode ? '#0F172A' : '#FFFDF0';
  const colorBoardCardBorder= isDarkMode ? '#1E293B' : '#FDE68A';
  const colorUnmarkedBg     = isDarkMode ? '#1E293B' : '#FFFFFF';
  const colorUnmarkedBorder = isDarkMode ? '#334155' : '#E2E8F0';
  const colorUnmarkedText   = isDarkMode ? '#F8FAFC' : '#0F172A';
  const colorMarkedBg       = isDarkMode ? '#78350F' : '#FEF3C7'; // Warm yellow/amber tint
  const colorMarkedBorder   = isDarkMode ? '#F59E0B' : '#F59E0B'; // Bold amber border
  const colorMarkedText     = isDarkMode ? '#FEF3C7' : '#78350F';
  const colorTaglineBg      = isDarkMode ? '#1E293B' : '#FFFFFF';
  const colorTaglineBorder  = isDarkMode ? '#334155' : '#CBD5E1';
  const colorTaglineText    = isDarkMode ? '#CBD5E1' : '#475569';

  /* ── 1. Base Background Fill ─────────────────────────────────── */
  ctx.fillStyle = colorBg;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  /* ── 1b. Subtle Pattern Background Dots ──────────────────────── */
  ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(15, 23, 42, 0.03)';
  for (let bx = 30; bx < CANVAS_W; bx += 40) {
    for (let by = 30; by < CANVAS_H; by += 40) {
      ctx.beginPath();
      ctx.arc(bx, by, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* ── 2. Top & Bottom Accent Stripes ──────────────────────────── */
  const topGrad = ctx.createLinearGradient(0, 0, CANVAS_W, 0);
  topGrad.addColorStop(0, '#F59E0B');
  topGrad.addColorStop(0.5, '#F43F5E');
  topGrad.addColorStop(1, '#8B5CF6');

  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, CANVAS_W, 8);
  ctx.fillRect(0, CANVAS_H - 8, CANVAS_W, 8);

  /* ── 3. Outer Framing Border ─────────────────────────────────── */
  ctx.strokeStyle = colorOuterBorder;
  ctx.lineWidth = 4;
  ctx.strokeRect(12, 20, CANVAS_W - 24, CANVAS_H - 40);

  /* ── 4. Decorative Corner Accents & Sparks ──────────────────── */
  drawAccentStar(ctx, 45, 45, 10, '#F59E0B');
  drawAccentStar(ctx, CANVAS_W - 45, 45, 10, '#8B5CF6');
  drawAccentStar(ctx, 45, CANVAS_H - 45, 8, '#F43F5E');
  drawAccentStar(ctx, CANVAS_W - 45, CANVAS_H - 45, 8, '#10B981');

  /* ── 5. HEADER SECTION (Y = 20 to 310) ───────────────────────── */
  ctx.textAlign = 'center';

  // A. Top Brand Pill Badge (Y = 48)
  const brandPillW = 320;
  const brandPillH = 30;
  const brandPillX = (CANVAS_W - brandPillW) / 2;
  const brandPillY = 38;

  ctx.fillStyle = colorHeaderBadgeBg;
  ctx.beginPath();
  roundRect(ctx, brandPillX, brandPillY, brandPillW, brandPillH, brandPillH / 2);
  ctx.fill();
  ctx.strokeStyle = isDarkMode ? '#334155' : '#FDE68A';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = colorHeaderBadgeText;
  ctx.font = '800 12px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🎯 PLAYBOOK BINGO  ·  DISSENT TRACKER', CANVAS_W / 2, brandPillY + 19);

  // B. Main Card Title (CJP / User Agenda) (Y = 112)
  const displayTitle = cardTitle.length > 30 ? cardTitle.slice(0, 28) + '…' : cardTitle;
  ctx.fillStyle = colorTitle;
  ctx.font = '900 44px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(displayTitle.toUpperCase(), CANVAS_W / 2, 112);

  // C. Product Subheading (Y = 145)
  ctx.fillStyle = colorSubtitle;
  ctx.font = '800 14px Outfit, sans-serif';
  ctx.fillText("GOVERNMENT'S PLAYBOOK BINGO", CANVAS_W / 2, 142);

  // D. Progress Indicator Bar & Score Metrics (Y = 175 to 290)
  const progressPct = Math.round((markedCount / 25) * 100);
  const scorePts    = markedCount * 100;

  const trackW = 1000;
  const trackH = 16;
  const trackX = (CANVAS_W - trackW) / 2; // 100px
  const trackY = 245;

  // Header stats above track (Y = 228)
  ctx.textAlign = 'left';
  ctx.fillStyle = colorTitle;
  ctx.font = '900 16px Outfit, sans-serif';
  ctx.fillText(`${markedCount} / 25 LABELS DOCUMENTED`, trackX, 228);

  ctx.textAlign = 'right';
  if (isBingo) {
    ctx.fillStyle = '#F59E0B';
    ctx.font = '900 16px Outfit, sans-serif';
    ctx.fillText('🏆 BINGO CERTIFIED (100%)', trackX + trackW, 228);
  } else {
    ctx.fillStyle = colorSubtitle;
    ctx.font = '800 15px Outfit, sans-serif';
    ctx.fillText(`SCORE: ${scorePts} PTS   ·   ${progressPct}%`, trackX + trackW, 228);
  }

  // Progress Bar Track Background
  ctx.fillStyle = isDarkMode ? '#1E293B' : '#E2E8F0';
  ctx.beginPath();
  roundRect(ctx, trackX, trackY, trackW, trackH, trackH / 2);
  ctx.fill();

  // Progress Bar Fill Gradient
  const fillWidth = Math.max(markedCount > 0 ? 20 : 0, (markedCount / 25) * trackW);
  if (fillWidth > 0) {
    const barGrad = ctx.createLinearGradient(trackX, 0, trackX + trackW, 0);
    barGrad.addColorStop(0, '#F59E0B');
    barGrad.addColorStop(0.5, '#F43F5E');
    barGrad.addColorStop(1, '#8B5CF6');

    ctx.fillStyle = barGrad;
    ctx.beginPath();
    roundRect(ctx, trackX, trackY, fillWidth, trackH, trackH / 2);
    ctx.fill();
  }

  /* ── 6. HERO 5×5 BINGO BOARD (Y = 295 to 1345) ─────────────────
     65–75% of visual area = The Bingo Board Grid!
     Board Outer Box: 1040 × 1040 px
     Inner Grid: 1000 × 1000 px, 5 equal columns × 5 equal rows
     ───────────────────────────────────────────────────────────── */
  const BOARD_CARD_W = 1040;
  const BOARD_CARD_H = 1040;
  const BOARD_CARD_X = (CANVAS_W - BOARD_CARD_W) / 2; // 80px
  const BOARD_CARD_Y = 290;

  // Board Outer Frame Card
  ctx.fillStyle = colorBoardCardBg;
  ctx.beginPath();
  roundRect(ctx, BOARD_CARD_X, BOARD_CARD_Y, BOARD_CARD_W, BOARD_CARD_H, 28);
  ctx.fill();
  ctx.strokeStyle = colorBoardCardBorder;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Inner Grid Dimensions
  const GRID_SIZE = 1000;
  const GRID_X    = (CANVAS_W - GRID_SIZE) / 2; // 100px
  const GRID_Y    = 310;
  const GAP       = 12;
  const CELL      = (GRID_SIZE - GAP * 4) / 5; // 190.4 px per cell!

  squares.slice(0, 25).forEach((square, idx) => {
    const col = idx % 5;
    const row = Math.floor(idx / 5);

    const x = GRID_X + col * (CELL + GAP);
    const y = GRID_Y + row * (CELL + GAP);

    // A. Cell Container Box
    ctx.beginPath();
    roundRect(ctx, x, y, CELL, CELL, 14);

    if (square.marked) {
      // Marked Cell: Warm Yellow Tint + Bold Amber Accent Border
      ctx.fillStyle = colorMarkedBg;
      ctx.fill();
      ctx.strokeStyle = colorMarkedBorder;
      ctx.lineWidth = 3.5;
      ctx.stroke();
    } else {
      // Unmarked Cell: Clean White/Dark Fill + Subtle Border
      ctx.fillStyle = colorUnmarkedBg;
      ctx.fill();
      ctx.strokeStyle = colorUnmarkedBorder;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // B. Category Accent Pill (Top Left)
    const catInfo  = CAT_COLORS[square.label.category] ?? { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1', accent: '#64748B' };
    const catShort = CAT_SHORT[square.label.category]  ?? square.label.category.slice(0, 4);

    ctx.font = '800 11px Inter, sans-serif';
    const catBadgeW = ctx.measureText(catShort).width + 12;
    const catBadgeH = 20;
    const catBadgeX = x + 10;
    const catBadgeY = y + 10;

    // Category Pill Fill
    ctx.fillStyle = isDarkMode ? '#1E293B' : catInfo.bg;
    ctx.beginPath();
    roundRect(ctx, catBadgeX, catBadgeY, catBadgeW, catBadgeH, 5);
    ctx.fill();
    ctx.strokeStyle = isDarkMode ? '#334155' : catInfo.border;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Category Pill Text
    ctx.fillStyle = isDarkMode ? '#F1F5F9' : catInfo.text;
    ctx.textAlign = 'left';
    ctx.fillText(catShort, catBadgeX + 6, catBadgeY + 14);

    // C. Checkmark Badge for Marked Cells (Top Right)
    if (square.marked) {
      const checkX = x + CELL - 20;
      const checkY = y + 20;
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(checkX, checkY, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.font = '900 12px sans-serif';
      ctx.fillText('✓', checkX, checkY + 4);
    }

    // D. Clean Label Text (Centered in cell)
    ctx.textAlign = 'center';
    ctx.fillStyle = square.marked ? colorMarkedText : colorUnmarkedText;

    const words = square.label.shortLabel.trim().split(/\s+/);
    const longestWord = Math.max(...words.map((w) => w.length));

    // Dynamic Font Scaling for 190px cell width
    let fontSize = 18;
    if (longestWord >= 11) {
      fontSize = 13.5;
    } else if (longestWord >= 9) {
      fontSize = 15;
    } else if (longestWord >= 7) {
      fontSize = 16.5;
    }

    ctx.font = `900 ${fontSize}px Outfit, sans-serif`;

    const textMaxW     = CELL - 20;
    const wrappedLines = wrapText(ctx, square.label.shortLabel, textMaxW);
    const LINE_H       = fontSize * 1.18;
    const totalTextH   = wrappedLines.length * LINE_H;
    
    // Shift down slightly to account for top category pill
    const textStartY   = y + (CELL / 2) + 6 - (totalTextH / 2) + (LINE_H * 0.72);

    wrappedLines.forEach((line, li) => {
      ctx.fillText(line, x + CELL / 2, textStartY + li * LINE_H);
    });
  });

  /* ── 7. FOOTER SECTION (Y = 1350 to 1480) ─────────────────────── */
  const Y_FOOTER_TAGLINE = 1385;

  // Tagline Capsule Box
  const tagW = 680;
  const tagH = 46;
  const tagX = (CANVAS_W - tagW) / 2;

  ctx.fillStyle = colorTaglineBg;
  ctx.beginPath();
  roundRect(ctx, tagX, Y_FOOTER_TAGLINE, tagW, tagH, tagH / 2);
  ctx.fill();
  ctx.strokeStyle = colorTaglineBorder;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = colorTaglineText;
  ctx.font = '800 15px Outfit, sans-serif';
  const taglineText = isBingo
    ? '🎯 "Full playbook unlocked! How many labels on your movement?"'
    : '"How many labels can they fit on one movement?"';
  ctx.fillText(taglineText, CANVAS_W / 2, Y_FOOTER_TAGLINE + 28);

  // Footer Signature Line
  ctx.fillStyle = isDarkMode ? '#64748B' : '#94A3B8';
  ctx.font = '800 12px Inter, sans-serif';
  ctx.fillText('PLAYBOOK BINGO  ·  SATIRICAL DISSENT VOCABULARY TRACKER', CANVAS_W / 2, 1460);

  return canvas;
}

/* ─────────────────────────────────────────────────────────────
   Public API: Canvas → Preview Data URL
   ───────────────────────────────────────────────────────────── */
export function generateShareCardCanvas(
  cardTitle: string,
  squares: BingoSquareState[],
  markedCount: number,
  isBingo: boolean,
  isDarkMode: boolean = false
): string {
  const canvas = createShareCardCanvasElement(cardTitle, squares, markedCount, isBingo, isDarkMode);
  return canvas.toDataURL('image/png');
}

/* ─────────────────────────────────────────────────────────────
   Public API: Download PNG File
   ───────────────────────────────────────────────────────────── */
export function downloadPngFromCanvas(
  cardTitle: string,
  squares: BingoSquareState[],
  markedCount: number,
  isBingo: boolean,
  isDarkMode: boolean = false
) {
  const canvas = createShareCardCanvasElement(cardTitle, squares, markedCount, isBingo, isDarkMode);

  canvas.toBlob((blob) => {
    if (!blob) {
      console.error('[PlaybookBingo] Failed to create PNG blob from canvas');
      return;
    }
    const slug = cardTitle
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 40);
    const themeTag = isDarkMode ? 'dark' : 'light';
    const fileName = `playbook-bingo-${slug}-${markedCount}of25-${themeTag}.png`;

    const blobUrl = URL.createObjectURL(blob);
    const link    = document.createElement('a');
    link.href     = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
  }, 'image/png');
}
