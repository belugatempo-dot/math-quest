import { describe, it, expect } from 'vitest';
import {
  isLevelUnlocked,
  getPreviousLevelId,
  shouldUnlockNextWorld,
  updateStreak,
} from './progressionManager';
import type { Level, Chapter, World, UserProgress } from '../types';

function makeLevel(id: string, number: number): Level {
  return {
    id,
    chapterId: 'chapter-1',
    worldId: 'world-1',
    number,
    name: `Level ${number}`,
    type: 'standard',
    storyContext: '',
    problems: [],
    difficulty: 1,
    estimatedMinutes: 5,
    isChallenge: false,
    isBoss: false,
  };
}

function makeChapter(id: string, number: number, levels: Level[]): Chapter {
  return {
    id,
    worldId: 'world-1',
    number,
    name: `Chapter ${number}`,
    topic: 'test',
    weekStart: 1,
    weekEnd: 2,
    levels,
    learningObjectives: [],
    signatureContent: [],
    isBoss: false,
  };
}

function makeWorld(id: string, chapters: Chapter[]): World {
  return {
    id,
    name: 'Test World',
    theme: 'test',
    baLevel: 1,
    targetAgeMin: 6,
    targetAgeMax: 8,
    totalLevels: 10,
    chapters,
    colorPalette: { primary: '', secondary: '', accent: '', background: '', text: '' },
    characters: [],
    isLocked: false,
    prerequisiteWorldId: null,
    estimatedWeeks: 36,
  };
}

function makeProgress(overrides: Partial<UserProgress> = {}): UserProgress {
  return {
    id: 'test',
    userId: 'user-1',
    worldProgress: {},
    levelAttempts: [],
    totalStars: 0,
    totalLevelsCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedDate: '2024-01-01',
    totalTimeMinutes: 0,
    badges: [],
    titles: [],
    preferences: {
      soundEnabled: true,
      musicEnabled: true,
      voiceEnabled: true,
      fontSize: 'medium',
      theme: 'light',
    },
    ...overrides,
  };
}

describe('isLevelUnlocked', () => {
  const level1 = makeLevel('level-1', 1);
  const level2 = makeLevel('level-2', 2);
  const chapter1 = makeChapter('chapter-1', 1, [level1, level2]);
  const world = makeWorld('world-1', [chapter1]);

  it('returns false when world is not unlocked', () => {
    const progress = makeProgress({ worldProgress: {} });
    expect(isLevelUnlocked('level-1', level1, chapter1, world, progress)).toBe(false);
  });

  it('returns true for first level of first chapter', () => {
    const progress = makeProgress({
      worldProgress: {
        'world-1': {
          worldId: 'world-1',
          isUnlocked: true,
          isCompleted: false,
          starsEarned: 0,
          starsTotal: 30,
          currentChapterId: 'chapter-1',
          currentLevelId: 'level-1',
          completedLevels: [],
          startedAt: new Date(),
        },
      },
    });
    expect(isLevelUnlocked('level-1', level1, chapter1, world, progress)).toBe(true);
  });

  it('returns true when previous level is completed', () => {
    const progress = makeProgress({
      worldProgress: {
        'world-1': {
          worldId: 'world-1',
          isUnlocked: true,
          isCompleted: false,
          starsEarned: 3,
          starsTotal: 30,
          currentChapterId: 'chapter-1',
          currentLevelId: 'level-2',
          completedLevels: ['level-1'],
          startedAt: new Date(),
        },
      },
    });
    expect(isLevelUnlocked('level-2', level2, chapter1, world, progress)).toBe(true);
  });

  it('returns true for first level of a non-first chapter when no previous level found', () => {
    // level with number > 1 and chapter.number > 1, but level is the only one in chapter
    // and there are no previous chapters → getPreviousLevelId returns null → fallback to true
    const soloLevel = makeLevel('solo-level', 2);
    soloLevel.chapterId = 'chapter-solo';
    const soloChapter = makeChapter('chapter-solo', 2, [soloLevel]);
    // world has only this chapter, so getPreviousLevelId can't find a prev chapter
    const soloWorld = makeWorld('world-1', [soloChapter]);
    const progress = makeProgress({
      worldProgress: {
        'world-1': {
          worldId: 'world-1',
          isUnlocked: true,
          isCompleted: false,
          starsEarned: 0,
          starsTotal: 30,
          currentChapterId: 'chapter-solo',
          currentLevelId: 'solo-level',
          completedLevels: [],
          startedAt: new Date(),
        },
      },
    });
    expect(isLevelUnlocked('solo-level', soloLevel, soloChapter, soloWorld, progress)).toBe(true);
  });

  it('returns false when previous level is not completed', () => {
    const progress = makeProgress({
      worldProgress: {
        'world-1': {
          worldId: 'world-1',
          isUnlocked: true,
          isCompleted: false,
          starsEarned: 0,
          starsTotal: 30,
          currentChapterId: 'chapter-1',
          currentLevelId: 'level-1',
          completedLevels: [],
          startedAt: new Date(),
        },
      },
    });
    expect(isLevelUnlocked('level-2', level2, chapter1, world, progress)).toBe(false);
  });
});

describe('getPreviousLevelId', () => {
  const level1 = makeLevel('level-1', 1);
  const level2 = makeLevel('level-2', 2);
  const level3 = makeLevel('level-3', 3);
  const chapter1 = makeChapter('chapter-1', 1, [level1, level2]);
  const chapter2 = makeChapter('chapter-2', 2, [level3]);
  const world = makeWorld('world-1', [chapter1, chapter2]);

  it('returns previous level ID within same chapter', () => {
    expect(getPreviousLevelId('level-2', chapter1, world)).toBe('level-1');
  });

  it('returns last level of previous chapter for first level of chapter', () => {
    expect(getPreviousLevelId('level-3', chapter2, world)).toBe('level-2');
  });

  it('returns null for the very first level', () => {
    expect(getPreviousLevelId('level-1', chapter1, world)).toBeNull();
  });
});

describe('shouldUnlockNextWorld', () => {
  const chapter = makeChapter('chapter-1', 1, [makeLevel('level-1', 1)]);
  const world1 = makeWorld('world-1', [chapter]);
  const world2 = makeWorld('world-2', [chapter]);
  const worlds = [world1, world2];

  it('returns next world ID when current world is completed', () => {
    const progress = makeProgress({
      worldProgress: {
        'world-1': {
          worldId: 'world-1',
          isUnlocked: true,
          isCompleted: true,
          starsEarned: 30,
          starsTotal: 30,
          currentChapterId: 'chapter-1',
          currentLevelId: 'level-1',
          completedLevels: ['level-1'],
          startedAt: new Date(),
        },
      },
    });
    expect(shouldUnlockNextWorld('world-1', progress, worlds)).toBe('world-2');
  });

  it('returns null when current world is not completed', () => {
    const progress = makeProgress({
      worldProgress: {
        'world-1': {
          worldId: 'world-1',
          isUnlocked: true,
          isCompleted: false,
          starsEarned: 10,
          starsTotal: 30,
          currentChapterId: 'chapter-1',
          currentLevelId: 'level-1',
          completedLevels: [],
          startedAt: new Date(),
        },
      },
    });
    expect(shouldUnlockNextWorld('world-1', progress, worlds)).toBeNull();
  });

  it('returns null when next world is already unlocked', () => {
    const progress = makeProgress({
      worldProgress: {
        'world-1': {
          worldId: 'world-1',
          isUnlocked: true,
          isCompleted: true,
          starsEarned: 30,
          starsTotal: 30,
          currentChapterId: 'chapter-1',
          currentLevelId: 'level-1',
          completedLevels: ['level-1'],
          startedAt: new Date(),
        },
        'world-2': {
          worldId: 'world-2',
          isUnlocked: true,
          isCompleted: false,
          starsEarned: 0,
          starsTotal: 30,
          currentChapterId: 'chapter-1',
          currentLevelId: 'level-1',
          completedLevels: [],
          startedAt: new Date(),
        },
      },
    });
    expect(shouldUnlockNextWorld('world-1', progress, worlds)).toBeNull();
  });

  it('returns null when there is no next world', () => {
    const progress = makeProgress({
      worldProgress: {
        'world-2': {
          worldId: 'world-2',
          isUnlocked: true,
          isCompleted: true,
          starsEarned: 30,
          starsTotal: 30,
          currentChapterId: 'chapter-1',
          currentLevelId: 'level-1',
          completedLevels: ['level-1'],
          startedAt: new Date(),
        },
      },
    });
    expect(shouldUnlockNextWorld('world-2', progress, worlds)).toBeNull();
  });

  it('returns null for unknown world ID', () => {
    const progress = makeProgress();
    expect(shouldUnlockNextWorld('world-999', progress, worlds)).toBeNull();
  });
});

describe('updateStreak', () => {
  it('returns no change when already played today', () => {
    expect(updateStreak(5, 10, '2024-06-15', '2024-06-15')).toEqual({
      currentStreak: 5,
      longestStreak: 10,
    });
  });

  it('increments streak when played yesterday', () => {
    expect(updateStreak(3, 5, '2024-06-14', '2024-06-15')).toEqual({
      currentStreak: 4,
      longestStreak: 5,
    });
  });

  it('updates longest streak when current exceeds it', () => {
    expect(updateStreak(5, 5, '2024-06-14', '2024-06-15')).toEqual({
      currentStreak: 6,
      longestStreak: 6,
    });
  });

  it('resets streak when streak is broken (gap > 1 day)', () => {
    expect(updateStreak(5, 10, '2024-06-10', '2024-06-15')).toEqual({
      currentStreak: 1,
      longestStreak: 10,
    });
  });

  it('preserves longest streak when resetting', () => {
    expect(updateStreak(3, 7, '2024-01-01', '2024-06-15')).toEqual({
      currentStreak: 1,
      longestStreak: 7,
    });
  });
});
