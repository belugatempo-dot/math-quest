'use client';

import { useState, useEffect, useCallback } from 'react';
import CharacterMessage from '@/components/characters/CharacterMessage';
import TeachingVisual from '@/components/game/TeachingVisual';
import type { TeachingStep, VisualType } from '@mathquest/shared';
import type { CharacterId, Expression } from '@/components/characters/CharacterAvatar';

interface TeachingPanelProps {
  steps: TeachingStep[];
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

export default function TeachingPanel({
  steps,
  currentStep,
  onNext,
  onPrev,
  onSkip,
}: TeachingPanelProps) {
  const [showNudge, setShowNudge] = useState(false);

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const hasVisual = step.visualType && step.visualType !== 'none';

  const handleSkipClick = () => {
    setShowNudge(true);
  };

  const handleConfirmSkip = () => {
    setShowNudge(false);
    onSkip();
  };

  const handleCancelSkip = () => {
    setShowNudge(false);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (showNudge) return;
      if (e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft' && !isFirstStep) {
        e.preventDefault();
        onPrev();
      }
    },
    [onNext, onPrev, isFirstStep, showNudge]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="space-y-4 animate-fadeIn" data-testid="teaching-panel">
      {/* Progress indicator + Skip */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/80">
          Step {currentStep + 1} of {steps.length}
        </span>
        <button
          onClick={handleSkipClick}
          className="text-sm text-white/70 hover:text-white/80 transition-colors"
          aria-label="Skip lesson"
        >
          Skip
        </button>
      </div>

      {/* Skip nudge */}
      {showNudge && (
        <div className="rounded-xl border border-amber-400/30 bg-amber-500/20 p-4 text-center space-y-3 animate-fadeIn">
          <p className="text-sm text-amber-200">
            Pro tip: reviewing the lesson helps you earn more stars!
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleCancelSkip}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Go Back to Lesson
            </button>
            <button
              onClick={handleConfirmSkip}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-white/25 text-white/70 hover:bg-white/15 transition-colors"
            >
              Skip Anyway
            </button>
          </div>
        </div>
      )}

      {/* Character dialogue */}
      <div className="animate-fadeIn" key={step.id}>
        <CharacterMessage
          characterId={step.characterId as CharacterId}
          expression={(step.expression || 'neutral') as Expression}
          variant="teaching"
          size="lg"
        >
          <p>{step.dialogue}</p>
        </CharacterMessage>
      </div>

      {/* Visual area */}
      {hasVisual && (
        <div
          data-testid="teaching-visual-area"
          className="rounded-xl border-2 border-white/25 bg-indigo-950/50 p-6 min-h-[200px] flex items-center justify-center animate-fadeIn"
        >
          <TeachingVisual
            visualType={step.visualType as VisualType}
            visualProps={step.visualProps ?? {}}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <div>
          {!isFirstStep && (
            <button
              onClick={onPrev}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-white/25 text-white/70 hover:bg-white/15 transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
        <button
          onClick={onNext}
          className="px-6 py-2.5 text-sm font-bold rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm"
        >
          {isLastStep ? 'Start Problems →' : 'Next Step →'}
        </button>
      </div>
    </div>
  );
}
