import { z } from 'zod';
import { HintSchema } from './hint';

export const ProblemTypeSchema = z.enum([
  'multiple_choice',
  'numeric_input',
  'text_input',
  'multi_select',
  'ordering',
  'matching',
  'fill_in_blank',
  'tap_to_count',
  'drag_and_drop',
  'drawing',
  'expression_builder'
]);

export const ProblemCategorySchema = z.enum([
  'thinking',
  'strategic_practice',
  'fluency',
  'compare_without_calc',
  'find_the_error',
  'impossibility',
  'working_backwards',
  'pattern_discovery',
  'multiple_paths'
]);

export const InputTypeSchema = z.enum([
  'number_pad',
  'multiple_choice',
  'checkbox_group',
  'text_field',
  'drag_drop',
  'tap_select',
  'slider',
  'expression_input',
  'drawing_canvas'
]);

export const AnswerSchema = z.object({
  value: z.union([
    z.string(),
    z.number(),
    z.array(z.string()),
    z.array(z.number())
  ]),
  displayValue: z.string().optional(),
  explanation: z.string().optional(),
  orderIndependent: z.boolean().optional(),
  autoAccept: z.boolean().optional(),
});

export const VisualAssetSchema = z.object({
  id: z.string(),
  type: z.enum(['image', 'animation', 'interactive']),
  url: z.string(),
  alt: z.string(),
  position: z.enum(['top', 'middle', 'bottom', 'inline']).optional(),
});

export const CommonMistakeSchema = z.object({
  answer: z.union([z.string(), z.number()]),
  feedback: z.string(),
});

export const FollowUpSchema = z.object({
  text: z.string(),
  insight: z.string(),
});

export const ProblemSchema = z.object({
  id: z.string().regex(/^problem(-level)?-\d+-\d+-\d+-\d+$/, 'Invalid problem ID format'),
  levelId: z.string(),
  sequence: z.number().positive(),
  type: ProblemTypeSchema,
  category: ProblemCategorySchema,
  statement: z.string().min(10, 'Problem statement too short'),
  statementAudio: z.string().optional(),
  visualAssets: z.array(VisualAssetSchema).optional(),
  inputType: InputTypeSchema,
  correctAnswer: AnswerSchema,
  acceptableAnswers: z.array(AnswerSchema).optional(),
  hints: z.array(HintSchema).length(3, 'Exactly 3 hints required'),
  solutionExplanation: z.string(),
  teachingPoint: z.string().min(10, 'Teaching point too short'),
  commonMistakes: z.array(CommonMistakeSchema).optional(),
  followUp: FollowUpSchema.optional(),
  tags: z.array(z.string()),
  difficulty: z.number().min(1).max(5),
}).refine(
  (p) => {
    // Numeric input problems must have integer answers
    if (p.type === 'numeric_input' && typeof p.correctAnswer.value === 'number') {
      return Number.isInteger(p.correctAnswer.value);
    }
    return true;
  },
  { message: 'Numeric input problems must have integer answers' }
);

export type ProblemSchemaType = z.infer<typeof ProblemSchema>;
