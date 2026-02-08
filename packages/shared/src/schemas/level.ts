import { z } from 'zod';
import { ProblemSchema } from './problem';

export const LevelTypeSchema = z.enum([
  'standard',
  'teaching',
  'practice',
  'challenge',
  'quiz',
  'boss'
]);

export const TeachingContentSchema = z.object({
  text: z.string(),
  characterId: z.string().optional(),
  visualUrl: z.string().optional(),
  audioUrl: z.string().optional(),
});

export const ReflectionPromptSchema = z.object({
  text: z.string(),
  insight: z.string(),
});

export const LevelSchema = z.object({
  id: z.string().regex(/^level-\d+-\d+-\d+$/, 'Invalid level ID format'),
  chapterId: z.string(),
  worldId: z.string(),
  number: z.number().positive(),
  name: z.string().min(1),
  type: LevelTypeSchema,
  storyContext: z.string(),
  problems: z.array(ProblemSchema).min(1),
  teaching: TeachingContentSchema.optional(),
  reflection: ReflectionPromptSchema.optional(),
  difficulty: z.number().min(1).max(5),
  estimatedMinutes: z.number().positive(),
  isChallenge: z.boolean(),
  isBoss: z.boolean(),
});

export type LevelSchemaType = z.infer<typeof LevelSchema>;
