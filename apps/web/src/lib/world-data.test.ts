import { describe, it, expect } from 'vitest';
import {
  world3,
  world4,
  allWorlds,
  getWorld,
  getChapter,
  getLevel,
  getLevelWithContext,
  getProblem,
  getAllLevels,
  getNextLevel,
  getPreviousLevel,
  getWorldForChapter,
} from './world-data';

describe('allWorlds', () => {
  it('should contain both worlds', () => {
    expect(allWorlds).toHaveLength(2);
    expect(allWorlds[0]).toBe(world3);
    expect(allWorlds[1]).toBe(world4);
  });

  it('should have distinct world IDs', () => {
    const ids = allWorlds.map((w) => w.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('getWorld', () => {
  it('should find world3 by ID', () => {
    const result = getWorld(world3.id);
    expect(result).toBe(world3);
  });

  it('should find world4 by ID', () => {
    const result = getWorld(world4.id);
    expect(result).toBe(world4);
  });

  it('should return undefined for non-existent world', () => {
    expect(getWorld('world-999')).toBeUndefined();
  });
});

describe('world data exports', () => {
  it('should export world3 data', () => {
    expect(world3).toBeDefined();
    expect(world3.name).toBeTruthy();
    expect(world3.chapters.length).toBeGreaterThan(0);
  });

  it('should export world4 data', () => {
    expect(world4).toBeDefined();
    expect(world4.name).toBeTruthy();
    expect(world4.chapters.length).toBeGreaterThan(0);
  });
});

describe('getChapter', () => {
  it('should find a chapter from world3', () => {
    const firstChapter = world3.chapters[0];
    const result = getChapter(firstChapter.id);
    expect(result).toBeDefined();
    expect(result!.id).toBe(firstChapter.id);
    expect(result!.name).toBe(firstChapter.name);
  });

  it('should find a chapter from world4', () => {
    const firstChapter = world4.chapters[0];
    const result = getChapter(firstChapter.id);
    expect(result).toBeDefined();
    expect(result!.id).toBe(firstChapter.id);
    expect(result!.name).toBe(firstChapter.name);
  });

  it('should return undefined for non-existent chapter', () => {
    expect(getChapter('chapter-999-999')).toBeUndefined();
  });
});

describe('getLevel', () => {
  it('should find a level from world3', () => {
    const firstLevel = world3.chapters[0].levels[0];
    const result = getLevel(firstLevel.id);
    expect(result).toBeDefined();
    expect(result!.id).toBe(firstLevel.id);
  });

  it('should find a level from world4', () => {
    const firstLevel = world4.chapters[0].levels[0];
    const result = getLevel(firstLevel.id);
    expect(result).toBeDefined();
    expect(result!.id).toBe(firstLevel.id);
  });

  it('should find a level in a later chapter', () => {
    if (world3.chapters.length > 1) {
      const laterLevel = world3.chapters[1].levels[0];
      const result = getLevel(laterLevel.id);
      expect(result).toBeDefined();
      expect(result!.id).toBe(laterLevel.id);
    }
  });

  it('should return undefined for non-existent level', () => {
    expect(getLevel('level-999-999-999')).toBeUndefined();
  });
});

describe('getLevelWithContext', () => {
  it('should return level, chapter, and world for a world3 level', () => {
    const firstLevel = world3.chapters[0].levels[0];
    const result = getLevelWithContext(firstLevel.id);
    expect(result).toBeDefined();
    expect(result!.level.id).toBe(firstLevel.id);
    expect(result!.chapter.id).toBe(world3.chapters[0].id);
    expect(result!.world).toBe(world3);
  });

  it('should return correct world for a world4 level', () => {
    const firstLevel = world4.chapters[0].levels[0];
    const result = getLevelWithContext(firstLevel.id);
    expect(result).toBeDefined();
    expect(result!.level.id).toBe(firstLevel.id);
    expect(result!.chapter.id).toBe(world4.chapters[0].id);
    expect(result!.world).toBe(world4);
  });

  it('should return undefined for non-existent level', () => {
    expect(getLevelWithContext('level-999-999-999')).toBeUndefined();
  });
});

describe('getProblem', () => {
  it('should find a problem from world3', () => {
    const firstProblem = world3.chapters[0].levels[0].problems[0];
    const result = getProblem(firstProblem.id);
    expect(result).toBeDefined();
    expect(result!.id).toBe(firstProblem.id);
    expect(result!.statement).toBe(firstProblem.statement);
  });

  it('should find a problem from world4', () => {
    const firstProblem = world4.chapters[0].levels[0].problems[0];
    const result = getProblem(firstProblem.id);
    expect(result).toBeDefined();
    expect(result!.id).toBe(firstProblem.id);
    expect(result!.statement).toBe(firstProblem.statement);
  });

  it('should return undefined for non-existent problem', () => {
    expect(getProblem('problem-999-999-999-999')).toBeUndefined();
  });
});

describe('getAllLevels', () => {
  it('should return all levels from all worlds when no worldId given', () => {
    const levels = getAllLevels();
    const expectedCount = allWorlds.reduce(
      (sum, w) => sum + w.chapters.reduce((s, ch) => s + ch.levels.length, 0),
      0
    );
    expect(levels.length).toBe(expectedCount);
  });

  it('should return only world3 levels when filtered by world3 id', () => {
    const levels = getAllLevels(world3.id);
    const expectedCount = world3.chapters.reduce(
      (sum, ch) => sum + ch.levels.length,
      0
    );
    expect(levels.length).toBe(expectedCount);
  });

  it('should return only world4 levels when filtered by world4 id', () => {
    const levels = getAllLevels(world4.id);
    const expectedCount = world4.chapters.reduce(
      (sum, ch) => sum + ch.levels.length,
      0
    );
    expect(levels.length).toBe(expectedCount);
  });

  it('should return empty array for non-existent world', () => {
    expect(getAllLevels('world-999')).toHaveLength(0);
  });

  it('should include levels from all chapters of all worlds', () => {
    const levels = getAllLevels();
    for (const world of allWorlds) {
      for (const chapter of world.chapters) {
        for (const level of chapter.levels) {
          expect(levels.find((l) => l.id === level.id)).toBeDefined();
        }
      }
    }
  });
});

describe('getNextLevel', () => {
  it('should return the next level within world3', () => {
    const levels = getAllLevels(world3.id);
    if (levels.length > 1) {
      const result = getNextLevel(levels[0].id);
      expect(result).toBeDefined();
      expect(result!.id).toBe(levels[1].id);
    }
  });

  it('should return undefined for the last level in world3', () => {
    const levels = getAllLevels(world3.id);
    const lastLevel = levels[levels.length - 1];
    expect(getNextLevel(lastLevel.id)).toBeUndefined();
  });

  it('should not cross world boundaries', () => {
    const world3Levels = getAllLevels(world3.id);
    const lastWorld3Level = world3Levels[world3Levels.length - 1];
    const result = getNextLevel(lastWorld3Level.id);
    expect(result).toBeUndefined();
  });

  it('should work within world4', () => {
    const levels = getAllLevels(world4.id);
    if (levels.length > 1) {
      const result = getNextLevel(levels[0].id);
      expect(result).toBeDefined();
      expect(result!.id).toBe(levels[1].id);
    }
  });

  it('should return undefined for unknown level', () => {
    expect(getNextLevel('level-999-999-999')).toBeUndefined();
  });
});

describe('getPreviousLevel', () => {
  it('should return the previous level within world3', () => {
    const levels = getAllLevels(world3.id);
    if (levels.length > 1) {
      const result = getPreviousLevel(levels[1].id);
      expect(result).toBeDefined();
      expect(result!.id).toBe(levels[0].id);
    }
  });

  it('should return undefined for the first level in world3', () => {
    const levels = getAllLevels(world3.id);
    expect(getPreviousLevel(levels[0].id)).toBeUndefined();
  });

  it('should not cross world boundaries', () => {
    const world4Levels = getAllLevels(world4.id);
    const firstWorld4Level = world4Levels[0];
    const result = getPreviousLevel(firstWorld4Level.id);
    expect(result).toBeUndefined();
  });

  it('should work within world4', () => {
    const levels = getAllLevels(world4.id);
    if (levels.length > 1) {
      const result = getPreviousLevel(levels[1].id);
      expect(result).toBeDefined();
      expect(result!.id).toBe(levels[0].id);
    }
  });

  it('should return undefined for unknown level', () => {
    expect(getPreviousLevel('level-999-999-999')).toBeUndefined();
  });
});

describe('getWorldForChapter', () => {
  it('should find world3 for a world3 chapter', () => {
    const result = getWorldForChapter(world3.chapters[0].id);
    expect(result).toBe(world3);
  });

  it('should find world4 for a world4 chapter', () => {
    const result = getWorldForChapter(world4.chapters[0].id);
    expect(result).toBe(world4);
  });

  it('should return undefined for non-existent chapter', () => {
    expect(getWorldForChapter('chapter-999-999')).toBeUndefined();
  });
});
