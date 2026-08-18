import { DissLabel, BingoSquareState, Movement } from '../types';
import { MASTER_LABELS, DEFAULT_25_LABEL_IDS } from '../data/labels';

/* ── Fisher-Yates shuffle ───────────────────────────────────── */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates a default 5×5 board using the curated 25 labels.
 * Returns them in shuffled order.
 */
export function generateDefaultBoard(_movement: Movement): BingoSquareState[] {
  const labelMap = new Map<string, DissLabel>(MASTER_LABELS.map((l) => [l.id, l]));
  const ordered = DEFAULT_25_LABEL_IDS
    .map((id) => labelMap.get(id))
    .filter((l): l is DissLabel => l !== undefined);

  const shuffled = shuffleArray(ordered);

  return shuffled.map((label) => ({
    label,
    marked: false,
    evidence: [],
  }));
}

/**
 * Generates a random 25-label board from the full master database.
 * Tries to pick at least 2 from each category for balance.
 */
export function generateBalancedBoard(_movement: Movement): BingoSquareState[] {
  const categories = ['NATIONALISM', 'FOREIGN', 'EXTREMISM', 'RELIGION', 'MEDIA', 'CLASS'] as const;
  const byCategory = new Map<string, DissLabel[]>();

  for (const cat of categories) {
    byCategory.set(cat, shuffleArray(MASTER_LABELS.filter((l) => l.category === cat)));
  }

  const selected: DissLabel[] = [];

  // Take 2 from each of 6 categories = 12
  for (const cat of categories) {
    const bucket = byCategory.get(cat) || [];
    selected.push(...bucket.slice(0, 2));
  }

  // Fill remaining 13 from the rest (shuffled master, excluding already selected)
  const selectedIds = new Set(selected.map((l) => l.id));
  const remaining = shuffleArray(MASTER_LABELS.filter((l) => !selectedIds.has(l.id)));
  selected.push(...remaining.slice(0, 25 - selected.length));

  const final25 = shuffleArray(selected).slice(0, 25);

  return final25.map((label) => ({
    label,
    marked: false,
    evidence: [],
  }));
}

export const WINNING_LINES = [
  // Rows
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  // Cols
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  // Diagonals
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

export function checkIsBingo(squares: BingoSquareState[]): boolean {
  if (!squares || squares.length < 25) return false;
  const markedCount = squares.filter((s) => s.marked).length;
  if (markedCount === 25) return true;
  return WINNING_LINES.some((line) => line.every((idx) => squares[idx]?.marked));
}
