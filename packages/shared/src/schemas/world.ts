import { z } from 'zod';
import { ChapterSchema } from './chapter';

export const ColorPaletteSchema = z.object({
  primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  background: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  text: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.enum(['companion', 'strategist', 'teacher', 'challenger']),
  personality: z.string(),
  avatarUrl: z.string().optional(),
});

export const WorldSchema = z.object({
  id: z.string().regex(/^world-\d+$/, 'Invalid world ID format'),
  name: z.string().min(1),
  theme: z.string(),
  baLevel: z.number().positive(),
  targetAgeMin: z.number().min(5).max(13),
  targetAgeMax: z.number().min(5).max(13),
  totalLevels: z.number().positive(),
  chapters: z.array(ChapterSchema).min(1),
  colorPalette: ColorPaletteSchema,
  characters: z.array(CharacterSchema),
  isLocked: z.boolean(),
  prerequisiteWorldId: z.string().nullable(),
  estimatedWeeks: z.number().positive(),
});

export type WorldSchemaType = z.infer<typeof WorldSchema>;
