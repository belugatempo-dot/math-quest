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
    badgeClasses: 'bg-blue-100 text-blue-700',
    badgeSolidClasses: 'bg-blue-500',
    cardClasses: 'border-blue-200 bg-blue-50',
    labelColor: 'text-blue-600',
  },
  practice: {
    label: 'Practice',
    badgeClasses: 'bg-green-100 text-green-700',
    badgeSolidClasses: 'bg-green-500',
    cardClasses: 'border-green-200 bg-green-50',
    labelColor: 'text-green-600',
  },
  challenge: {
    label: 'Challenge',
    badgeClasses: 'bg-amber-100 text-amber-700',
    badgeSolidClasses: 'bg-amber-500',
    cardClasses: 'border-amber-200 bg-amber-50',
    labelColor: 'text-amber-600',
  },
  boss: {
    label: 'Boss',
    badgeClasses: 'bg-purple-100 text-purple-700',
    badgeSolidClasses: 'bg-purple-500',
    cardClasses: 'border-purple-200 bg-purple-50',
    labelColor: 'text-purple-600',
  },
};

const DEFAULT_INFO: LevelTypeInfo = {
  label: 'Level',
  badgeClasses: 'bg-gray-100 text-gray-700',
  badgeSolidClasses: 'bg-gray-500',
  cardClasses: 'border-gray-200 bg-white',
  labelColor: 'text-gray-600',
};

export function getLevelTypeInfo(type: LevelType | string): LevelTypeInfo {
  return LEVEL_TYPE_MAP[type] ?? DEFAULT_INFO;
}
