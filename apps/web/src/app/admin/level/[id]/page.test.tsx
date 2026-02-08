import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminLevelPage from './page';

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/lib/world-data', () => ({
  getLevelWithContext: vi.fn(),
}));

vi.mock('@/components/ui/Card', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
}));

vi.mock('@/lib/level-type-styles', () => ({
  getLevelTypeInfo: (type: string) => ({
    badgeClasses: `badge-${type}`,
    badgeSolidClasses: `badge-solid-${type}`,
  }),
}));

import { useParams } from 'next/navigation';
import { getLevelWithContext } from '@/lib/world-data';

const mockLevelContext = {
  level: {
    id: 'level-3-1-1',
    name: 'Mountain Base',
    type: 'teaching',
    difficulty: 2,
    estimatedMinutes: 10,
    isChallenge: false,
    isBoss: false,
    storyContext: 'You arrive at the mountain base',
    problems: [
      {
        id: 'problem-3-1-1-1',
        type: 'numeric_input',
        inputType: 'number_pad',
        category: 'thinking',
        difficulty: 2,
        statement: 'What is 5 times 3?',
        correctAnswer: { value: 15 },
        solutionExplanation: 'Multiply 5 by 3 to get 15',
        teachingPoint: 'Multiplication is repeated addition',
        hints: [
          { tier: 1, text: 'Think about groups' },
          { tier: 2, text: 'How many groups of 3?' },
        ],
        tags: ['multiplication', 'basic'],
      },
      {
        id: 'problem-3-1-1-2',
        type: 'multiple_choice',
        inputType: 'multiple_choice',
        category: 'fluency',
        difficulty: 1,
        statement: 'Which is equal to 4 x 2?',
        correctAnswer: { value: ['4', '2', '8'], displayValue: '8' },
        solutionExplanation: '4 times 2 equals 8',
        teachingPoint: 'Basic multiplication facts',
        hints: [],
        tags: [],
      },
    ],
  },
  chapter: { id: 'chapter-3-1', name: 'Getting Started' },
  world: { name: 'Multiplication Mountains' },
};

describe('AdminLevelPage', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: 'level-3-1-1' });
  });

  describe('not-found state', () => {
    it('should show not found message when level context is null', () => {
      vi.mocked(getLevelWithContext).mockReturnValue(undefined);
      render(<AdminLevelPage />);
      expect(screen.getByText('Level not found')).toBeInTheDocument();
    });

    it('should show back link to content browser', () => {
      vi.mocked(getLevelWithContext).mockReturnValue(undefined);
      render(<AdminLevelPage />);
      const link = screen.getByText('Back to Content Browser');
      expect(link.closest('a')).toHaveAttribute('href', '/admin');
    });
  });

  describe('found state', () => {
    beforeEach(() => {
      vi.mocked(getLevelWithContext).mockReturnValue(mockLevelContext as ReturnType<typeof getLevelWithContext>);
    });

    it('should display level name', () => {
      render(<AdminLevelPage />);
      expect(screen.getByText('Mountain Base')).toBeInTheDocument();
    });

    it('should display level type in metadata', () => {
      render(<AdminLevelPage />);
      // Type appears in header badge and in Level Info section
      const typeElements = screen.getAllByText('teaching');
      expect(typeElements.length).toBeGreaterThanOrEqual(2);
    });

    it('should display difficulty', () => {
      render(<AdminLevelPage />);
      expect(screen.getByText('2/5')).toBeInTheDocument();
    });

    it('should display estimated time', () => {
      render(<AdminLevelPage />);
      expect(screen.getByText('10 min')).toBeInTheDocument();
    });

    it('should display chapter name and level ID', () => {
      render(<AdminLevelPage />);
      expect(screen.getByText(/Getting Started/)).toBeInTheDocument();
      expect(screen.getByText(/level-3-1-1/)).toBeInTheDocument();
    });

    it('should display story context', () => {
      render(<AdminLevelPage />);
      expect(screen.getByText('You arrive at the mountain base')).toBeInTheDocument();
    });

    it('should display problem statements', () => {
      render(<AdminLevelPage />);
      expect(screen.getByText('What is 5 times 3?')).toBeInTheDocument();
      expect(screen.getByText('Which is equal to 4 x 2?')).toBeInTheDocument();
    });

    it('should display problem numbers', () => {
      render(<AdminLevelPage />);
      expect(screen.getByText('Problem 1')).toBeInTheDocument();
      expect(screen.getByText('Problem 2')).toBeInTheDocument();
    });

    it('should display correct answers', () => {
      render(<AdminLevelPage />);
      expect(screen.getByText('15')).toBeInTheDocument();
    });

    it('should stringify object answers', () => {
      render(<AdminLevelPage />);
      // The array answer gets JSON.stringified
      expect(screen.getByText('["4","2","8"]')).toBeInTheDocument();
    });

    it('should display teaching points', () => {
      render(<AdminLevelPage />);
      expect(screen.getByText('Multiplication is repeated addition')).toBeInTheDocument();
      expect(screen.getByText('Basic multiplication facts')).toBeInTheDocument();
    });

    it('should display hints', () => {
      render(<AdminLevelPage />);
      expect(screen.getByText('Think about groups')).toBeInTheDocument();
      expect(screen.getByText('How many groups of 3?')).toBeInTheDocument();
    });

    it('should display tags', () => {
      render(<AdminLevelPage />);
      expect(screen.getByText('multiplication')).toBeInTheDocument();
      expect(screen.getByText('basic')).toBeInTheDocument();
    });

    it('should display play button with correct link', () => {
      render(<AdminLevelPage />);
      const playLink = screen.getByText('Play This Level →');
      expect(playLink.closest('a')).toHaveAttribute('href', '/play/level-3-1-1');
    });

    it('should display back to content browser link', () => {
      render(<AdminLevelPage />);
      const link = screen.getByText('← Back to Content Browser');
      expect(link.closest('a')).toHaveAttribute('href', '/admin');
    });

    it('should display display value when present', () => {
      render(<AdminLevelPage />);
      expect(screen.getByText('Display: 8')).toBeInTheDocument();
    });
  });
});
