export const colors = {
  // Core
  white: '#FFFFFF',
  black: '#0A0A0A',
  ink: '#111317',

  // Brand blue
  blue: '#0052FF',
  blueDark: '#0040CC',
  blueTint: '#EAF0FF',

  // Status
  green: '#00C853',
  greenTint: '#E6FAEE',
  amber: '#FFB300',
  amberTint: '#FFF6E0',
  red: '#FF3B30',
  redTint: '#FFEDEB',

  // Score tier colors
  tierBuilding: '#FF3B30',
  tierFair: '#FFB300',
  tierGood: '#6FCF6F',
  tierGreat: '#00C853',
  tierExcellent: '#00B86B',

  // Greys
  gray50: '#FAFAFA',
  gray100: '#F2F3F5',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray900: '#111827',

  border: '#0A0A0A',
  borderLight: '#E5E7EB',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  pill: 999,
};

export const typography = {
  display: { fontSize: 40, fontWeight: '800' as const, letterSpacing: -1 },
  h1: { fontSize: 28, fontWeight: '800' as const, letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: '700' as const, letterSpacing: -0.3 },
  h3: { fontSize: 18, fontWeight: '700' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  bodyBold: { fontSize: 15, fontWeight: '600' as const },
  caption: { fontSize: 13, fontWeight: '500' as const },
  tiny: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 0.5 },
};

export const shadow = {
  card: {
    shadowColor: '#0A0A0A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  flat: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
};

// Score tier helpers
export type ScoreTier = 'Building' | 'Fair' | 'Good' | 'Great' | 'Excellent';

export function getTier(score: number): ScoreTier {
  if (score < 300) return 'Building';
  if (score < 500) return 'Fair';
  if (score < 700) return 'Good';
  if (score < 850) return 'Great';
  return 'Excellent';
}

export function getTierColor(tier: ScoreTier): string {
  switch (tier) {
    case 'Building': return colors.tierBuilding;
    case 'Fair': return colors.tierFair;
    case 'Good': return colors.tierGood;
    case 'Great': return colors.tierGreat;
    case 'Excellent': return colors.tierExcellent;
  }
}
