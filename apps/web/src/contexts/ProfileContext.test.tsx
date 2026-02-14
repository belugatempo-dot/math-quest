import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ProfileProvider, useProfile } from './ProfileContext';

const mockProfiles = vi.hoisted(() => ({
  loadProfiles: vi.fn(),
  saveProfiles: vi.fn(),
  createProfile: vi.fn(),
  deleteProfile: vi.fn(),
  setActiveProfile: vi.fn(),
}));

const mockStorage = vi.hoisted(() => ({
  loadProgress: vi.fn(),
  completeLevelProgress: vi.fn(),
  migrateOldProgress: vi.fn(),
}));

vi.mock('@/lib/profiles', () => mockProfiles);
vi.mock('@/lib/storage', () => mockStorage);

function TestConsumer() {
  const { activeProfile, profiles, progress } = useProfile();
  return (
    <div>
      <span data-testid="active-name">{activeProfile?.name ?? 'none'}</span>
      <span data-testid="profile-count">{profiles.length}</span>
      <span data-testid="total-stars">{progress.totalStars}</span>
    </div>
  );
}

describe('ProfileProvider', () => {
  beforeEach(() => {
    vi.stubGlobal('crypto', { randomUUID: vi.fn(() => 'uuid-123') });
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should render children when profiles are loaded', () => {
    mockProfiles.loadProfiles.mockReturnValue({
      profiles: [{ id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2024-01-01' }],
      activeProfileId: 'a',
    });
    mockStorage.loadProgress.mockReturnValue({
      completedLevels: {},
      totalStars: 5,
      lastPlayedLevelId: null,
      lastPlayedAt: null,
    });
    mockStorage.migrateOldProgress.mockReturnValue(null);

    render(
      <ProfileProvider>
        <TestConsumer />
      </ProfileProvider>
    );

    expect(screen.getByTestId('active-name')).toHaveTextContent('Alice');
    expect(screen.getByTestId('total-stars')).toHaveTextContent('5');
  });

  it('should show no active profile when activeProfileId is null', () => {
    mockProfiles.loadProfiles.mockReturnValue({
      profiles: [{ id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2024-01-01' }],
      activeProfileId: null,
    });
    mockStorage.loadProgress.mockReturnValue({
      completedLevels: {},
      totalStars: 0,
      lastPlayedLevelId: null,
      lastPlayedAt: null,
    });
    mockStorage.migrateOldProgress.mockReturnValue(null);

    render(
      <ProfileProvider>
        <TestConsumer />
      </ProfileProvider>
    );

    expect(screen.getByTestId('active-name')).toHaveTextContent('none');
  });

  it('should migrate old progress when no profiles exist and old data is found', () => {
    mockProfiles.loadProfiles.mockReturnValue({
      profiles: [],
      activeProfileId: null,
    });
    mockStorage.migrateOldProgress.mockReturnValue({
      completedLevels: { 'level-1': { stars: 3, completedAt: '2024-01-01', attempts: 1, hintsUsed: 0 } },
      totalStars: 3,
      lastPlayedLevelId: 'level-1',
      lastPlayedAt: '2024-01-01',
    });

    render(
      <ProfileProvider>
        <TestConsumer />
      </ProfileProvider>
    );

    expect(mockStorage.migrateOldProgress).toHaveBeenCalledWith('uuid-123');
    expect(mockProfiles.saveProfiles).toHaveBeenCalledWith(
      expect.objectContaining({
        profiles: [expect.objectContaining({ id: 'uuid-123', name: 'Player 1' })],
        activeProfileId: 'uuid-123',
      })
    );
    expect(screen.getByTestId('active-name')).toHaveTextContent('Player 1');
    expect(screen.getByTestId('total-stars')).toHaveTextContent('3');
  });

  it('should not migrate when no old data exists', () => {
    mockProfiles.loadProfiles.mockReturnValue({
      profiles: [],
      activeProfileId: null,
    });
    mockStorage.migrateOldProgress.mockReturnValue(null);
    mockStorage.loadProgress.mockReturnValue({
      completedLevels: {},
      totalStars: 0,
      lastPlayedLevelId: null,
      lastPlayedAt: null,
    });

    render(
      <ProfileProvider>
        <TestConsumer />
      </ProfileProvider>
    );

    expect(mockProfiles.saveProfiles).not.toHaveBeenCalled();
    expect(screen.getByTestId('active-name')).toHaveTextContent('none');
  });
});

describe('useProfile', () => {
  it('should throw when used outside ProfileProvider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      'useProfile must be used within a ProfileProvider'
    );
    consoleSpy.mockRestore();
  });
});

describe('ProfileProvider actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function ActionConsumer() {
    const { createProfile, switchProfile, deleteProfile, activeProfile, progress } = useProfile();
    return (
      <div>
        <span data-testid="active-name">{activeProfile?.name ?? 'none'}</span>
        <span data-testid="total-stars">{progress.totalStars}</span>
        <button onClick={() => createProfile('Bob', '🐉')}>Create</button>
        <button onClick={() => switchProfile('b')}>Switch</button>
        <button onClick={() => deleteProfile('a')}>Delete</button>
      </div>
    );
  }

  it('should create a profile and update state', () => {
    mockProfiles.loadProfiles
      .mockReturnValueOnce({ profiles: [], activeProfileId: null })
      .mockReturnValueOnce({
        profiles: [{ id: 'new-id', name: 'Bob', avatar: '🐉', createdAt: '2024-01-01' }],
        activeProfileId: 'new-id',
      });
    mockStorage.migrateOldProgress.mockReturnValue(null);
    mockStorage.loadProgress.mockReturnValue({
      completedLevels: {},
      totalStars: 0,
      lastPlayedLevelId: null,
      lastPlayedAt: null,
    });
    mockProfiles.createProfile.mockReturnValue({
      id: 'new-id',
      name: 'Bob',
      avatar: '🐉',
      createdAt: '2024-01-01',
    });

    render(
      <ProfileProvider>
        <ActionConsumer />
      </ProfileProvider>
    );

    act(() => {
      screen.getByText('Create').click();
    });

    expect(mockProfiles.createProfile).toHaveBeenCalledWith('Bob', '🐉');
    expect(screen.getByTestId('active-name')).toHaveTextContent('Bob');
  });

  it('should switch profile and reload progress', () => {
    mockProfiles.loadProfiles
      .mockReturnValueOnce({
        profiles: [
          { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2024-01-01' },
          { id: 'b', name: 'Bob', avatar: '🐉', createdAt: '2024-01-01' },
        ],
        activeProfileId: 'a',
      })
      .mockReturnValueOnce({
        profiles: [
          { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2024-01-01' },
          { id: 'b', name: 'Bob', avatar: '🐉', createdAt: '2024-01-01' },
        ],
        activeProfileId: 'b',
      });
    mockStorage.migrateOldProgress.mockReturnValue(null);
    mockStorage.loadProgress
      .mockReturnValueOnce({
        completedLevels: {},
        totalStars: 5,
        lastPlayedLevelId: null,
        lastPlayedAt: null,
      })
      .mockReturnValueOnce({
        completedLevels: {},
        totalStars: 10,
        lastPlayedLevelId: null,
        lastPlayedAt: null,
      });

    render(
      <ProfileProvider>
        <ActionConsumer />
      </ProfileProvider>
    );

    expect(screen.getByTestId('total-stars')).toHaveTextContent('5');

    act(() => {
      screen.getByText('Switch').click();
    });

    expect(mockProfiles.setActiveProfile).toHaveBeenCalledWith('b');
    expect(screen.getByTestId('active-name')).toHaveTextContent('Bob');
    expect(screen.getByTestId('total-stars')).toHaveTextContent('10');
  });

  it('should delete profile and update state', () => {
    mockProfiles.loadProfiles
      .mockReturnValueOnce({
        profiles: [{ id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2024-01-01' }],
        activeProfileId: 'a',
      })
      .mockReturnValueOnce({
        profiles: [],
        activeProfileId: null,
      });
    mockStorage.migrateOldProgress.mockReturnValue(null);
    mockStorage.loadProgress.mockReturnValue({
      completedLevels: {},
      totalStars: 5,
      lastPlayedLevelId: null,
      lastPlayedAt: null,
    });

    render(
      <ProfileProvider>
        <ActionConsumer />
      </ProfileProvider>
    );

    act(() => {
      screen.getByText('Delete').click();
    });

    expect(mockProfiles.deleteProfile).toHaveBeenCalledWith('a');
    expect(screen.getByTestId('active-name')).toHaveTextContent('none');
    expect(screen.getByTestId('total-stars')).toHaveTextContent('0');
  });
});
