/**
 * Anti-pattern detection for curriculum content
 * Detects working notes, weak hints, and other quality issues
 */

import { FORBIDDEN_PHRASES, WEAK_HINT_PATTERNS } from '@mathquest/shared/constants';
import type { Problem, World } from '@mathquest/shared';

export interface AntiPatternReport {
  totalIssues: number;
  issues: AntiPatternIssue[];
}

export interface AntiPatternIssue {
  type: AntiPatternType;
  severity: 'error' | 'warning';
  problemId?: string;
  levelId?: string;
  location: 'statement' | 'hint1' | 'hint2' | 'hint3' | 'explanation' | 'teaching_point';
  text: string;
  suggestion?: string;
}

export type AntiPatternType =
  | 'working_notes'
  | 'weak_hint'
  | 'non_integer_answer'
  | 'missing_teaching_point'
  | 'short_hint'
  | 'reveal_answer';

/**
 * Detect anti-patterns in a world's content
 */
export function detectAntiPatterns(world: World): AntiPatternReport {
  const issues: AntiPatternIssue[] = [];

  for (const chapter of world.chapters) {
    for (const level of chapter.levels) {
      for (const problem of level.problems) {
        const problemIssues = detectProblemAntiPatterns(problem);
        issues.push(...problemIssues);
      }
    }
  }

  return {
    totalIssues: issues.length,
    issues,
  };
}

/**
 * Detect anti-patterns in a single problem
 */
export function detectProblemAntiPatterns(problem: Problem): AntiPatternIssue[] {
  const issues: AntiPatternIssue[] = [];

  // Check statement for working notes
  for (const phrase of FORBIDDEN_PHRASES) {
    if (problem.statement.toLowerCase().includes(phrase.toLowerCase())) {
      issues.push({
        type: 'working_notes',
        severity: 'error',
        problemId: problem.id,
        levelId: problem.levelId,
        location: 'statement',
        text: `Contains forbidden phrase: "${phrase}"`,
        suggestion: 'Remove working notes from the problem statement',
      });
    }
  }

  // Check solution explanation for working notes
  if (problem.solutionExplanation) {
    for (const phrase of FORBIDDEN_PHRASES) {
      if (problem.solutionExplanation.toLowerCase().includes(phrase.toLowerCase())) {
        issues.push({
          type: 'working_notes',
          severity: 'error',
          problemId: problem.id,
          levelId: problem.levelId,
          location: 'explanation',
          text: `Solution contains forbidden phrase: "${phrase}"`,
          suggestion: 'Remove working notes from the solution explanation',
        });
      }
    }
  }

  // Check hints for weak patterns
  problem.hints.forEach((hint, index) => {
    const hintLocation = `hint${index + 1}` as 'hint1' | 'hint2' | 'hint3';

    // Check for weak hint patterns
    for (const pattern of WEAK_HINT_PATTERNS) {
      if (pattern.test(hint.text)) {
        issues.push({
          type: 'weak_hint',
          severity: 'warning',
          problemId: problem.id,
          levelId: problem.levelId,
          location: hintLocation,
          text: `Hint reveals too much: "${hint.text}"`,
          suggestion: 'Rewrite hint to guide thinking without revealing the answer',
        });
      }
    }

    // Check for short hints
    if (hint.text.length < 10) {
      issues.push({
        type: 'short_hint',
        severity: 'warning',
        problemId: problem.id,
        levelId: problem.levelId,
        location: hintLocation,
        text: `Hint is too short (${hint.text.length} chars)`,
        suggestion: 'Expand hint to be more helpful',
      });
    }
  });

  // Check for non-integer answers in numeric problems
  if (
    problem.type === 'numeric_input' &&
    typeof problem.correctAnswer.value === 'number' &&
    !Number.isInteger(problem.correctAnswer.value)
  ) {
    issues.push({
      type: 'non_integer_answer',
      severity: 'error',
      problemId: problem.id,
      levelId: problem.levelId,
      location: 'statement',
      text: `Non-integer answer: ${problem.correctAnswer.value}`,
      suggestion: 'Numeric input problems should have integer answers',
    });
  }

  // Check for missing or short teaching point
  if (!problem.teachingPoint || problem.teachingPoint.length < 10) {
    issues.push({
      type: 'missing_teaching_point',
      severity: 'warning',
      problemId: problem.id,
      levelId: problem.levelId,
      location: 'teaching_point',
      text: 'Missing or inadequate teaching point',
      suggestion: 'Add a teaching point explaining the key insight',
    });
  }

  return issues;
}

/**
 * Detect anti-patterns in raw markdown content
 * Used before full parsing to catch obvious issues
 */
export function detectMarkdownAntiPatterns(content: string): AntiPatternIssue[] {
  const issues: AntiPatternIssue[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const lowerLine = line.toLowerCase();

    for (const phrase of FORBIDDEN_PHRASES) {
      if (lowerLine.includes(phrase.toLowerCase())) {
        issues.push({
          type: 'working_notes',
          severity: 'error',
          location: 'statement',
          text: `Line ${lineNum}: Contains forbidden phrase "${phrase}": "${line.substring(0, 100)}..."`,
          suggestion: 'Remove working notes before parsing',
        });
      }
    }
  });

  return issues;
}
