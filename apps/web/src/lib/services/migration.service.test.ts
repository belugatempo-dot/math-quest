import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockLoadProfiles = vi.fn();
const mockLoadProgress = vi.fn();
const mockCreateChildProfile = vi.fn();
const mockSaveProgressToCloud = vi.fn();

vi.mock('@/lib/profiles', () => ({
  loadProfiles: () => mockLoadProfiles(),
}));

vi.mock('@/lib/storage', () => ({
  loadProgress: (id: string) => mockLoadProgress(id),
}));

vi.mock('@/lib/supabase/client', () => ({
  getSupabaseBrowserClient: vi.fn(() => ({})),
}));

vi.mock('@/lib/services/child-profile.service', () => ({
  createChildProfile: (...args: unknown[]) => mockCreateChildProfile(...args),
}));

vi.mock('@/lib/services/progress.service', () => ({
  saveProgressToCloud: (...args: unknown[]) => mockSaveProgressToCloud(...args),
}));

import {
  getLocalMigrationCandidates,
  migrateProfileToCloud,
  migrateAllProfilesToCloud,
} from './migration.service';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

const emptyProgress = {
  completedLevels: {},
  totalStars: 0,
  lastPlayedLevelId: null,
  lastPlayedAt: null,
};

const progressWithData = {
  completedLevels: {
    'level-3-1-1': {
      stars: 3,
      completedAt: '2026-01-01T00:00:00.000Z',
      attempts: 1,
      hintsUsed: 0,
    },
  },
  totalStars: 3,
  lastPlayedLevelId: 'level-3-1-1',
  lastPlayedAt: '2026-01-01T00:00:00.000Z',
};

describe('MigrationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSaveProgressToCloud.mockResolvedValue(true);
  });

  describe('getLocalMigrationCandidates', () => {
    it('should return empty array when no profiles exist', () => {
      mockLoadProfiles.mockReturnValue({ profiles: [], activeProfileId: null });
      const result = getLocalMigrationCandidates();
      expect(result).toEqual([]);
    });

    it('should return profiles with progress', () => {
      const profiles = [
        { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2026-01-01' },
        { id: 'b', name: 'Bob', avatar: '🐉', createdAt: '2026-01-02' },
      ];
      mockLoadProfiles.mockReturnValue({ profiles, activeProfileId: 'a' });
      mockLoadProgress
        .mockReturnValueOnce(progressWithData)
        .mockReturnValueOnce(emptyProgress);

      const result = getLocalMigrationCandidates();
      expect(result).toHaveLength(2);
      expect(result[0].hasProgress).toBe(true);
      expect(result[0].profile.name).toBe('Alice');
      expect(result[1].hasProgress).toBe(false);
    });
  });

  describe('migrateProfileToCloud', () => {
    const profile = { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2026-01-01' };

    it('should return null when Supabase is not configured', async () => {
      vi.mocked(getSupabaseBrowserClient).mockReturnValueOnce(null);

      const result = await migrateProfileToCloud(profile, emptyProgress);
      expect(result).toBeNull();
    });

    it('should return null when child profile creation fails', async () => {
      mockCreateChildProfile.mockResolvedValue(null);

      const result = await migrateProfileToCloud(profile, emptyProgress);
      expect(result).toBeNull();
    });

    it('should create child profile and return cloud ID', async () => {
      mockCreateChildProfile.mockResolvedValue({
        id: 'cloud-child-1',
        parentId: 'parent-1',
        displayName: 'Alice',
        avatar: '🦊',
        age: null,
        grade: null,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      });

      const result = await migrateProfileToCloud(profile, emptyProgress);
      expect(result).toBe('cloud-child-1');
      expect(mockCreateChildProfile).toHaveBeenCalledWith({
        displayName: 'Alice',
        avatar: '🦊',
      });
    });

    it('should upload progress when profile has completed levels', async () => {
      mockCreateChildProfile.mockResolvedValue({
        id: 'cloud-child-1',
        parentId: 'parent-1',
        displayName: 'Alice',
        avatar: '🦊',
        age: null,
        grade: null,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      });

      await migrateProfileToCloud(profile, progressWithData);

      expect(mockSaveProgressToCloud).toHaveBeenCalledWith(
        'cloud-child-1',
        progressWithData.completedLevels,
        progressWithData.totalStars,
        progressWithData.lastPlayedLevelId,
        progressWithData.lastPlayedAt
      );
    });

    it('should not upload progress when no completed levels', async () => {
      mockCreateChildProfile.mockResolvedValue({
        id: 'cloud-child-1',
        parentId: 'parent-1',
        displayName: 'Alice',
        avatar: '🦊',
        age: null,
        grade: null,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      });

      await migrateProfileToCloud(profile, emptyProgress);

      expect(mockSaveProgressToCloud).not.toHaveBeenCalled();
    });
  });

  describe('migrateAllProfilesToCloud', () => {
    it('should return 0 when no profiles exist', async () => {
      mockLoadProfiles.mockReturnValue({ profiles: [], activeProfileId: null });

      const result = await migrateAllProfilesToCloud();
      expect(result).toBe(0);
    });

    it('should migrate all profiles and return count', async () => {
      const profiles = [
        { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2026-01-01' },
        { id: 'b', name: 'Bob', avatar: '🐉', createdAt: '2026-01-02' },
      ];
      mockLoadProfiles.mockReturnValue({ profiles, activeProfileId: 'a' });
      mockLoadProgress.mockReturnValue(emptyProgress);
      mockCreateChildProfile
        .mockResolvedValueOnce({
          id: 'cloud-1',
          parentId: 'p',
          displayName: 'Alice',
          avatar: '🦊',
          age: null,
          grade: null,
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
        })
        .mockResolvedValueOnce({
          id: 'cloud-2',
          parentId: 'p',
          displayName: 'Bob',
          avatar: '🐉',
          age: null,
          grade: null,
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
        });

      const result = await migrateAllProfilesToCloud();
      expect(result).toBe(2);
    });

    it('should count only successful migrations', async () => {
      const profiles = [
        { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2026-01-01' },
        { id: 'b', name: 'Bob', avatar: '🐉', createdAt: '2026-01-02' },
      ];
      mockLoadProfiles.mockReturnValue({ profiles, activeProfileId: 'a' });
      mockLoadProgress.mockReturnValue(emptyProgress);
      mockCreateChildProfile
        .mockResolvedValueOnce({
          id: 'cloud-1',
          parentId: 'p',
          displayName: 'Alice',
          avatar: '🦊',
          age: null,
          grade: null,
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
        })
        .mockResolvedValueOnce(null); // Bob fails

      const result = await migrateAllProfilesToCloud();
      expect(result).toBe(1);
    });
  });
});
