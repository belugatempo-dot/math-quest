import { describe, it, expect } from 'vitest';
import {
  LevelTypeSchema,
  TeachingContentSchema,
  TeachingStepSchema,
  GamePhaseSchema,
  VisualTypeSchema,
  InteractionTypeSchema,
  TeachingFormatSchema,
  ReflectionPromptSchema,
  LevelSchema,
} from './level';

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

  it('should reject missing text for single-message format', () => {
    expect(TeachingContentSchema.safeParse({ format: 'single-message' }).success).toBe(false);
  });

  it('should accept single-message format with text', () => {
    const result = TeachingContentSchema.safeParse({
      format: 'single-message',
      text: 'Learn about angles',
    });
    expect(result.success).toBe(true);
  });

  it('should accept multi-step-lesson format with steps', () => {
    const result = TeachingContentSchema.safeParse({
      format: 'multi-step-lesson',
      steps: [
        {
          id: 'step-1',
          characterId: 'prof-owlbert',
          expression: 'happy',
          dialogue: 'Welcome to the lesson on angles!',
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('should reject multi-step-lesson format without steps', () => {
    const result = TeachingContentSchema.safeParse({
      format: 'multi-step-lesson',
    });
    expect(result.success).toBe(false);
  });

  it('should reject multi-step-lesson format with empty steps array', () => {
    const result = TeachingContentSchema.safeParse({
      format: 'multi-step-lesson',
      steps: [],
    });
    expect(result.success).toBe(false);
  });

  it('should accept multi-step-lesson with all step fields', () => {
    const result = TeachingContentSchema.safeParse({
      format: 'multi-step-lesson',
      steps: [
        {
          id: 'step-1',
          characterId: 'prof-owlbert',
          expression: 'thinking',
          dialogue: 'Let me show you what a right angle looks like.',
          visualType: 'angle-diagram',
          visualProps: { angleValue: 90, angleType: 'right' },
          interactionType: 'click-to-reveal',
        },
      ],
      estimatedSeconds: 120,
      skippable: true,
    });
    expect(result.success).toBe(true);
  });

  it('should accept optional estimatedSeconds and skippable', () => {
    const result = TeachingContentSchema.safeParse({
      format: 'single-message',
      text: 'Remember: angles are everywhere!',
      estimatedSeconds: 30,
      skippable: false,
    });
    expect(result.success).toBe(true);
  });

  it('should still accept legacy format (no format field) with text', () => {
    const result = TeachingContentSchema.safeParse({
      text: 'Learn about multiplication',
    });
    expect(result.success).toBe(true);
  });

  it('should accept legacy format with all optional fields', () => {
    const result = TeachingContentSchema.safeParse({
      text: 'Learn multiplication',
      characterId: 'char-1',
      visualUrl: '/img.png',
      audioUrl: '/audio.mp3',
    });
    expect(result.success).toBe(true);
  });
});

describe('TeachingStepSchema', () => {
  const validStep = {
    id: 'step-1',
    characterId: 'prof-owlbert',
    expression: 'happy',
    dialogue: 'Welcome to the lesson!',
  };

  it('should accept a valid teaching step with required fields', () => {
    expect(TeachingStepSchema.safeParse(validStep).success).toBe(true);
  });

  it('should accept step with all optional fields', () => {
    const result = TeachingStepSchema.safeParse({
      ...validStep,
      visualType: 'angle-diagram',
      visualProps: { angleValue: 90 },
      interactionType: 'click-to-reveal',
    });
    expect(result.success).toBe(true);
  });

  it('should reject step without id', () => {
    const { id: _, ...noId } = validStep;
    expect(TeachingStepSchema.safeParse(noId).success).toBe(false);
  });

  it('should reject step without characterId', () => {
    const { characterId: _, ...noCharId } = validStep;
    expect(TeachingStepSchema.safeParse(noCharId).success).toBe(false);
  });

  it('should reject step without expression', () => {
    const { expression: _, ...noExpr } = validStep;
    expect(TeachingStepSchema.safeParse(noExpr).success).toBe(false);
  });

  it('should reject step without dialogue', () => {
    const { dialogue: _, ...noDlg } = validStep;
    expect(TeachingStepSchema.safeParse(noDlg).success).toBe(false);
  });

  it('should reject step with empty dialogue', () => {
    expect(TeachingStepSchema.safeParse({ ...validStep, dialogue: '' }).success).toBe(false);
  });

  it('should accept all valid visual types', () => {
    const types = ['angle-diagram', 'worked-example', 'concept-diagram', 'none'];
    types.forEach((type) => {
      expect(
        TeachingStepSchema.safeParse({ ...validStep, visualType: type }).success
      ).toBe(true);
    });
  });

  it('should reject invalid visual type', () => {
    expect(
      TeachingStepSchema.safeParse({ ...validStep, visualType: 'invalid' }).success
    ).toBe(false);
  });

  it('should accept all valid interaction types', () => {
    const types = ['click-to-continue', 'click-to-reveal', 'highlight-interactive'];
    types.forEach((type) => {
      expect(
        TeachingStepSchema.safeParse({ ...validStep, interactionType: type }).success
      ).toBe(true);
    });
  });

  it('should reject invalid interaction type', () => {
    expect(
      TeachingStepSchema.safeParse({ ...validStep, interactionType: 'drag-drop' }).success
    ).toBe(false);
  });
});

describe('GamePhaseSchema', () => {
  const validPhases = ['teaching', 'problem', 'feedback', 'teaching-point', 'adaptive-reteach', 'complete'];

  it.each(validPhases)('should accept valid phase "%s"', (phase) => {
    expect(GamePhaseSchema.safeParse(phase).success).toBe(true);
  });

  it('should reject invalid phase', () => {
    expect(GamePhaseSchema.safeParse('invalid').success).toBe(false);
  });
});

describe('VisualTypeSchema', () => {
  const validTypes = ['angle-diagram', 'worked-example', 'concept-diagram', 'none'];

  it.each(validTypes)('should accept valid visual type "%s"', (type) => {
    expect(VisualTypeSchema.safeParse(type).success).toBe(true);
  });

  it('should reject invalid type', () => {
    expect(VisualTypeSchema.safeParse('video').success).toBe(false);
  });
});

describe('InteractionTypeSchema', () => {
  const validTypes = ['click-to-continue', 'click-to-reveal', 'highlight-interactive'];

  it.each(validTypes)('should accept valid interaction type "%s"', (type) => {
    expect(InteractionTypeSchema.safeParse(type).success).toBe(true);
  });

  it('should reject invalid type', () => {
    expect(InteractionTypeSchema.safeParse('drag-and-drop').success).toBe(false);
  });
});

describe('TeachingFormatSchema', () => {
  it('should accept single-message', () => {
    expect(TeachingFormatSchema.safeParse('single-message').success).toBe(true);
  });

  it('should accept multi-step-lesson', () => {
    expect(TeachingFormatSchema.safeParse('multi-step-lesson').success).toBe(true);
  });

  it('should reject invalid format', () => {
    expect(TeachingFormatSchema.safeParse('video-lesson').success).toBe(false);
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
    it('should accept with legacy teaching content (text only)', () => {
      const result = LevelSchema.safeParse({
        ...validLevel,
        teaching: { text: 'Learn something new' },
      });
      expect(result.success).toBe(true);
    });

    it('should accept with single-message teaching content', () => {
      const result = LevelSchema.safeParse({
        ...validLevel,
        teaching: { format: 'single-message', text: 'Learn something new' },
      });
      expect(result.success).toBe(true);
    });

    it('should accept with multi-step-lesson teaching content', () => {
      const result = LevelSchema.safeParse({
        ...validLevel,
        teaching: {
          format: 'multi-step-lesson',
          steps: [
            {
              id: 'step-1',
              characterId: 'prof-owlbert',
              expression: 'happy',
              dialogue: 'Welcome to the lesson about multiplication!',
              visualType: 'worked-example',
              interactionType: 'click-to-reveal',
            },
          ],
          estimatedSeconds: 120,
          skippable: true,
        },
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
