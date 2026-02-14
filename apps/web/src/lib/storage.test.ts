import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  loadProgress,
  saveProgress,
  completeLevelProgress,
  resetProgress,
  migrateOldProgress,
  type GameProgress,
} from './storage';

const PROFILE_ID = 'test-profile-id';

const defaultProgress: GameProgress = {
  completedLevels: {},
  totalStars: 0,
  lastPlayedLevelId: null,
  lastPlayedAt: null,
};

describe('loadProgress', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return default progress when window is undefined', () => {
    vi.stubGlobal('window', undefined);
    const result = loadProgress(PROFILE_ID);
    expect(result).toEqual(defaultProgress);
  });

  it('should return default progress when localStorage is empty', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    const result = loadProgress(PROFILE_ID);
    expect(result).toEqual(defaultProgress);
  });

  it('should read from profile-namespaced key', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    loadProgress(PROFILE_ID);
    expect(localStorage.getItem).toHaveBeenCalledWith(`mathquest-progress-${PROFILE_ID}`);
  });

  it('should return parsed progress from localStorage', () => {
    const stored: GameProgress = {
      completedLevels: { 'level-3-1-1': { stars: 3, completedAt: '2024-01-15', attempts: 1, hintsUsed: 0 } },
      totalStars: 3,
      lastPlayedLevelId: 'level-3-1-1',
      lastPlayedAt: '2024-01-15',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(stored));
    const result = loadProgress(PROFILE_ID);
    expect(result).toEqual(stored);
  });

  it('should return default progress on malformed JSON', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(localStorage.getItem).mockReturnValue('not valid json{{{');
    const result = loadProgress(PROFILE_ID);
    expect(result).toEqual(defaultProgress);
    expect(consoleSpy).toHaveBeenCalledWith('Failed to load progress:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});

describe('saveProgress', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should not call localStorage when window is undefined', () => {
    vi.stubGlobal('window', undefined);
    saveProgress(PROFILE_ID, defaultProgress);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should call localStorage.setItem with profile-namespaced key', () => {
    const progress: GameProgress = { ...defaultProgress, totalStars: 5 };
    saveProgress(PROFILE_ID, progress);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      `mathquest-progress-${PROFILE_ID}`,
      JSON.stringify(progress)
    );
  });

  it('should catch and log errors', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(localStorage.setItem).mockImplementation(() => {
      throw new Error('Storage full');
    });
    saveProgress(PROFILE_ID, defaultProgress);
    expect(consoleSpy).toHaveBeenCalledWith('Failed to save progress:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});

describe('completeLevelProgress', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('should add a new level completion', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(defaultProgress));
    const result = completeLevelProgress(PROFILE_ID, 'level-3-1-1', 3, 1, 0);
    expect(result.completedLevels['level-3-1-1']).toEqual({
      stars: 3,
      completedAt: new Date('2024-06-15T12:00:00Z').toISOString(),
      attempts: 1,
      hintsUsed: 0,
    });
    expect(result.totalStars).toBe(3);
    expect(result.lastPlayedLevelId).toBe('level-3-1-1');
    expect(result.lastPlayedAt).toBe(new Date('2024-06-15T12:00:00Z').toISOString());
  });

  it('should improve stars on existing level (higher stars)', () => {
    const existing: GameProgress = {
      completedLevels: {
        'level-3-1-1': { stars: 1, completedAt: '2024-01-01', attempts: 3, hintsUsed: 2 },
      },
      totalStars: 1,
      lastPlayedLevelId: 'level-3-1-1',
      lastPlayedAt: '2024-01-01',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(existing));
    const result = completeLevelProgress(PROFILE_ID, 'level-3-1-1', 3, 1, 0);
    expect(result.completedLevels['level-3-1-1'].stars).toBe(3);
    expect(result.totalStars).toBe(3);
    expect(result.completedLevels['level-3-1-1'].attempts).toBe(4);
    expect(result.completedLevels['level-3-1-1'].hintsUsed).toBe(0);
  });

  it('should keep higher stars when new attempt has fewer', () => {
    const existing: GameProgress = {
      completedLevels: {
        'level-3-1-1': { stars: 3, completedAt: '2024-01-01', attempts: 1, hintsUsed: 0 },
      },
      totalStars: 3,
      lastPlayedLevelId: 'level-3-1-1',
      lastPlayedAt: '2024-01-01',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(existing));
    const result = completeLevelProgress(PROFILE_ID, 'level-3-1-1', 1, 2, 3);
    expect(result.completedLevels['level-3-1-1'].stars).toBe(3);
    expect(result.totalStars).toBe(3);
    expect(result.completedLevels['level-3-1-1'].attempts).toBe(3);
    expect(result.completedLevels['level-3-1-1'].hintsUsed).toBe(0);
  });

  it('should save progress after completing level', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(defaultProgress));
    completeLevelProgress(PROFILE_ID, 'level-3-1-1', 2, 1, 1);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

describe('resetProgress', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should not call localStorage when window is undefined', () => {
    vi.stubGlobal('window', undefined);
    resetProgress(PROFILE_ID);
    expect(localStorage.removeItem).not.toHaveBeenCalled();
  });

  it('should call localStorage.removeItem with profile-namespaced key', () => {
    resetProgress(PROFILE_ID);
    expect(localStorage.removeItem).toHaveBeenCalledWith(`mathquest-progress-${PROFILE_ID}`);
  });
});

describe('migrateOldProgress', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return null when window is undefined', () => {
    vi.stubGlobal('window', undefined);
    expect(migrateOldProgress(PROFILE_ID)).toBeNull();
  });

  it('should return null when no old progress exists', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    expect(migrateOldProgress(PROFILE_ID)).toBeNull();
  });

  it('should migrate old progress to new profile key', () => {
    const oldProgress: GameProgress = {
      completedLevels: {
        'level-3-1-1': { stars: 3, completedAt: '2024-01-15', attempts: 1, hintsUsed: 0 },
      },
      totalStars: 3,
      lastPlayedLevelId: 'level-3-1-1',
      lastPlayedAt: '2024-01-15',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(oldProgress));
    const result = migrateOldProgress(PROFILE_ID);
    expect(result).toEqual(oldProgress);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      `mathquest-progress-${PROFILE_ID}`,
      JSON.stringify(oldProgress)
    );
  });

  it('should remove old progress key after migration', () => {
    const oldProgress: GameProgress = {
      completedLevels: {},
      totalStars: 0,
      lastPlayedLevelId: null,
      lastPlayedAt: null,
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(oldProgress));
    migrateOldProgress(PROFILE_ID);
    expect(localStorage.removeItem).toHaveBeenCalledWith('mathquest-progress');
  });

  it('should return null and log error on malformed old data', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(localStorage.getItem).mockReturnValue('{{bad');
    const result = migrateOldProgress(PROFILE_ID);
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Failed to migrate old progress:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});
