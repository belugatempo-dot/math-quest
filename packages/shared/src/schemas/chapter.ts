import { z } from 'zod';
import { LevelSchema } from './level';

export const ChapterSchema = z.object({
  id: z.string().regex(/^chapter-\d+-\d+$/, 'Invalid chapter ID format'),
  worldId: z.string(),
  number: z.number().positive(),
  name: z.string().min(1),
  topic: z.string(),
  weekStart: z.number().positive(),
  weekEnd: z.number().positive(),
  levels: z.array(LevelSchema).min(1),
  learningObjectives: z.array(z.string()),
  signatureContent: z.array(z.string()),
  isBoss: z.boolean(),
});

export type ChapterSchemaType = z.infer<typeof ChapterSchema>;
