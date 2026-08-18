/* ── Label categories ──────────────────────────────────────────── */
export type LabelCategory =
  | 'NATIONALISM'
  | 'FOREIGN'
  | 'EXTREMISM'
  | 'RELIGION'
  | 'MEDIA'
  | 'CLASS';

/* ═══════════════════════════════════════════════════════════════
   ORWELL PANEL TYPES (unchanged from original)
   ═══════════════════════════════════════════════════════════════ */
export type OrwellStatus = 'FLAGGED' | 'NOT_FLAGGED' | 'INSUFFICIENT_EVIDENCE';

export interface OrwellSource {
  title: string;
  publisher: string;
  url: string;
  date?: string;
}

export interface OrwellFactor {
  id: number;
  numberCode: string;
  title: string;
  plainMeaning: string;
  orwellSource: string;
  orwellText: string;
  lookForIndicators: string[];
  status: OrwellStatus;
  reasoning: string;
  evidenceDate: string;
  sources: OrwellSource[];
}

/* ═══════════════════════════════════════════════════════════════
   LEGACY TACTIC TYPES (kept so tactics.ts continues to compile)
   Not used by the new game logic.
   ═══════════════════════════════════════════════════════════════ */
export type CategoryType =
  | 'RHETORIC'
  | 'MEDIA'
  | 'LEGAL'
  | 'POLICING'
  | 'SURVEILLANCE'
  | 'ECONOMIC'
  | 'PSYCHOLOGICAL'
  | 'ORGANIZATIONAL'
  | 'POLITICAL'
  | 'INFORMATION';

export interface CategoryInfo {
  name: string;
  label: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  accentColor: string;
  description: string;
}

export interface Tactic {
  id: string;
  code: string;
  title: string;
  category: CategoryType;
  shortDesc: string;
  fullDesc?: string;
  historicalExample?: string;
}


export interface LabelCategoryInfo {
  name: LabelCategory;
  label: string;
  short: string;           // 3-4 char abbreviation for cell badge
  badgeBg: string;         // Tailwind classes
  accentColor: string;
}

/* ── Documented example of the label being used ───────────────── */
export interface LabelExample {
  description: string;
  speaker?: string;        // Who used it
  target?: string;         // Who it was used against
  outlet?: string;         // Publication / channel
  date?: string;
  url?: string;
}

/* ── A dissent label from the master database ─────────────────── */
export interface DissLabel {
  id: string;
  code: string;
  shortLabel: string;      // Display text in cell: "ANTI-NATIONAL"
  fullLabel: string;       // Full form: "Anti-National"
  category: LabelCategory;
  definition: string;      // How the label is deployed, what it implies
  usedAgainst: string[];   // Who gets targeted: ["Students", "Journalists", …]
  examples: LabelExample[];
  country: string;
  note?: string;           // Nuance / caveats
}

/* ── Evidence a user attaches to a marked square ─────────────── */
export interface LabelEvidence {
  id: string;
  url?: string;
  note?: string;
  date?: string;
  source?: string;
  addedAt: number;
}

/* ── One cell on the bingo board ──────────────────────────────── */
export interface BingoSquareState {
  label: DissLabel;
  marked: boolean;
  markedAt?: number;
  evidence: LabelEvidence[];
}

/* ── The movement/group the card is tracking ──────────────────── */
export interface Movement {
  id: string;
  name: string;
  country: string;
  era: string;
  category: string;
  description: string;
}
