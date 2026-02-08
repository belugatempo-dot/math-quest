import { describe, it, expect } from 'vitest';
import { LevelTypeSchema, TeachingContentSchema, ReflectionPromptSchema, LevelSchema } from './level';

describe('LevelTypeSchema', () => {
  const validTypes = ['standard', 'teaching', 'practice', 'challenge', 'quiz', 'boss'];

  it.each(validTypes)('should accept valid type "%s"', (type) => {
    expect(LevelTypeSchema.safeParse(type).success).toBe(true);
  });

  it('should reject invalid type', () => {
    expect(LevelTypeSchema.safeParse('invalid').success).toBe(false);
  });

  it('should reject empty string', () => {
    expect(LevelTypeSchema.safeParse('').success).toBe(false);
  });
});

describe('TeachingContentSchema', () => {
  it('should accept valid teaching content with text only', () => {
    const result = TeachingContentSchema.safeParse({ text: 'Learn about multiplication' });
    expect(result.success).toBe(true);
  });

  it('should accept with all optional fields', () => {
    const result = TeachingContentSchema.safeParse({
      text: 'Learn multiplication',
      characterId: 'char-1',
      visualUrl: '/img.png',
      audioUrl: '/audio.mp3',
    });
    expect(result.success).toBe(true);
  });

  it('should reject missing text', () => {
    expect(TeachingContentSchema.safeParse({}).success).toBe(false);
  });
});

describe('ReflectionPromptSchema', () => {
  it('should accept valid reflection prompt', () => {
    const result = ReflectionPromptSchema.safeParse({
      text: 'What did you learn?',
      insight: 'Multiplication patterns',
    });
    expect(result.success).toBe(true);
  });

  it('should reject missing text', () => {
    expect(ReflectionPromptSchema.safeParse({ insight: 'something' }).success).toBe(false);
  });

  it('should reject missing insight', () => {
    expect(ReflectionPromptSchema.safeParse({ text: 'something' }).success).toBe(false);
  });
});

describe('LevelSchema', () => {
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
    tags: ['multiplication'],
    difficulty: 3,
  };

  const validLevel = {
    id: 'level-3-1-1',
    chapterId: 'chapter-3-1',
    worldId: 'world-3',
    number: 1,
    name: 'First Steps',
    type: 'teaching',
    storyContext: 'You arrive at the mountain base',
    problems: [validProblem],
    difficulty: 2,
    estimatedMinutes: 10,
    isChallenge: false,
    isBoss: false,
  };

  it('should accept a valid level', () => {
    expect(LevelSchema.safeParse(validLevel).success).toBe(true);
  });

  describe('id validation', () => {
    it('should accept valid level ID format', () => {
      expect(LevelSchema.safeParse(validLevel).success).toBe(true);
    });

    it('should reject invalid ID format', () => {
      expect(LevelSchema.safeParse({ ...validLevel, id: 'bad-id' }).success).toBe(false);
    });

    it('should reject ID with wrong prefix', () => {
      expect(
        LevelSchema.safeParse({ ...validLevel, id: 'chapter-3-1-1' }).success
      ).toBe(false);
    });
  });

  describe('name validation', () => {
    it('should reject empty name', () => {
      expect(LevelSchema.safeParse({ ...validLevel, name: '' }).success).toBe(false);
    });
  });

  describe('problems validation', () => {
    it('should require at least 1 problem', () => {
      expect(LevelSchema.safeParse({ ...validLevel, problems: [] }).success).toBe(false);
    });
  });

  describe('difficulty validation', () => {
    it('should accept difficulty 1', () => {
      expect(LevelSchema.safeParse({ ...validLevel, difficulty: 1 }).success).toBe(true);
    });

    it('should accept difficulty 5', () => {
      expect(LevelSchema.safeParse({ ...validLevel, difficulty: 5 }).success).toBe(true);
    });

    it('should reject difficulty 0', () => {
      expect(LevelSchema.safeParse({ ...validLevel, difficulty: 0 }).success).toBe(false);
    });

    it('should reject difficulty 6', () => {
      expect(LevelSchema.safeParse({ ...validLevel, difficulty: 6 }).success).toBe(false);
    });
  });

  describe('optional fields', () => {
    it('should accept with teaching content', () => {
      const result = LevelSchema.safeParse({
        ...validLevel,
        teaching: { text: 'Learn something new' },
      });
      expect(result.success).toBe(true);
    });

    it('should accept with reflection prompt', () => {
      const result = LevelSchema.safeParse({
        ...validLevel,
        reflection: { text: 'What did you learn?', insight: 'Key takeaway' },
      });
      expect(result.success).toBe(true);
    });
  });

  describe('number validation', () => {
    it('should accept positive number', () => {
      expect(LevelSchema.safeParse({ ...validLevel, number: 1 }).success).toBe(true);
    });

    it('should reject zero', () => {
      expect(LevelSchema.safeParse({ ...validLevel, number: 0 }).success).toBe(false);
    });
  });

  describe('estimatedMinutes validation', () => {
    it('should accept positive value', () => {
      expect(LevelSchema.safeParse({ ...validLevel, estimatedMinutes: 5 }).success).toBe(true);
    });

    it('should reject zero', () => {
      expect(LevelSchema.safeParse({ ...validLevel, estimatedMinutes: 0 }).success).toBe(false);
    });
  });
});
