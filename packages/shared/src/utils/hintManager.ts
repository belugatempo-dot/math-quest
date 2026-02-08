import type { Hint } from '../types';

/**
 * Hint costs by tier
 */
export const HINT_COSTS = {
  1: 0,  // Free conceptual hint
  2: 1,  // 1 star for directional hint
  3: 2,  // 2 stars for scaffolded hint
} as const;

export interface HintState {
  revealedTiers: (1 | 2 | 3)[];
  totalStarCost: number;
}

/**
 * Create initial hint state
 */
export function createHintState(): HintState {
  return {
    revealedTiers: [],
    totalStarCost: 0,
  };
}

/**
 * Check if a hint tier can be revealed
 */
export function canRevealHint(
  tier: 1 | 2 | 3,
  userStars: number,
  state: HintState
): boolean {
  // Already revealed
  if (state.revealedTiers.includes(tier)) {
    return false;
  }

  // Must reveal in order
  if (tier === 2 && !state.revealedTiers.includes(1)) {
    return false;
  }
  if (tier === 3 && !state.revealedTiers.includes(2)) {
    return false;
  }

  // Check star cost
  return userStars >= HINT_COSTS[tier];
}

/**
 * Reveal a hint and update state
 */
export function revealHint(
  tier: 1 | 2 | 3,
  state: HintState
): HintState {
  if (state.revealedTiers.includes(tier)) {
    return state;
  }

  return {
    revealedTiers: [...state.revealedTiers, tier],
    totalStarCost: state.totalStarCost + HINT_COSTS[tier],
  };
}

/**
 * Get the next available hint tier
 */
export function getNextHintTier(state: HintState): 1 | 2 | 3 | null {
  if (!state.revealedTiers.includes(1)) return 1;
  if (!state.revealedTiers.includes(2)) return 2;
  if (!state.revealedTiers.includes(3)) return 3;
  return null;
}

/**
 * Get revealed hints from a list
 */
export function getRevealedHints(
  hints: Hint[],
  state: HintState
): Hint[] {
  return hints.filter(h => state.revealedTiers.includes(h.tier));
}
