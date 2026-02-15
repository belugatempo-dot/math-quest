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
    badgeClasses: 'bg-blue-900/40 text-blue-300',
    badgeSolidClasses: 'bg-blue-500',
    cardClasses: 'border-blue-700/50 bg-blue-900/30',
    labelColor: 'text-blue-400',
  },
  practice: {
    label: 'Practice',
    badgeClasses: 'bg-green-900/40 text-green-300',
    badgeSolidClasses: 'bg-green-500',
    cardClasses: 'border-green-700/50 bg-green-900/30',
    labelColor: 'text-green-400',
  },
  challenge: {
    label: 'Challenge',
    badgeClasses: 'bg-amber-900/40 text-amber-300',
    badgeSolidClasses: 'bg-amber-500',
    cardClasses: 'border-amber-700/50 bg-amber-900/30',
    labelColor: 'text-amber-400',
  },
  boss: {
    label: 'Boss',
    badgeClasses: 'bg-purple-900/40 text-purple-300',
    badgeSolidClasses: 'bg-purple-500',
    cardClasses: 'border-purple-700/50 bg-purple-900/30',
    labelColor: 'text-purple-400',
  },
};

const DEFAULT_INFO: LevelTypeInfo = {
  label: 'Level',
  badgeClasses: 'bg-slate-700 text-slate-300',
  badgeSolidClasses: 'bg-slate-500',
  cardClasses: 'border-slate-700 bg-slate-800',
  labelColor: 'text-slate-400',
};

export function getLevelTypeInfo(type: LevelType | string): LevelTypeInfo {
  return LEVEL_TYPE_MAP[type] ?? DEFAULT_INFO;
}
