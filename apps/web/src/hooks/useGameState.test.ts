import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameState } from './useGameState';

const mockLevel = {
  id: 'level-1',
  chapterId: 'chapter-1',
  worldId: 'world-1',
  number: 1,
  name: 'Test Level',
  type: 'teaching' as const,
  storyContext: 'A story',
  problems: [
    {
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
    },
  ],
  difficulty: 1 as const,
  estimatedMinutes: 5,
  isChallenge: false,
  isBoss: false,
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
    return undefined;
  }),
  getNextLevel: vi.fn(() => undefined),
}));

vi.mock('@/lib/storage', () => ({
  completeLevelProgress: vi.fn(),
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
});
