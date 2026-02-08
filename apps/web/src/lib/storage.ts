const PROGRESS_KEY = 'mathquest-progress';

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

export function loadProgress(): GameProgress {
  if (typeof window === 'undefined') return defaultProgress;

  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      return JSON.parse(stored) as GameProgress;
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
  return defaultProgress;
}

export function saveProgress(progress: GameProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function completeLevelProgress(
  levelId: string,
  stars: number,
  attempts: number,
  hintsUsed: number
): GameProgress {
  const progress = loadProgress();

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

  saveProgress(progress);
  return progress;
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROGRESS_KEY);
}
