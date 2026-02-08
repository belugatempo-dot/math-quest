/**
 * Content validation utilities
 * Validates curriculum content against Zod schemas
 */

import {
  WorldSchema,
  ChapterSchema,
  LevelSchema,
  ProblemSchema,
} from '@mathquest/shared/schemas';
import type { World, Level, Problem } from '@mathquest/shared';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  path: string;
  message: string;
  value?: unknown;
}

/**
 * Validate an entire world
 */
export function validateWorld(world: unknown): ValidationResult {
  const result = WorldSchema.safeParse(world);

  if (result.success) {
    return { isValid: true, errors: [] };
  }

  return {
    isValid: false,
    errors: result.error.errors.map(e => ({
      path: e.path.join('.'),
      message: e.message,
    })),
  };
}

/**
 * Validate a chapter
 */
export function validateChapter(chapter: unknown): ValidationResult {
  const result = ChapterSchema.safeParse(chapter);

  if (result.success) {
    return { isValid: true, errors: [] };
  }

  return {
    isValid: false,
    errors: result.error.errors.map(e => ({
      path: e.path.join('.'),
      message: e.message,
    })),
  };
}

/**
 * Validate a level
 */
export function validateLevel(level: unknown): ValidationResult {
  const result = LevelSchema.safeParse(level);

  if (result.success) {
    return { isValid: true, errors: [] };
  }

  return {
    isValid: false,
    errors: result.error.errors.map(e => ({
      path: e.path.join('.'),
      message: e.message,
    })),
  };
}

/**
 * Validate a problem
 */
export function validateProblem(problem: unknown): ValidationResult {
  const result = ProblemSchema.safeParse(problem);

  if (result.success) {
    return { isValid: true, errors: [] };
  }

  return {
    isValid: false,
    errors: result.error.errors.map(e => ({
      path: e.path.join('.'),
      message: e.message,
    })),
  };
}

/**
 * Get all problems from a world
 */
export function getAllProblems(world: World): Problem[] {
  return world.chapters.flatMap(c => c.levels.flatMap(l => l.problems));
}

/**
 * Get all levels from a world
 */
export function getAllLevels(world: World): Level[] {
  return world.chapters.flatMap(c => c.levels);
}
