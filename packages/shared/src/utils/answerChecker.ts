import type { Answer, Problem } from '../types';

export interface CheckResult {
  isCorrect: boolean;
  feedback?: string;
}

/**
 * Check if the given answer matches the correct answer or any acceptable alternatives
 */
export function checkAnswer(given: Answer, problem: Problem): CheckResult {
  const correct = problem.correctAnswer;
  const acceptable = problem.acceptableAnswers || [];

  // Check primary answer
  if (answersAreEquivalent(given, correct)) {
    return { isCorrect: true };
  }

  // Check acceptable alternatives
  for (const alt of acceptable) {
    if (answersAreEquivalent(given, alt)) {
      return { isCorrect: true, feedback: alt.explanation };
    }
  }

  // Check common mistakes for helpful feedback
  if (problem.commonMistakes) {
    for (const mistake of problem.commonMistakes) {
      if (answersAreEquivalent(given, { value: mistake.answer })) {
        return { isCorrect: false, feedback: mistake.feedback };
      }
    }
  }

  return { isCorrect: false };
}

/**
 * Compare two answers for equivalence
 */
export function answersAreEquivalent(given: Answer, correct: Answer): boolean {
  const g = given.value;
  const c = correct.value;

  // Numeric comparison with tolerance
  if (typeof g === 'number' && typeof c === 'number') {
    return Math.abs(g - c) < 0.0001;
  }

  // String comparison (case insensitive, trimmed)
  if (typeof g === 'string' && typeof c === 'string') {
    const gNorm = g.trim().toLowerCase();
    const cNorm = c.trim().toLowerCase();
    if (gNorm === cNorm) return true;
    // MC shorthand: accept just the letter for "X) ..." answers
    const mcMatch = cNorm.match(/^([a-d])\)/);
    if (mcMatch && gNorm === mcMatch[1]) return true;
    return false;
  }

  // Array comparison (order matters for ordering problems)
  if (Array.isArray(g) && Array.isArray(c)) {
    if (g.length !== c.length) return false;
    return g.every((v, i) => v === c[i]);
  }

  // Default: strict equality
  return g === c;
}
