import { z } from 'zod';
import { AnswerSchema } from './problem';

export const UserPreferencesSchema = z.object({
  soundEnabled: z.boolean(),
  musicEnabled: z.boolean(),
  voiceEnabled: z.boolean(),
  fontSize: z.enum(['small', 'medium', 'large']),
  theme: z.enum(['light', 'dark', 'auto']),
});

export const BadgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  iconUrl: z.string(),
  earnedAt: z.date().optional(),
});

export const TitleSchema = z.object({
  id: z.string(),
  name: z.string(),
  requirement: z.string(),
  worldId: z.string().optional(),
});

export const ProblemResultSchema = z.object({
  problemId: z.string(),
  isCorrect: z.boolean(),
  attempts: z.number().positive(),
  hintsUsed: z.array(z.union([z.literal(1), z.literal(2), z.literal(3)])),
  answerGiven: AnswerSchema,
  timeSeconds: z.number().nonnegative(),
});

export const LevelAttemptSchema = z.object({
  id: z.string(),
  levelId: z.string(),
  startedAt: z.date(),
  completedAt: z.date().optional(),
  starsEarned: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  hintsUsed: z.number().nonnegative(),
  attemptsCount: z.number().positive(),
  timeSeconds: z.number().nonnegative(),
  problemResults: z.array(ProblemResultSchema),
});

export const WorldProgressSchema = z.object({
  worldId: z.string(),
  isUnlocked: z.boolean(),
  isCompleted: z.boolean(),
  starsEarned: z.number().nonnegative(),
  starsTotal: z.number().nonnegative(),
  currentChapterId: z.string(),
  currentLevelId: z.string(),
  completedLevels: z.array(z.string()),
  startedAt: z.date(),
  completedAt: z.date().optional(),
});

export const UserProgressSchema = z.object({
  id: z.string(),
  userId: z.string(),
  worldProgress: z.record(WorldProgressSchema),
  levelAttempts: z.array(LevelAttemptSchema),
  totalStars: z.number().nonnegative(),
  totalLevelsCompleted: z.number().nonnegative(),
  currentStreak: z.number().nonnegative(),
  longestStreak: z.number().nonnegative(),
  lastPlayedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  totalTimeMinutes: z.number().nonnegative(),
  badges: z.array(BadgeSchema),
  titles: z.array(TitleSchema),
  currentTitle: z.string().optional(),
  preferences: UserPreferencesSchema,
});

export type UserProgressSchemaType = z.infer<typeof UserProgressSchema>;
