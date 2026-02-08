import { describe, it, expect } from 'vitest';
import { checkAnswer, answersAreEquivalent } from './answerChecker';
import type { Answer, Problem } from '../types';

function makeProblem(overrides: Partial<Problem> = {}): Problem {
  return {
    id: 'test-problem',
    levelId: 'test-level',
    sequence: 1,
    type: 'numeric_input',
    category: 'fluency',
    statement: 'What is 6 x 7?',
    inputType: 'number_pad',
    correctAnswer: { value: 42 },
    hints: [],
    solutionExplanation: 'Because 6 x 7 = 42',
    teachingPoint: 'Multiplication facts',
    tags: [],
    difficulty: 1,
    ...overrides,
  };
}

describe('answersAreEquivalent', () => {
  it('matches equal numbers exactly', () => {
    expect(answersAreEquivalent({ value: 42 }, { value: 42 })).toBe(true);
  });

  it('matches numbers within tolerance (0.0001)', () => {
    expect(answersAreEquivalent({ value: 3.14159 }, { value: 3.14159 })).toBe(true);
    expect(answersAreEquivalent({ value: 1.00005 }, { value: 1.0001 })).toBe(true);
  });

  it('rejects numbers outside tolerance', () => {
    expect(answersAreEquivalent({ value: 1.0 }, { value: 1.001 })).toBe(false);
  });

  it('matches strings case-insensitively with trim', () => {
    expect(answersAreEquivalent({ value: 'Hello ' }, { value: 'hello' })).toBe(true);
    expect(answersAreEquivalent({ value: '  YES  ' }, { value: 'yes' })).toBe(true);
  });

  it('rejects non-matching strings', () => {
    expect(answersAreEquivalent({ value: 'hello' }, { value: 'world' })).toBe(false);
  });

  it('compares arrays in order', () => {
    expect(answersAreEquivalent({ value: [1, 2, 3] }, { value: [1, 2, 3] })).toBe(true);
  });

  it('rejects arrays with different order', () => {
    expect(answersAreEquivalent({ value: [1, 2, 3] }, { value: [3, 2, 1] })).toBe(false);
  });

  it('rejects arrays with different lengths', () => {
    expect(answersAreEquivalent({ value: [1, 2] }, { value: [1, 2, 3] })).toBe(false);
  });

  it('falls back to strict equality for cross-type comparison', () => {
    expect(answersAreEquivalent({ value: '42' }, { value: 42 as unknown as string })).toBe(false);
    expect(answersAreEquivalent({ value: 0 }, { value: '' as unknown as number })).toBe(false);
  });
});

describe('checkAnswer', () => {
  it('returns isCorrect: true for correct numeric answer', () => {
    const problem = makeProblem({ correctAnswer: { value: 42 } });
    const result = checkAnswer({ value: 42 }, problem);
    expect(result).toEqual({ isCorrect: true });
  });

  it('returns isCorrect: true for correct string answer', () => {
    const problem = makeProblem({ correctAnswer: { value: 'triangle' } });
    const result = checkAnswer({ value: 'Triangle' }, problem);
    expect(result).toEqual({ isCorrect: true });
  });

  it('returns isCorrect: false for wrong answer with no feedback', () => {
    const problem = makeProblem({ correctAnswer: { value: 42 } });
    const result = checkAnswer({ value: 99 }, problem);
    expect(result).toEqual({ isCorrect: false });
  });

  it('accepts acceptable alternatives and returns their explanation', () => {
    const problem = makeProblem({
      correctAnswer: { value: 42 },
      acceptableAnswers: [
        { value: 42.0, explanation: 'Also correct as a decimal' },
      ],
    });
    const result = checkAnswer({ value: 42 }, problem);
    // Primary match should win first
    expect(result.isCorrect).toBe(true);
  });

  it('returns explanation from acceptable alternative when primary misses', () => {
    const problem = makeProblem({
      correctAnswer: { value: 'forty-two' },
      acceptableAnswers: [
        { value: '42', explanation: 'Numeric form accepted' },
      ],
    });
    const result = checkAnswer({ value: '42' }, problem);
    expect(result.isCorrect).toBe(true);
    expect(result.feedback).toBe('Numeric form accepted');
  });

  it('returns feedback for common mistakes', () => {
    const problem = makeProblem({
      correctAnswer: { value: 42 },
      commonMistakes: [
        { answer: 48, feedback: 'That would be 6 x 8, not 6 x 7' },
        { answer: 36, feedback: 'That would be 6 x 6' },
      ],
    });

    const result = checkAnswer({ value: 48 }, problem);
    expect(result.isCorrect).toBe(false);
    expect(result.feedback).toBe('That would be 6 x 8, not 6 x 7');
  });

  it('returns second common mistake feedback', () => {
    const problem = makeProblem({
      correctAnswer: { value: 42 },
      commonMistakes: [
        { answer: 48, feedback: 'That would be 6 x 8' },
        { answer: 36, feedback: 'That would be 6 x 6' },
      ],
    });

    const result = checkAnswer({ value: 36 }, problem);
    expect(result.isCorrect).toBe(false);
    expect(result.feedback).toBe('That would be 6 x 6');
  });

  it('returns no feedback for wrong answer not in common mistakes', () => {
    const problem = makeProblem({
      correctAnswer: { value: 42 },
      commonMistakes: [{ answer: 48, feedback: 'Wrong' }],
    });

    const result = checkAnswer({ value: 99 }, problem);
    expect(result).toEqual({ isCorrect: false });
  });

  it('works with no commonMistakes or acceptableAnswers defined', () => {
    const problem = makeProblem({
      correctAnswer: { value: 10 },
    });
    expect(checkAnswer({ value: 10 }, problem).isCorrect).toBe(true);
    expect(checkAnswer({ value: 5 }, problem).isCorrect).toBe(false);
  });
});
