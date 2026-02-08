import type { VisualAsset } from './problem';

/**
 * Represents a hint for a problem
 * MathQuest uses a 3-tier progressive hint system
 */
export interface Hint {
  tier: 1 | 2 | 3;
  cost: number;                  // Stars: 0, 1, 2
  text: string;
  audio?: string;
  visual?: VisualAsset;
  type: HintType;
}

export type HintType =
  | 'conceptual'    // "What strategy might help?" - Free
  | 'directional'   // "Try breaking it into parts" - 1 star
  | 'scaffolded'    // "Start with 99 = 100 - 1..." - 2 stars
  | 'visual'        // Shows diagram
  | 'worked_example'; // Similar solved problem
