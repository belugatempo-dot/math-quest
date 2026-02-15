/**
 * Auth types for Supabase-backed user management.
 * COPPA-compliant: children never have auth accounts.
 * Parents own child profiles via parent_id FK.
 */

/** Parent/account profile (extends Supabase auth.users) */
export interface SupabaseProfile {
  id: string; // UUID, matches auth.users.id
  displayName: string;
  email: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Child profile belonging to a parent (no auth account) */
export interface ChildProfile {
  id: string; // UUID
  parentId: string; // UUID, references profiles.id
  displayName: string;
  avatar: string; // emoji
  age: number | null;
  grade: number | null;
  createdAt: string;
  updatedAt: string;
}

/** Per-child progress stored in cloud */
export interface CloudProgress {
  id: string; // UUID
  childId: string; // UUID, references child_profiles.id
  completedLevels: Record<string, CloudLevelProgress>;
  totalStars: number;
  lastPlayedLevelId: string | null;
  lastPlayedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Per-level progress in the cloud (matches local LevelProgress shape) */
export interface CloudLevelProgress {
  stars: number;
  completedAt: string;
  attempts: number;
  hintsUsed: number;
}

/** Auth session state for the app */
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: SupabaseProfile | null;
  error: string | null;
}

/** Input for creating a child profile */
export interface CreateChildInput {
  displayName: string;
  avatar: string;
  age?: number | null;
  grade?: number | null;
}

/** Input for updating a child profile */
export interface UpdateChildInput {
  displayName?: string;
  avatar?: string;
  age?: number | null;
  grade?: number | null;
}
