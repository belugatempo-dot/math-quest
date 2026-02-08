import type { Level, Chapter, World, UserProgress } from '../types';

/**
 * Check if a level is unlocked for a user
 */
export function isLevelUnlocked(
  levelId: string,
  level: Level,
  chapter: Chapter,
  world: World,
  progress: UserProgress
): boolean {
  const worldProgress = progress.worldProgress[world.id];

  // World must be unlocked
  if (!worldProgress?.isUnlocked) {
    return false;
  }

  // First level of first chapter is always unlocked
  if (level.number === 1 && chapter.number === 1) {
    return true;
  }

  // Previous level must be completed
  const prevLevelId = getPreviousLevelId(levelId, chapter, world);
  if (prevLevelId) {
    return worldProgress.completedLevels.includes(prevLevelId);
  }

  return true;
}

/**
 * Get the previous level ID in sequence
 */
export function getPreviousLevelId(
  currentLevelId: string,
  chapter: Chapter,
  world: World
): string | null {
  // Find current level index in chapter
  const levelIndex = chapter.levels.findIndex(l => l.id === currentLevelId);

  if (levelIndex > 0) {
    // Previous level in same chapter
    return chapter.levels[levelIndex - 1].id;
  }

  // Find current chapter index
  const chapterIndex = world.chapters.findIndex(c => c.id === chapter.id);

  if (chapterIndex > 0) {
    // Last level of previous chapter
    const prevChapter = world.chapters[chapterIndex - 1];
    return prevChapter.levels[prevChapter.levels.length - 1].id;
  }

  // This is the first level
  return null;
}

/**
 * Check if completing a world should unlock the next one
 */
export function shouldUnlockNextWorld(
  currentWorldId: string,
  progress: UserProgress,
  worlds: World[]
): string | null {
  const currentWorld = worlds.find(w => w.id === currentWorldId);
  if (!currentWorld) return null;

  const worldProgress = progress.worldProgress[currentWorldId];
  if (!worldProgress?.isCompleted) return null;

  // Find next world
  const currentIndex = worlds.findIndex(w => w.id === currentWorldId);
  const nextWorld = worlds[currentIndex + 1];

  if (nextWorld && !progress.worldProgress[nextWorld.id]?.isUnlocked) {
    return nextWorld.id;
  }

  return null;
}

/**
 * Update streak based on play date
 */
export function updateStreak(
  currentStreak: number,
  longestStreak: number,
  lastPlayedDate: string,
  today: string
): { currentStreak: number; longestStreak: number } {
  const yesterday = getYesterday(today);

  if (lastPlayedDate === today) {
    // Already played today, no change
    return { currentStreak, longestStreak };
  }

  if (lastPlayedDate === yesterday) {
    // Streak continues
    const newStreak = currentStreak + 1;
    return {
      currentStreak: newStreak,
      longestStreak: Math.max(longestStreak, newStreak),
    };
  }

  // Streak broken, start fresh
  return {
    currentStreak: 1,
    longestStreak,
  };
}

function getYesterday(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}
