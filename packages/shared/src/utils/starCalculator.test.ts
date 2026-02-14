import { describe, it, expect } from 'vitest';
import { calculateStars, calculateExpectedTime } from './starCalculator';

describe('calculateStars', () => {
  const meta = { expectedSeconds: 150, problemCount: 1 };

  it('returns 3 stars for perfect performance (no hints, 1 attempt, fast time)', () => {
    expect(calculateStars({ hintsUsed: 0, attempts: 1, timeSeconds: 100 }, meta)).toBe(3);
  });

  it('returns 3 stars at exactly 1.5x expected time', () => {
    expect(calculateStars({ hintsUsed: 0, attempts: 1, timeSeconds: 225 }, meta)).toBe(3);
  });

  it('returns 2 stars when time exceeds 1.5x expected (even with perfect hints/attempts)', () => {
    expect(calculateStars({ hintsUsed: 0, attempts: 1, timeSeconds: 226 }, meta)).toBe(2);
  });

  it('returns 2 stars for 1 hint and 2 attempts', () => {
    expect(calculateStars({ hintsUsed: 1, attempts: 2, timeSeconds: 100 }, meta)).toBe(2);
  });

  it('returns 2 stars for 0 hints and 2 attempts', () => {
    expect(calculateStars({ hintsUsed: 0, attempts: 2, timeSeconds: 100 }, meta)).toBe(2);
  });

  it('returns 1 star for 2 hints', () => {
    expect(calculateStars({ hintsUsed: 2, attempts: 3, timeSeconds: 100 }, meta)).toBe(1);
  });

  it('returns 1 star for 3 hints', () => {
    expect(calculateStars({ hintsUsed: 3, attempts: 5, timeSeconds: 300 }, meta)).toBe(1);
  });

  it('returns 1 star for many attempts with 1 hint (exceeds good attempts threshold)', () => {
    expect(calculateStars({ hintsUsed: 1, attempts: 3, timeSeconds: 100 }, meta)).toBe(1);
  });

  it('returns 0 stars for more than 3 hints (edge case)', () => {
    expect(calculateStars({ hintsUsed: 4, attempts: 10, timeSeconds: 500 }, meta)).toBe(0);
  });

  describe('multi-problem levels', () => {
    const multiMeta = { expectedSeconds: 300, problemCount: 5 };

    it('returns 3 stars for perfect run through 5 problems (5 attempts, 0 hints)', () => {
      expect(
        calculateStars({ hintsUsed: 0, attempts: 5, timeSeconds: 200 }, multiMeta)
      ).toBe(3);
    });

    it('returns 3 stars at exactly problemCount attempts', () => {
      expect(
        calculateStars({ hintsUsed: 0, attempts: 5, timeSeconds: 450 }, multiMeta)
      ).toBe(3);
    });

    it('returns 2 stars with one retry across 5 problems (6 attempts)', () => {
      expect(
        calculateStars({ hintsUsed: 0, attempts: 6, timeSeconds: 200 }, multiMeta)
      ).toBe(2);
    });

    it('returns 2 stars with 1 hint and problemCount+1 attempts', () => {
      expect(
        calculateStars({ hintsUsed: 1, attempts: 6, timeSeconds: 200 }, multiMeta)
      ).toBe(2);
    });

    it('returns 1 star with many retries across 5 problems', () => {
      expect(
        calculateStars({ hintsUsed: 2, attempts: 10, timeSeconds: 400 }, multiMeta)
      ).toBe(1);
    });

    it('returns 3 stars for single-problem level with 1 attempt (backward compat)', () => {
      const singleMeta = { expectedSeconds: 30, problemCount: 1 };
      expect(
        calculateStars({ hintsUsed: 0, attempts: 1, timeSeconds: 20 }, singleMeta)
      ).toBe(3);
    });

    it('returns 2 stars for single-problem level with 2 attempts (backward compat)', () => {
      const singleMeta = { expectedSeconds: 30, problemCount: 1 };
      expect(
        calculateStars({ hintsUsed: 0, attempts: 2, timeSeconds: 20 }, singleMeta)
      ).toBe(2);
    });

    it('returns 3 stars for 4-problem boss level with perfect run', () => {
      const bossMeta = { expectedSeconds: 240, problemCount: 4 };
      expect(
        calculateStars({ hintsUsed: 0, attempts: 4, timeSeconds: 180 }, bossMeta)
      ).toBe(3);
    });

    it('returns 2 stars for 3-problem level with 2 retries', () => {
      const threeMeta = { expectedSeconds: 120, problemCount: 3 };
      expect(
        calculateStars({ hintsUsed: 1, attempts: 4, timeSeconds: 100 }, threeMeta)
      ).toBe(2);
    });
  });
});

describe('calculateExpectedTime', () => {
  it('calculates correctly for difficulty 1', () => {
    // 5 * 30 * 1.0 = 150
    expect(calculateExpectedTime(5, 1)).toBe(150);
  });

  it('calculates correctly for difficulty 2', () => {
    // 5 * 30 * 1.25 = 187.5 → 188 (rounded)
    expect(calculateExpectedTime(5, 2)).toBe(188);
  });

  it('calculates correctly for difficulty 3', () => {
    // 5 * 30 * 1.5 = 225
    expect(calculateExpectedTime(5, 3)).toBe(225);
  });

  it('calculates correctly for difficulty 4', () => {
    // 5 * 30 * 1.75 = 262.5 → 263 (rounded)
    expect(calculateExpectedTime(5, 4)).toBe(263);
  });

  it('calculates correctly for difficulty 5', () => {
    // 5 * 30 * 2.0 = 300
    expect(calculateExpectedTime(5, 5)).toBe(300);
  });

  it('scales linearly with problem count', () => {
    // 10 * 30 * 1.0 = 300
    expect(calculateExpectedTime(10, 1)).toBe(300);
    // 1 * 30 * 1.0 = 30
    expect(calculateExpectedTime(1, 1)).toBe(30);
  });
});
