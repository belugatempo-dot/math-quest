import { describe, it, expect } from 'vitest';
import { HintTypeSchema, HintSchema } from './hint';

describe('HintTypeSchema', () => {
  const validTypes = ['conceptual', 'directional', 'scaffolded', 'visual', 'worked_example'];

  it.each(validTypes)('should accept valid type "%s"', (type) => {
    expect(HintTypeSchema.safeParse(type).success).toBe(true);
  });

  it('should reject invalid type', () => {
    expect(HintTypeSchema.safeParse('unknown').success).toBe(false);
  });

  it('should reject empty string', () => {
    expect(HintTypeSchema.safeParse('').success).toBe(false);
  });

  it('should reject non-string value', () => {
    expect(HintTypeSchema.safeParse(42).success).toBe(false);
  });
});

describe('HintSchema', () => {
  const validHint = {
    tier: 1 as const,
    cost: 0,
    text: 'This is a helpful hint for students',
    type: 'conceptual' as const,
  };

  it('should accept a valid hint', () => {
    const result = HintSchema.safeParse(validHint);
    expect(result.success).toBe(true);
  });

  describe('tier validation', () => {
    it.each([1, 2, 3] as const)('should accept tier %d', (tier) => {
      expect(HintSchema.safeParse({ ...validHint, tier }).success).toBe(true);
    });

    it('should reject tier 0', () => {
      expect(HintSchema.safeParse({ ...validHint, tier: 0 }).success).toBe(false);
    });

    it('should reject tier 4', () => {
      expect(HintSchema.safeParse({ ...validHint, tier: 4 }).success).toBe(false);
    });

    it('should reject non-integer tier', () => {
      expect(HintSchema.safeParse({ ...validHint, tier: 1.5 }).success).toBe(false);
    });
  });

  describe('cost validation', () => {
    it('should accept cost 0', () => {
      expect(HintSchema.safeParse({ ...validHint, cost: 0 }).success).toBe(true);
    });

    it('should accept cost 2', () => {
      expect(HintSchema.safeParse({ ...validHint, cost: 2 }).success).toBe(true);
    });

    it('should reject negative cost', () => {
      expect(HintSchema.safeParse({ ...validHint, cost: -1 }).success).toBe(false);
    });

    it('should reject cost above 2', () => {
      expect(HintSchema.safeParse({ ...validHint, cost: 3 }).success).toBe(false);
    });
  });

  describe('text validation', () => {
    it('should reject text shorter than 10 characters', () => {
      const result = HintSchema.safeParse({ ...validHint, text: 'Too short' });
      expect(result.success).toBe(false);
    });

    it('should accept text with exactly 10 characters', () => {
      expect(HintSchema.safeParse({ ...validHint, text: '1234567890' }).success).toBe(true);
    });
  });

  describe('optional fields', () => {
    it('should accept hint with audio', () => {
      const result = HintSchema.safeParse({ ...validHint, audio: 'hint-1.mp3' });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.audio).toBe('hint-1.mp3');
    });

    it('should accept hint without audio', () => {
      const result = HintSchema.safeParse(validHint);
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.audio).toBeUndefined();
    });
  });

  describe('visual validation', () => {
    const validVisual = {
      id: 'vis-1',
      type: 'image' as const,
      url: 'https://example.com/img.png',
      alt: 'An image',
    };

    it('should accept hint with valid visual', () => {
      expect(HintSchema.safeParse({ ...validHint, visual: validVisual }).success).toBe(true);
    });

    it('should accept visual with optional position', () => {
      const result = HintSchema.safeParse({
        ...validHint,
        visual: { ...validVisual, position: 'top' },
      });
      expect(result.success).toBe(true);
    });

    it.each(['image', 'animation', 'interactive'] as const)(
      'should accept visual type "%s"',
      (type) => {
        expect(
          HintSchema.safeParse({ ...validHint, visual: { ...validVisual, type } }).success
        ).toBe(true);
      }
    );

    it.each(['top', 'middle', 'bottom', 'inline'] as const)(
      'should accept visual position "%s"',
      (position) => {
        expect(
          HintSchema.safeParse({ ...validHint, visual: { ...validVisual, position } }).success
        ).toBe(true);
      }
    );

    it('should reject visual with invalid type', () => {
      expect(
        HintSchema.safeParse({ ...validHint, visual: { ...validVisual, type: 'video' } }).success
      ).toBe(false);
    });

    it('should reject visual missing required fields', () => {
      expect(
        HintSchema.safeParse({ ...validHint, visual: { id: 'vis-1' } }).success
      ).toBe(false);
    });

    it('should reject visual with invalid position', () => {
      expect(
        HintSchema.safeParse({
          ...validHint,
          visual: { ...validVisual, position: 'left' },
        }).success
      ).toBe(false);
    });
  });

  it('should reject hint missing required fields', () => {
    expect(HintSchema.safeParse({}).success).toBe(false);
  });

  it('should reject hint with invalid type', () => {
    expect(HintSchema.safeParse({ ...validHint, type: 'unknown' }).success).toBe(false);
  });
});
