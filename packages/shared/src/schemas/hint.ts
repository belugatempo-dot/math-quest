import { z } from 'zod';

export const HintTypeSchema = z.enum([
  'conceptual',
  'directional',
  'scaffolded',
  'visual',
  'worked_example'
]);

export const HintSchema = z.object({
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  cost: z.number().min(0).max(2),
  text: z.string().min(10, 'Hint text too short'),
  audio: z.string().optional(),
  visual: z.object({
    id: z.string(),
    type: z.enum(['image', 'animation', 'interactive']),
    url: z.string(),
    alt: z.string(),
    position: z.enum(['top', 'middle', 'bottom', 'inline']).optional(),
  }).optional(),
  type: HintTypeSchema,
});

export type HintSchemaType = z.infer<typeof HintSchema>;
