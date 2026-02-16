import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { render, screen } from '@testing-library/react';

// Mocks
const mockGetCurrentUser = vi.fn();
const mockSignUp = vi.fn();
const mockSignIn = vi.fn();
const mockSignOut = vi.fn();
const mockIsSupabaseConfigured = vi.fn();
const mockGetSupabaseBrowserClient = vi.fn();
const mockUnsubscribe = vi.fn();

vi.mock('@/lib/services/auth.service', () => ({
  getCurrentUser: (...args: unknown[]) => mockGetCurrentUser(...args),
  signUp: (...args: unknown[]) => mockSignUp(...args),
  signIn: (...args: unknown[]) => mockSignIn(...args),
  signOut: (...args: unknown[]) => mockSignOut(...args),
}));

vi.mock('@/lib/supabase/client', () => ({
  isSupabaseConfigured: () => mockIsSupabaseConfigured(),
  getSupabaseBrowserClient: () => mockGetSupabaseBrowserClient(),
}));

import { AuthProvider, useAuth } from './AuthContext';

function wrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsSupabaseConfigured.mockReturnValue(true);
    mockGetCurrentUser.mockResolvedValue(null);
    mockGetSupabaseBrowserClient.mockReturnValue({
      auth: {
        onAuthStateChange: vi.fn(() => ({
          data: { subscription: { unsubscribe: mockUnsubscribe } },
        })),
      },
    });
  });

  describe('useAuth outside provider', () => {
    it('should throw when used outside AuthProvider', () => {
      // Suppress console.error for expected React error
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('useAuth must be used within an AuthProvider');
      spy.mockRestore();
    });
  });

  describe('initialization', () => {
    it('should start with isLoading true', () => {
      // Don't resolve getCurrentUser yet
      mockGetCurrentUser.mockReturnValue(new Promise(() => {}));

      const { result } = renderHook(() => useAuth(), { wrapper });
      expect(result.current.isLoading).toBe(true);
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
    });

    it('should set isLoading false when Supabase is not configured', async () => {
      mockIsSupabaseConfigured.mockReturnValue(false);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      expect(result.current.isConfigured).toBe(false);
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should load existing user on mount', async () => {
      const mockProfile = {
        id: 'user-123',
        displayName: 'Test Parent',
        email: 'test@test.com',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      };
      mockGetCurrentUser.mockResolvedValue(mockProfile);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual(mockProfile);
    });

    it('should handle getCurrentUser error gracefully', async () => {
      mockGetCurrentUser.mockRejectedValue(new Error('Network error'));

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      expect(result.current.user).toBeNull();
    });
  });

  describe('signUp', () => {
    it('should sign up successfully', async () => {
      const mockProfile = {
        id: 'user-123',
        displayName: 'New Parent',
        email: 'new@test.com',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      };
      mockSignUp.mockResolvedValue({
        success: true,
        error: null,
        profile: mockProfile,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let success: boolean = false;
      await act(async () => {
        success = await result.current.signUp('new@test.com', 'password', 'New Parent');
      });

      expect(success).toBe(true);
      expect(result.current.user).toEqual(mockProfile);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.error).toBeNull();
    });

    it('should set error on failed sign up', async () => {
      mockSignUp.mockResolvedValue({
        success: false,
        error: 'Email already registered',
        profile: null,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let success: boolean = true;
      await act(async () => {
        success = await result.current.signUp('dup@test.com', 'password', 'Dup');
      });

      expect(success).toBe(false);
      expect(result.current.error).toBe('Email already registered');
      expect(result.current.user).toBeNull();
    });
  });

  describe('signUp - confirmation', () => {
    it('should return confirmation when requiresConfirmation is true', async () => {
      mockSignUp.mockResolvedValue({
        success: false,
        requiresConfirmation: true,
        error: 'Check your email',
        profile: null,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let signUpResult: boolean | 'confirmation' = false;
      await act(async () => {
        signUpResult = await result.current.signUp('test@test.com', 'password', 'Test');
      });

      expect(signUpResult).toBe('confirmation');
      expect(result.current.user).toBeNull();
      expect(result.current.error).toBeNull();
    });
  });

  describe('signUp - network error handling', () => {
    it('should catch thrown errors and set error state', async () => {
      mockSignUp.mockRejectedValue(new Error('Network failure'));

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let success: boolean | 'confirmation' = true;
      await act(async () => {
        success = await result.current.signUp('test@test.com', 'password', 'Test');
      });

      expect(success).toBe(false);
      expect(result.current.error).toBe('Network failure');
    });

    it('should handle non-Error thrown values', async () => {
      mockSignUp.mockRejectedValue('string error');

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let success: boolean | 'confirmation' = true;
      await act(async () => {
        success = await result.current.signUp('test@test.com', 'password', 'Test');
      });

      expect(success).toBe(false);
      expect(result.current.error).toBe('An unexpected error occurred');
    });
  });

  describe('signIn - network error handling', () => {
    it('should catch thrown errors and set error state', async () => {
      mockSignIn.mockRejectedValue(new Error('Connection refused'));

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let success = true;
      await act(async () => {
        success = await result.current.signIn('test@test.com', 'password');
      });

      expect(success).toBe(false);
      expect(result.current.error).toBe('Connection refused');
    });
  });

  describe('signIn', () => {
    it('should sign in successfully', async () => {
      const mockProfile = {
        id: 'user-123',
        displayName: 'Existing Parent',
        email: 'existing@test.com',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      };
      mockSignIn.mockResolvedValue({
        success: true,
        error: null,
        profile: mockProfile,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let success: boolean = false;
      await act(async () => {
        success = await result.current.signIn('existing@test.com', 'password');
      });

      expect(success).toBe(true);
      expect(result.current.user).toEqual(mockProfile);
    });

    it('should set error on failed sign in', async () => {
      mockSignIn.mockResolvedValue({
        success: false,
        error: 'Invalid login credentials',
        profile: null,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.signIn('test@test.com', 'wrong');
      });

      expect(result.current.error).toBe('Invalid login credentials');
    });
  });

  describe('signOut', () => {
    it('should sign out successfully', async () => {
      const mockProfile = {
        id: 'user-123',
        displayName: 'Test',
        email: 'test@test.com',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      };
      mockGetCurrentUser.mockResolvedValue(mockProfile);
      mockSignOut.mockResolvedValue({ success: true, error: null });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
      });

      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should set error on failed sign out', async () => {
      mockSignOut.mockResolvedValue({
        success: false,
        error: 'Network error',
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.error).toBe('Network error');
    });
  });

  describe('clearError', () => {
    it('should clear the error state', async () => {
      mockSignIn.mockResolvedValue({
        success: false,
        error: 'Some error',
        profile: null,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.signIn('test@test.com', 'wrong');
      });
      expect(result.current.error).toBe('Some error');

      act(() => {
        result.current.clearError();
      });
      expect(result.current.error).toBeNull();
    });
  });

  describe('auth state change listener', () => {
    it('should subscribe to auth state changes', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const supabase = mockGetSupabaseBrowserClient();
      expect(supabase.auth.onAuthStateChange).toHaveBeenCalled();
    });

    it('should unsubscribe on unmount', async () => {
      const { unmount } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {});

      unmount();
      expect(mockUnsubscribe).toHaveBeenCalled();
    });

    it('should not subscribe when Supabase is not configured', async () => {
      mockIsSupabaseConfigured.mockReturnValue(false);
      mockGetSupabaseBrowserClient.mockReturnValue(null);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      // No crash = success
    });
  });

  describe('rendering children', () => {
    it('should render children', async () => {
      render(
        <AuthProvider>
          <div data-testid="child">Hello</div>
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('child')).toBeInTheDocument();
      });
    });
  });
});
