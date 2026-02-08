import { describe, it, expect } from 'vitest';
import {
  UserPreferencesSchema,
  BadgeSchema,
  TitleSchema,
  ProblemResultSchema,
  LevelAttemptSchema,
  WorldProgressSchema,
  UserProgressSchema,
} from './user';

describe('UserPreferencesSchema', () => {
  const validPreferences = {
    soundEnabled: true,
    musicEnabled: true,
    voiceEnabled: false,
    fontSize: 'medium' as const,
    theme: 'light' as const,
  };

  it('should accept valid preferences', () => {
    expect(UserPreferencesSchema.safeParse(validPreferences).success).toBe(true);
  });

  it.each(['small', 'medium', 'large'] as const)('should accept fontSize "%s"', (fontSize) => {
    expect(
      UserPreferencesSchema.safeParse({ ...validPreferences, fontSize }).success
    ).toBe(true);
  });

  it.each(['light', 'dark', 'auto'] as const)('should accept theme "%s"', (theme) => {
    expect(
      UserPreferencesSchema.safeParse({ ...validPreferences, theme }).success
    ).toBe(true);
  });

  it('should reject invalid fontSize', () => {
    expect(
      UserPreferencesSchema.safeParse({ ...validPreferences, fontSize: 'xl' }).success
    ).toBe(false);
  });

  it('should reject invalid theme', () => {
    expect(
      UserPreferencesSchema.safeParse({ ...validPreferences, theme: 'blue' }).success
    ).toBe(false);
  });
});

describe('BadgeSchema', () => {
  const validBadge = {
    id: 'badge-1',
    name: 'First Star',
    description: 'Earned your first star',
    iconUrl: '/badges/first-star.png',
  };

  it('should accept valid badge without earnedAt', () => {
    expect(BadgeSchema.safeParse(validBadge).success).toBe(true);
  });

  it('should accept badge with earnedAt date', () => {
    const result = BadgeSchema.safeParse({
      ...validBadge,
      earnedAt: new Date('2024-01-15'),
    });
    expect(result.success).toBe(true);
  });

  it('should reject missing required fields', () => {
    expect(BadgeSchema.safeParse({ id: 'badge-1' }).success).toBe(false);
  });
});

describe('TitleSchema', () => {
  const validTitle = {
    id: 'title-1',
    name: 'Multiplication Master',
    requirement: 'Complete all multiplication levels',
  };

  it('should accept valid title', () => {
    expect(TitleSchema.safeParse(validTitle).success).toBe(true);
  });

  it('should accept title with optional worldId', () => {
    const result = TitleSchema.safeParse({ ...validTitle, worldId: 'world-3' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.worldId).toBe('world-3');
  });

  it('should accept title without worldId', () => {
    const result = TitleSchema.safeParse(validTitle);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.worldId).toBeUndefined();
  });

  it('should reject missing name', () => {
    expect(TitleSchema.safeParse({ id: 'title-1', requirement: 'req' }).success).toBe(false);
  });
});

describe('ProblemResultSchema', () => {
  const validResult = {
    problemId: 'problem-3-1-1-1',
    isCorrect: true,
    attempts: 1,
    hintsUsed: [1] as (1 | 2 | 3)[],
    answerGiven: { value: 15 },
    timeSeconds: 30,
  };

  it('should accept valid problem result', () => {
    expect(ProblemResultSchema.safeParse(validResult).success).toBe(true);
  });

  describe('attempts validation', () => {
    it('should accept positive attempts', () => {
      expect(ProblemResultSchema.safeParse({ ...validResult, attempts: 3 }).success).toBe(true);
    });

    it('should reject zero attempts', () => {
      expect(ProblemResultSchema.safeParse({ ...validResult, attempts: 0 }).success).toBe(false);
    });

    it('should reject negative attempts', () => {
      expect(ProblemResultSchema.safeParse({ ...validResult, attempts: -1 }).success).toBe(false);
    });
  });

  describe('hintsUsed validation', () => {
    it('should accept empty array', () => {
      expect(
        ProblemResultSchema.safeParse({ ...validResult, hintsUsed: [] }).success
      ).toBe(true);
    });

    it.each([1, 2, 3] as const)('should accept hint tier %d', (tier) => {
      expect(
        ProblemResultSchema.safeParse({ ...validResult, hintsUsed: [tier] }).success
      ).toBe(true);
    });

    it('should accept multiple tiers', () => {
      expect(
        ProblemResultSchema.safeParse({ ...validResult, hintsUsed: [1, 2, 3] }).success
      ).toBe(true);
    });

    it('should reject invalid tier value', () => {
      expect(
        ProblemResultSchema.safeParse({ ...validResult, hintsUsed: [4] }).success
      ).toBe(false);
    });

    it('should reject tier 0', () => {
      expect(
        ProblemResultSchema.safeParse({ ...validResult, hintsUsed: [0] }).success
      ).toBe(false);
    });
  });

  describe('timeSeconds validation', () => {
    it('should accept zero', () => {
      expect(
        ProblemResultSchema.safeParse({ ...validResult, timeSeconds: 0 }).success
      ).toBe(true);
    });

    it('should reject negative', () => {
      expect(
        ProblemResultSchema.safeParse({ ...validResult, timeSeconds: -1 }).success
      ).toBe(false);
    });
  });
});

describe('LevelAttemptSchema', () => {
  const validAttempt = {
    id: 'attempt-1',
    levelId: 'level-3-1-1',
    startedAt: new Date('2024-01-15T10:00:00Z'),
    starsEarned: 3 as const,
    hintsUsed: 0,
    attemptsCount: 1,
    timeSeconds: 120,
    problemResults: [
      {
        problemId: 'problem-3-1-1-1',
        isCorrect: true,
        attempts: 1,
        hintsUsed: [] as (1 | 2 | 3)[],
        answerGiven: { value: 15 },
        timeSeconds: 30,
      },
    ],
  };

  it('should accept valid level attempt', () => {
    expect(LevelAttemptSchema.safeParse(validAttempt).success).toBe(true);
  });

  describe('starsEarned validation', () => {
    it.each([0, 1, 2, 3] as const)('should accept stars %d', (stars) => {
      expect(
        LevelAttemptSchema.safeParse({ ...validAttempt, starsEarned: stars }).success
      ).toBe(true);
    });

    it('should reject stars 4', () => {
      expect(
        LevelAttemptSchema.safeParse({ ...validAttempt, starsEarned: 4 }).success
      ).toBe(false);
    });

    it('should reject negative stars', () => {
      expect(
        LevelAttemptSchema.safeParse({ ...validAttempt, starsEarned: -1 }).success
      ).toBe(false);
    });
  });

  describe('completedAt', () => {
    it('should accept with completedAt', () => {
      const result = LevelAttemptSchema.safeParse({
        ...validAttempt,
        completedAt: new Date('2024-01-15T10:05:00Z'),
      });
      expect(result.success).toBe(true);
    });

    it('should accept without completedAt', () => {
      const result = LevelAttemptSchema.safeParse(validAttempt);
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.completedAt).toBeUndefined();
    });
  });

  describe('hintsUsed validation', () => {
    it('should accept zero', () => {
      expect(
        LevelAttemptSchema.safeParse({ ...validAttempt, hintsUsed: 0 }).success
      ).toBe(true);
    });

    it('should reject negative', () => {
      expect(
        LevelAttemptSchema.safeParse({ ...validAttempt, hintsUsed: -1 }).success
      ).toBe(false);
    });
  });

  describe('attemptsCount validation', () => {
    it('should accept positive', () => {
      expect(
        LevelAttemptSchema.safeParse({ ...validAttempt, attemptsCount: 5 }).success
      ).toBe(true);
    });

    it('should reject zero', () => {
      expect(
        LevelAttemptSchema.safeParse({ ...validAttempt, attemptsCount: 0 }).success
      ).toBe(false);
    });
  });
});

describe('WorldProgressSchema', () => {
  const validWorldProgress = {
    worldId: 'world-3',
    isUnlocked: true,
    isCompleted: false,
    starsEarned: 10,
    starsTotal: 45,
    currentChapterId: 'chapter-3-1',
    currentLevelId: 'level-3-1-3',
    completedLevels: ['level-3-1-1', 'level-3-1-2'],
    startedAt: new Date('2024-01-10'),
  };

  it('should accept valid world progress', () => {
    expect(WorldProgressSchema.safeParse(validWorldProgress).success).toBe(true);
  });

  describe('starsEarned validation', () => {
    it('should accept zero', () => {
      expect(
        WorldProgressSchema.safeParse({ ...validWorldProgress, starsEarned: 0 }).success
      ).toBe(true);
    });

    it('should reject negative', () => {
      expect(
        WorldProgressSchema.safeParse({ ...validWorldProgress, starsEarned: -1 }).success
      ).toBe(false);
    });
  });

  describe('starsTotal validation', () => {
    it('should accept zero', () => {
      expect(
        WorldProgressSchema.safeParse({ ...validWorldProgress, starsTotal: 0 }).success
      ).toBe(true);
    });

    it('should reject negative', () => {
      expect(
        WorldProgressSchema.safeParse({ ...validWorldProgress, starsTotal: -1 }).success
      ).toBe(false);
    });
  });

  describe('completedLevels validation', () => {
    it('should accept empty array', () => {
      expect(
        WorldProgressSchema.safeParse({ ...validWorldProgress, completedLevels: [] }).success
      ).toBe(true);
    });

    it('should accept string array', () => {
      expect(
        WorldProgressSchema.safeParse({
          ...validWorldProgress,
          completedLevels: ['level-3-1-1'],
        }).success
      ).toBe(true);
    });
  });

  describe('completedAt', () => {
    it('should accept with completedAt', () => {
      const result = WorldProgressSchema.safeParse({
        ...validWorldProgress,
        completedAt: new Date('2024-03-15'),
      });
      expect(result.success).toBe(true);
    });

    it('should accept without completedAt', () => {
      const result = WorldProgressSchema.safeParse(validWorldProgress);
      expect(result.success).toBe(true);
    });
  });
});

describe('UserProgressSchema', () => {
  const validPreferences = {
    soundEnabled: true,
    musicEnabled: true,
    voiceEnabled: false,
    fontSize: 'medium' as const,
    theme: 'light' as const,
  };

  const validUserProgress = {
    id: 'progress-1',
    userId: 'user-1',
    worldProgress: {},
    levelAttempts: [],
    totalStars: 0,
    totalLevelsCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedDate: '2024-01-15',
    totalTimeMinutes: 0,
    badges: [],
    titles: [],
    preferences: validPreferences,
  };

  it('should accept valid user progress', () => {
    expect(UserProgressSchema.safeParse(validUserProgress).success).toBe(true);
  });

  describe('lastPlayedDate validation', () => {
    it('should accept valid date format', () => {
      expect(
        UserProgressSchema.safeParse({ ...validUserProgress, lastPlayedDate: '2024-12-31' })
          .success
      ).toBe(true);
    });

    it('should reject invalid date format', () => {
      expect(
        UserProgressSchema.safeParse({ ...validUserProgress, lastPlayedDate: '01-15-2024' })
          .success
      ).toBe(false);
    });

    it('should reject date with time', () => {
      expect(
        UserProgressSchema.safeParse({
          ...validUserProgress,
          lastPlayedDate: '2024-01-15T10:00:00Z',
        }).success
      ).toBe(false);
    });
  });

  describe('nonnegative counters', () => {
    it.each(['totalStars', 'totalLevelsCompleted', 'currentStreak', 'longestStreak', 'totalTimeMinutes'])(
      'should reject negative %s',
      (field) => {
        expect(
          UserProgressSchema.safeParse({ ...validUserProgress, [field]: -1 }).success
        ).toBe(false);
      }
    );

    it.each(['totalStars', 'totalLevelsCompleted', 'currentStreak', 'longestStreak', 'totalTimeMinutes'])(
      'should accept zero %s',
      (field) => {
        expect(
          UserProgressSchema.safeParse({ ...validUserProgress, [field]: 0 }).success
        ).toBe(true);
      }
    );
  });

  describe('optional currentTitle', () => {
    it('should accept with currentTitle', () => {
      const result = UserProgressSchema.safeParse({
        ...validUserProgress,
        currentTitle: 'Math Master',
      });
      expect(result.success).toBe(true);
    });

    it('should accept without currentTitle', () => {
      expect(UserProgressSchema.safeParse(validUserProgress).success).toBe(true);
    });
  });

  describe('worldProgress as record', () => {
    it('should accept with world progress entries', () => {
      const result = UserProgressSchema.safeParse({
        ...validUserProgress,
        worldProgress: {
          'world-3': {
            worldId: 'world-3',
            isUnlocked: true,
            isCompleted: false,
            starsEarned: 5,
            starsTotal: 45,
            currentChapterId: 'chapter-3-1',
            currentLevelId: 'level-3-1-1',
            completedLevels: [],
            startedAt: new Date('2024-01-10'),
          },
        },
      });
      expect(result.success).toBe(true);
    });
  });
});
