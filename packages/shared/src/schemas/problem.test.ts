import { describe, it, expect } from 'vitest';
import {
  ProblemTypeSchema,
  ProblemCategorySchema,
  InputTypeSchema,
  AnswerSchema,
  CommonMistakeSchema,
  FollowUpSchema,
  VisualAssetSchema,
  ProblemSchema,
} from './problem';

describe('ProblemTypeSchema', () => {
  const validTypes = [
    'multiple_choice', 'numeric_input', 'text_input', 'multi_select',
    'ordering', 'matching', 'fill_in_blank', 'tap_to_count',
    'drag_and_drop', 'drawing', 'expression_builder',
  ];

  it.each(validTypes)('should accept valid type "%s"', (type) => {
    expect(ProblemTypeSchema.safeParse(type).success).toBe(true);
  });

  it('should reject invalid type', () => {
    expect(ProblemTypeSchema.safeParse('invalid').success).toBe(false);
  });
});

describe('ProblemCategorySchema', () => {
  const validCategories = [
    'thinking', 'strategic_practice', 'fluency', 'compare_without_calc',
    'find_the_error', 'impossibility', 'working_backwards',
    'pattern_discovery', 'multiple_paths',
  ];

  it.each(validCategories)('should accept valid category "%s"', (cat) => {
    expect(ProblemCategorySchema.safeParse(cat).success).toBe(true);
  });

  it('should reject invalid category', () => {
    expect(ProblemCategorySchema.safeParse('invalid').success).toBe(false);
  });
});

describe('InputTypeSchema', () => {
  const validInputTypes = [
    'number_pad', 'multiple_choice', 'checkbox_group', 'text_field',
    'drag_drop', 'tap_select', 'slider', 'expression_input', 'drawing_canvas',
  ];

  it.each(validInputTypes)('should accept valid input type "%s"', (type) => {
    expect(InputTypeSchema.safeParse(type).success).toBe(true);
  });

  it('should reject invalid input type', () => {
    expect(InputTypeSchema.safeParse('invalid').success).toBe(false);
  });
});

describe('AnswerSchema', () => {
  it('should accept string value', () => {
    const result = AnswerSchema.safeParse({ value: 'hello' });
    expect(result.success).toBe(true);
  });

  it('should accept number value', () => {
    const result = AnswerSchema.safeParse({ value: 42 });
    expect(result.success).toBe(true);
  });

  it('should accept string array value', () => {
    const result = AnswerSchema.safeParse({ value: ['a', 'b', 'c'] });
    expect(result.success).toBe(true);
  });

  it('should accept number array value', () => {
    const result = AnswerSchema.safeParse({ value: [1, 2, 3] });
    expect(result.success).toBe(true);
  });

  it('should accept optional displayValue', () => {
    const result = AnswerSchema.safeParse({ value: 42, displayValue: '42 apples' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.displayValue).toBe('42 apples');
  });

  it('should accept optional explanation', () => {
    const result = AnswerSchema.safeParse({ value: 42, explanation: 'Because math' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.explanation).toBe('Because math');
  });

  it('should reject missing value', () => {
    expect(AnswerSchema.safeParse({}).success).toBe(false);
  });

  it('should reject boolean value', () => {
    expect(AnswerSchema.safeParse({ value: true }).success).toBe(false);
  });

  it('should reject object value', () => {
    expect(AnswerSchema.safeParse({ value: { nested: true } }).success).toBe(false);
  });
});

describe('CommonMistakeSchema', () => {
  it('should accept string answer with feedback', () => {
    const result = CommonMistakeSchema.safeParse({ answer: 'wrong', feedback: 'Try again' });
    expect(result.success).toBe(true);
  });

  it('should accept number answer with feedback', () => {
    const result = CommonMistakeSchema.safeParse({ answer: 99, feedback: 'Not quite' });
    expect(result.success).toBe(true);
  });

  it('should reject missing answer', () => {
    expect(CommonMistakeSchema.safeParse({ feedback: 'something' }).success).toBe(false);
  });

  it('should reject missing feedback', () => {
    expect(CommonMistakeSchema.safeParse({ answer: 'wrong' }).success).toBe(false);
  });
});

describe('FollowUpSchema', () => {
  it('should accept valid follow-up', () => {
    const result = FollowUpSchema.safeParse({ text: 'Question?', insight: 'Think about it' });
    expect(result.success).toBe(true);
  });

  it('should reject missing text', () => {
    expect(FollowUpSchema.safeParse({ insight: 'something' }).success).toBe(false);
  });

  it('should reject missing insight', () => {
    expect(FollowUpSchema.safeParse({ text: 'something' }).success).toBe(false);
  });
});

describe('VisualAssetSchema', () => {
  const validAsset = {
    id: 'asset-1',
    type: 'image' as const,
    url: 'https://example.com/img.png',
    alt: 'A nice image',
  };

  it('should accept valid visual asset', () => {
    expect(VisualAssetSchema.safeParse(validAsset).success).toBe(true);
  });

  it.each(['image', 'animation', 'interactive'] as const)(
    'should accept type "%s"',
    (type) => {
      expect(VisualAssetSchema.safeParse({ ...validAsset, type }).success).toBe(true);
    }
  );

  it.each(['top', 'middle', 'bottom', 'inline'] as const)(
    'should accept position "%s"',
    (position) => {
      expect(VisualAssetSchema.safeParse({ ...validAsset, position }).success).toBe(true);
    }
  );

  it('should accept without position (optional)', () => {
    const result = VisualAssetSchema.safeParse(validAsset);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.position).toBeUndefined();
  });

  it('should reject invalid type', () => {
    expect(VisualAssetSchema.safeParse({ ...validAsset, type: 'video' }).success).toBe(false);
  });

  it('should reject invalid position', () => {
    expect(
      VisualAssetSchema.safeParse({ ...validAsset, position: 'left' }).success
    ).toBe(false);
  });

  it('should reject missing required fields', () => {
    expect(VisualAssetSchema.safeParse({ id: 'x' }).success).toBe(false);
  });
});

describe('ProblemSchema', () => {
  const validHint = (tier: 1 | 2 | 3) => ({
    tier,
    cost: tier === 1 ? 0 : tier === 2 ? 1 : 2,
    text: 'This is a helpful hint for students to use',
    type: 'conceptual',
  });

  const validProblem = {
    id: 'problem-3-1-1-1',
    levelId: 'level-3-1-1',
    sequence: 1,
    type: 'numeric_input',
    category: 'thinking',
    statement: 'What is 5 times 3? Show your thinking.',
    inputType: 'number_pad',
    correctAnswer: { value: 15 },
    hints: [validHint(1), validHint(2), validHint(3)],
    solutionExplanation: 'You multiply 5 by 3',
    teachingPoint: 'Multiplication is repeated addition',
    tags: ['multiplication', 'basic'],
    difficulty: 3,
  };

  it('should accept a valid problem', () => {
    expect(ProblemSchema.safeParse(validProblem).success).toBe(true);
  });

  describe('id validation', () => {
    it('should accept valid problem ID format', () => {
      expect(ProblemSchema.safeParse(validProblem).success).toBe(true);
    });

    it('should reject invalid ID format', () => {
      expect(
        ProblemSchema.safeParse({ ...validProblem, id: 'bad-id' }).success
      ).toBe(false);
    });

    it('should reject ID with wrong prefix', () => {
      expect(
        ProblemSchema.safeParse({ ...validProblem, id: 'level-3-1-1-1' }).success
      ).toBe(false);
    });

    it('should accept problem-level- prefix format', () => {
      expect(
        ProblemSchema.safeParse({ ...validProblem, id: 'problem-level-3-1-1-1' }).success
      ).toBe(true);
    });
  });

  describe('statement validation', () => {
    it('should reject statement shorter than 10 chars', () => {
      expect(
        ProblemSchema.safeParse({ ...validProblem, statement: 'Short' }).success
      ).toBe(false);
    });
  });

  describe('hints validation', () => {
    it('should require exactly 3 hints', () => {
      expect(
        ProblemSchema.safeParse({ ...validProblem, hints: [validHint(1)] }).success
      ).toBe(false);
    });

    it('should reject 2 hints', () => {
      expect(
        ProblemSchema.safeParse({
          ...validProblem,
          hints: [validHint(1), validHint(2)],
        }).success
      ).toBe(false);
    });

    it('should reject 4 hints', () => {
      expect(
        ProblemSchema.safeParse({
          ...validProblem,
          hints: [validHint(1), validHint(2), validHint(3), validHint(1)],
        }).success
      ).toBe(false);
    });
  });

  describe('teachingPoint validation', () => {
    it('should reject teaching point shorter than 10 chars', () => {
      expect(
        ProblemSchema.safeParse({ ...validProblem, teachingPoint: 'Too short' }).success
      ).toBe(false);
    });
  });

  describe('difficulty validation', () => {
    it('should accept difficulty 1', () => {
      expect(ProblemSchema.safeParse({ ...validProblem, difficulty: 1 }).success).toBe(true);
    });

    it('should accept difficulty 5', () => {
      expect(ProblemSchema.safeParse({ ...validProblem, difficulty: 5 }).success).toBe(true);
    });

    it('should reject difficulty 0', () => {
      expect(ProblemSchema.safeParse({ ...validProblem, difficulty: 0 }).success).toBe(false);
    });

    it('should reject difficulty 6', () => {
      expect(ProblemSchema.safeParse({ ...validProblem, difficulty: 6 }).success).toBe(false);
    });
  });

  describe('optional fields', () => {
    it('should accept with statementAudio', () => {
      expect(
        ProblemSchema.safeParse({ ...validProblem, statementAudio: 'audio.mp3' }).success
      ).toBe(true);
    });

    it('should accept with visualAssets', () => {
      const result = ProblemSchema.safeParse({
        ...validProblem,
        visualAssets: [{ id: 'v1', type: 'image', url: '/img.png', alt: 'test' }],
      });
      expect(result.success).toBe(true);
    });

    it('should accept with acceptableAnswers', () => {
      const result = ProblemSchema.safeParse({
        ...validProblem,
        acceptableAnswers: [{ value: 15 }, { value: '15' }],
      });
      expect(result.success).toBe(true);
    });

    it('should accept with commonMistakes', () => {
      const result = ProblemSchema.safeParse({
        ...validProblem,
        commonMistakes: [{ answer: 8, feedback: 'You added instead of multiplied' }],
      });
      expect(result.success).toBe(true);
    });

    it('should accept with followUp', () => {
      const result = ProblemSchema.safeParse({
        ...validProblem,
        followUp: { text: 'Can you think of another way?', insight: 'There are always multiple paths' },
      });
      expect(result.success).toBe(true);
    });
  });

  describe('sequence validation', () => {
    it('should accept positive sequence', () => {
      expect(ProblemSchema.safeParse({ ...validProblem, sequence: 1 }).success).toBe(true);
    });

    it('should reject zero sequence', () => {
      expect(ProblemSchema.safeParse({ ...validProblem, sequence: 0 }).success).toBe(false);
    });

    it('should reject negative sequence', () => {
      expect(ProblemSchema.safeParse({ ...validProblem, sequence: -1 }).success).toBe(false);
    });
  });

  describe('custom refinement: numeric_input + integer answer', () => {
    it('should accept numeric_input with integer answer', () => {
      expect(ProblemSchema.safeParse(validProblem).success).toBe(true);
    });

    it('should reject numeric_input with non-integer answer', () => {
      const result = ProblemSchema.safeParse({
        ...validProblem,
        type: 'numeric_input',
        correctAnswer: { value: 3.14 },
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Numeric input problems must have integer answers'
        );
      }
    });

    it('should allow non-integer answer for non-numeric_input type', () => {
      const result = ProblemSchema.safeParse({
        ...validProblem,
        type: 'text_input',
        inputType: 'text_field',
        correctAnswer: { value: 'three point one four' },
      });
      expect(result.success).toBe(true);
    });

    it('should allow numeric_input with string answer (refinement only checks numbers)', () => {
      const result = ProblemSchema.safeParse({
        ...validProblem,
        type: 'numeric_input',
        correctAnswer: { value: '15' },
      });
      expect(result.success).toBe(true);
    });
  });

  it('should reject missing required fields', () => {
    expect(ProblemSchema.safeParse({}).success).toBe(false);
  });
});
