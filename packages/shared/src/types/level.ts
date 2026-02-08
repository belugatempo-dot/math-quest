import type { Problem } from './problem';

/**
 * Represents a single level in MathQuest
 * A level contains one or more problems and optional teaching/reflection content
 */
export interface Level {
  id: string;                    // "level-1-1-1"
  chapterId: string;
  worldId: string;
  number: number;                // 1
  name: string;                  // "How Many Acorns?"
  type: LevelType;
  storyContext: string;          // Narrative intro
  problems: Problem[];
  teaching?: TeachingContent;    // Pre-problem instruction
  reflection?: ReflectionPrompt; // Post-problem discussion
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedMinutes: number;
  isChallenge: boolean;          // No hints available
  isBoss: boolean;
}

export type LevelType =
  | 'standard'      // Normal level
  | 'teaching'      // Introduces concept
  | 'practice'      // Reinforcement
  | 'challenge'     // No hints, harder
  | 'quiz'          // Chapter assessment
  | 'boss';         // Multi-part final

export interface TeachingContent {
  text: string;
  characterId?: string;
  visualUrl?: string;
  audioUrl?: string;
}

export interface ReflectionPrompt {
  text: string;
  insight: string;
}
