import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockGetUser = vi.fn();
const mockFrom = vi.fn();

vi.mock('@/lib/supabase/client', () => ({
  getSupabaseBrowserClient: vi.fn(() => ({
    auth: { getUser: mockGetUser },
    from: mockFrom,
  })),
}));

import {
  getChildProfiles,
  createChildProfile,
  deleteChildProfile,
} from './child-profile.service';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

describe('ChildProfileService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getChildProfiles', () => {
    it('should return empty array when Supabase is not configured', async () => {
      vi.mocked(getSupabaseBrowserClient).mockReturnValueOnce(null);
      const result = await getChildProfiles();
      expect(result).toEqual([]);
    });

    it('should return empty array on error', async () => {
      mockFrom.mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: null,
            error: { message: 'error' },
          }),
        }),
      });

      const result = await getChildProfiles();
      expect(result).toEqual([]);
    });

    it('should return mapped child profiles', async () => {
      mockFrom.mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: [
              {
                id: 'child-1',
                parent_id: 'parent-1',
                display_name: 'Timmy',
                avatar: '🧒',
                age: 8,
                grade: 3,
                created_at: '2026-01-01T00:00:00.000Z',
                updated_at: '2026-01-01T00:00:00.000Z',
              },
              {
                id: 'child-2',
                parent_id: 'parent-1',
                display_name: 'Sally',
                avatar: '👧',
                age: null,
                grade: null,
                created_at: '2026-01-02T00:00:00.000Z',
                updated_at: '2026-01-02T00:00:00.000Z',
              },
            ],
            error: null,
          }),
        }),
      });

      const result = await getChildProfiles();
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 'child-1',
        parentId: 'parent-1',
        displayName: 'Timmy',
        avatar: '🧒',
        age: 8,
        grade: 3,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      });
      expect(result[1].displayName).toBe('Sally');
      expect(result[1].age).toBeNull();
    });
  });

  describe('createChildProfile', () => {
    it('should return null when Supabase is not configured', async () => {
      vi.mocked(getSupabaseBrowserClient).mockReturnValueOnce(null);
      const result = await createChildProfile({
        displayName: 'Test',
        avatar: '🧒',
      });
      expect(result).toBeNull();
    });

    it('should return null when user is not authenticated', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });

      const result = await createChildProfile({
        displayName: 'Test',
        avatar: '🧒',
      });
      expect(result).toBeNull();
    });

    it('should create and return mapped child profile', async () => {
      mockGetUser.mockResolvedValue({
        data: { user: { id: 'parent-1' } },
      });
      mockFrom.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: {
                id: 'child-new',
                parent_id: 'parent-1',
                display_name: 'New Kid',
                avatar: '🦊',
                age: 7,
                grade: 2,
                created_at: '2026-01-01T00:00:00.000Z',
                updated_at: '2026-01-01T00:00:00.000Z',
              },
              error: null,
            }),
          }),
        }),
      });

      const result = await createChildProfile({
        displayName: 'New Kid',
        avatar: '🦊',
        age: 7,
        grade: 2,
      });

      expect(result).toEqual({
        id: 'child-new',
        parentId: 'parent-1',
        displayName: 'New Kid',
        avatar: '🦊',
        age: 7,
        grade: 2,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      });
    });

    it('should pass correct insert data', async () => {
      const mockInsert = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: null, error: { message: 'test' } }),
        }),
      });
      mockGetUser.mockResolvedValue({
        data: { user: { id: 'parent-1' } },
      });
      mockFrom.mockReturnValue({ insert: mockInsert });

      await createChildProfile({
        displayName: 'Test',
        avatar: '🧒',
      });

      expect(mockInsert).toHaveBeenCalledWith({
        parent_id: 'parent-1',
        display_name: 'Test',
        avatar: '🧒',
        age: null,
        grade: null,
      });
    });

    it('should return null on insert error', async () => {
      mockGetUser.mockResolvedValue({
        data: { user: { id: 'parent-1' } },
      });
      mockFrom.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { message: 'insert error' },
            }),
          }),
        }),
      });

      const result = await createChildProfile({
        displayName: 'Test',
        avatar: '🧒',
      });
      expect(result).toBeNull();
    });
  });

  describe('deleteChildProfile', () => {
    it('should return false when Supabase is not configured', async () => {
      vi.mocked(getSupabaseBrowserClient).mockReturnValueOnce(null);
      const result = await deleteChildProfile('child-1');
      expect(result).toBe(false);
    });

    it('should return true on successful delete', async () => {
      mockFrom.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: null }),
        }),
      });

      const result = await deleteChildProfile('child-1');
      expect(result).toBe(true);
    });

    it('should return false on delete error', async () => {
      mockFrom.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            error: { message: 'delete error' },
          }),
        }),
      });

      const result = await deleteChildProfile('child-1');
      expect(result).toBe(false);
    });
  });
});
