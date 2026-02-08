import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import LevelCard from './LevelCard';
import type { Level } from '@mathquest/shared';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockLevel: Level = {
  id: 'level-3-1-1',
  chapterId: 'chapter-3-1',
  worldId: 'world-3',
  number: 1,
  name: 'Mountain Base',
  type: 'teaching',
  storyContext: 'You arrive at the base of the mountain',
  problems: [
    {
      id: 'problem-3-1-1-1',
      levelId: 'level-3-1-1',
      sequence: 1,
      type: 'numeric_input',
      category: 'thinking',
      statement: 'What is 5 times 3?',
      inputType: 'number_pad',
      correctAnswer: { value: 15 },
      hints: [],
      solutionExplanation: 'Multiply',
      teachingPoint: 'Multiplication is addition',
      tags: [],
      difficulty: 2,
    },
    {
      id: 'problem-3-1-1-2',
      levelId: 'level-3-1-1',
      sequence: 2,
      type: 'numeric_input',
      category: 'thinking',
      statement: 'What is 4 times 3?',
      inputType: 'number_pad',
      correctAnswer: { value: 12 },
      hints: [],
      solutionExplanation: 'Multiply',
      teachingPoint: 'Multiplication is addition',
      tags: [],
      difficulty: 2,
    },
  ],
  difficulty: 2,
  estimatedMinutes: 10,
  isChallenge: false,
  isBoss: false,
};

describe('LevelCard', () => {
  describe('locked state', () => {
    it('should show lock icon with aria-label', () => {
      render(<LevelCard level={mockLevel} isLocked />);
      expect(screen.getByRole('img', { name: 'Locked level' })).toBeInTheDocument();
    });

    it('should not render a link when locked', () => {
      render(<LevelCard level={mockLevel} isLocked />);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should display level name in gray', () => {
      render(<LevelCard level={mockLevel} isLocked />);
      expect(screen.getByText('Mountain Base')).toBeInTheDocument();
    });

    it('should display type label', () => {
      render(<LevelCard level={mockLevel} isLocked />);
      expect(screen.getByText('Learn')).toBeInTheDocument();
    });
  });

  describe('unlocked state', () => {
    it('should render a link to play page', () => {
      render(<LevelCard level={mockLevel} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/play/level-3-1-1');
    });

    it('should display the level name', () => {
      render(<LevelCard level={mockLevel} />);
      expect(screen.getByText('Mountain Base')).toBeInTheDocument();
    });

    it('should display the type label', () => {
      render(<LevelCard level={mockLevel} />);
      expect(screen.getByText('Learn')).toBeInTheDocument();
    });

    it('should display stars', () => {
      render(<LevelCard level={mockLevel} stars={2} />);
      expect(screen.getByRole('img', { name: '2 out of 3 stars' })).toBeInTheDocument();
    });

    it('should display problem count', () => {
      render(<LevelCard level={mockLevel} />);
      expect(screen.getByText('2 problems')).toBeInTheDocument();
    });

    it('should display estimated time', () => {
      render(<LevelCard level={mockLevel} />);
      expect(screen.getByText('~10 min')).toBeInTheDocument();
    });

    it('should display story context', () => {
      render(<LevelCard level={mockLevel} />);
      expect(
        screen.getByText('You arrive at the base of the mountain')
      ).toBeInTheDocument();
    });

    it('should show challenge star indicator when isChallenge', () => {
      const challengeLevel = { ...mockLevel, isChallenge: true };
      render(<LevelCard level={challengeLevel} />);
      const starSpan = screen.getByText('⭐');
      expect(starSpan).toHaveAttribute('aria-hidden', 'true');
    });

    it('should use singular "problem" for single problem', () => {
      const singleProblemLevel = {
        ...mockLevel,
        problems: [mockLevel.problems[0]],
      };
      render(<LevelCard level={singleProblemLevel} />);
      expect(screen.getByText('1 problem')).toBeInTheDocument();
    });
  });
});
