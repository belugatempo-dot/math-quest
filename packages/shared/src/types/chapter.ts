import type { Level } from './level';

/**
 * Represents a chapter within a world
 * Chapters group related levels around a topic (e.g., "Counting", "Multiplication Foundations")
 */
export interface Chapter {
  id: string;                    // "chapter-1-1"
  worldId: string;
  number: number;                // 1
  name: string;                  // "Counting"
  topic: string;                 // "counting"
  weekStart: number;             // 1
  weekEnd: number;               // 2
  levels: Level[];
  learningObjectives: string[];
  signatureContent: string[];    // ["creative counting", "skip counting"]
  isBoss: boolean;
}
