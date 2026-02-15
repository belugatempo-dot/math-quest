'use client';

import { useState } from 'react';
import Link from 'next/link';
import { allWorlds, getWorld } from '@/lib/world-data';
import { useProfile } from '@/contexts/ProfileContext';
import { WorldThemeProvider } from '@/contexts/WorldThemeContext';
import WorldDecoration from '@/components/decorations/WorldDecoration';
import WorldIcon from '@/components/decorations/WorldIcon';
import ChapterCard from '@/components/navigation/ChapterCard';
import ProfilePicker from '@/components/ui/ProfilePicker';
import FloatingParticles from '@/components/effects/FloatingParticles';

export default function HomePage() {
  const { activeProfile, progress, switchProfile } = useProfile();
  const [selectedWorldId, setSelectedWorldId] = useState(allWorlds[allWorlds.length - 1].id);

  if (!activeProfile) {
    return <ProfilePicker />;
  }

  const selectedWorld = getWorld(selectedWorldId) ?? allWorlds[allWorlds.length - 1];

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
    <WorldThemeProvider colorPalette={selectedWorld.colorPalette}>
    <div className="min-h-screen relative">
      <FloatingParticles />

      {/* Header */}
      <header className="relative bg-gradient-to-br from-primary via-primary to-secondary text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70 font-medium">World Map</p>
              <h1 className="text-3xl font-bold">{`Level ${selectedWorld.baLevel} - ${selectedWorld.name}`}</h1>
              <p className="text-white/70 mt-1">
                {selectedWorld.totalLevels} levels • {selectedWorld.estimatedWeeks} weeks
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-3xl font-bold">{totalStars}</span>
                </div>
                <p className="text-sm text-white/70">of {maxStars} stars</p>
              </div>
              <button
                onClick={() => switchProfile('')}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all hover:scale-105"
                aria-label="Switch player"
              >
                <span className="text-xl" role="img" aria-hidden="true">
                  {activeProfile.avatar}
                </span>
                <span className="text-sm font-medium">{activeProfile.name}</span>
              </button>
            </div>
          </div>
        </div>
        <WorldDecoration theme={selectedWorld.theme ?? 'adventure'} />
      </header>

      {/* Compact admin link */}
      <div className="max-w-4xl mx-auto px-4 pt-2 flex justify-end">
        <Link
          href="/admin"
          className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          Content Preview
        </Link>
      </div>

      {/* World Selector */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <div className="flex gap-3 overflow-x-auto pb-2" role="tablist" aria-label="Select world">
          {allWorlds.map((world) => {
            const isSelected = world.id === selectedWorldId;
            return (
              <button
                key={world.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedWorldId(world.id)}
                className={`flex-shrink-0 flex flex-col items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-primary text-white shadow-game scale-105'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:shadow-md hover:scale-102 border border-slate-600/50'
                }`}
              >
                <WorldIcon theme={world.theme ?? 'adventure'} size={28} />
                {`Level ${world.baLevel} - ${world.name}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapter Path */}
      <main className="max-w-4xl mx-auto px-4 py-6 relative">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-foreground">Chapters</h2>
          <p className="text-slate-400">
            Complete levels to earn stars and unlock new chapters
          </p>
        </div>

        <div className="relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-[40px] top-[40px] w-0.5 bg-gradient-to-b from-primary/40 to-slate-700 pointer-events-none"
            style={{ height: `calc(100% - 80px)` }}
            aria-hidden="true"
          />

          <div className="space-y-1">
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
        </div>
      </main>
    </div>
    </WorldThemeProvider>
  );
}
