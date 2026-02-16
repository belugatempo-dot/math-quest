'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import {
  signUp as authSignUp,
  signIn as authSignIn,
  signOut as authSignOut,
  getCurrentUser,
} from '@/lib/services/auth.service';
import type { SupabaseProfile } from '@mathquest/shared/types';

export interface AuthContextValue {
  /** Whether Supabase is configured (env vars present) */
  isConfigured: boolean;
  /** Whether auth state is loading */
  isLoading: boolean;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** The authenticated parent profile, or null */
  user: SupabaseProfile | null;
  /** Last auth error message */
  error: string | null;
  /** Sign up a new parent. Returns true on success, false on error, 'confirmation' if email confirmation needed. */
  signUp: (email: string, password: string, displayName: string) => Promise<boolean | 'confirmation'>;
  /** Sign in an existing parent */
  signIn: (email: string, password: string) => Promise<boolean>;
  /** Sign out */
  signOut: () => Promise<void>;
  /** Clear error state */
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<SupabaseProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const configured = isSupabaseConfigured();

  // Check for existing session on mount
  useEffect(() => {
    if (!configured) {
      setIsLoading(false);
      return;
    }

    getCurrentUser()
      .then((profile) => setUser(profile))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, [configured]);

  // Listen for auth state changes
  useEffect(() => {
    if (!configured) return;

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string) => {
        if (event === 'SIGNED_IN') {
          const profile = await getCurrentUser();
          setUser(profile);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [configured]);

  const handleSignUp = useCallback(
    async (email: string, password: string, displayName: string): Promise<boolean | 'confirmation'> => {
      setError(null);
      setIsLoading(true);
      try {
        const result = await authSignUp(email, password, displayName);
        if (result.requiresConfirmation) {
          return 'confirmation';
        }
        if (!result.success) {
          setError(result.error);
          return false;
        }
        setUser(result.profile);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleSignIn = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setError(null);
      setIsLoading(true);
      try {
        const result = await authSignIn(email, password);
        if (!result.success) {
          setError(result.error);
          return false;
        }
        setUser(result.profile);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleSignOut = useCallback(async () => {
    setError(null);
    const result = await authSignOut();
    if (!result.success) {
      setError(result.error);
    } else {
      setUser(null);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        isConfigured: configured,
        isLoading,
        isAuthenticated: !!user,
        user,
        error,
        signUp: handleSignUp,
        signIn: handleSignIn,
        signOut: handleSignOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
