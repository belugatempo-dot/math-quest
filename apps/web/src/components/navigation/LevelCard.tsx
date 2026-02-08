'use client';

import Link from 'next/link';
import type { Level } from '@mathquest/shared';
import StarDisplay from '@/components/game/StarDisplay';
import { getLevelTypeInfo } from '@/lib/level-type-styles';

interface LevelCardProps {
  level: Level;
  stars?: number;
  isLocked?: boolean;
}

export default function LevelCard({
  level,
  stars = 0,
  isLocked = false,
}: LevelCardProps) {
  const typeInfo = getLevelTypeInfo(level.type);

  if (isLocked) {
    return (
      <div
        className={`p-4 rounded-lg border-2 border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed`}
      >
        <div className="flex items-center justify-between">
          <div>
              <div className="text-sm text-gray-400">{typeInfo.label}</div>
            <h4 className="font-medium text-gray-400">{level.name}</h4>
          </div>
          <div className="text-2xl text-gray-300" role="img" aria-label="Locked level">🔒</div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/play/${level.id}`}>
      <div
        className={`p-4 rounded-lg border-2 ${typeInfo.cardClasses} hover:shadow-md transition-all cursor-pointer group`}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className={`text-xs font-medium ${typeInfo.labelColor}`}>
              {typeInfo.label}
              {level.isChallenge && <span aria-hidden="true"> ⭐</span>}
            </div>
            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
              {level.name}
            </h4>
          </div>
          <StarDisplay stars={stars} size="sm" />
        </div>

        {level.storyContext && (
          <p className="text-xs text-gray-500 line-clamp-2">{level.storyContext}</p>
        )}

        <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
          <span>{level.problems.length} problem{level.problems.length !== 1 ? 's' : ''}</span>
          <span>•</span>
          <span>~{level.estimatedMinutes} min</span>
        </div>
      </div>
    </Link>
  );
}
