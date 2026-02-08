import type { World, Chapter, Level, Problem } from '@mathquest/shared';
import worldData from '../../../../data/world-3.json';

export const world3 = worldData as World;

export function getChapter(chapterId: string): Chapter | undefined {
  return world3.chapters.find((c) => c.id === chapterId);
}

/** Find a level by ID across all chapters. Used by content tools and shared logic. */
export function getLevel(levelId: string): Level | undefined {
  for (const chapter of world3.chapters) {
    const level = chapter.levels.find((l) => l.id === levelId);
    if (level) return level;
  }
  return undefined;
}

export function getLevelWithContext(levelId: string): {
  level: Level;
  chapter: Chapter;
  world: World;
} | undefined {
  for (const chapter of world3.chapters) {
    const level = chapter.levels.find((l) => l.id === levelId);
    if (level) {
      return { level, chapter, world: world3 };
    }
  }
  return undefined;
}

/** Find a problem by ID across all levels and chapters. Used by content tools. */
export function getProblem(problemId: string): Problem | undefined {
  for (const chapter of world3.chapters) {
    for (const level of chapter.levels) {
      const problem = level.problems.find((p) => p.id === problemId);
      if (problem) return problem;
    }
  }
  return undefined;
}

export function getAllLevels(): Level[] {
  return world3.chapters.flatMap((c) => c.levels);
}

export function getNextLevel(currentLevelId: string): Level | undefined {
  const levels = getAllLevels();
  const currentIndex = levels.findIndex((l) => l.id === currentLevelId);
  if (currentIndex >= 0 && currentIndex < levels.length - 1) {
    return levels[currentIndex + 1];
  }
  return undefined;
}

export function getPreviousLevel(currentLevelId: string): Level | undefined {
  const levels = getAllLevels();
  const currentIndex = levels.findIndex((l) => l.id === currentLevelId);
  if (currentIndex > 0) {
    return levels[currentIndex - 1];
  }
  return undefined;
}
