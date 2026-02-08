import { describe, it, expect } from 'vitest';
import {
  world3,
  getChapter,
  getLevel,
  getLevelWithContext,
  getProblem,
  getAllLevels,
  getNextLevel,
  getPreviousLevel,
} from './world-data';

describe('world3 data', () => {
  it('should export world3 data', () => {
    expect(world3).toBeDefined();
    expect(world3.name).toBeTruthy();
    expect(world3.chapters.length).toBeGreaterThan(0);
  });
});

describe('getChapter', () => {
  it('should find an existing chapter', () => {
    const firstChapter = world3.chapters[0];
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
  it('should find a level in the first chapter', () => {
    const firstLevel = world3.chapters[0].levels[0];
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
  it('should return level, chapter, and world for existing level', () => {
    const firstLevel = world3.chapters[0].levels[0];
    const result = getLevelWithContext(firstLevel.id);
    expect(result).toBeDefined();
    expect(result!.level.id).toBe(firstLevel.id);
    expect(result!.chapter.id).toBe(world3.chapters[0].id);
    expect(result!.world).toBe(world3);
  });

  it('should return undefined for non-existent level', () => {
    expect(getLevelWithContext('level-999-999-999')).toBeUndefined();
  });
});

describe('getProblem', () => {
  it('should find a problem by ID', () => {
    const firstProblem = world3.chapters[0].levels[0].problems[0];
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
  it('should return all levels flattened', () => {
    const levels = getAllLevels();
    const expectedCount = world3.chapters.reduce(
      (sum, ch) => sum + ch.levels.length,
      0
    );
    expect(levels.length).toBe(expectedCount);
  });

  it('should include levels from all chapters', () => {
    const levels = getAllLevels();
    for (const chapter of world3.chapters) {
      for (const level of chapter.levels) {
        expect(levels.find((l) => l.id === level.id)).toBeDefined();
      }
    }
  });
});

describe('getNextLevel', () => {
  it('should return the next level', () => {
    const levels = getAllLevels();
    if (levels.length > 1) {
      const result = getNextLevel(levels[0].id);
      expect(result).toBeDefined();
      expect(result!.id).toBe(levels[1].id);
    }
  });

  it('should return undefined for the last level', () => {
    const levels = getAllLevels();
    const lastLevel = levels[levels.length - 1];
    expect(getNextLevel(lastLevel.id)).toBeUndefined();
  });

  it('should return undefined for unknown level', () => {
    expect(getNextLevel('level-999-999-999')).toBeUndefined();
  });
});

describe('getPreviousLevel', () => {
  it('should return the previous level', () => {
    const levels = getAllLevels();
    if (levels.length > 1) {
      const result = getPreviousLevel(levels[1].id);
      expect(result).toBeDefined();
      expect(result!.id).toBe(levels[0].id);
    }
  });

  it('should return undefined for the first level', () => {
    const levels = getAllLevels();
    expect(getPreviousLevel(levels[0].id)).toBeUndefined();
  });

  it('should return undefined for unknown level', () => {
    expect(getPreviousLevel('level-999-999-999')).toBeUndefined();
  });
});
