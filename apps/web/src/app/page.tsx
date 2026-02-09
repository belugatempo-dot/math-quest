'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { allWorlds, getWorld } from '@/lib/world-data';
import { loadProgress, type GameProgress } from '@/lib/storage';
import ChapterCard from '@/components/navigation/ChapterCard';

export default function HomePage() {
  const [selectedWorldId, setSelectedWorldId] = useState(allWorlds[0].id);
  const [progress, setProgress] = useState<GameProgress | null>(null);

  const selectedWorld = getWorld(selectedWorldId) ?? allWorlds[0];

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const getChapterProgress = (chapterId: string) => {
    if (!progress) return { stars: 0, completed: 0 };

    const chapter = selectedWorld.chapters.find((c) => c.id === chapterId);
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

  const totalStars = selectedWorld.chapters.reduce((sum, ch) => {
    return sum + ch.levels.reduce((s, level) => {
      return s + (progress?.completedLevels[level.id]?.stars ?? 0);
    }, 0);
  }, 0);

  const maxStars = selectedWorld.chapters.reduce(
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
              <h1 className="text-3xl font-bold">{selectedWorld.name}</h1>
              <p className="text-blue-100 mt-1">
                {selectedWorld.totalLevels} levels • {selectedWorld.estimatedWeeks} weeks
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

      {/* World Selector */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="flex gap-2" role="tablist" aria-label="Select world">
          {allWorlds.map((world) => (
            <button
              key={world.id}
              role="tab"
              aria-selected={world.id === selectedWorldId}
              onClick={() => setSelectedWorldId(world.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                world.id === selectedWorldId
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {world.name}
            </button>
          ))}
        </div>
      </div>

      {/* Chapter Grid */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">Chapters</h2>
          <p className="text-gray-500">
            Complete levels to earn stars and unlock new chapters
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {selectedWorld.chapters.map((chapter) => {
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
