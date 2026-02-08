import type { Chapter } from './chapter';

/**
 * Represents a world in MathQuest (e.g., "Number Forest", "Multiplication Mountains")
 * Each world corresponds to one Beast Academy level and covers a full academic year
 */
export interface World {
  id: string;                    // "world-1", "world-2", etc.
  name: string;                  // "Number Forest"
  theme: string;                 // "forest", "castle", "mountain"
  baLevel: number;               // 1, 2, 3, etc. (Beast Academy level)
  targetAgeMin: number;          // 6
  targetAgeMax: number;          // 8
  totalLevels: number;           // 97
  chapters: Chapter[];
  colorPalette: ColorPalette;
  characters: Character[];
  isLocked: boolean;
  prerequisiteWorldId: string | null;
  estimatedWeeks: number;        // 36
}

export interface ColorPalette {
  primary: string;     // "#22C55E"
  secondary: string;   // "#F59E0B"
  accent: string;      // "#3B82F6"
  background: string;
  text: string;
}

export interface Character {
  id: string;
  name: string;
  role: 'companion' | 'strategist' | 'teacher' | 'challenger';
  personality: string;
  avatarUrl?: string;
}
