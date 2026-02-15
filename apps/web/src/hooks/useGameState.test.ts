import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameState } from './useGameState';

const mockCompleteLevel = vi.fn();

const mockProblem = {
  id: 'problem-1',
  levelId: 'level-1',
  sequence: 1,
  type: 'numeric_input' as const,
  category: 'fluency' as const,
  statement: 'What is 2+2?',
  inputType: 'number_pad' as const,
  correctAnswer: { value: 4 },
  hints: [
    { tier: 1 as const, cost: 0, text: 'Think addition', type: 'conceptual' as const },
    { tier: 2 as const, cost: 1, text: 'Count up', type: 'directional' as const },
    { tier: 3 as const, cost: 2, text: '2+2=?', type: 'scaffolded' as const },
  ],
  solutionExplanation: '2+2=4',
  teachingPoint: 'Basic addition',
  tags: ['addition'],
  difficulty: 1 as const,
};

const mockProblem2 = {
  ...mockProblem,
  id: 'problem-2',
  sequence: 2,
  statement: 'What is 3+3?',
  correctAnswer: { value: 6 },
};

const mockTeachingContent = {
  format: 'multi-step-lesson' as const,
  steps: [
    {
      id: 'step-1',
      characterId: 'prof-owlbert',
      expression: 'happy',
      dialogue: 'Welcome to the lesson!',
    },
    {
      id: 'step-2',
      characterId: 'prof-owlbert',
      expression: 'thinking',
      dialogue: 'Let me explain angles.',
    },
    {
      id: 'step-3',
      characterId: 'prof-owlbert',
      expression: 'encouraging',
      dialogue: 'Now you are ready!',
    },
  ],
  skippable: true,
};

const mockLevel = {
  id: 'level-1',
  chapterId: 'chapter-1',
  worldId: 'world-1',
  number: 1,
  name: 'Test Level',
  type: 'teaching' as const,
  storyContext: 'A story',
  problems: [mockProblem],
  difficulty: 1 as const,
  estimatedMinutes: 5,
  isChallenge: false,
  isBoss: false,
};

const mockLevelWithTeaching = {
  ...mockLevel,
  id: 'level-teaching',
  teaching: mockTeachingContent,
};

const mockLevelMultiProblem = {
  ...mockLevel,
  id: 'level-multi',
  problems: [mockProblem, mockProblem2],
  teaching: mockTeachingContent,
};

const mockChapter = {
  id: 'chapter-1',
  worldId: 'world-1',
  number: 1,
  name: 'Chapter 1',
  topic: 'test',
  weekStart: 1,
  weekEnd: 2,
  levels: [mockLevel],
  learningObjectives: [],
  signatureContent: [],
  isBoss: false,
};

const mockWorld = {
  id: 'world-1',
  name: 'Test World',
  theme: 'test',
  baLevel: 1,
  targetAgeMin: 6,
  targetAgeMax: 8,
  totalLevels: 1,
  chapters: [mockChapter],
  colorPalette: { primary: '', secondary: '', accent: '', background: '', text: '' },
  characters: [],
  isLocked: false,
  prerequisiteWorldId: null,
  estimatedWeeks: 36,
};

vi.mock('@/lib/world-data', () => ({
  getLevelWithContext: vi.fn((id: string) => {
    if (id === 'level-1') {
      return { level: mockLevel, chapter: mockChapter, world: mockWorld };
    }
    if (id === 'level-teaching') {
      return { level: mockLevelWithTeaching, chapter: mockChapter, world: mockWorld };
    }
    if (id === 'level-multi') {
      return { level: mockLevelMultiProblem, chapter: mockChapter, world: mockWorld };
    }
    return undefined;
  }),
  getNextLevel: vi.fn(() => undefined),
}));

vi.mock('@/contexts/ProfileContext', () => ({
  useProfile: () => ({
    completeLevel: mockCompleteLevel,
    activeProfile: { id: 'test-profile', name: 'Test', avatar: '🧒', createdAt: '2024-01-01' },
    profiles: [],
    progress: { completedLevels: {}, totalStars: 0, lastPlayedLevelId: null, lastPlayedAt: null },
    switchProfile: vi.fn(),
    createProfile: vi.fn(),
    deleteProfile: vi.fn(),
  }),
}));

describe('useGameState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null when level is not found', () => {
    const { result } = renderHook(() => useGameState('nonexistent'));
    expect(result.current).toBeNull();
  });

  it('returns initial state for a valid level', () => {
    const { result } = renderHook(() => useGameState('level-1'));
    expect(result.current).not.toBeNull();

    const { state, context } = result.current!;
    expect(state.currentProblemIndex).toBe(0);
    expect(state.attempts).toBe(0);
    expect(state.hintsUsed).toBe(0);
    expect(state.feedback).toBeNull();
    expect(state.isComplete).toBe(false);
    expect(state.earnedStars).toBe(0);
    expect(state.showTeachingPoint).toBe(false);

    expect(context.level.id).toBe('level-1');
    expect(context.chapter.id).toBe('chapter-1');
    expect(context.currentProblem.id).toBe('problem-1');
  });

  it('sets feedback to incorrect on wrong answer', () => {
    const { result } = renderHook(() => useGameState('level-1'));

    act(() => {
      result.current!.actions.submitAnswer(99);
    });

    expect(result.current!.state.feedback).toEqual({
      isCorrect: false,
      message: 'Try again! Check your work.',
    });
    expect(result.current!.state.attempts).toBe(1);
  });

  it('sets feedback to correct and showTeachingPoint on correct answer', () => {
    const { result } = renderHook(() => useGameState('level-1'));

    act(() => {
      result.current!.actions.submitAnswer(4);
    });

    expect(result.current!.state.feedback).toEqual({ isCorrect: true });
    expect(result.current!.state.showTeachingPoint).toBe(true);
  });

  it('does not increment hintsUsed for tier 1 (free)', () => {
    const { result } = renderHook(() => useGameState('level-1'));

    act(() => {
      result.current!.actions.handleRevealHint(1);
    });

    expect(result.current!.state.hintsUsed).toBe(0);
  });

  it('increments hintsUsed for tier 2', () => {
    const { result } = renderHook(() => useGameState('level-1'));

    act(() => {
      result.current!.actions.handleRevealHint(2);
    });

    expect(result.current!.state.hintsUsed).toBe(1);
  });

  it('increments hintsUsed for tier 3', () => {
    const { result } = renderHook(() => useGameState('level-1'));

    act(() => {
      result.current!.actions.handleRevealHint(3);
    });

    expect(result.current!.state.hintsUsed).toBe(1);
  });

  describe('teaching phase management', () => {
    it('starts in teaching phase when level has multi-step teaching content', () => {
      const { result } = renderHook(() => useGameState('level-teaching'));
      expect(result.current!.state.phase).toBe('teaching');
      expect(result.current!.state.currentTeachingStep).toBe(0);
    });

    it('starts in problem phase when level has no teaching content', () => {
      const { result } = renderHook(() => useGameState('level-1'));
      expect(result.current!.state.phase).toBe('problem');
    });

    it('advances teaching step with nextTeachingStep', () => {
      const { result } = renderHook(() => useGameState('level-teaching'));
      expect(result.current!.state.currentTeachingStep).toBe(0);

      act(() => {
        result.current!.actions.nextTeachingStep();
      });

      expect(result.current!.state.currentTeachingStep).toBe(1);
      expect(result.current!.state.phase).toBe('teaching');
    });

    it('transitions to problem phase on last teaching step', () => {
      const { result } = renderHook(() => useGameState('level-teaching'));

      // Advance through all 3 steps
      act(() => { result.current!.actions.nextTeachingStep(); }); // step 0 → 1
      act(() => { result.current!.actions.nextTeachingStep(); }); // step 1 → 2
      act(() => { result.current!.actions.nextTeachingStep(); }); // step 2 → problem phase

      expect(result.current!.state.phase).toBe('problem');
      expect(result.current!.state.teachingCompleted).toBe(true);
    });

    it('goes back to previous teaching step with prevTeachingStep', () => {
      const { result } = renderHook(() => useGameState('level-teaching'));

      act(() => { result.current!.actions.nextTeachingStep(); });
      expect(result.current!.state.currentTeachingStep).toBe(1);

      act(() => { result.current!.actions.prevTeachingStep(); });
      expect(result.current!.state.currentTeachingStep).toBe(0);
    });

    it('does not go below step 0 with prevTeachingStep', () => {
      const { result } = renderHook(() => useGameState('level-teaching'));

      act(() => { result.current!.actions.prevTeachingStep(); });
      expect(result.current!.state.currentTeachingStep).toBe(0);
    });

    it('skips teaching and transitions to problem phase', () => {
      const { result } = renderHook(() => useGameState('level-teaching'));

      act(() => { result.current!.actions.skipTeaching(); });

      expect(result.current!.state.phase).toBe('problem');
      expect(result.current!.state.teachingCompleted).toBe(false);
    });

    it('tracks consecutive wrong answers', () => {
      const { result } = renderHook(() => useGameState('level-teaching'));

      // Skip teaching to get to problems
      act(() => { result.current!.actions.skipTeaching(); });

      act(() => { result.current!.actions.submitAnswer(99); });
      expect(result.current!.state.consecutiveWrong).toBe(1);

      act(() => { result.current!.actions.submitAnswer(99); });
      expect(result.current!.state.consecutiveWrong).toBe(2);
    });

    it('triggers adaptive reteach after 2 consecutive wrong answers', () => {
      const { result } = renderHook(() => useGameState('level-teaching'));

      act(() => { result.current!.actions.skipTeaching(); });

      act(() => { result.current!.actions.submitAnswer(99); });
      act(() => { result.current!.actions.submitAnswer(99); });

      expect(result.current!.state.phase).toBe('adaptive-reteach');
    });

    it('does not trigger adaptive reteach if no teaching content', () => {
      const { result } = renderHook(() => useGameState('level-1'));

      act(() => { result.current!.actions.submitAnswer(99); });
      act(() => { result.current!.actions.submitAnswer(99); });

      expect(result.current!.state.phase).toBe('problem');
    });

    it('does not trigger adaptive reteach a second time', () => {
      const { result } = renderHook(() => useGameState('level-teaching'));

      act(() => { result.current!.actions.skipTeaching(); });

      // First trigger
      act(() => { result.current!.actions.submitAnswer(99); });
      act(() => { result.current!.actions.submitAnswer(99); });
      expect(result.current!.state.phase).toBe('adaptive-reteach');

      // Decline reteaching
      act(() => { result.current!.actions.declineReteaching(); });
      expect(result.current!.state.phase).toBe('problem');

      // Get more wrong answers — should not trigger again
      act(() => { result.current!.actions.submitAnswer(99); });
      act(() => { result.current!.actions.submitAnswer(99); });
      expect(result.current!.state.phase).toBe('problem');
    });

    it('returns to teaching on acceptReteaching', () => {
      const { result } = renderHook(() => useGameState('level-teaching'));

      act(() => { result.current!.actions.skipTeaching(); });
      act(() => { result.current!.actions.submitAnswer(99); });
      act(() => { result.current!.actions.submitAnswer(99); });

      act(() => { result.current!.actions.acceptReteaching(); });

      expect(result.current!.state.phase).toBe('teaching');
      expect(result.current!.state.currentTeachingStep).toBe(0);
    });

    it('marks hasSeenAdaptiveReteach on acceptReteaching', () => {
      const { result } = renderHook(() => useGameState('level-teaching'));

      act(() => { result.current!.actions.skipTeaching(); });
      act(() => { result.current!.actions.submitAnswer(99); });
      act(() => { result.current!.actions.submitAnswer(99); });

      act(() => { result.current!.actions.acceptReteaching(); });
      expect(result.current!.state.hasSeenAdaptiveReteach).toBe(true);
    });

    it('marks hasSeenAdaptiveReteach on declineReteaching', () => {
      const { result } = renderHook(() => useGameState('level-teaching'));

      act(() => { result.current!.actions.skipTeaching(); });
      act(() => { result.current!.actions.submitAnswer(99); });
      act(() => { result.current!.actions.submitAnswer(99); });

      act(() => { result.current!.actions.declineReteaching(); });
      expect(result.current!.state.hasSeenAdaptiveReteach).toBe(true);
    });

    it('allows reviewLesson to go back to teaching phase', () => {
      const { result } = renderHook(() => useGameState('level-teaching'));

      // Complete teaching
      act(() => { result.current!.actions.nextTeachingStep(); });
      act(() => { result.current!.actions.nextTeachingStep(); });
      act(() => { result.current!.actions.nextTeachingStep(); });
      expect(result.current!.state.phase).toBe('problem');

      act(() => { result.current!.actions.reviewLesson(); });
      expect(result.current!.state.phase).toBe('teaching');
      expect(result.current!.state.currentTeachingStep).toBe(0);
    });

    it('resets consecutiveWrong on correct answer', () => {
      const { result } = renderHook(() => useGameState('level-multi'));

      act(() => { result.current!.actions.skipTeaching(); });

      act(() => { result.current!.actions.submitAnswer(99); });
      expect(result.current!.state.consecutiveWrong).toBe(1);

      act(() => { result.current!.actions.submitAnswer(4); });
      expect(result.current!.state.consecutiveWrong).toBe(0);
    });
  });
});
