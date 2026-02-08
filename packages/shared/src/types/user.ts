import type { Answer } from './problem';

/**
 * User progress and profile types
 */
export interface UserProgress {
  id: string;
  userId: string;

  // World progress
  worldProgress: Record<string, WorldProgress>;

  // Level attempts history
  levelAttempts: LevelAttempt[];

  // Overall stats
  totalStars: number;
  totalLevelsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate: string;        // ISO date YYYY-MM-DD
  totalTimeMinutes: number;

  // Achievements
  badges: Badge[];
  titles: Title[];
  currentTitle?: string;

  // Settings
  preferences: UserPreferences;
}

export interface WorldProgress {
  worldId: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  starsEarned: number;
  starsTotal: number;
  currentChapterId: string;
  currentLevelId: string;
  completedLevels: string[];
  startedAt: Date;
  completedAt?: Date;
}

export interface LevelAttempt {
  id: string;
  levelId: string;
  startedAt: Date;
  completedAt?: Date;
  starsEarned: 0 | 1 | 2 | 3;
  hintsUsed: number;
  attemptsCount: number;
  timeSeconds: number;
  problemResults: ProblemResult[];
}

export interface ProblemResult {
  problemId: string;
  isCorrect: boolean;
  attempts: number;
  hintsUsed: (1 | 2 | 3)[];      // Which hint tiers were used
  answerGiven: Answer;
  timeSeconds: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  earnedAt?: Date;
}

export interface Title {
  id: string;
  name: string;
  requirement: string;
  worldId?: string;
}

export interface UserPreferences {
  soundEnabled: boolean;
  musicEnabled: boolean;
  voiceEnabled: boolean;
  fontSize: 'small' | 'medium' | 'large';
  theme: 'light' | 'dark' | 'auto';
}
