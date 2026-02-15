'use client';

interface GameProgressBarProps {
  total: number;
  current: number;
  isCurrentCorrect?: boolean;
}

export default function GameProgressBar({
  total,
  current,
  isCurrentCorrect = false,
}: GameProgressBarProps) {
  return (
    <div className="flex gap-1" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total} aria-label={`Problem ${current + 1} of ${total}`}>
      {Array.from({ length: total }, (_, i) => {
        const isCompleted = i < current || (i === current && isCurrentCorrect);
        const isCurrent = i === current && !isCurrentCorrect;

        return (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              isCompleted
                ? 'bg-gradient-to-r from-green-400 to-green-500'
                : isCurrent
                  ? 'bg-primary/60 animate-pulse-slow'
                  : 'bg-white/20'
            }`}
          />
        );
      })}
    </div>
  );
}
