import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { LevelProgress } from '@/lib/storage';

/**
 * Save progress for a child to the cloud.
 * Uses upsert so it creates or updates the single row per child.
 * Fire-and-forget: caller should not block on this.
 */
export async function saveProgressToCloud(
  childId: string,
  completedLevels: Record<string, LevelProgress>,
  totalStars: number,
  lastPlayedLevelId: string | null,
  lastPlayedAt: string | null
): Promise<boolean> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return false;

  const { error } = await supabase
    .from('user_progress')
    .upsert(
      {
        child_id: childId,
        completed_levels: completedLevels,
        total_stars: totalStars,
        last_played_level_id: lastPlayedLevelId,
        last_played_at: lastPlayedAt,
      },
      { onConflict: 'child_id' }
    );

  return !error;
}

/**
 * Load progress for a child from the cloud.
 * Returns null if not found or on error.
 */
export async function loadProgressFromCloud(
  childId: string
): Promise<{
  completedLevels: Record<string, LevelProgress>;
  totalStars: number;
  lastPlayedLevelId: string | null;
  lastPlayedAt: string | null;
} | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('child_id', childId)
    .single();

  if (error || !data) return null;

  return {
    completedLevels: (data.completed_levels as Record<string, LevelProgress>) ?? {},
    totalStars: (data.total_stars as number) ?? 0,
    lastPlayedLevelId: (data.last_played_level_id as string) ?? null,
    lastPlayedAt: (data.last_played_at as string) ?? null,
  };
}
