'use client';

import Link from 'next/link';
import type { Chapter } from '@mathquest/shared';
import StarDisplay from '@/components/game/StarDisplay';

interface ChapterCardProps {
  chapter: Chapter;
  totalStars: number;
  completedLevels: number;
}

export default function ChapterCard({
  chapter,
  totalStars,
  completedLevels,
}: ChapterCardProps) {
  const maxStars = chapter.levels.length * 3;
  const totalLevels = chapter.levels.length;
  const progress = (completedLevels / totalLevels) * 100;
  const isComplete = completedLevels === totalLevels && totalLevels > 0;
  const hasProgress = completedLevels > 0;

  // SVG circle progress ring
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Link href={`/chapter/${chapter.id}`}>
      <div className="flex items-center gap-5 group cursor-pointer py-3">
        {/* Circular node with progress ring */}
        <div className="relative flex-shrink-0">
          <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
            {/* Background ring */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="5"
            />
            {/* Progress ring */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke={isComplete ? '#FCD34D' : 'var(--world-primary, #3B82F6)'}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 40 40)"
              className="transition-all duration-500"
            />
            {/* Inner circle */}
            <circle
              cx="40"
              cy="40"
              r="28"
              className={
                isComplete
                  ? 'fill-yellow-400'
                  : hasProgress
                    ? 'fill-primary'
                    : 'fill-white/15'
              }
            />
            {/* Chapter number */}
            <text
              x="40"
              y="44"
              textAnchor="middle"
              className={`text-xl font-bold ${
                isComplete || hasProgress ? 'fill-white' : 'fill-white/50'
              }`}
            >
              {chapter.number}
            </text>
          </svg>

          {/* Complete checkmark */}
          {isComplete && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs shadow-md">
              <span aria-hidden="true">✓</span>
            </div>
          )}

          {/* Current chapter pulse */}
          {hasProgress && !isComplete && (
            <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-glow-pulse" />
          )}
        </div>

        {/* Chapter info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-sm font-medium text-primary">
                Chapter {chapter.number}
              </div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {chapter.name}
              </h3>
            </div>
            <div className="text-right flex-shrink-0">
              <StarDisplay stars={Math.min(3, Math.floor(totalStars / 3))} size="sm" />
              <div className="text-xs text-white/50 mt-1">
                {totalStars}/{maxStars}
              </div>
            </div>
          </div>

          <p className="text-sm text-white/60 mt-1">
            {chapter.learningObjectives.slice(0, 2).join(', ')}
          </p>

          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Progress</span>
              <span className="font-medium">
                {completedLevels}/{totalLevels} levels
              </span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isComplete
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                    : 'bg-primary'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-2 text-xs text-white/50">
            Weeks {chapter.weekStart}-{chapter.weekEnd}
          </div>
        </div>
      </div>
    </Link>
  );
}
