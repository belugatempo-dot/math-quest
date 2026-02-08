/**
 * Calculate stars earned for completing a level
 */
export interface LevelResult {
  hintsUsed: number;        // Total hint tiers revealed
  attempts: number;         // Answer submission attempts
  timeSeconds: number;      // Total time on level
}

export interface LevelMeta {
  expectedSeconds: number;  // From level definition
  problemCount: number;
}

/**
 * Calculate stars based on performance
 * - 3 stars: Perfect - no hints, first try, reasonable time
 * - 2 stars: Good - minimal hints, few attempts
 * - 1 star: Completed - used hints or multiple attempts
 * - 0 stars: Should not happen (max 3 hint tiers)
 */
export function calculateStars(
  result: LevelResult,
  meta: LevelMeta
): 0 | 1 | 2 | 3 {
  const { hintsUsed, attempts, timeSeconds } = result;
  const { expectedSeconds } = meta;

  // 3 stars: Perfect - no hints, first try, reasonable time
  if (hintsUsed === 0 && attempts === 1 && timeSeconds <= expectedSeconds * 1.5) {
    return 3;
  }

  // 2 stars: Good - minimal hints, few attempts
  if (hintsUsed <= 1 && attempts <= 2) {
    return 2;
  }

  // 1 star: Completed - used hints or multiple attempts
  if (hintsUsed <= 3) {
    return 1;
  }

  // 0 stars: Should not happen (max 3 hint tiers)
  return 0;
}

/**
 * Calculate expected completion time for a level
 */
export function calculateExpectedTime(
  problemCount: number,
  difficulty: 1 | 2 | 3 | 4 | 5
): number {
  // Base time per problem: 30 seconds
  // Difficulty multiplier: 1.0, 1.25, 1.5, 1.75, 2.0
  const baseTimePerProblem = 30;
  const difficultyMultiplier = 1 + (difficulty - 1) * 0.25;

  return Math.round(problemCount * baseTimePerProblem * difficultyMultiplier);
}
