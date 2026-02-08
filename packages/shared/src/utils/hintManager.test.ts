import { describe, it, expect } from 'vitest';
import {
  HINT_COSTS,
  createHintState,
  canRevealHint,
  revealHint,
  getNextHintTier,
  getRevealedHints,
} from './hintManager';
import type { Hint } from '../types';

describe('HINT_COSTS', () => {
  it('has correct costs for each tier', () => {
    expect(HINT_COSTS[1]).toBe(0);
    expect(HINT_COSTS[2]).toBe(1);
    expect(HINT_COSTS[3]).toBe(2);
  });
});

describe('createHintState', () => {
  it('returns empty initial state', () => {
    const state = createHintState();
    expect(state).toEqual({ revealedTiers: [], totalStarCost: 0 });
  });
});

describe('canRevealHint', () => {
  it('allows tier 1 with fresh state (free)', () => {
    expect(canRevealHint(1, 10, createHintState())).toBe(true);
  });

  it('allows tier 1 even with 0 stars (it is free)', () => {
    expect(canRevealHint(1, 0, createHintState())).toBe(true);
  });

  it('disallows tier 2 when tier 1 is not revealed', () => {
    expect(canRevealHint(2, 10, createHintState())).toBe(false);
  });

  it('disallows tier 3 when tier 2 is not revealed', () => {
    const stateWith1 = revealHint(1, createHintState());
    expect(canRevealHint(3, 10, stateWith1)).toBe(false);
  });

  it('allows tier 2 after tier 1 with sufficient stars', () => {
    const stateWith1 = revealHint(1, createHintState());
    expect(canRevealHint(2, 10, stateWith1)).toBe(true);
  });

  it('disallows tier 2 after tier 1 with insufficient stars', () => {
    const stateWith1 = revealHint(1, createHintState());
    expect(canRevealHint(2, 0, stateWith1)).toBe(false);
  });

  it('allows tier 3 after tiers 1 and 2 with sufficient stars', () => {
    const stateWith12 = revealHint(2, revealHint(1, createHintState()));
    expect(canRevealHint(3, 10, stateWith12)).toBe(true);
  });

  it('disallows tier 3 with insufficient stars', () => {
    const stateWith12 = revealHint(2, revealHint(1, createHintState()));
    expect(canRevealHint(3, 1, stateWith12)).toBe(false);
  });

  it('disallows already-revealed tier', () => {
    const stateWith1 = revealHint(1, createHintState());
    expect(canRevealHint(1, 10, stateWith1)).toBe(false);
  });
});

describe('revealHint', () => {
  it('adds tier to revealedTiers and accumulates cost', () => {
    const state0 = createHintState();
    const state1 = revealHint(1, state0);
    expect(state1).toEqual({ revealedTiers: [1], totalStarCost: 0 });

    const state2 = revealHint(2, state1);
    expect(state2).toEqual({ revealedTiers: [1, 2], totalStarCost: 1 });

    const state3 = revealHint(3, state2);
    expect(state3).toEqual({ revealedTiers: [1, 2, 3], totalStarCost: 3 });
  });

  it('returns same state if tier is already revealed (immutability)', () => {
    const stateWith1 = revealHint(1, createHintState());
    const result = revealHint(1, stateWith1);
    expect(result).toBe(stateWith1);
  });
});

describe('getNextHintTier', () => {
  it('returns 1 for fresh state', () => {
    expect(getNextHintTier(createHintState())).toBe(1);
  });

  it('returns 2 after tier 1 revealed', () => {
    expect(getNextHintTier(revealHint(1, createHintState()))).toBe(2);
  });

  it('returns 3 after tiers 1 and 2 revealed', () => {
    expect(getNextHintTier(revealHint(2, revealHint(1, createHintState())))).toBe(3);
  });

  it('returns null after all tiers revealed', () => {
    const allRevealed = revealHint(3, revealHint(2, revealHint(1, createHintState())));
    expect(getNextHintTier(allRevealed)).toBeNull();
  });
});

describe('getRevealedHints', () => {
  const hints: Hint[] = [
    { tier: 1, cost: 0, text: 'Hint 1', type: 'conceptual' },
    { tier: 2, cost: 1, text: 'Hint 2', type: 'directional' },
    { tier: 3, cost: 2, text: 'Hint 3', type: 'scaffolded' },
  ];

  it('returns empty array for fresh state', () => {
    expect(getRevealedHints(hints, createHintState())).toEqual([]);
  });

  it('returns only revealed hints', () => {
    const state = revealHint(1, createHintState());
    const result = getRevealedHints(hints, state);
    expect(result).toHaveLength(1);
    expect(result[0].tier).toBe(1);
  });

  it('returns multiple revealed hints in order', () => {
    const state = revealHint(2, revealHint(1, createHintState()));
    const result = getRevealedHints(hints, state);
    expect(result).toHaveLength(2);
    expect(result[0].tier).toBe(1);
    expect(result[1].tier).toBe(2);
  });

  it('returns all hints when all revealed', () => {
    const state = revealHint(3, revealHint(2, revealHint(1, createHintState())));
    expect(getRevealedHints(hints, state)).toHaveLength(3);
  });
});
