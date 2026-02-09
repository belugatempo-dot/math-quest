import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChapterPage from './page';

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockChapter = {
  id: 'chapter-3-1',
  number: 1,
  name: 'Getting Started',
  learningObjectives: ['Learn multiplication', 'Understand grouping'],
  levels: [
    {
      id: 'level-3-1-1',
      name: 'Mountain Base',
      type: 'teaching',
      problems: [{ id: 'p1' }],
      isChallenge: false,
      storyContext: 'Story 1',
      estimatedMinutes: 5,
      difficulty: 1,
      isBoss: false,
    },
    {
      id: 'level-3-1-2',
      name: 'Climbing Up',
      type: 'practice',
      problems: [{ id: 'p2' }, { id: 'p3' }],
      isChallenge: false,
      storyContext: 'Story 2',
      estimatedMinutes: 8,
      difficulty: 2,
      isBoss: false,
    },
  ],
  weekStart: 1,
  weekEnd: 3,
};

vi.mock('@/lib/world-data', () => ({
  getChapter: vi.fn(),
}));

vi.mock('@/lib/storage', () => ({
  loadProgress: vi.fn(),
}));

vi.mock('@/components/navigation/LevelCard', () => ({
  default: ({ level, stars, isLocked }: {
    level: { id: string; name: string };
    stars: number;
    isLocked: boolean;
  }) => (
    <div data-testid={`level-card-${level.id}`}>
      {level.name} - Stars: {stars} - {isLocked ? 'Locked' : 'Unlocked'}
    </div>
  ),
}));

vi.mock('@/components/game/StarDisplay', () => ({
  default: () => <div data-testid="star-display" />,
}));

import { useParams } from 'next/navigation';
import { getChapter } from '@/lib/world-data';
import { loadProgress } from '@/lib/storage';

describe('ChapterPage', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: 'chapter-3-1' });
  });

  describe('not-found state', () => {
    it('should show not found message when chapter is null', () => {
      vi.mocked(getChapter).mockReturnValue(undefined);
      render(<ChapterPage />);
      expect(screen.getByText('Chapter not found')).toBeInTheDocument();
    });

    it('should show back link when chapter not found', () => {
      vi.mocked(getChapter).mockReturnValue(undefined);
      render(<ChapterPage />);
      const link = screen.getByText('Back to World Map');
      expect(link.closest('a')).toHaveAttribute('href', '/');
    });
  });

  describe('found state', () => {
    beforeEach(() => {
      vi.mocked(getChapter).mockReturnValue(mockChapter as ReturnType<typeof getChapter>);
      vi.mocked(loadProgress).mockReturnValue({
        completedLevels: {
          'level-3-1-1': { stars: 3, completedAt: '2024-01-15', attempts: 1, hintsUsed: 0 },
        },
        totalStars: 3,
        lastPlayedLevelId: 'level-3-1-1',
        lastPlayedAt: '2024-01-15',
      });
    });

    it('should display chapter number', () => {
      render(<ChapterPage />);
      expect(screen.getByText('Chapter 1')).toBeInTheDocument();
    });

    it('should display chapter name', () => {
      render(<ChapterPage />);
      expect(screen.getByText('Getting Started')).toBeInTheDocument();
    });

    it('should display total and max stars', () => {
      render(<ChapterPage />);
      // 3 stars earned out of 2 levels * 3 = 6 max
      expect(screen.getByText('3/6 stars')).toBeInTheDocument();
    });

    it('should display completed level count', () => {
      render(<ChapterPage />);
      expect(screen.getByText('1/2 levels')).toBeInTheDocument();
    });

    it('should render level cards', () => {
      render(<ChapterPage />);
      expect(screen.getByTestId('level-card-level-3-1-1')).toBeInTheDocument();
      expect(screen.getByTestId('level-card-level-3-1-2')).toBeInTheDocument();
    });

    it('should show first level as unlocked', () => {
      render(<ChapterPage />);
      expect(screen.getByText('Mountain Base - Stars: 3 - Unlocked')).toBeInTheDocument();
    });

    it('should show second level as unlocked when first is completed', () => {
      render(<ChapterPage />);
      // First level has stars > 0, so second is unlocked
      expect(screen.getByText('Climbing Up - Stars: 0 - Unlocked')).toBeInTheDocument();
    });

    it('should show second level as locked when first has no stars', () => {
      vi.mocked(loadProgress).mockReturnValue({
        completedLevels: {},
        totalStars: 0,
        lastPlayedLevelId: null,
        lastPlayedAt: null,
      });
      render(<ChapterPage />);
      expect(screen.getByText('Climbing Up - Stars: 0 - Locked')).toBeInTheDocument();
    });

    it('should display learning objectives', () => {
      render(<ChapterPage />);
      expect(screen.getByText('Learn multiplication • Understand grouping')).toBeInTheDocument();
    });

    it('should display back to world map link', () => {
      render(<ChapterPage />);
      const link = screen.getByText('← Back to World Map');
      expect(link.closest('a')).toHaveAttribute('href', '/');
    });
  });
});
