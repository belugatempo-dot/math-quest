'use client';

import { useState } from 'react';
import type { Hint } from '@mathquest/shared';
import { HINT_COSTS } from '@mathquest/shared';
import Button from '@/components/ui/Button';

interface HintPanelProps {
  hints: Hint[];
  isChallenge?: boolean;
  onRevealHint?: (tier: 1 | 2 | 3) => void;
}

export default function HintPanel({
  hints,
  isChallenge = false,
  onRevealHint,
}: HintPanelProps) {
  const [revealedTiers, setRevealedTiers] = useState<Set<number>>(new Set());

  if (isChallenge || hints.length === 0) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-amber-800 font-medium">Challenge Level</p>
        <p className="text-sm text-amber-600 mt-1">
          No hints available - you can do this!
        </p>
      </div>
    );
  }

  const handleReveal = (tier: 1 | 2 | 3) => {
    setRevealedTiers((prev) => new Set([...prev, tier]));
    onRevealHint?.(tier);
  };

  const getNextTier = (): (1 | 2 | 3) | null => {
    for (let i = 1; i <= 3; i++) {
      if (!revealedTiers.has(i) && hints.find((h) => h.tier === i)) {
        return i as 1 | 2 | 3;
      }
    }
    return null;
  };

  const nextTier = getNextTier();
  const canReveal = nextTier !== null;

  const getHintCostLabel = (tier: 1 | 2 | 3) => {
    const cost = HINT_COSTS[tier];
    if (cost === 0) return 'Free';
    return `-${cost} star${cost > 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Hints</h3>
        {canReveal && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleReveal(nextTier)}
          >
            Get Hint ({getHintCostLabel(nextTier)})
          </Button>
        )}
      </div>

      {hints.map((hint) => {
        const isRevealed = revealedTiers.has(hint.tier);
        return (
          <div
            key={hint.tier}
            className={`p-4 rounded-lg transition-all ${
              isRevealed
                ? 'bg-blue-50 border border-blue-200'
                : 'bg-gray-100 border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-500">
                Hint {hint.tier}
              </span>
              <span className="text-xs text-gray-400">
                {getHintCostLabel(hint.tier)}
              </span>
            </div>
            {isRevealed ? (
              <p className="text-blue-800">{hint.text}</p>
            ) : (
              <p className="text-gray-400 italic">
                {hint.tier === 1 ? 'Click "Get Hint" to reveal' : 'Reveal previous hints first'}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
