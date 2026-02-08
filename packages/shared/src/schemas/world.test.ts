import { describe, it, expect } from 'vitest';
import { ColorPaletteSchema, CharacterSchema, WorldSchema } from './world';

describe('ColorPaletteSchema', () => {
  const validPalette = {
    primary: '#3B82F6',
    secondary: '#F97316',
    accent: '#EAB308',
    background: '#F8FAFC',
    text: '#1E293B',
  };

  it('should accept valid hex colors', () => {
    expect(ColorPaletteSchema.safeParse(validPalette).success).toBe(true);
  });

  it('should accept lowercase hex', () => {
    const lower = {
      primary: '#3b82f6',
      secondary: '#f97316',
      accent: '#eab308',
      background: '#f8fafc',
      text: '#1e293b',
    };
    expect(ColorPaletteSchema.safeParse(lower).success).toBe(true);
  });

  it('should reject hex without #', () => {
    expect(
      ColorPaletteSchema.safeParse({ ...validPalette, primary: '3B82F6' }).success
    ).toBe(false);
  });

  it('should reject short hex (#FFF)', () => {
    expect(
      ColorPaletteSchema.safeParse({ ...validPalette, primary: '#FFF' }).success
    ).toBe(false);
  });

  it('should reject invalid hex characters', () => {
    expect(
      ColorPaletteSchema.safeParse({ ...validPalette, primary: '#GGGGGG' }).success
    ).toBe(false);
  });

  it('should reject missing color field', () => {
    const { primary, ...missingPrimary } = validPalette;
    expect(ColorPaletteSchema.safeParse(missingPrimary).success).toBe(false);
  });

  it.each(['primary', 'secondary', 'accent', 'background', 'text'])(
    'should validate %s field',
    (field) => {
      expect(
        ColorPaletteSchema.safeParse({ ...validPalette, [field]: 'not-hex' }).success
      ).toBe(false);
    }
  );
});

describe('CharacterSchema', () => {
  const validCharacter = {
    id: 'char-1',
    name: 'Rocky',
    role: 'companion' as const,
    personality: 'Friendly and encouraging',
  };

  it('should accept valid character', () => {
    expect(CharacterSchema.safeParse(validCharacter).success).toBe(true);
  });

  it.each(['companion', 'strategist', 'teacher', 'challenger'] as const)(
    'should accept role "%s"',
    (role) => {
      expect(CharacterSchema.safeParse({ ...validCharacter, role }).success).toBe(true);
    }
  );

  it('should reject invalid role', () => {
    expect(
      CharacterSchema.safeParse({ ...validCharacter, role: 'villain' }).success
    ).toBe(false);
  });

  it('should accept optional avatarUrl', () => {
    const result = CharacterSchema.safeParse({
      ...validCharacter,
      avatarUrl: '/avatars/rocky.png',
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.avatarUrl).toBe('/avatars/rocky.png');
  });

  it('should accept without avatarUrl', () => {
    const result = CharacterSchema.safeParse(validCharacter);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.avatarUrl).toBeUndefined();
  });

  it('should reject missing required fields', () => {
    expect(CharacterSchema.safeParse({ id: 'char-1' }).success).toBe(false);
  });
});

describe('WorldSchema', () => {
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
    topic: 'Introduction',
    weekStart: 1,
    weekEnd: 2,
    levels: [validLevel],
    learningObjectives: ['Learn multiplication'],
    signatureContent: ['Times tables'],
    isBoss: false,
  };

  const validWorld = {
    id: 'world-3',
    name: 'Multiplication Mountains',
    theme: 'Mountain adventure',
    baLevel: 3,
    targetAgeMin: 7,
    targetAgeMax: 9,
    totalLevels: 1,
    chapters: [validChapter],
    colorPalette: {
      primary: '#3B82F6',
      secondary: '#F97316',
      accent: '#EAB308',
      background: '#F8FAFC',
      text: '#1E293B',
    },
    characters: [
      { id: 'char-1', name: 'Rocky', role: 'companion', personality: 'Friendly' },
    ],
    isLocked: false,
    prerequisiteWorldId: null,
    estimatedWeeks: 8,
  };

  it('should accept a valid world', () => {
    expect(WorldSchema.safeParse(validWorld).success).toBe(true);
  });

  describe('id validation', () => {
    it('should accept valid world ID format', () => {
      expect(WorldSchema.safeParse(validWorld).success).toBe(true);
    });

    it('should reject invalid ID format', () => {
      expect(WorldSchema.safeParse({ ...validWorld, id: 'bad-id' }).success).toBe(false);
    });

    it('should reject wrong prefix', () => {
      expect(
        WorldSchema.safeParse({ ...validWorld, id: 'chapter-3' }).success
      ).toBe(false);
    });
  });

  describe('name validation', () => {
    it('should reject empty name', () => {
      expect(WorldSchema.safeParse({ ...validWorld, name: '' }).success).toBe(false);
    });
  });

  describe('age range validation', () => {
    it('should accept targetAgeMin of 5', () => {
      expect(WorldSchema.safeParse({ ...validWorld, targetAgeMin: 5 }).success).toBe(true);
    });

    it('should accept targetAgeMax of 13', () => {
      expect(WorldSchema.safeParse({ ...validWorld, targetAgeMax: 13 }).success).toBe(true);
    });

    it('should reject targetAgeMin below 5', () => {
      expect(WorldSchema.safeParse({ ...validWorld, targetAgeMin: 4 }).success).toBe(false);
    });

    it('should reject targetAgeMax above 13', () => {
      expect(WorldSchema.safeParse({ ...validWorld, targetAgeMax: 14 }).success).toBe(false);
    });
  });

  describe('chapters validation', () => {
    it('should require at least 1 chapter', () => {
      expect(WorldSchema.safeParse({ ...validWorld, chapters: [] }).success).toBe(false);
    });
  });

  describe('prerequisiteWorldId', () => {
    it('should accept null', () => {
      expect(
        WorldSchema.safeParse({ ...validWorld, prerequisiteWorldId: null }).success
      ).toBe(true);
    });

    it('should accept string', () => {
      expect(
        WorldSchema.safeParse({ ...validWorld, prerequisiteWorldId: 'world-2' }).success
      ).toBe(true);
    });
  });

  describe('numeric fields', () => {
    it('should require positive baLevel', () => {
      expect(WorldSchema.safeParse({ ...validWorld, baLevel: 0 }).success).toBe(false);
    });

    it('should require positive totalLevels', () => {
      expect(WorldSchema.safeParse({ ...validWorld, totalLevels: 0 }).success).toBe(false);
    });

    it('should require positive estimatedWeeks', () => {
      expect(WorldSchema.safeParse({ ...validWorld, estimatedWeeks: 0 }).success).toBe(false);
    });
  });
});
