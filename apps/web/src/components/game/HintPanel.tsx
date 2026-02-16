'use client';

import { useState } from 'react';
import type { Hint } from '@mathquest/shared';
import { HINT_COSTS } from '@mathquest/shared';
import Button from '@/components/ui/Button';
import CharacterMessage from '@/components/characters/CharacterMessage';
import type { CharacterId, Expression } from '@/components/characters/CharacterAvatar';

interface HintPanelProps {
  hints: Hint[];
  isChallenge?: boolean;
  onRevealHint?: (tier: 1 | 2 | 3) => void;
}

const HINT_CHARACTERS: Record<number, { characterId: CharacterId; expression: Expression }> = {
  1: { characterId: 'prof-owlbert', expression: 'thinking' },
  2: { characterId: 'lizzie', expression: 'encouraging' },
  3: { characterId: 'grogg', expression: 'happy' },
};

export default function HintPanel({
  hints,
  isChallenge = false,
  onRevealHint,
}: HintPanelProps) {
  const [revealedTiers, setRevealedTiers] = useState<Set<number>>(new Set());

  if (isChallenge || hints.length === 0) {
    return (
      <div className="p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-2xl">
        <p className="text-amber-200 font-bold">Challenge Level</p>
        <p className="text-sm text-amber-300 mt-1">
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
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">💡</span>
          Hints
        </h3>
        {canReveal && (
          <Button
            variant="game"
            size="sm"
            onClick={() => handleReveal(nextTier)}
          >
            Get Hint ({getHintCostLabel(nextTier)})
          </Button>
        )}
      </div>

      {hints.map((hint) => {
        const isRevealed = revealedTiers.has(hint.tier);
        const character = HINT_CHARACTERS[hint.tier];
        return (
          <div
            key={hint.tier}
            className={`rounded-2xl transition-all ${
              isRevealed
                ? ''
                : 'p-4 bg-gradient-to-r from-white/8 to-white/5 border-2 border-dashed border-white/25'
            }`}
          >
            {isRevealed ? (
              <CharacterMessage
                characterId={character.characterId}
                expression={character.expression}
                variant="hint"
                size="sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold">Hint {hint.tier}</span>
                  <span className="text-xs opacity-60">
                    {getHintCostLabel(hint.tier)}
                  </span>
                </div>
                <p>{hint.text}</p>
              </CharacterMessage>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white/60 font-bold text-sm">
                  ?
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-medium text-white/60">
                      Hint {hint.tier}
                    </span>
                    <span className="text-xs text-white/60">
                      {getHintCostLabel(hint.tier)}
                    </span>
                  </div>
                  <p className="text-white/60 italic text-sm">
                    {hint.tier === 1 ? 'Click "Get Hint" to reveal' : 'Reveal previous hints first'}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
