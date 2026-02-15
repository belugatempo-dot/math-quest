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
    baLevel: 3,
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
    baLevel: 4,
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

const mockUseProfile = vi.fn();
vi.mock('@/contexts/ProfileContext', () => ({
  useProfile: () => mockUseProfile(),
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

vi.mock('@/components/ui/ProfilePicker', () => ({
  default: () => <div data-testid="profile-picker">Profile Picker</div>,
}));

vi.mock('@/components/effects/FloatingParticles', () => ({
  default: () => <div data-testid="floating-particles" />,
}));

import HomePage from './page';

const defaultProgress = {
  completedLevels: {
    'level-3-1-1': { stars: 3, completedAt: '2024-01-15', attempts: 1, hintsUsed: 0 },
    'level-3-1-2': { stars: 2, completedAt: '2024-01-16', attempts: 2, hintsUsed: 1 },
  },
  totalStars: 5,
  lastPlayedLevelId: 'level-3-1-2',
  lastPlayedAt: '2024-01-16',
};

const activeProfile = { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2024-01-01' };

beforeEach(() => {
  mockUseProfile.mockReturnValue({
    activeProfile,
    profiles: [activeProfile],
    progress: defaultProgress,
    switchProfile: vi.fn(),
    createProfile: vi.fn(),
    deleteProfile: vi.fn(),
    completeLevel: vi.fn(),
  });
});

describe('HomePage', () => {
  it('should show ProfilePicker when no active profile', () => {
    mockUseProfile.mockReturnValue({
      activeProfile: null,
      profiles: [],
      progress: { completedLevels: {}, totalStars: 0, lastPlayedLevelId: null, lastPlayedAt: null },
      switchProfile: vi.fn(),
      createProfile: vi.fn(),
      deleteProfile: vi.fn(),
      completeLevel: vi.fn(),
    });
    render(<HomePage />);
    expect(screen.getByTestId('profile-picker')).toBeInTheDocument();
  });

  it('should render world name for default selected world (last world)', () => {
    render(<HomePage />);
    // Default is the last world (world-4)
    expect(screen.getByRole('heading', { name: 'Level 4 - Fraction Islands' })).toBeInTheDocument();
  });

  it('should render chapter cards for the default world', () => {
    render(<HomePage />);
    // Default is world-4
    expect(screen.getByTestId('chapter-card-chapter-4-1')).toBeInTheDocument();
  });

  it('should compute chapter progress correctly from completed levels', () => {
    render(<HomePage />);
    // Switch to world 3 to see progress
    fireEvent.click(screen.getByRole('tab', { name: /Multiplication Mountains/ }));
    expect(screen.getByText('Getting Started - Stars: 5 - Completed: 2')).toBeInTheDocument();
  });

  it('should show zero progress for chapter with no completions', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('tab', { name: /Multiplication Mountains/ }));
    expect(screen.getByText('Going Further - Stars: 0 - Completed: 0')).toBeInTheDocument();
  });

  it('should show total stars in header', () => {
    render(<HomePage />);
    // Default is world-4, which has 0 stars completed
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should show max stars for selected world', () => {
    render(<HomePage />);
    // Default is world-4 with 2 levels = 6 max stars
    expect(screen.getByText('of 6 stars')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<HomePage />);
    expect(screen.getByText('World Map')).toBeInTheDocument();
    expect(screen.getByText('Content Preview')).toBeInTheDocument();
  });

  it('should return zero stars/completed when progress has no completions', () => {
    mockUseProfile.mockReturnValue({
      activeProfile,
      profiles: [activeProfile],
      progress: { completedLevels: {}, totalStars: 0, lastPlayedLevelId: null, lastPlayedAt: null },
      switchProfile: vi.fn(),
      createProfile: vi.fn(),
      deleteProfile: vi.fn(),
      completeLevel: vi.fn(),
    });
    render(<HomePage />);
    expect(screen.getByText('Halves and Quarters - Stars: 0 - Completed: 0')).toBeInTheDocument();
  });

  it('should show active profile name and avatar', () => {
    render(<HomePage />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByLabelText('Switch player')).toBeInTheDocument();
  });

  it('should call switchProfile with empty string when switch player is clicked', () => {
    const switchProfile = vi.fn();
    mockUseProfile.mockReturnValue({
      activeProfile,
      profiles: [activeProfile],
      progress: defaultProgress,
      switchProfile,
      createProfile: vi.fn(),
      deleteProfile: vi.fn(),
      completeLevel: vi.fn(),
    });
    render(<HomePage />);
    fireEvent.click(screen.getByLabelText('Switch player'));
    expect(switchProfile).toHaveBeenCalledWith('');
  });

  describe('world selector', () => {
    it('should render world selector tabs', () => {
      render(<HomePage />);
      expect(screen.getByRole('tablist', { name: 'Select world' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /Multiplication Mountains/ })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /Fraction Islands/ })).toBeInTheDocument();
    });

    it('should mark the default world tab as selected', () => {
      render(<HomePage />);
      // Default is world-4 (last world)
      const world4Tab = screen.getByRole('tab', { name: /Fraction Islands/ });
      expect(world4Tab).toHaveAttribute('aria-selected', 'true');
      const world3Tab = screen.getByRole('tab', { name: /Multiplication Mountains/ });
      expect(world3Tab).toHaveAttribute('aria-selected', 'false');
    });

    it('should switch to world 3 when its tab is clicked', () => {
      render(<HomePage />);
      fireEvent.click(screen.getByRole('tab', { name: /Multiplication Mountains/ }));

      expect(screen.getByRole('heading', { name: 'Level 3 - Multiplication Mountains' })).toBeInTheDocument();
      expect(screen.getByTestId('chapter-card-chapter-3-1')).toBeInTheDocument();
      expect(screen.queryByTestId('chapter-card-chapter-4-1')).not.toBeInTheDocument();
    });

    it('should update aria-selected when switching worlds', () => {
      render(<HomePage />);
      fireEvent.click(screen.getByRole('tab', { name: /Multiplication Mountains/ }));

      const world3Tab = screen.getByRole('tab', { name: /Multiplication Mountains/ });
      expect(world3Tab).toHaveAttribute('aria-selected', 'true');
      const world4Tab = screen.getByRole('tab', { name: /Fraction Islands/ });
      expect(world4Tab).toHaveAttribute('aria-selected', 'false');
    });

    it('should show correct max stars after switching worlds', () => {
      render(<HomePage />);
      fireEvent.click(screen.getByRole('tab', { name: /Multiplication Mountains/ }));
      expect(screen.getByText('of 9 stars')).toBeInTheDocument();
    });

    it('should switch back to world 4', () => {
      render(<HomePage />);
      fireEvent.click(screen.getByRole('tab', { name: /Multiplication Mountains/ }));
      fireEvent.click(screen.getByRole('tab', { name: /Fraction Islands/ }));

      expect(screen.getByTestId('chapter-card-chapter-4-1')).toBeInTheDocument();
      expect(screen.queryByTestId('chapter-card-chapter-3-1')).not.toBeInTheDocument();
    });
  });
});
