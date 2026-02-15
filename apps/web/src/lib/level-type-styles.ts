import type { LevelType } from '@mathquest/shared';

interface LevelTypeInfo {
  label: string;
  badgeClasses: string;
  badgeSolidClasses: string;
  cardClasses: string;
  labelColor: string;
}

const LEVEL_TYPE_MAP: Record<string, LevelTypeInfo> = {
  teaching: {
    label: 'Learn',
    badgeClasses: 'bg-blue-500/20 text-blue-200',
    badgeSolidClasses: 'bg-blue-500',
    cardClasses: 'border-blue-400/30 bg-blue-500/15',
    labelColor: 'text-blue-300',
  },
  practice: {
    label: 'Practice',
    badgeClasses: 'bg-green-500/20 text-green-200',
    badgeSolidClasses: 'bg-green-500',
    cardClasses: 'border-green-400/30 bg-green-500/15',
    labelColor: 'text-green-300',
  },
  challenge: {
    label: 'Challenge',
    badgeClasses: 'bg-amber-500/20 text-amber-200',
    badgeSolidClasses: 'bg-amber-500',
    cardClasses: 'border-amber-400/30 bg-amber-500/15',
    labelColor: 'text-amber-300',
  },
  boss: {
    label: 'Boss',
    badgeClasses: 'bg-purple-500/20 text-purple-200',
    badgeSolidClasses: 'bg-purple-500',
    cardClasses: 'border-purple-400/30 bg-purple-500/15',
    labelColor: 'text-purple-300',
  },
};

const DEFAULT_INFO: LevelTypeInfo = {
  label: 'Level',
  badgeClasses: 'bg-white/15 text-white/70',
  badgeSolidClasses: 'bg-slate-500',
  cardClasses: 'border-white/20 bg-white/10',
  labelColor: 'text-white/60',
};

export function getLevelTypeInfo(type: LevelType | string): LevelTypeInfo {
  return LEVEL_TYPE_MAP[type] ?? DEFAULT_INFO;
}
