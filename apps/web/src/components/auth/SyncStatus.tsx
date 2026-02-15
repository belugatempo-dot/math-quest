'use client';

import { useAuth } from '@/contexts/AuthContext';

/**
 * Shows cloud sync status indicator.
 * Green dot = signed in (progress syncs to cloud).
 * Hidden when Supabase is not configured.
 */
export default function SyncStatus() {
  const { isConfigured, isAuthenticated, user } = useAuth();

  if (!isConfigured) return null;

  if (!isAuthenticated) {
    return (
      <span
        className="flex items-center gap-1 text-xs text-white/50"
        aria-label="Not signed in - progress saved locally"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white/50" aria-hidden="true" />
        Local only
      </span>
    );
  }

  return (
    <span
      className="flex items-center gap-1 text-xs text-green-400"
      aria-label={`Syncing as ${user?.displayName ?? 'user'}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden="true" />
      Cloud sync
    </span>
  );
}
