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

export type VisualType = 'angle-diagram' | 'worked-example' | 'concept-diagram' | 'none';

export type InteractionType = 'click-to-continue' | 'click-to-reveal' | 'highlight-interactive';

export type TeachingFormat = 'single-message' | 'multi-step-lesson';

export type GamePhase = 'teaching' | 'problem' | 'feedback' | 'teaching-point' | 'adaptive-reteach' | 'complete';

export interface TeachingStep {
  id: string;
  characterId: string;
  expression: string;
  dialogue: string;
  visualType?: VisualType;
  visualProps?: Record<string, unknown>;
  interactionType?: InteractionType;
}

export interface TeachingContent {
  format?: TeachingFormat;
  text?: string;                       // For single-message or legacy
  characterId?: string;
  steps?: TeachingStep[];              // For multi-step
  estimatedSeconds?: number;
  skippable?: boolean;
  visualUrl?: string;                  // Legacy field
  audioUrl?: string;                   // Legacy field
}

export interface ReflectionPrompt {
  text: string;
  insight: string;
}
