import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminPage from './page';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockLevels = [
  {
    id: 'level-3-1-1',
    chapterId: 'chapter-3-1',
    name: 'Mountain Base',
    type: 'teaching',
    isChallenge: false,
    problems: [
      {
        id: 'p1',
        statement: 'What is 2 times 3?',
        hints: [{ tier: 1 }],
        teachingPoint: 'Multiplication is repeated addition of the same number',
      },
    ],
  },
  {
    id: 'level-3-1-2',
    chapterId: 'chapter-3-1',
    name: 'Practice Run',
    type: 'practice',
    isChallenge: false,
    problems: [
      {
        id: 'p2',
        statement: 'What is 4 times 5?',
        hints: [],
        teachingPoint: '',
      },
    ],
  },
  {
    id: 'level-3-2-1',
    chapterId: 'chapter-3-2',
    name: 'Boss Battle',
    type: 'boss',
    isChallenge: true,
    problems: [
      {
        id: 'p3',
        statement: 'Solve the multiplication puzzle',
        hints: [{ tier: 1 }, { tier: 2 }],
        teachingPoint: 'Complex multiplication requires strategy and patience',
      },
    ],
  },
];

const { mockAllWorlds } = vi.hoisted(() => {
  const mockWorld3 = { id: 'world-3', name: 'Multiplication Mountains' };
  const mockWorld4 = { id: 'world-4', name: 'Fraction Islands' };
  const mockAllWorlds = [mockWorld3, mockWorld4];
  return { mockAllWorlds };
});

vi.mock('@/lib/world-data', () => ({
  allWorlds: mockAllWorlds,
  getAllLevels: vi.fn(() => mockLevels),
  getChapter: vi.fn((id: string) => {
    const chapters: Record<string, { id: string; name: string }> = {
      'chapter-3-1': { id: 'chapter-3-1', name: 'Getting Started' },
      'chapter-3-2': { id: 'chapter-3-2', name: 'Going Further' },
    };
    return chapters[id];
  }),
}));

vi.mock('@/components/ui/Card', () => ({
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>{children}</div>
  ),
}));

vi.mock('@/lib/level-type-styles', () => ({
  getLevelTypeInfo: (type: string) => ({
    badgeClasses: `badge-${type}`,
    badgeSolidClasses: `badge-solid-${type}`,
  }),
}));

describe('AdminPage', () => {
  it('should display page title', () => {
    render(<AdminPage />);
    expect(screen.getByText('Content Preview')).toBeInTheDocument();
  });

  it('should display total levels count in stats card', () => {
    render(<AdminPage />);
    expect(screen.getByText(/Browse and inspect all 3 levels/)).toBeInTheDocument();
  });

  it('should display level names', () => {
    render(<AdminPage />);
    expect(screen.getByText('Mountain Base')).toBeInTheDocument();
    expect(screen.getByText('Practice Run')).toBeInTheDocument();
    expect(screen.getByText('Boss Battle')).toBeInTheDocument();
  });

  it('should display type distribution section', () => {
    render(<AdminPage />);
    expect(screen.getByText('Levels by Type')).toBeInTheDocument();
    const teachingBadges = screen.getAllByText('teaching');
    expect(teachingBadges.length).toBeGreaterThanOrEqual(1);
  });

  it('should render filter buttons', () => {
    render(<AdminPage />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Teaching' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Practice' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Challenge' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Boss' })).toBeInTheDocument();
  });

  it('should filter by type when button clicked', () => {
    render(<AdminPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Boss' }));
    expect(screen.getByText('Boss Battle')).toBeInTheDocument();
    expect(screen.queryByText('Mountain Base')).not.toBeInTheDocument();
    expect(screen.queryByText('Practice Run')).not.toBeInTheDocument();
  });

  it('should filter by teaching type', () => {
    render(<AdminPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Teaching' }));
    expect(screen.getByText('Mountain Base')).toBeInTheDocument();
    expect(screen.queryByText('Boss Battle')).not.toBeInTheDocument();
  });

  it('should search by level name', () => {
    render(<AdminPage />);
    const searchInput = screen.getByPlaceholderText('Search levels...');
    fireEvent.change(searchInput, { target: { value: 'mountain' } });
    expect(screen.getByText('Mountain Base')).toBeInTheDocument();
    expect(screen.queryByText('Practice Run')).not.toBeInTheDocument();
    expect(screen.queryByText('Boss Battle')).not.toBeInTheDocument();
  });

  it('should search by level ID', () => {
    render(<AdminPage />);
    const searchInput = screen.getByPlaceholderText('Search levels...');
    fireEvent.change(searchInput, { target: { value: 'level-3-2-1' } });
    expect(screen.getByText('Boss Battle')).toBeInTheDocument();
    expect(screen.queryByText('Mountain Base')).not.toBeInTheDocument();
  });

  it('should search by problem statement', () => {
    render(<AdminPage />);
    const searchInput = screen.getByPlaceholderText('Search levels...');
    fireEvent.change(searchInput, { target: { value: 'multiplication puzzle' } });
    expect(screen.getByText('Boss Battle')).toBeInTheDocument();
    expect(screen.queryByText('Mountain Base')).not.toBeInTheDocument();
  });

  it('should show empty state when no matches', () => {
    render(<AdminPage />);
    const searchInput = screen.getByPlaceholderText('Search levels...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    expect(screen.getByText('No levels match your search criteria')).toBeInTheDocument();
  });

  it('should show all levels when All filter is selected', () => {
    render(<AdminPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Boss' }));
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Mountain Base')).toBeInTheDocument();
    expect(screen.getByText('Boss Battle')).toBeInTheDocument();
  });

  it('should have search input with label for accessibility', () => {
    render(<AdminPage />);
    expect(screen.getByLabelText('Search levels')).toBeInTheDocument();
  });

  describe('world filter', () => {
    it('should render world filter dropdown', () => {
      render(<AdminPage />);
      expect(screen.getByLabelText('Filter by world')).toBeInTheDocument();
    });

    it('should have All Worlds as default option', () => {
      render(<AdminPage />);
      const select = screen.getByLabelText('Filter by world') as HTMLSelectElement;
      expect(select.value).toBe('all');
    });

    it('should show world options in dropdown', () => {
      render(<AdminPage />);
      expect(screen.getByRole('option', { name: 'All Worlds' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Multiplication Mountains' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Fraction Islands' })).toBeInTheDocument();
    });

    it('should have world filter dropdown accessible', () => {
      render(<AdminPage />);
      expect(screen.getByLabelText('Filter by world')).toBeInTheDocument();
    });
  });
});
