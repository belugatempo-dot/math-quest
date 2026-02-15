import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockFrom = vi.fn();

vi.mock('@/lib/supabase/client', () => ({
  getSupabaseBrowserClient: vi.fn(() => ({
    from: mockFrom,
  })),
}));

import {
  saveProgressToCloud,
  loadProgressFromCloud,
} from './progress.service';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

describe('ProgressService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('saveProgressToCloud', () => {
    it('should return false when Supabase is not configured', async () => {
      vi.mocked(getSupabaseBrowserClient).mockReturnValueOnce(null);

      const result = await saveProgressToCloud('child-1', {}, 0, null, null);
      expect(result).toBe(false);
    });

    it('should return true on successful upsert', async () => {
      mockFrom.mockReturnValue({
        upsert: vi.fn().mockResolvedValue({ error: null }),
      });

      const result = await saveProgressToCloud(
        'child-1',
        {
          'level-3-1-1': {
            stars: 3,
            completedAt: '2026-01-01T00:00:00.000Z',
            attempts: 1,
            hintsUsed: 0,
          },
        },
        3,
        'level-3-1-1',
        '2026-01-01T00:00:00.000Z'
      );

      expect(result).toBe(true);
      expect(mockFrom).toHaveBeenCalledWith('user_progress');
    });

    it('should pass correct data to upsert', async () => {
      const mockUpsert = vi.fn().mockResolvedValue({ error: null });
      mockFrom.mockReturnValue({ upsert: mockUpsert });

      await saveProgressToCloud(
        'child-1',
        { 'level-3-1-1': { stars: 2, completedAt: '2026-01-01T00:00:00.000Z', attempts: 3, hintsUsed: 1 } },
        2,
        'level-3-1-1',
        '2026-01-01T00:00:00.000Z'
      );

      expect(mockUpsert).toHaveBeenCalledWith(
        {
          child_id: 'child-1',
          completed_levels: {
            'level-3-1-1': {
              stars: 2,
              completedAt: '2026-01-01T00:00:00.000Z',
              attempts: 3,
              hintsUsed: 1,
            },
          },
          total_stars: 2,
          last_played_level_id: 'level-3-1-1',
          last_played_at: '2026-01-01T00:00:00.000Z',
        },
        { onConflict: 'child_id' }
      );
    });

    it('should return false on upsert error', async () => {
      mockFrom.mockReturnValue({
        upsert: vi.fn().mockResolvedValue({
          error: { message: 'RLS violation' },
        }),
      });

      const result = await saveProgressToCloud('child-1', {}, 0, null, null);
      expect(result).toBe(false);
    });
  });

  describe('loadProgressFromCloud', () => {
    it('should return null when Supabase is not configured', async () => {
      vi.mocked(getSupabaseBrowserClient).mockReturnValueOnce(null);

      const result = await loadProgressFromCloud('child-1');
      expect(result).toBeNull();
    });

    it('should return null when no progress found', async () => {
      mockFrom.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { message: 'not found' },
            }),
          }),
        }),
      });

      const result = await loadProgressFromCloud('child-1');
      expect(result).toBeNull();
    });

    it('should return mapped progress data', async () => {
      mockFrom.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: {
                id: 'prog-1',
                child_id: 'child-1',
                completed_levels: {
                  'level-3-1-1': {
                    stars: 3,
                    completedAt: '2026-01-01T00:00:00.000Z',
                    attempts: 1,
                    hintsUsed: 0,
                  },
                },
                total_stars: 3,
                last_played_level_id: 'level-3-1-1',
                last_played_at: '2026-01-01T00:00:00.000Z',
              },
              error: null,
            }),
          }),
        }),
      });

      const result = await loadProgressFromCloud('child-1');
      expect(result).toEqual({
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
      });
    });

    it('should handle null fields gracefully', async () => {
      mockFrom.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: {
                id: 'prog-1',
                child_id: 'child-1',
                completed_levels: null,
                total_stars: null,
                last_played_level_id: null,
                last_played_at: null,
              },
              error: null,
            }),
          }),
        }),
      });

      const result = await loadProgressFromCloud('child-1');
      expect(result).toEqual({
        completedLevels: {},
        totalStars: 0,
        lastPlayedLevelId: null,
        lastPlayedAt: null,
      });
    });
  });
});
