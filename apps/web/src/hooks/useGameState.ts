'use client';

import { useState, useCallback, useRef } from 'react';
import { getLevelWithContext, getNextLevel } from '@/lib/world-data';
import { completeLevelProgress } from '@/lib/storage';
import {
  checkAnswer as checkAnswerShared,
  calculateStars,
  calculateExpectedTime,
} from '@mathquest/shared';
import type { Level, Chapter, World, Problem } from '@mathquest/shared';

const ANSWER_TRANSITION_DELAY_MS = 1500;

export interface FeedbackState {
  isCorrect: boolean;
  message?: string;
}

export interface GameState {
  currentProblemIndex: number;
  attempts: number;
  hintsUsed: number;
  feedback: FeedbackState | null;
  isComplete: boolean;
  earnedStars: number;
  showTeachingPoint: boolean;
}

export interface GameActions {
  submitAnswer: (answer: string | number) => void;
  handleRevealHint: (tier: 1 | 2 | 3) => void;
}

export interface GameContext {
  level: Level;
  chapter: Chapter;
  world: World;
  currentProblem: Problem;
  nextLevel: Level | undefined;
}

export function useGameState(levelId: string): {
  state: GameState;
  actions: GameActions;
  context: GameContext;
} | null {
  const levelContext = getLevelWithContext(levelId);

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [showTeachingPoint, setShowTeachingPoint] = useState(false);
  const startTimeRef = useRef(Date.now());

  if (!levelContext) return null;

  const { level, chapter, world } = levelContext;
  const currentProblem = level.problems[currentProblemIndex];
  const nextLevel = getNextLevel(levelId);

  const submitAnswer = useCallback(
    (answer: string | number) => {
      setAttempts((a) => a + 1);
      const result = checkAnswerShared({ value: answer }, currentProblem);

      if (result.isCorrect) {
        setFeedback({ isCorrect: true });
        setShowTeachingPoint(true);

        setTimeout(() => {
          if (currentProblemIndex < level.problems.length - 1) {
            setCurrentProblemIndex((i) => i + 1);
            setFeedback(null);
            setShowTeachingPoint(false);
          } else {
            const timeSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
            const stars = calculateStars(
              { hintsUsed, attempts, timeSeconds },
              {
                expectedSeconds: calculateExpectedTime(level.problems.length, level.difficulty),
                problemCount: level.problems.length,
              }
            );
            setEarnedStars(stars);
            completeLevelProgress(levelId, stars, attempts, hintsUsed);
            setIsComplete(true);
          }
        }, ANSWER_TRANSITION_DELAY_MS);
      } else {
        setFeedback({
          isCorrect: false,
          message: result.feedback ?? 'Try again! Check your work.',
        });
      }
    },
    [currentProblem, currentProblemIndex, level, levelId, hintsUsed, attempts]
  );

  const handleRevealHint = useCallback((tier: 1 | 2 | 3) => {
    if (tier > 1) {
      setHintsUsed((h) => h + 1);
    }
  }, []);

  return {
    state: {
      currentProblemIndex,
      attempts,
      hintsUsed,
      feedback,
      isComplete,
      earnedStars,
      showTeachingPoint,
    },
    actions: { submitAnswer, handleRevealHint },
    context: { level, chapter, world, currentProblem, nextLevel },
  };
}
