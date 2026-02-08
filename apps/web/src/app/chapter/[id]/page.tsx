'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getChapter, world3 } from '@/lib/world-data';
import { loadProgress, type GameProgress } from '@/lib/storage';
import LevelCard from '@/components/navigation/LevelCard';
import StarDisplay from '@/components/game/StarDisplay';
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
  const [progress, setProgress] = useState<GameProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

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

  const totalStars = chapter.levels.reduce(
    (sum, level) => sum + getLevelStars(progress, level.id),
    0
  );
  const maxStars = chapter.levels.length * 3;
  const completedLevels = chapter.levels.filter(
    (l) => getLevelStars(progress, l.id) > 0
  ).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="text-blue-100 hover:text-white text-sm mb-2 inline-block"
          >
            ← Back to World Map
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-blue-200">Chapter {chapter.number}</div>
              <h1 className="text-2xl font-bold">{chapter.name}</h1>
              <p className="text-blue-100 mt-1">
                {chapter.learningObjectives.join(' • ')}
              </p>
            </div>
            <div className="text-right">
              <StarDisplay stars={Math.floor(totalStars / chapter.levels.length)} size="md" />
              <p className="text-sm text-blue-100 mt-1">
                {totalStars}/{maxStars} stars
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Chapter Progress</span>
            <span className="font-medium">
              {completedLevels}/{chapter.levels.length} levels
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-success transition-all duration-500"
              style={{ width: `${(completedLevels / chapter.levels.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Levels Grid */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chapter.levels.map((level, index) => (
            <LevelCard
              key={level.id}
              level={level}
              stars={getLevelStars(progress, level.id)}
              isLocked={!isLevelUnlockedByIndex(progress, chapter, index)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
