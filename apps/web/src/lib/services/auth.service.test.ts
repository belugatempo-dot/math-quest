import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the Supabase client module
const mockSignUp = vi.fn();
const mockSignInWithPassword = vi.fn();
const mockSignOut = vi.fn();
const mockGetUser = vi.fn();
const mockFrom = vi.fn();

vi.mock('@/lib/supabase/client', () => ({
  getSupabaseBrowserClient: vi.fn(() => ({
    auth: {
      signUp: mockSignUp,
      signInWithPassword: mockSignInWithPassword,
      signOut: mockSignOut,
      getUser: mockGetUser,
    },
    from: mockFrom,
  })),
}));

import { signUp, signIn, signOut, getCurrentUser } from './auth.service';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

function mockQuery(data: unknown, error: unknown = null) {
  return {
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data, error }),
      }),
    }),
  };
}

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('signUp', () => {
    it('should return error when Supabase is not configured', async () => {
      vi.mocked(getSupabaseBrowserClient).mockReturnValueOnce(null);

      const result = await signUp('test@test.com', 'password', 'Test');
      expect(result).toEqual({
        success: false,
        error: 'Supabase is not configured',
        profile: null,
      });
    });

    it('should return error when sign up fails', async () => {
      mockSignUp.mockResolvedValue({
        data: { user: null },
        error: { message: 'Email already registered' },
      });

      const result = await signUp('test@test.com', 'password', 'Test');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Email already registered');
    });

    it('should return error when no user is returned', async () => {
      mockSignUp.mockResolvedValue({
        data: { user: null },
        error: null,
      });

      const result = await signUp('test@test.com', 'password', 'Test');
      expect(result.success).toBe(false);
      expect(result.error).toBe('No user returned from sign up');
    });

    it('should sign up successfully and fetch profile', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@test.com',
        created_at: '2026-01-01T00:00:00.000Z',
      };
      mockSignUp.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });
      mockFrom.mockReturnValue(
        mockQuery({
          id: 'user-123',
          display_name: 'Test Parent',
          email: 'test@test.com',
          created_at: '2026-01-01T00:00:00.000Z',
          updated_at: '2026-01-01T00:00:00.000Z',
        })
      );

      const result = await signUp('test@test.com', 'password', 'Test Parent');

      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
      expect(result.profile).toEqual({
        id: 'user-123',
        displayName: 'Test Parent',
        email: 'test@test.com',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      });
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'password',
        options: { data: { display_name: 'Test Parent' } },
      });
    });

    it('should fall back to user data when profile fetch fails', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@test.com',
        created_at: '2026-01-01T00:00:00.000Z',
      };
      mockSignUp.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });
      mockFrom.mockReturnValue(
        mockQuery(null, { message: 'not found' })
      );

      const result = await signUp('test@test.com', 'password', 'Test Parent');

      expect(result.success).toBe(true);
      expect(result.profile?.displayName).toBe('Test Parent');
    });
  });

  describe('signIn', () => {
    it('should return error when Supabase is not configured', async () => {
      vi.mocked(getSupabaseBrowserClient).mockReturnValueOnce(null);

      const result = await signIn('test@test.com', 'password');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Supabase is not configured');
    });

    it('should return error on bad credentials', async () => {
      mockSignInWithPassword.mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid login credentials' },
      });

      const result = await signIn('test@test.com', 'wrong');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid login credentials');
    });

    it('should return error when no user returned', async () => {
      mockSignInWithPassword.mockResolvedValue({
        data: { user: null },
        error: null,
      });

      const result = await signIn('test@test.com', 'password');
      expect(result.success).toBe(false);
      expect(result.error).toBe('No user returned from sign in');
    });

    it('should sign in successfully', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@test.com',
        created_at: '2026-01-01T00:00:00.000Z',
        user_metadata: { display_name: 'Test Parent' },
      };
      mockSignInWithPassword.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });
      mockFrom.mockReturnValue(
        mockQuery({
          id: 'user-123',
          display_name: 'Test Parent',
          email: 'test@test.com',
          created_at: '2026-01-01T00:00:00.000Z',
          updated_at: '2026-01-01T00:00:00.000Z',
        })
      );

      const result = await signIn('test@test.com', 'password');
      expect(result.success).toBe(true);
      expect(result.profile?.displayName).toBe('Test Parent');
    });

    it('should fall back to user metadata when profile not found', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@test.com',
        created_at: '2026-01-01T00:00:00.000Z',
        user_metadata: { display_name: 'Fallback Name' },
      };
      mockSignInWithPassword.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });
      mockFrom.mockReturnValue(mockQuery(null));

      const result = await signIn('test@test.com', 'password');
      expect(result.success).toBe(true);
      expect(result.profile?.displayName).toBe('Fallback Name');
    });
  });

  describe('signOut', () => {
    it('should return error when Supabase is not configured', async () => {
      vi.mocked(getSupabaseBrowserClient).mockReturnValueOnce(null);

      const result = await signOut();
      expect(result.success).toBe(false);
      expect(result.error).toBe('Supabase is not configured');
    });

    it('should sign out successfully', async () => {
      mockSignOut.mockResolvedValue({ error: null });

      const result = await signOut();
      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should return error when sign out fails', async () => {
      mockSignOut.mockResolvedValue({
        error: { message: 'Network error' },
      });

      const result = await signOut();
      expect(result.success).toBe(false);
      expect(result.error).toBe('Network error');
    });
  });

  describe('getCurrentUser', () => {
    it('should return null when Supabase is not configured', async () => {
      vi.mocked(getSupabaseBrowserClient).mockReturnValueOnce(null);

      const result = await getCurrentUser();
      expect(result).toBeNull();
    });

    it('should return null when no user is authenticated', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });

      const result = await getCurrentUser();
      expect(result).toBeNull();
    });

    it('should return profile from DB', async () => {
      mockGetUser.mockResolvedValue({
        data: {
          user: {
            id: 'user-123',
            email: 'test@test.com',
            created_at: '2026-01-01T00:00:00.000Z',
            user_metadata: { display_name: 'Meta Name' },
          },
        },
      });
      mockFrom.mockReturnValue(
        mockQuery({
          id: 'user-123',
          display_name: 'DB Name',
          email: 'test@test.com',
          created_at: '2026-01-01T00:00:00.000Z',
          updated_at: '2026-01-01T00:00:00.000Z',
        })
      );

      const result = await getCurrentUser();
      expect(result?.displayName).toBe('DB Name');
    });

    it('should fall back to user metadata when profile not in DB', async () => {
      mockGetUser.mockResolvedValue({
        data: {
          user: {
            id: 'user-123',
            email: 'test@test.com',
            created_at: '2026-01-01T00:00:00.000Z',
            user_metadata: { display_name: 'Meta Name' },
          },
        },
      });
      mockFrom.mockReturnValue(mockQuery(null));

      const result = await getCurrentUser();
      expect(result?.displayName).toBe('Meta Name');
    });

    it('should default to "Parent" when no display name available', async () => {
      mockGetUser.mockResolvedValue({
        data: {
          user: {
            id: 'user-123',
            email: 'test@test.com',
            created_at: '2026-01-01T00:00:00.000Z',
            user_metadata: {},
          },
        },
      });
      mockFrom.mockReturnValue(mockQuery(null));

      const result = await getCurrentUser();
      expect(result?.displayName).toBe('Parent');
    });
  });
});
