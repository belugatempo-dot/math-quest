import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { SupabaseProfile } from '@mathquest/shared/types';

export interface AuthResult {
  success: boolean;
  error: string | null;
  profile: SupabaseProfile | null;
  requiresConfirmation: boolean;
}

/**
 * Sign up a new parent account.
 * Creates a Supabase auth user with display_name in metadata.
 * The profiles table row is created automatically via the DB trigger.
 */
export async function signUp(
  email: string,
  password: string,
  displayName: string
): Promise<AuthResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured', profile: null, requiresConfirmation: false };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, error: error.message, profile: null, requiresConfirmation: false };
  }

  if (!data.user) {
    return { success: false, error: 'No user returned from sign up', profile: null, requiresConfirmation: false };
  }

  // Detect unconfirmed user: Supabase returns user with empty identities
  // when email confirmation is required but not yet completed
  if (data.user.identities?.length === 0) {
    return {
      success: false,
      requiresConfirmation: true,
      error: 'Please check your email to confirm your account before signing in.',
      profile: null,
    };
  }

  // Fetch the profile created by the DB trigger
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profileError || !profile) {
    // Auth succeeded but profile fetch failed — still return success
    return {
      success: true,
      error: null,
      requiresConfirmation: false,
      profile: {
        id: data.user.id,
        displayName,
        email: data.user.email ?? null,
        createdAt: data.user.created_at,
        updatedAt: data.user.created_at,
      },
    };
  }

  return {
    success: true,
    error: null,
    requiresConfirmation: false,
    profile: mapDbProfile(profile),
  };
}

/**
 * Sign in an existing parent account.
 */
export async function signIn(
  email: string,
  password: string
): Promise<AuthResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured', profile: null, requiresConfirmation: false };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message, profile: null, requiresConfirmation: false };
  }

  if (!data.user) {
    return { success: false, error: 'No user returned from sign in', profile: null, requiresConfirmation: false };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  return {
    success: true,
    error: null,
    requiresConfirmation: false,
    profile: profile ? mapDbProfile(profile) : {
      id: data.user.id,
      displayName: data.user.user_metadata?.display_name ?? 'Parent',
      email: data.user.email ?? null,
      createdAt: data.user.created_at,
      updatedAt: data.user.created_at,
    },
  };
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<{ success: boolean; error: string | null }> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured' };
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

/**
 * Get the currently authenticated user's profile.
 */
export async function getCurrentUser(): Promise<SupabaseProfile | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile) return mapDbProfile(profile);

  return {
    id: user.id,
    displayName: user.user_metadata?.display_name ?? 'Parent',
    email: user.email ?? null,
    createdAt: user.created_at,
    updatedAt: user.created_at,
  };
}

/** Map snake_case DB row to camelCase SupabaseProfile */
function mapDbProfile(row: Record<string, unknown>): SupabaseProfile {
  return {
    id: row.id as string,
    displayName: row.display_name as string,
    email: (row.email as string) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}
