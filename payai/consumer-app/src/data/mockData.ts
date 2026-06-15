export const mockUser = {
  fullName: 'Jordan Lee',
  firstName: 'Jordan',
  avatarUrl: null,
  memberSinceDay: 47, // "Day 47" as a customer
  score: 742,
  projectedGain: 8, // if they pay something
  projectedLoss: 12, // if they miss something
  tier: 'Solid' as const,
  welcomeOffer: {
    active: true,
    monthsTotal: 3,
    monthCurrent: 2,
  },
  cardLast4: '4821',
  cardStatus: 'ACTIVE',
};

export type Transaction = {
  id: string;
  merchant: string;
  amount: number;
  type: 'float' | 'repaid' | 'rent';
  scoreImpact: number;
  date: string;
  icon: string;
};

export const mockTransactions: Transaction[] = [
  { id: '1', merchant: 'Woolworths', amount: -42.5, type: 'float', scoreImpact: 0, date: 'Today, 2:14pm', icon: 'cart' },
  { id: '2', merchant: 'Float repaid', amount: 42.5, type: 'repaid', scoreImpact: 8, date: 'Today, 9:00am', icon: 'checkmark-circle' },
  { id: '3', merchant: 'Rent — Parkview Apartments', amount: -480, type: 'rent', scoreImpact: 8, date: 'Yesterday', icon: 'home' },
  { id: '4', merchant: 'JB Hi-Fi', amount: -89.0, type: 'float', scoreImpact: 0, date: '2 days ago', icon: 'cart' },
  { id: '5', merchant: 'Float repaid', amount: 89.0, type: 'repaid', scoreImpact: 12, date: '2 days ago', icon: 'checkmark-circle' },
];

export const mockScoreHistory = [
  { label: 'Jan', score: 500 },
  { label: 'Feb', score: 560 },
  { label: 'Mar', score: 605 },
  { label: 'Apr', score: 668 },
  { label: 'May', score: 700 },
  { label: 'Jun', score: 742 },
];

export const mockScoreEvents = [
  { id: '1', label: 'Float repaid on time', delta: 8, date: 'Today' },
  { id: '2', label: 'Rent paid early', delta: 12, date: 'Yesterday' },
  { id: '3', label: '3-month perfect streak', delta: 75, date: '3 days ago' },
  { id: '4', label: 'Float repaid same day', delta: 15, date: '1 week ago' },
  { id: '5', label: 'ID verification completed', delta: 50, date: '6 weeks ago' },
];

export const mockLoyalty = {
  currentTier: 'Solid' as const,
  streakDays: 47,
  nextTier: 'Trusted' as const,
  progressToNext: 0.62, // 0-1
  perks: {
    Starter: ['Welcome offer: 3 months free floats', 'Standard float limits'],
    Solid: ['Float limit +25%', '1 bonus float per quarter', 'Score boost on streaks'],
    Trusted: ['Float limit +50%', 'Priority approval', '0.5% rate reduction'],
    Elite: ['Maximum float limits', 'Best available rate', 'Early access to new features', 'Dedicated support'],
  },
};
