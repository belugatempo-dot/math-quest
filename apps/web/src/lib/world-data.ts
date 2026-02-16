import type { World, Chapter, Level, Problem } from '@mathquest/shared';
import world3Data from '../../../../data/world-3.json';
import world4Data from '../../../../data/world-4.json';
import world5Data from '../../../../data/world-5.json';

export const world3 = world3Data as World;
export const world4 = world4Data as World;
export const world5 = world5Data as World;

/** All available worlds, ordered by BA level */
export const allWorlds: World[] = [world3, world4, world5];

export function getWorld(worldId: string): World | undefined {
  return allWorlds.find((w) => w.id === worldId);
}

export function getChapter(chapterId: string): Chapter | undefined {
  for (const world of allWorlds) {
    const chapter = world.chapters.find((c) => c.id === chapterId);
    if (chapter) return chapter;
  }
  return undefined;
}

/** Find a level by ID across all worlds and chapters. */
export function getLevel(levelId: string): Level | undefined {
  for (const world of allWorlds) {
    for (const chapter of world.chapters) {
      const level = chapter.levels.find((l) => l.id === levelId);
      if (level) return level;
    }
  }
  return undefined;
}

export function getLevelWithContext(levelId: string): {
  level: Level;
  chapter: Chapter;
  world: World;
} | undefined {
  for (const world of allWorlds) {
    for (const chapter of world.chapters) {
      const level = chapter.levels.find((l) => l.id === levelId);
      if (level) {
        return { level, chapter, world };
      }
    }
  }
  return undefined;
}

/** Find a problem by ID across all worlds. */
export function getProblem(problemId: string): Problem | undefined {
  for (const world of allWorlds) {
    for (const chapter of world.chapters) {
      for (const level of chapter.levels) {
        const problem = level.problems.find((p) => p.id === problemId);
        if (problem) return problem;
      }
    }
  }
  return undefined;
}

export function getAllLevels(worldId?: string): Level[] {
  const worlds = worldId ? allWorlds.filter((w) => w.id === worldId) : allWorlds;
  return worlds.flatMap((w) => w.chapters.flatMap((c) => c.levels));
}

export function getNextLevel(currentLevelId: string): Level | undefined {
  const ctx = getLevelWithContext(currentLevelId);
  if (!ctx) return undefined;
  const levels = getAllLevels(ctx.world.id);
  const idx = levels.findIndex((l) => l.id === currentLevelId);
  return idx >= 0 && idx < levels.length - 1 ? levels[idx + 1] : undefined;
}

export function getPreviousLevel(currentLevelId: string): Level | undefined {
  const ctx = getLevelWithContext(currentLevelId);
  if (!ctx) return undefined;
  const levels = getAllLevels(ctx.world.id);
  const idx = levels.findIndex((l) => l.id === currentLevelId);
  return idx > 0 ? levels[idx - 1] : undefined;
}

export function getWorldForChapter(chapterId: string): World | undefined {
  for (const world of allWorlds) {
    if (world.chapters.some((c) => c.id === chapterId)) return world;
  }
  return undefined;
}
