import { BingoSquareState } from '../types';

/* ═══════════════════════════════════════════════════════════════
   SHARE CARD — 1200 px wide, height fitted to content
   
   Architecture:
   - Width: 1200 px
   - Grid: 900 × 900 px square, 25 equal cells
   - Height: computed (header + grid + footer) — no dead space
   - Same function drives ShareModal preview & high-res PNG download
   ═══════════════════════════════════════════════════════════════ */

const SIZE = 1200; // canvas width

/* ── Typography Scale ────────────────────────────────────────── */
const FONT_BRAND    = '700 16px Outfit, sans-serif';
const FONT_TITLE    = '900 30px Outfit, sans-serif';
const FONT_SUBTITLE = '800 14px Outfit, sans-serif';
const FONT_PILL     = '800 15px Outfit, sans-serif';
const FONT_LABEL    = '900 16px Outfit, sans-serif';
const FONT_CAT      = '700 10px Inter, sans-serif';
const FONT_FOOTER   = '600 14px Inter, sans-serif';
const FONT_BRAND_F  = '800 17px Outfit, sans-serif';

/* ── Category Colors ────────────────────────────────────────── */
const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  NATIONALISM: { bg: '#FFF1F2', text: '#BE123C' },
  FOREIGN:     { bg: '#EFF6FF', text: '#1D4ED8' },
  EXTREMISM:   { bg: '#FFFBEB', text: '#92400E' },
  RELIGION:    { bg: '#FAF5FF', text: '#7E22CE' },
  MEDIA:       { bg: '#ECFEFF', text: '#0E7490' },
  CLASS:       { bg: '#F0FDF4', text: '#15803D' },
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

/* ── Rounded Rectangle Polyfill ─────────────────────────────── */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number
) {
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, r);
  } else {
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

/**
 * Renders a 1:1 Square Share Card (1200 × 1200 px).
 */
export function createShareCardCanvasElement(
  cardTitle: string,
  squares: BingoSquareState[],
  markedCount: number,
  isBingo: boolean,
  isDarkMode: boolean = false
): HTMLCanvasElement {

  // Layout constants — compute height from actual content
  const ACCENT_H   = 10;
  const GRID_SIZE  = 900;
  const GRID_Y     = 164; // space for title + subheading + pill + divider
  const FOOTER_PAD = 70;  // space below grid for quote + bottom stripe
  const CANVAS_H   = GRID_Y + GRID_SIZE + FOOTER_PAD;

  const canvas = document.createElement('canvas');
  canvas.width  = SIZE;
  canvas.height = CANVAS_H;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  /* ── Theme Colors ────────────────────────────────────────────── */
  const colorBg             = isDarkMode ? '#0B0F19' : '#FAF7F0';
  const colorBorder         = isDarkMode ? '#334155' : '#0F172A';
  const colorTitle          = isDarkMode ? '#FFFFFF' : '#0F172A';
  const colorSubtitle       = isDarkMode ? '#94A3B8' : '#64748B';
  const colorDivider        = isDarkMode ? '#1E293B' : '#E2E8F0';
  const colorUnmarkedBg     = isDarkMode ? '#131926' : '#FFFFFF';
  const colorUnmarkedBorder = isDarkMode ? '#273046' : '#CBD5E1';
  const colorUnmarkedText   = isDarkMode ? '#E2E8F0' : '#0F172A';
  const colorMarkedBg       = isDarkMode ? '#78350F' : '#FEF3C7';
  const colorMarkedBorder   = isDarkMode ? '#F59E0B' : '#F59E0B';
  const colorMarkedText     = isDarkMode ? '#FEF3C7' : '#78350F';
  const colorFooterText     = isDarkMode ? '#94A3B8' : '#64748B';

  /* ── 1. Background Fill ──────────────────────────────────────── */
  ctx.fillStyle = colorBg;
  ctx.fillRect(0, 0, SIZE, CANVAS_H);

  /* ── 1b. Render Confetti on PNG Canvas if Bingo Achieved ──────── */
  if (isBingo) {
    const confettiColors = ['#F59E0B', '#F43F5E', '#8B5CF6', '#10B981', '#3B82F6', '#EC4899', '#EAB308'];
    for (let i = 0; i < 110; i++) {
      const cx = ((i * 149.3) % (SIZE - 60)) + 30;
      const cy = ((i * 223.7) % (CANVAS_H - 60)) + 30;
      const color = confettiColors[i % confettiColors.length];
      const particleSize = 7 + (i % 9);
      const shape = i % 3;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(((i * 37) * Math.PI) / 180);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.85;

      if (shape === 0) {
        ctx.fillRect(-particleSize / 2, -particleSize / 4, particleSize * 1.4, particleSize * 0.6);
      } else if (shape === 1) {
        ctx.beginPath();
        ctx.arc(0, 0, particleSize / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -particleSize / 2);
        ctx.lineTo(particleSize / 2, 0);
        ctx.lineTo(0, particleSize / 2);
        ctx.lineTo(-particleSize / 2, 0);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1.0;
  }

  /* ── 2. Top Accent Stripe ────────────────────────────────────── */
  ctx.fillStyle = isBingo ? '#F59E0B' : '#8B5CF6';
  ctx.fillRect(0, 0, SIZE, ACCENT_H);

  /* ── 3. Outer Border ─────────────────────────────────────────── */
  ctx.strokeStyle = colorBorder;
  ctx.lineWidth = 6;
  ctx.strokeRect(10, ACCENT_H + 4, SIZE - 20, CANVAS_H - ACCENT_H - 14);

  /* ── 4. Header Section ───────────────────────────────────────── */
  ctx.textAlign = 'center';

  // 1. User Card Title (e.g. "CJP")
  ctx.fillStyle = colorTitle;
  ctx.font = FONT_TITLE;
  const displayTitle = cardTitle.length > 32 ? cardTitle.slice(0, 30) + '…' : cardTitle;
  ctx.fillText(displayTitle.toUpperCase(), SIZE / 2, 52);

  // 2. Subheading directly below user title
  ctx.fillStyle = colorSubtitle;
  ctx.font = '800 13px "Outfit", sans-serif';
  ctx.fillText("GOVERNMENT'S PLAYBOOK BINGO", SIZE / 2, 74);

  // 3. Scorecard Progress Banner & Intensity Badge
  const intensityLevel = markedCount === 0
    ? 'CLEAN'
    : markedCount <= 5
    ? 'MILD'
    : markedCount <= 12
    ? 'ELEVATED'
    : markedCount <= 20
    ? 'HEAVY'
    : 'FULL PLAYBOOK';

  const pillText = isBingo
    ? '🏆 BINGO! AUTOCRACY ACHIEVED 🏆'
    : `SCORE: ${markedCount * 100} PTS (${markedCount}/25 LABELS)`;
  const PILL_W = isBingo ? 640 : 580;
  const PILL_H = 36;
  const pillX  = (SIZE - PILL_W) / 2;
  const pillY  = 94;

  ctx.fillStyle = isBingo ? '#F43F5E' : (isDarkMode ? '#131926' : '#1E293B');
  ctx.beginPath();
  roundRect(ctx, pillX, pillY, PILL_W, PILL_H, PILL_H / 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = isBingo ? '900 16px "Outfit", sans-serif' : FONT_PILL;
  ctx.textAlign = isBingo ? 'center' : 'left';
  ctx.fillText(pillText, isBingo ? SIZE / 2 : pillX + 24, pillY + 24);

  // Intensity Pill Badge on PNG Canvas
  if (!isBingo) {
    const badgeW = 110;
    const badgeH = 26;
    const badgeX = pillX + PILL_W - badgeW - 5;
    const badgeY = pillY + 5;

    ctx.fillStyle = isDarkMode ? '#F59E0B' : '#D97706';
    ctx.beginPath();
    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, badgeH / 2);
    ctx.fill();

    // White text in Light Mode, Black text in Dark Mode!
    ctx.fillStyle = isDarkMode ? '#000000' : '#FFFFFF';
    ctx.font = '900 11px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(intensityLevel, badgeX + badgeW / 2, badgeY + 17);
  }

  // 4. Divider Line
  ctx.strokeStyle = colorDivider;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(60, 148);
  ctx.lineTo(SIZE - 60, 148);
  ctx.stroke();

  /* ── 5. 5×5 Square Grid Section ──────────────────────────────── */
  const GRID_X    = (SIZE - GRID_SIZE) / 2; // 150px
  const GAP       = 8;
  const CELL      = (GRID_SIZE - GAP * 4) / 5; // ~173.6px per cell

  squares.slice(0, 25).forEach((square, idx) => {
    const col = idx % 5;
    const row = Math.floor(idx / 5);

    const x = GRID_X + col * (CELL + GAP);
    const y = GRID_Y + row * (CELL + GAP);

    // Cell Box
    ctx.beginPath();
    roundRect(ctx, x, y, CELL, CELL, 10);
    if (square.marked) {
      ctx.fillStyle = colorMarkedBg;
      ctx.fill();
      ctx.strokeStyle = colorMarkedBorder;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    } else {
      ctx.fillStyle = colorUnmarkedBg;
      ctx.fill();
      ctx.strokeStyle = colorUnmarkedBorder;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Category Badge
    const catInfo  = CAT_COLORS[square.label.category] ?? { bg: '#F1F5F9', text: '#475569' };
    const catShort = CAT_SHORT[square.label.category]  ?? square.label.category.slice(0, 4);

    ctx.font = FONT_CAT;
    const badgeW = ctx.measureText(catShort).width + 12;
    const badgeH = 18;
    const badgeX = x + 6;
    const badgeY = y + 6;

    ctx.fillStyle = isDarkMode ? '#1E293B' : catInfo.bg;
    ctx.beginPath();
    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 4);
    ctx.fill();

    ctx.fillStyle = isDarkMode ? '#F1F5F9' : catInfo.text;
    ctx.textAlign = 'left';
    ctx.fillText(catShort, badgeX + 6, badgeY + badgeH - 4);

    // Checkmark for marked cells
    if (square.marked) {
      const cx = x + CELL - 14;
      const cy = y + 14;
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(cx, cy, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.font = '900 11px sans-serif';
      ctx.fillText('✓', cx, cy + 4);
    }

    // Label Text (Centred in cell)
    ctx.textAlign = 'center';
    ctx.fillStyle = square.marked ? colorMarkedText : colorUnmarkedText;

    const words = square.label.shortLabel.trim().split(/\s+/);
    const longestWord = Math.max(...words.map((w) => w.length));

    let fontSize = 15;
    if (longestWord >= 11) {
      fontSize = 11.5;
    } else if (longestWord >= 9) {
      fontSize = 12.5;
    } else if (longestWord >= 7) {
      fontSize = 13.5;
    }

    ctx.font = `900 ${fontSize}px Outfit, sans-serif`;

    const textMaxW = CELL - 16;
    const wrappedLines = wrapText(ctx, square.label.shortLabel, textMaxW);
    const LINE_H     = fontSize * 1.15;
    const totalTextH = wrappedLines.length * LINE_H;
    const textStartY = y + CELL / 2 - totalTextH / 2 + LINE_H * 0.76;

    wrappedLines.forEach((line, li) => {
      ctx.fillText(line, x + CELL / 2, textStartY + li * LINE_H);
    });
  });

  /* ── 6. Footer Section ───────────────────────────────────────── */
  // Quote sits 32px below grid, bottom stripe flush with canvas bottom
  const Y_FOOTER_QUOTE = GRID_Y + GRID_SIZE + 38;

  // Quote
  ctx.textAlign = 'center';
  ctx.fillStyle = colorFooterText;
  ctx.font = FONT_FOOTER;
  const quoteText = isBingo
    ? '"Full playbook unlocked!"'
    : '"How many labels can they fit on one movement?"';
  ctx.fillText(quoteText, SIZE / 2, Y_FOOTER_QUOTE);

  // Bottom Accent Stripe
  ctx.fillStyle = isBingo ? '#F59E0B' : '#8B5CF6';
  ctx.fillRect(0, CANVAS_H - ACCENT_H, SIZE, ACCENT_H);

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
