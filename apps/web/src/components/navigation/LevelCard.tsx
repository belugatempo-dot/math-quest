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

const TYPE_COLORS: Record<string, { ring: string; bg: string; glow: string }> = {
  teaching: { ring: 'stroke-blue-400', bg: 'from-blue-400 to-blue-600', glow: 'shadow-blue-400/30' },
  practice: { ring: 'stroke-green-400', bg: 'from-green-400 to-green-600', glow: 'shadow-green-400/30' },
  challenge: { ring: 'stroke-amber-400', bg: 'from-amber-400 to-amber-600', glow: 'shadow-amber-400/30' },
  boss: { ring: 'stroke-purple-400', bg: 'from-purple-400 to-purple-600', glow: 'shadow-purple-400/30' },
};

function LevelTypeIcon({ type }: { type: string }) {
  const iconMap: Record<string, string> = {
    teaching: '📖',
    practice: '✏️',
    challenge: '🔥',
    boss: '🛡️',
  };
  return (
    <span aria-hidden="true" className="text-sm">
      {iconMap[type] ?? '📝'}
    </span>
  );
}

export default function LevelCard({
  level,
  stars = 0,
  isLocked = false,
}: LevelCardProps) {
  const typeInfo = getLevelTypeInfo(level.type);
  const colors = TYPE_COLORS[level.type] ?? TYPE_COLORS.teaching;
  const isCompleted = stars > 0;
  const isBoss = level.isBoss;
  const isNext = !isLocked && !isCompleted;

  if (isLocked) {
    return (
      <div className="flex items-center gap-4 py-3 opacity-40 cursor-not-allowed">
        {/* Locked circle */}
        <div className="relative flex-shrink-0">
          <div className={`w-14 h-14 rounded-full bg-white/15 flex items-center justify-center border-2 border-white/25 ${isBoss ? 'w-[72px] h-[72px]' : ''}`}>
            <div className="text-2xl text-white/50" role="img" aria-label="Locked level">🔒</div>
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-sm text-white/60">{typeInfo.label}</div>
          <h4 className="font-medium text-white/60">{level.name}</h4>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/play/${level.id}`}>
      <div className={`flex items-center gap-4 py-3 group cursor-pointer transition-all hover:translate-x-1`}>
        {/* Level circle node */}
        <div className="relative flex-shrink-0">
          <div
            className={`
              ${isBoss ? 'w-[72px] h-[72px]' : 'w-14 h-14'}
              rounded-full flex items-center justify-center
              transition-all duration-200
              ${isCompleted
                ? `bg-gradient-to-br ${colors.bg} shadow-lg ${colors.glow}`
                : isNext
                  ? `bg-gradient-to-br ${colors.bg} shadow-game animate-float ${colors.glow}`
                  : `bg-gradient-to-br ${colors.bg}`
              }
              group-hover:scale-110 group-hover:shadow-lg
            `}
          >
            <span className={`font-bold text-white ${isBoss ? 'text-xl' : 'text-lg'}`}>
              {level.number}
            </span>
          </div>

          {/* Completed checkmark */}
          {isCompleted && (
            <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm">
              <span aria-hidden="true">✓</span>
            </div>
          )}

          {/* Next playable indicator */}
          {isNext && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-white/10 rounded-full text-[10px] font-bold text-primary shadow-sm whitespace-nowrap">
              PLAY
            </div>
          )}

          {/* Boss glow */}
          {isBoss && (
            <div className="absolute inset-0 rounded-full border-2 border-purple-400/50 animate-glow-pulse" />
          )}
        </div>

        {/* Level info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className={`text-xs font-medium ${typeInfo.labelColor} flex items-center gap-1`}>
                <LevelTypeIcon type={level.type} />
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
            <p className="text-xs text-white/60 line-clamp-2 mt-0.5">{level.storyContext}</p>
          )}

          <div className="mt-1 flex items-center gap-2 text-xs text-white/60">
            <span>{level.problems.length} problem{level.problems.length !== 1 ? 's' : ''}</span>
            <span>•</span>
            <span>~{level.estimatedMinutes} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
