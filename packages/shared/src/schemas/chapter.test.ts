import { describe, it, expect } from 'vitest';
import { ChapterSchema } from './chapter';

describe('ChapterSchema', () => {
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

  const validChapter = {
    id: 'chapter-3-1',
    worldId: 'world-3',
    number: 1,
    name: 'Getting Started',
    topic: 'Introduction to Multiplication',
    weekStart: 1,
    weekEnd: 2,
    levels: [validLevel],
    learningObjectives: ['Learn basic multiplication'],
    signatureContent: ['Times tables'],
    isBoss: false,
  };

  it('should accept a valid chapter', () => {
    expect(ChapterSchema.safeParse(validChapter).success).toBe(true);
  });

  describe('id validation', () => {
    it('should accept valid chapter ID format', () => {
      expect(ChapterSchema.safeParse(validChapter).success).toBe(true);
    });

    it('should reject invalid ID format', () => {
      expect(ChapterSchema.safeParse({ ...validChapter, id: 'bad-id' }).success).toBe(false);
    });

    it('should reject ID with wrong format', () => {
      expect(
        ChapterSchema.safeParse({ ...validChapter, id: 'chapter-3-1-1' }).success
      ).toBe(false);
    });
  });

  describe('name validation', () => {
    it('should reject empty name', () => {
      expect(ChapterSchema.safeParse({ ...validChapter, name: '' }).success).toBe(false);
    });
  });

  describe('levels validation', () => {
    it('should require at least 1 level', () => {
      expect(ChapterSchema.safeParse({ ...validChapter, levels: [] }).success).toBe(false);
    });
  });

  describe('weekStart/weekEnd validation', () => {
    it('should accept positive weekStart', () => {
      expect(ChapterSchema.safeParse({ ...validChapter, weekStart: 1 }).success).toBe(true);
    });

    it('should reject zero weekStart', () => {
      expect(ChapterSchema.safeParse({ ...validChapter, weekStart: 0 }).success).toBe(false);
    });

    it('should reject negative weekStart', () => {
      expect(ChapterSchema.safeParse({ ...validChapter, weekStart: -1 }).success).toBe(false);
    });

    it('should accept positive weekEnd', () => {
      expect(ChapterSchema.safeParse({ ...validChapter, weekEnd: 5 }).success).toBe(true);
    });

    it('should reject zero weekEnd', () => {
      expect(ChapterSchema.safeParse({ ...validChapter, weekEnd: 0 }).success).toBe(false);
    });
  });

  it('should reject missing required fields', () => {
    expect(ChapterSchema.safeParse({}).success).toBe(false);
  });
});
