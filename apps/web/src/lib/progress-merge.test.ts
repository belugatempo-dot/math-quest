import { describe, it, expect } from 'vitest';
import { mergeProgress } from './progress-merge';
import type { GameProgress } from '@/lib/storage';

const emptyProgress: GameProgress = {
  completedLevels: {},
  totalStars: 0,
  lastPlayedLevelId: null,
  lastPlayedAt: null,
};

describe('mergeProgress', () => {
  it('should return empty progress when both are empty', () => {
    const result = mergeProgress(emptyProgress, emptyProgress);
    expect(result).toEqual(emptyProgress);
  });

  it('should return local when cloud is empty', () => {
    const local: GameProgress = {
      completedLevels: {
        'level-3-1-1': {
          stars: 3,
          completedAt: '2026-01-01T00:00:00.000Z',
          attempts: 1,
          hintsUsed: 0,
        },
      },
      totalStars: 3,
      lastPlayedLevelId: 'level-3-1-1',
      lastPlayedAt: '2026-01-01T00:00:00.000Z',
    };

    const result = mergeProgress(local, emptyProgress);
    expect(result.completedLevels['level-3-1-1'].stars).toBe(3);
    expect(result.totalStars).toBe(3);
    expect(result.lastPlayedLevelId).toBe('level-3-1-1');
  });

  it('should return cloud when local is empty', () => {
    const cloud: GameProgress = {
      completedLevels: {
        'level-3-1-2': {
          stars: 2,
          completedAt: '2026-01-02T00:00:00.000Z',
          attempts: 3,
          hintsUsed: 1,
        },
      },
      totalStars: 2,
      lastPlayedLevelId: 'level-3-1-2',
      lastPlayedAt: '2026-01-02T00:00:00.000Z',
    };

    const result = mergeProgress(emptyProgress, cloud);
    expect(result.completedLevels['level-3-1-2'].stars).toBe(2);
    expect(result.totalStars).toBe(2);
  });

  it('should take max stars when both have same level', () => {
    const local: GameProgress = {
      ...emptyProgress,
      completedLevels: {
        'level-3-1-1': {
          stars: 2,
          completedAt: '2026-01-01T00:00:00.000Z',
          attempts: 1,
          hintsUsed: 2,
        },
      },
    };
    const cloud: GameProgress = {
      ...emptyProgress,
      completedLevels: {
        'level-3-1-1': {
          stars: 3,
          completedAt: '2026-01-02T00:00:00.000Z',
          attempts: 2,
          hintsUsed: 1,
        },
      },
    };

    const result = mergeProgress(local, cloud);
    expect(result.completedLevels['level-3-1-1'].stars).toBe(3);
  });

  it('should sum attempts from both sources', () => {
    const local: GameProgress = {
      ...emptyProgress,
      completedLevels: {
        'level-3-1-1': {
          stars: 2,
          completedAt: '2026-01-01T00:00:00.000Z',
          attempts: 3,
          hintsUsed: 1,
        },
      },
    };
    const cloud: GameProgress = {
      ...emptyProgress,
      completedLevels: {
        'level-3-1-1': {
          stars: 1,
          completedAt: '2026-01-02T00:00:00.000Z',
          attempts: 5,
          hintsUsed: 2,
        },
      },
    };

    const result = mergeProgress(local, cloud);
    expect(result.completedLevels['level-3-1-1'].attempts).toBe(8);
  });

  it('should take min hintsUsed (best run)', () => {
    const local: GameProgress = {
      ...emptyProgress,
      completedLevels: {
        'level-3-1-1': {
          stars: 2,
          completedAt: '2026-01-01T00:00:00.000Z',
          attempts: 1,
          hintsUsed: 3,
        },
      },
    };
    const cloud: GameProgress = {
      ...emptyProgress,
      completedLevels: {
        'level-3-1-1': {
          stars: 2,
          completedAt: '2026-01-02T00:00:00.000Z',
          attempts: 1,
          hintsUsed: 1,
        },
      },
    };

    const result = mergeProgress(local, cloud);
    expect(result.completedLevels['level-3-1-1'].hintsUsed).toBe(1);
  });

  it('should take latest completedAt timestamp', () => {
    const local: GameProgress = {
      ...emptyProgress,
      completedLevels: {
        'level-3-1-1': {
          stars: 2,
          completedAt: '2026-01-05T00:00:00.000Z',
          attempts: 1,
          hintsUsed: 0,
        },
      },
    };
    const cloud: GameProgress = {
      ...emptyProgress,
      completedLevels: {
        'level-3-1-1': {
          stars: 2,
          completedAt: '2026-01-01T00:00:00.000Z',
          attempts: 1,
          hintsUsed: 0,
        },
      },
    };

    const result = mergeProgress(local, cloud);
    expect(result.completedLevels['level-3-1-1'].completedAt).toBe(
      '2026-01-05T00:00:00.000Z'
    );
  });

  it('should merge non-overlapping levels', () => {
    const local: GameProgress = {
      ...emptyProgress,
      completedLevels: {
        'level-3-1-1': {
          stars: 3,
          completedAt: '2026-01-01T00:00:00.000Z',
          attempts: 1,
          hintsUsed: 0,
        },
      },
    };
    const cloud: GameProgress = {
      ...emptyProgress,
      completedLevels: {
        'level-3-1-2': {
          stars: 2,
          completedAt: '2026-01-02T00:00:00.000Z',
          attempts: 2,
          hintsUsed: 1,
        },
      },
    };

    const result = mergeProgress(local, cloud);
    expect(Object.keys(result.completedLevels)).toHaveLength(2);
    expect(result.completedLevels['level-3-1-1'].stars).toBe(3);
    expect(result.completedLevels['level-3-1-2'].stars).toBe(2);
    expect(result.totalStars).toBe(5);
  });

  it('should calculate totalStars as sum of all merged level stars', () => {
    const local: GameProgress = {
      ...emptyProgress,
      completedLevels: {
        'level-3-1-1': { stars: 2, completedAt: '2026-01-01T00:00:00.000Z', attempts: 1, hintsUsed: 0 },
        'level-3-1-2': { stars: 1, completedAt: '2026-01-01T00:00:00.000Z', attempts: 1, hintsUsed: 0 },
      },
    };
    const cloud: GameProgress = {
      ...emptyProgress,
      completedLevels: {
        'level-3-1-1': { stars: 3, completedAt: '2026-01-02T00:00:00.000Z', attempts: 1, hintsUsed: 0 },
        'level-3-1-3': { stars: 2, completedAt: '2026-01-02T00:00:00.000Z', attempts: 1, hintsUsed: 0 },
      },
    };

    const result = mergeProgress(local, cloud);
    // level-3-1-1: max(2,3) = 3, level-3-1-2: 1, level-3-1-3: 2 => total 6
    expect(result.totalStars).toBe(6);
  });

  it('should use local lastPlayed when it is more recent', () => {
    const local: GameProgress = {
      ...emptyProgress,
      lastPlayedLevelId: 'level-3-1-1',
      lastPlayedAt: '2026-01-05T00:00:00.000Z',
    };
    const cloud: GameProgress = {
      ...emptyProgress,
      lastPlayedLevelId: 'level-3-1-2',
      lastPlayedAt: '2026-01-01T00:00:00.000Z',
    };

    const result = mergeProgress(local, cloud);
    expect(result.lastPlayedLevelId).toBe('level-3-1-1');
    expect(result.lastPlayedAt).toBe('2026-01-05T00:00:00.000Z');
  });

  it('should use cloud lastPlayed when it is more recent', () => {
    const local: GameProgress = {
      ...emptyProgress,
      lastPlayedLevelId: 'level-3-1-1',
      lastPlayedAt: '2026-01-01T00:00:00.000Z',
    };
    const cloud: GameProgress = {
      ...emptyProgress,
      lastPlayedLevelId: 'level-3-1-2',
      lastPlayedAt: '2026-01-05T00:00:00.000Z',
    };

    const result = mergeProgress(local, cloud);
    expect(result.lastPlayedLevelId).toBe('level-3-1-2');
    expect(result.lastPlayedAt).toBe('2026-01-05T00:00:00.000Z');
  });

  it('should handle null lastPlayedAt in local', () => {
    const local: GameProgress = {
      ...emptyProgress,
      lastPlayedLevelId: null,
      lastPlayedAt: null,
    };
    const cloud: GameProgress = {
      ...emptyProgress,
      lastPlayedLevelId: 'level-3-1-2',
      lastPlayedAt: '2026-01-05T00:00:00.000Z',
    };

    const result = mergeProgress(local, cloud);
    expect(result.lastPlayedLevelId).toBe('level-3-1-2');
  });

  it('should handle null lastPlayedAt in cloud', () => {
    const local: GameProgress = {
      ...emptyProgress,
      lastPlayedLevelId: 'level-3-1-1',
      lastPlayedAt: '2026-01-01T00:00:00.000Z',
    };
    const cloud: GameProgress = {
      ...emptyProgress,
      lastPlayedLevelId: null,
      lastPlayedAt: null,
    };

    const result = mergeProgress(local, cloud);
    expect(result.lastPlayedLevelId).toBe('level-3-1-1');
  });
});
