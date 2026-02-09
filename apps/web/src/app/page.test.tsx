import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const { mockWorld3, mockWorld4, mockAllWorlds } = vi.hoisted(() => {
  const mockWorld3 = {
    id: 'world-3',
    name: 'Multiplication Mountains',
    totalLevels: 15,
    estimatedWeeks: 8,
    chapters: [
      {
        id: 'chapter-3-1',
        number: 1,
        name: 'Getting Started',
        levels: [
          { id: 'level-3-1-1' },
          { id: 'level-3-1-2' },
        ],
        learningObjectives: ['Learn basics'],
        weekStart: 1,
        weekEnd: 3,
      },
      {
        id: 'chapter-3-2',
        number: 2,
        name: 'Going Further',
        levels: [
          { id: 'level-3-2-1' },
        ],
        learningObjectives: ['Advanced concepts'],
        weekStart: 4,
        weekEnd: 6,
      },
    ],
  };

  const mockWorld4 = {
    id: 'world-4',
    name: 'Fraction Islands',
    totalLevels: 10,
    estimatedWeeks: 6,
    chapters: [
      {
        id: 'chapter-4-1',
        number: 1,
        name: 'Halves and Quarters',
        levels: [
          { id: 'level-4-1-1' },
          { id: 'level-4-1-2' },
        ],
        learningObjectives: ['Learn fractions'],
        weekStart: 1,
        weekEnd: 3,
      },
    ],
  };

  const mockAllWorlds = [mockWorld3, mockWorld4];
  return { mockWorld3, mockWorld4, mockAllWorlds };
});

vi.mock('@/lib/world-data', () => ({
  allWorlds: mockAllWorlds,
  getWorld: vi.fn((id: string) => mockAllWorlds.find((w: { id: string }) => w.id === id)),
}));

vi.mock('@/lib/storage', () => ({
  loadProgress: vi.fn(),
}));

vi.mock('@/components/navigation/ChapterCard', () => ({
  default: ({ chapter, totalStars, completedLevels }: {
    chapter: { id: string; name: string };
    totalStars: number;
    completedLevels: number;
  }) => (
    <div data-testid={`chapter-card-${chapter.id}`}>
      {chapter.name} - Stars: {totalStars} - Completed: {completedLevels}
    </div>
  ),
}));

import HomePage from './page';
import { loadProgress } from '@/lib/storage';

beforeEach(() => {
  vi.mocked(loadProgress).mockReturnValue({
    completedLevels: {
      'level-3-1-1': { stars: 3, completedAt: '2024-01-15', attempts: 1, hintsUsed: 0 },
      'level-3-1-2': { stars: 2, completedAt: '2024-01-16', attempts: 2, hintsUsed: 1 },
    },
    totalStars: 5,
    lastPlayedLevelId: 'level-3-1-2',
    lastPlayedAt: '2024-01-16',
  });
});

describe('HomePage', () => {
  it('should render world name for default selected world', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: 'Multiplication Mountains' })).toBeInTheDocument();
  });

  it('should render chapter cards for the default world', () => {
    render(<HomePage />);
    expect(screen.getByTestId('chapter-card-chapter-3-1')).toBeInTheDocument();
    expect(screen.getByTestId('chapter-card-chapter-3-2')).toBeInTheDocument();
  });

  it('should compute chapter progress correctly from completed levels', () => {
    render(<HomePage />);
    expect(screen.getByText('Getting Started - Stars: 5 - Completed: 2')).toBeInTheDocument();
  });

  it('should show zero progress for chapter with no completions', () => {
    render(<HomePage />);
    expect(screen.getByText('Going Further - Stars: 0 - Completed: 0')).toBeInTheDocument();
  });

  it('should show total stars in header', () => {
    render(<HomePage />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should show max stars for selected world', () => {
    render(<HomePage />);
    // 3 levels * 3 = 9 max stars
    expect(screen.getByText('of 9 stars')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<HomePage />);
    expect(screen.getByText('World Map')).toBeInTheDocument();
    expect(screen.getByText('Content Preview')).toBeInTheDocument();
  });

  it('should return zero stars/completed when progress is null', () => {
    vi.mocked(loadProgress).mockReturnValue({
      completedLevels: {},
      totalStars: 0,
      lastPlayedLevelId: null,
      lastPlayedAt: null,
    });
    render(<HomePage />);
    expect(screen.getByText('Getting Started - Stars: 0 - Completed: 0')).toBeInTheDocument();
  });

  describe('world selector', () => {
    it('should render world selector tabs', () => {
      render(<HomePage />);
      expect(screen.getByRole('tablist', { name: 'Select world' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Multiplication Mountains' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Fraction Islands' })).toBeInTheDocument();
    });

    it('should mark the default world tab as selected', () => {
      render(<HomePage />);
      const world3Tab = screen.getByRole('tab', { name: 'Multiplication Mountains' });
      expect(world3Tab).toHaveAttribute('aria-selected', 'true');
      const world4Tab = screen.getByRole('tab', { name: 'Fraction Islands' });
      expect(world4Tab).toHaveAttribute('aria-selected', 'false');
    });

    it('should switch to world 4 when its tab is clicked', () => {
      render(<HomePage />);
      fireEvent.click(screen.getByRole('tab', { name: 'Fraction Islands' }));

      // Header should update to world 4
      expect(screen.getByRole('heading', { name: 'Fraction Islands' })).toBeInTheDocument();
      // World 4 chapters should be visible
      expect(screen.getByTestId('chapter-card-chapter-4-1')).toBeInTheDocument();
      // World 3 chapters should be gone
      expect(screen.queryByTestId('chapter-card-chapter-3-1')).not.toBeInTheDocument();
    });

    it('should update aria-selected when switching worlds', () => {
      render(<HomePage />);
      fireEvent.click(screen.getByRole('tab', { name: 'Fraction Islands' }));

      const world4Tab = screen.getByRole('tab', { name: 'Fraction Islands' });
      expect(world4Tab).toHaveAttribute('aria-selected', 'true');
      const world3Tab = screen.getByRole('tab', { name: 'Multiplication Mountains' });
      expect(world3Tab).toHaveAttribute('aria-selected', 'false');
    });

    it('should show correct max stars after switching worlds', () => {
      render(<HomePage />);
      fireEvent.click(screen.getByRole('tab', { name: 'Fraction Islands' }));
      // 2 levels * 3 = 6 max stars
      expect(screen.getByText('of 6 stars')).toBeInTheDocument();
    });

    it('should switch back to world 3', () => {
      render(<HomePage />);
      fireEvent.click(screen.getByRole('tab', { name: 'Fraction Islands' }));
      fireEvent.click(screen.getByRole('tab', { name: 'Multiplication Mountains' }));

      expect(screen.getByTestId('chapter-card-chapter-3-1')).toBeInTheDocument();
      expect(screen.queryByTestId('chapter-card-chapter-4-1')).not.toBeInTheDocument();
    });
  });
});
