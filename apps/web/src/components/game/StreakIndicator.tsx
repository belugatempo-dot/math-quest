'use client';

interface StreakIndicatorProps {
  streak: number;
}

function getStreakStyle(streak: number) {
  if (streak >= 6) return 'bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 text-white';
  if (streak >= 4) return 'bg-gradient-to-r from-red-400 to-red-500 text-white';
  return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white';
}

function getScale(streak: number) {
  if (streak >= 6) return 'scale-110';
  if (streak >= 4) return 'scale-105';
  return '';
}

export default function StreakIndicator({ streak }: StreakIndicatorProps) {
  if (streak < 2) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-sm animate-pop-in shadow-game-sm transition-all ${getStreakStyle(streak)} ${getScale(streak)}`}
      data-testid="streak-indicator"
      role="status"
      aria-label={`${streak} correct answers in a row`}
    >
      <span aria-hidden="true" className={`text-base ${streak >= 4 ? 'animate-flame-flicker' : ''}`}>🔥</span>
      <span>{streak} in a row!</span>
    </div>
  );
}
