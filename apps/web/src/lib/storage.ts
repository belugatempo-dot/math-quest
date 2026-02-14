const OLD_PROGRESS_KEY = 'mathquest-progress';

function progressKey(profileId: string): string {
  return `mathquest-progress-${profileId}`;
}

export interface LevelProgress {
  stars: number;
  completedAt: string;
  attempts: number;
  hintsUsed: number;
}

export interface GameProgress {
  completedLevels: Record<string, LevelProgress>;
  totalStars: number;
  lastPlayedLevelId: string | null;
  lastPlayedAt: string | null;
}

const defaultProgress: GameProgress = {
  completedLevels: {},
  totalStars: 0,
  lastPlayedLevelId: null,
  lastPlayedAt: null,
};

export function loadProgress(profileId: string): GameProgress {
  if (typeof window === 'undefined') return defaultProgress;

  try {
    const stored = localStorage.getItem(progressKey(profileId));
    if (stored) {
      return JSON.parse(stored) as GameProgress;
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
  return defaultProgress;
}

export function saveProgress(profileId: string, progress: GameProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(progressKey(profileId), JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function completeLevelProgress(
  profileId: string,
  levelId: string,
  stars: number,
  attempts: number,
  hintsUsed: number
): GameProgress {
  const progress = loadProgress(profileId);

  const existing = progress.completedLevels[levelId];
  const newStars = existing ? Math.max(existing.stars, stars) : stars;

  // Update total stars (subtract old stars if improving)
  if (existing) {
    progress.totalStars = progress.totalStars - existing.stars + newStars;
  } else {
    progress.totalStars += newStars;
  }

  progress.completedLevels[levelId] = {
    stars: newStars,
    completedAt: new Date().toISOString(),
    attempts: existing ? existing.attempts + attempts : attempts,
    hintsUsed: existing ? Math.min(existing.hintsUsed, hintsUsed) : hintsUsed,
  };

  progress.lastPlayedLevelId = levelId;
  progress.lastPlayedAt = new Date().toISOString();

  saveProgress(profileId, progress);
  return progress;
}

export function resetProgress(profileId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(progressKey(profileId));
}

/**
 * Migrate old single-key progress to a new profile's namespaced key.
 * Returns the migrated GameProgress if old data existed, or null.
 */
export function migrateOldProgress(profileId: string): GameProgress | null {
  if (typeof window === 'undefined') return null;

  try {
    const oldData = localStorage.getItem(OLD_PROGRESS_KEY);
    if (!oldData) return null;

    const parsed = JSON.parse(oldData) as GameProgress;
    saveProgress(profileId, parsed);
    localStorage.removeItem(OLD_PROGRESS_KEY);
    return parsed;
  } catch (e) {
    console.error('Failed to migrate old progress:', e);
    return null;
  }
}
