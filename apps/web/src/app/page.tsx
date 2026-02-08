'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { world3 } from '@/lib/world-data';
import { loadProgress, type GameProgress } from '@/lib/storage';
import ChapterCard from '@/components/navigation/ChapterCard';
import StarDisplay from '@/components/game/StarDisplay';

export default function HomePage() {
  const [progress, setProgress] = useState<GameProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const getChapterProgress = (chapterId: string) => {
    if (!progress) return { stars: 0, completed: 0 };

    const chapter = world3.chapters.find((c) => c.id === chapterId);
    if (!chapter) return { stars: 0, completed: 0 };

    let stars = 0;
    let completed = 0;

    for (const level of chapter.levels) {
      const levelProgress = progress.completedLevels[level.id];
      if (levelProgress) {
        stars += levelProgress.stars;
        completed++;
      }
    }

    return { stars, completed };
  };

  const totalStars = progress?.totalStars ?? 0;
  const maxStars = world3.chapters.reduce(
    (sum, ch) => sum + ch.levels.length * 3,
    0
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{world3.name}</h1>
              <p className="text-blue-100 mt-1">
                {world3.totalLevels} levels • {world3.estimatedWeeks} weeks
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="text-3xl font-bold">{totalStars}</span>
              </div>
              <p className="text-sm text-blue-100">of {maxStars} stars</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex gap-4">
          <Link
            href="/"
            className="text-primary font-medium border-b-2 border-primary pb-1"
          >
            World Map
          </Link>
          <Link
            href="/admin"
            className="text-gray-500 hover:text-gray-700"
          >
            Content Preview
          </Link>
        </div>
      </nav>

      {/* Chapter Grid */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">Chapters</h2>
          <p className="text-gray-500">
            Complete levels to earn stars and unlock new chapters
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {world3.chapters.map((chapter) => {
            const { stars, completed } = getChapterProgress(chapter.id);
            return (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                totalStars={stars}
                completedLevels={completed}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
