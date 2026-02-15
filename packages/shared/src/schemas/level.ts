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

export const VisualTypeSchema = z.enum([
  'angle-diagram',
  'worked-example',
  'concept-diagram',
  'none',
]);

export const InteractionTypeSchema = z.enum([
  'click-to-continue',
  'click-to-reveal',
  'highlight-interactive',
]);

export const TeachingFormatSchema = z.enum([
  'single-message',
  'multi-step-lesson',
]);

export const GamePhaseSchema = z.enum([
  'teaching',
  'problem',
  'feedback',
  'teaching-point',
  'adaptive-reteach',
  'complete',
]);

export const TeachingStepSchema = z.object({
  id: z.string().min(1),
  characterId: z.string().min(1),
  expression: z.string().min(1),
  dialogue: z.string().min(1),
  visualType: VisualTypeSchema.optional(),
  visualProps: z.record(z.unknown()).optional(),
  interactionType: InteractionTypeSchema.optional(),
});

export const TeachingContentSchema = z.object({
  format: TeachingFormatSchema.optional(),
  text: z.string().optional(),
  characterId: z.string().optional(),
  steps: z.array(TeachingStepSchema).min(1).optional(),
  estimatedSeconds: z.number().positive().optional(),
  skippable: z.boolean().optional(),
  visualUrl: z.string().optional(),
  audioUrl: z.string().optional(),
}).refine(
  (data) => {
    // Legacy format (no format field): text is required
    if (!data.format) return !!data.text;
    // single-message: text is required
    if (data.format === 'single-message') return !!data.text;
    // multi-step-lesson: steps is required
    if (data.format === 'multi-step-lesson') return !!data.steps && data.steps.length > 0;
    return true;
  },
  {
    message: 'single-message requires text; multi-step-lesson requires steps',
  }
);

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
