import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlayPage from './page';

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/hooks/useGameState', () => ({
  useGameState: vi.fn(),
}));

vi.mock('@/components/game/ProblemDisplay', () => ({
  default: ({ problem }: { problem: { statement: string } }) => (
    <div data-testid="problem-display">{problem.statement}</div>
  ),
}));

vi.mock('@/components/game/AnswerInput', () => ({
  default: () => <div data-testid="answer-input" />,
}));

vi.mock('@/components/game/HintPanel', () => ({
  default: ({ isChallenge }: { isChallenge?: boolean }) => (
    <div data-testid="hint-panel">{isChallenge ? 'Challenge' : 'Normal'}</div>
  ),
}));

vi.mock('@/components/game/LevelComplete', () => ({
  default: ({ levelName }: { levelName: string }) => (
    <div data-testid="level-complete">{levelName}</div>
  ),
}));

vi.mock('@/components/game/StarDisplay', () => ({
  default: () => <div data-testid="star-display" />,
}));

vi.mock('@/components/ui/Card', () => ({
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>{children}</div>
  ),
}));

import { useParams } from 'next/navigation';
import { useGameState } from '@/hooks/useGameState';

const mockProblem = {
  id: 'problem-3-1-1-1',
  statement: 'What is 5 times 3?',
  hints: [
    { tier: 1, cost: 0, text: 'Think about groups', type: 'conceptual' },
  ],
  teachingPoint: 'Multiplication is fun',
};

const mockGameState = {
  state: {
    currentProblemIndex: 0,
    attempts: 2,
    hintsUsed: 0,
    feedback: null,
    isComplete: false,
    earnedStars: 0,
    showTeachingPoint: false,
  },
  actions: {
    submitAnswer: vi.fn(),
    handleRevealHint: vi.fn(),
  },
  context: {
    level: {
      id: 'level-3-1-1',
      name: 'Mountain Base',
      storyContext: 'You arrive at the mountain',
      problems: [mockProblem],
      isChallenge: false,
      difficulty: 2,
    },
    chapter: { id: 'chapter-3-1', name: 'Getting Started' },
    world: { name: 'Multiplication Mountains' },
    currentProblem: mockProblem,
    nextLevel: { id: 'level-3-1-2' },
  },
};

describe('PlayPage', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ levelId: 'level-3-1-1' });
  });

  describe('not-found state', () => {
    it('should show not found message when game state is null', () => {
      vi.mocked(useGameState).mockReturnValue(null);
      render(<PlayPage />);
      expect(screen.getByText('Level not found')).toBeInTheDocument();
    });

    it('should show back link when level not found', () => {
      vi.mocked(useGameState).mockReturnValue(null);
      render(<PlayPage />);
      const link = screen.getByText('Back to World Map');
      expect(link.closest('a')).toHaveAttribute('href', '/');
    });
  });

  describe('found state', () => {
    beforeEach(() => {
      vi.mocked(useGameState).mockReturnValue(mockGameState as ReturnType<typeof useGameState>);
    });

    it('should display level name', () => {
      render(<PlayPage />);
      expect(screen.getByText('Mountain Base')).toBeInTheDocument();
    });

    it('should display chapter breadcrumb link', () => {
      render(<PlayPage />);
      const link = screen.getByText(/Getting Started/);
      expect(link.closest('a')).toHaveAttribute('href', '/chapter/chapter-3-1');
    });

    it('should display problem counter', () => {
      render(<PlayPage />);
      expect(screen.getByText('Problem 1/1')).toBeInTheDocument();
    });

    it('should render problem display', () => {
      render(<PlayPage />);
      expect(screen.getByTestId('problem-display')).toBeInTheDocument();
      expect(screen.getByText('What is 5 times 3?')).toBeInTheDocument();
    });

    it('should show story context on first problem', () => {
      render(<PlayPage />);
      expect(screen.getByText('You arrive at the mountain')).toBeInTheDocument();
    });

    it('should not show story context on later problems', () => {
      const laterState = {
        ...mockGameState,
        state: { ...mockGameState.state, currentProblemIndex: 1 },
      };
      vi.mocked(useGameState).mockReturnValue(laterState as ReturnType<typeof useGameState>);
      render(<PlayPage />);
      expect(screen.queryByText('You arrive at the mountain')).not.toBeInTheDocument();
    });

    it('should show attempts count', () => {
      render(<PlayPage />);
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should not show challenge badge for non-challenge level', () => {
      render(<PlayPage />);
      expect(screen.queryByText('Challenge ⭐')).not.toBeInTheDocument();
    });

    it('should show challenge badge for challenge level', () => {
      const challengeState = {
        ...mockGameState,
        context: {
          ...mockGameState.context,
          level: { ...mockGameState.context.level, isChallenge: true },
        },
      };
      vi.mocked(useGameState).mockReturnValue(challengeState as ReturnType<typeof useGameState>);
      render(<PlayPage />);
      expect(screen.getByText('Challenge ⭐')).toBeInTheDocument();
    });

    it('should not show level complete modal when not complete', () => {
      render(<PlayPage />);
      expect(screen.queryByTestId('level-complete')).not.toBeInTheDocument();
    });

    it('should show level complete modal when complete', () => {
      const completeState = {
        ...mockGameState,
        state: { ...mockGameState.state, isComplete: true, earnedStars: 3 },
      };
      vi.mocked(useGameState).mockReturnValue(completeState as ReturnType<typeof useGameState>);
      render(<PlayPage />);
      expect(screen.getByTestId('level-complete')).toBeInTheDocument();
    });
  });
});
