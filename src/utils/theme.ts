/**
 * PLAYBOOK BINGO — Shared Design Tokens & Theme Layer
 * Single source of truth for existing brand colors and visual identity.
 * Desktop and mobile MUST share these exact values.
 */

export const themeTokens = {
  colors: {
    // ── Backgrounds ──────────────────────────────────────────────
    bgCream: '#FAF7F0',
    bgWhite: '#FFFFFF',
    bgDark: '#0B0F19',
    bgDarkCard: '#131926',
    bgDarkCardSubtle: '#1A2538',

    // ── Primary (Amber / Yellow / Orange) ─────────────────────────
    amber: {
      50: '#FFFDF5',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#78350F',
      950: '#451A03',
    },

    // ── Secondary (Rose / Pink) ──────────────────────────────────
    rose: {
      50: '#FFF1F2',
      100: '#FFE4E6',
      200: '#FECDD3',
      300: '#FCA5A5',
      500: '#F43F5E',
      600: '#E11D48',
      700: '#BE123C',
      800: '#9F1239',
    },

    // ── Tertiary (Purple) ────────────────────────────────────────
    purple: {
      50: '#FAF5FF',
      100: '#F3E8FF',
      200: '#E9D5FF',
      500: '#A855F7',
      600: '#8B5CF6',
      700: '#7E22CE',
      800: '#5B21B6',
      900: '#3B0764',
    },

    // ── Supporting Accents (Emerald / Cyan / Orange) ──────────────
    emerald: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      500: '#10B981',
      600: '#059669',
      700: '#15803D',
      800: '#166534',
    },

    cyan: {
      50: '#ECFEFF',
      100: '#CFFAFE',
      200: '#A5F3FC',
      500: '#06B6D4',
      700: '#0E7490',
    },

    orange: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      500: '#F97316',
      700: '#C2410C',
      800: '#9A3412',
    },

    // ── Neutrals & Text ──────────────────────────────────────────
    slate: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
      950: '#020617',
    },

    // ── Status Color Map (Bingo + Orwell Check) ─────────────────
    status: {
      flagged: {
        bg: '#FFF1F2',
        border: '#FECDD3',
        text: '#BE123C',
        dot: '#F43F5E',
      },
      comingSoon: {
        bg: '#F0FDF4',
        border: '#BBF7D0',
        text: '#15803D',
        dot: '#22C55E',
      },
      insufficient: {
        bg: '#FFFBEB',
        border: '#FDE68A',
        text: '#92400E',
        dot: '#F59E0B',
      },
    },
  },

  // ── Category Accents (Desktop & Mobile Shared) ──────────────────
  categoryAccents: {
    NATIONALISM: { bg: '#FFF1F2', text: '#BE123C', border: '#FECDD3', accent: '#F43F5E' },
    FOREIGN:     { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE', accent: '#3B82F6' },
    EXTREMISM:   { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A', accent: '#F59E0B' },
    RELIGION:    { bg: '#FAF5FF', text: '#7E22CE', border: '#E9D5FF', accent: '#8B5CF6' },
    MEDIA:       { bg: '#ECFEFF', text: '#0E7490', border: '#A5F3FC', accent: '#06B6D4' },
    CLASS:       { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0', accent: '#10B981' },
  },
} as const;
