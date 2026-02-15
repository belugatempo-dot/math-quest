import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MigrationPrompt from './MigrationPrompt';

const mockGetLocalMigrationCandidates = vi.fn();
const mockMigrateAllProfilesToCloud = vi.fn();

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: true,
  }),
}));

vi.mock('@/lib/services/migration.service', () => ({
  getLocalMigrationCandidates: () => mockGetLocalMigrationCandidates(),
  migrateAllProfilesToCloud: () => mockMigrateAllProfilesToCloud(),
}));

const emptyProgress = {
  completedLevels: {},
  totalStars: 0,
  lastPlayedLevelId: null,
  lastPlayedAt: null,
};

const progressWithData = {
  completedLevels: {
    'level-3-1-1': { stars: 3, completedAt: '2026-01-01', attempts: 1, hintsUsed: 0 },
  },
  totalStars: 3,
  lastPlayedLevelId: 'level-3-1-1',
  lastPlayedAt: '2026-01-01',
};

describe('MigrationPrompt', () => {
  const onComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockMigrateAllProfilesToCloud.mockResolvedValue(0);
  });

  it('should return null when no candidates exist', () => {
    mockGetLocalMigrationCandidates.mockReturnValue([]);

    const { container } = render(<MigrationPrompt onComplete={onComplete} />);
    expect(container.firstChild).toBeNull();
  });

  it('should show migration prompt when candidates exist', () => {
    mockGetLocalMigrationCandidates.mockReturnValue([
      {
        profile: { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2026-01-01' },
        progress: emptyProgress,
        hasProgress: false,
      },
    ]);

    render(<MigrationPrompt onComplete={onComplete} />);

    expect(screen.getByText('Migrate Progress to Cloud?')).toBeInTheDocument();
    expect(
      screen.getByText(/1 player profile saved/)
    ).toBeInTheDocument();
    expect(screen.getByText('Migrate to Cloud')).toBeInTheDocument();
    expect(screen.getByText('Skip')).toBeInTheDocument();
  });

  it('should show progress count when candidates have game data', () => {
    mockGetLocalMigrationCandidates.mockReturnValue([
      {
        profile: { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2026-01-01' },
        progress: progressWithData,
        hasProgress: true,
      },
      {
        profile: { id: 'b', name: 'Bob', avatar: '🐉', createdAt: '2026-01-02' },
        progress: emptyProgress,
        hasProgress: false,
      },
    ]);

    render(<MigrationPrompt onComplete={onComplete} />);

    expect(
      screen.getByText(/1 profile has game progress/)
    ).toBeInTheDocument();
  });

  it('should call onComplete when Skip is clicked', () => {
    mockGetLocalMigrationCandidates.mockReturnValue([
      {
        profile: { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2026-01-01' },
        progress: emptyProgress,
        hasProgress: false,
      },
    ]);

    render(<MigrationPrompt onComplete={onComplete} />);
    fireEvent.click(screen.getByText('Skip'));

    expect(onComplete).toHaveBeenCalled();
  });

  it('should migrate and show result', async () => {
    mockGetLocalMigrationCandidates.mockReturnValue([
      {
        profile: { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2026-01-01' },
        progress: progressWithData,
        hasProgress: true,
      },
    ]);
    mockMigrateAllProfilesToCloud.mockResolvedValue(1);

    render(<MigrationPrompt onComplete={onComplete} />);
    fireEvent.click(screen.getByText('Migrate to Cloud'));

    await waitFor(() => {
      expect(screen.getByText('Migration Complete')).toBeInTheDocument();
    });

    expect(
      screen.getByText(/1 of 1 profile migrated/)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Continue'));
    expect(onComplete).toHaveBeenCalled();
  });

  it('should show "Migrating..." while in progress', async () => {
    mockGetLocalMigrationCandidates.mockReturnValue([
      {
        profile: { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2026-01-01' },
        progress: emptyProgress,
        hasProgress: false,
      },
    ]);

    // Make migration hang
    let resolveMigration: (value: number) => void;
    mockMigrateAllProfilesToCloud.mockReturnValue(
      new Promise<number>((resolve) => {
        resolveMigration = resolve;
      })
    );

    render(<MigrationPrompt onComplete={onComplete} />);
    fireEvent.click(screen.getByText('Migrate to Cloud'));

    expect(screen.getByText('Migrating...')).toBeInTheDocument();

    // Resolve migration
    resolveMigration!(1);

    await waitFor(() => {
      expect(screen.getByText('Migration Complete')).toBeInTheDocument();
    });
  });

  it('should use plural when multiple profiles', () => {
    mockGetLocalMigrationCandidates.mockReturnValue([
      {
        profile: { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2026-01-01' },
        progress: progressWithData,
        hasProgress: true,
      },
      {
        profile: { id: 'b', name: 'Bob', avatar: '🐉', createdAt: '2026-01-02' },
        progress: progressWithData,
        hasProgress: true,
      },
    ]);

    render(<MigrationPrompt onComplete={onComplete} />);
    expect(screen.getByText(/2 player profiles saved/)).toBeInTheDocument();
    expect(screen.getByText(/2 profiles have game progress/)).toBeInTheDocument();
  });
});
