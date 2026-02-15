'use client';

import { useState, useCallback, useRef } from 'react';
import { getLevelWithContext, getNextLevel } from '@/lib/world-data';
import { useProfile } from '@/contexts/ProfileContext';
import {
  checkAnswer as checkAnswerShared,
  calculateStars,
  calculateExpectedTime,
} from '@mathquest/shared';
import type { Level, Chapter, World, Problem, GamePhase } from '@mathquest/shared';

const ANSWER_TRANSITION_DELAY_MS = 1500;
const ADAPTIVE_RETEACH_THRESHOLD = 2;

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
  correctStreak: number;
  phase: GamePhase;
  currentTeachingStep: number;
  teachingCompleted: boolean;
  consecutiveWrong: number;
  hasSeenAdaptiveReteach: boolean;
}

export interface GameActions {
  submitAnswer: (answer: string | number) => void;
  handleRevealHint: (tier: 1 | 2 | 3) => void;
  nextTeachingStep: () => void;
  prevTeachingStep: () => void;
  skipTeaching: () => void;
  acceptReteaching: () => void;
  declineReteaching: () => void;
  reviewLesson: () => void;
}

export interface GameContext {
  level: Level;
  chapter: Chapter;
  world: World;
  currentProblem: Problem;
  nextLevel: Level | undefined;
}

function hasMultiStepTeaching(level: Level): boolean {
  return !!(
    level.teaching &&
    level.teaching.format === 'multi-step-lesson' &&
    level.teaching.steps &&
    level.teaching.steps.length > 0
  );
}

export function useGameState(levelId: string): {
  state: GameState;
  actions: GameActions;
  context: GameContext;
} | null {
  const levelContext = getLevelWithContext(levelId);
  const { completeLevel } = useProfile();

  const levelRef = useRef(levelContext?.level);
  const initialPhase: GamePhase = levelRef.current && hasMultiStepTeaching(levelRef.current)
    ? 'teaching'
    : 'problem';

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [showTeachingPoint, setShowTeachingPoint] = useState(false);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [phase, setPhase] = useState<GamePhase>(initialPhase);
  const [currentTeachingStep, setCurrentTeachingStep] = useState(0);
  const [teachingCompleted, setTeachingCompleted] = useState(false);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);
  const [hasSeenAdaptiveReteach, setHasSeenAdaptiveReteach] = useState(false);
  const startTimeRef = useRef(Date.now());

  if (!levelContext) return null;

  const { level, chapter, world } = levelContext;
  const currentProblem = level.problems[currentProblemIndex];
  const nextLevel = getNextLevel(levelId);

  const teachingSteps = level.teaching?.steps;
  const totalTeachingSteps = teachingSteps?.length ?? 0;

  const nextTeachingStep = useCallback(() => {
    if (currentTeachingStep < totalTeachingSteps - 1) {
      setCurrentTeachingStep((s) => s + 1);
    } else {
      setPhase('problem');
      setTeachingCompleted(true);
    }
  }, [currentTeachingStep, totalTeachingSteps]);

  const prevTeachingStep = useCallback(() => {
    setCurrentTeachingStep((s) => Math.max(0, s - 1));
  }, []);

  const skipTeaching = useCallback(() => {
    setPhase('problem');
    setTeachingCompleted(false);
  }, []);

  const acceptReteaching = useCallback(() => {
    setPhase('teaching');
    setCurrentTeachingStep(0);
    setHasSeenAdaptiveReteach(true);
  }, []);

  const declineReteaching = useCallback(() => {
    setPhase('problem');
    setHasSeenAdaptiveReteach(true);
  }, []);

  const reviewLesson = useCallback(() => {
    setPhase('teaching');
    setCurrentTeachingStep(0);
  }, []);

  const submitAnswer = useCallback(
    (answer: string | number) => {
      setAttempts((a) => a + 1);
      const result = checkAnswerShared({ value: answer }, currentProblem);

      if (result.isCorrect) {
        setFeedback({ isCorrect: true });
        setShowTeachingPoint(true);
        setCorrectStreak((s) => s + 1);
        setConsecutiveWrong(0);

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
            completeLevel(levelId, stars, attempts, hintsUsed);
            setIsComplete(true);
          }
        }, ANSWER_TRANSITION_DELAY_MS);
      } else {
        setFeedback({
          isCorrect: false,
          message: result.feedback ?? 'Try again! Check your work.',
        });
        setCorrectStreak(0);
        setConsecutiveWrong((c) => {
          const next = c + 1;
          if (
            next >= ADAPTIVE_RETEACH_THRESHOLD &&
            !hasSeenAdaptiveReteach &&
            hasMultiStepTeaching(level)
          ) {
            setPhase('adaptive-reteach');
          }
          return next;
        });
      }
    },
    [currentProblem, currentProblemIndex, level, levelId, hintsUsed, attempts, completeLevel, hasSeenAdaptiveReteach]
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
      correctStreak,
      phase,
      currentTeachingStep,
      teachingCompleted,
      consecutiveWrong,
      hasSeenAdaptiveReteach,
    },
    actions: {
      submitAnswer,
      handleRevealHint,
      nextTeachingStep,
      prevTeachingStep,
      skipTeaching,
      acceptReteaching,
      declineReteaching,
      reviewLesson,
    },
    context: { level, chapter, world, currentProblem, nextLevel },
  };
}
