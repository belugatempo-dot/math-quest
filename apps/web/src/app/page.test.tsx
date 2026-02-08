import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/lib/world-data', () => ({
  world3: {
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
  },
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

vi.mock('@/components/game/StarDisplay', () => ({
  default: () => <div data-testid="star-display" />,
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
  it('should render world name', () => {
    render(<HomePage />);
    expect(screen.getByText('Multiplication Mountains')).toBeInTheDocument();
  });

  it('should render chapter cards for each chapter', () => {
    render(<HomePage />);
    expect(screen.getByTestId('chapter-card-chapter-3-1')).toBeInTheDocument();
    expect(screen.getByTestId('chapter-card-chapter-3-2')).toBeInTheDocument();
  });

  it('should compute chapter progress correctly from completed levels', () => {
    render(<HomePage />);
    // Chapter 3-1 has level-3-1-1 (3 stars) and level-3-1-2 (2 stars) = 5 stars, 2 completed
    expect(screen.getByText('Getting Started - Stars: 5 - Completed: 2')).toBeInTheDocument();
  });

  it('should show zero progress for chapter with no completions', () => {
    render(<HomePage />);
    // Chapter 3-2 has no completed levels
    expect(screen.getByText('Going Further - Stars: 0 - Completed: 0')).toBeInTheDocument();
  });

  it('should show total stars in header', () => {
    render(<HomePage />);
    // totalStars = 5 shown as bold number
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should show max stars', () => {
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
});
