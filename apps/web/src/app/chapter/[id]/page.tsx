'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getChapter, getWorldForChapter } from '@/lib/world-data';
import { useProfile } from '@/contexts/ProfileContext';
import { WorldThemeProvider } from '@/contexts/WorldThemeContext';
import WorldDecoration from '@/components/decorations/WorldDecoration';
import LevelCard from '@/components/navigation/LevelCard';
import StarDisplay from '@/components/game/StarDisplay';
import FloatingParticles from '@/components/effects/FloatingParticles';
import type { GameProgress } from '@/lib/storage';
import type { Chapter } from '@mathquest/shared';

function getLevelStars(progress: GameProgress | null, levelId: string): number {
  return progress?.completedLevels[levelId]?.stars ?? 0;
}

function isLevelUnlockedByIndex(
  progress: GameProgress | null,
  chapter: Chapter,
  levelIndex: number
): boolean {
  if (levelIndex === 0) return true;
  const prevLevel = chapter.levels[levelIndex - 1];
  return (progress?.completedLevels[prevLevel.id]?.stars ?? 0) > 0;
}

export default function ChapterPage() {
  const params = useParams();
  const chapterId = params.id as string;
  const chapter = getChapter(chapterId);
  const { progress } = useProfile();

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Chapter not found</h1>
          <Link href="/" className="mt-4 text-primary hover:underline">
            Back to World Map
          </Link>
        </div>
      </div>
    );
  }

  const world = getWorldForChapter(chapterId);

  const totalStars = chapter.levels.reduce(
    (sum, level) => sum + getLevelStars(progress, level.id),
    0
  );
  const maxStars = chapter.levels.length * 3;
  const completedLevels = chapter.levels.filter(
    (l) => getLevelStars(progress, l.id) > 0
  ).length;

  return (
    <WorldThemeProvider colorPalette={world?.colorPalette}>
    <div className="min-h-screen relative">
      <FloatingParticles />

      {/* Game-style banner header */}
      <header className="relative bg-gradient-to-br from-primary via-primary to-secondary text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <Link
            href="/"
            className="text-white/60 hover:text-white text-sm mb-2 inline-flex items-center gap-1 transition-colors"
          >
            ← Back to World Map
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/60 font-medium">Chapter {chapter.number}</div>
              <h1 className="text-2xl font-bold">{chapter.name}</h1>
              <p className="text-white/70 mt-1 text-sm">
                {chapter.learningObjectives.join(' • ')}
              </p>
            </div>
            <div className="text-right">
              <StarDisplay stars={Math.floor(totalStars / chapter.levels.length)} size="md" />
              <p className="text-sm text-white/70 mt-1">
                {totalStars}/{maxStars} stars
              </p>
            </div>
          </div>
        </div>
        <WorldDecoration theme={world?.theme ?? 'adventure'} />
      </header>

      {/* Progress Bar */}
      <div className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-400 font-medium">Chapter Progress</span>
            <span className="font-bold text-primary">
              {completedLevels}/{chapter.levels.length} levels
            </span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                completedLevels === chapter.levels.length
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                  : 'bg-gradient-to-r from-primary to-accent'
              }`}
              style={{ width: `${(completedLevels / chapter.levels.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Level Path */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="relative">
          {/* Vertical connecting path */}
          <div
            className="absolute left-7 top-[24px] w-0.5 pointer-events-none"
            style={{
              height: `calc(100% - 48px)`,
              background: 'linear-gradient(to bottom, var(--world-primary, #3B82F6) 0%, #CBD5E1 100%)',
              opacity: 0.3,
            }}
            aria-hidden="true"
          />

          <div className="space-y-0">
            {chapter.levels.map((level, index) => (
              <LevelCard
                key={level.id}
                level={level}
                stars={getLevelStars(progress, level.id)}
                isLocked={!isLevelUnlockedByIndex(progress, chapter, index)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
    </WorldThemeProvider>
  );
}
