import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { loadProfiles, type Profile } from '@/lib/profiles';
import { loadProgress, type GameProgress } from '@/lib/storage';
import { createChildProfile } from '@/lib/services/child-profile.service';
import { saveProgressToCloud } from '@/lib/services/progress.service';

export interface MigrationCandidate {
  profile: Profile;
  progress: GameProgress;
  hasProgress: boolean;
}

/**
 * Check if there are localStorage profiles that could be migrated to the cloud.
 * Returns profiles with their progress data.
 */
export function getLocalMigrationCandidates(): MigrationCandidate[] {
  const store = loadProfiles();
  return store.profiles.map((profile) => {
    const progress = loadProgress(profile.id);
    return {
      profile,
      progress,
      hasProgress: Object.keys(progress.completedLevels).length > 0,
    };
  });
}

/**
 * Migrate a single localStorage profile to the cloud.
 * Creates the child profile in Supabase and uploads their progress.
 * Returns the new cloud child profile ID, or null on failure.
 */
export async function migrateProfileToCloud(
  profile: Profile,
  progress: GameProgress
): Promise<string | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  // Create the child profile in the cloud
  const cloudChild = await createChildProfile({
    displayName: profile.name,
    avatar: profile.avatar,
  });

  if (!cloudChild) return null;

  // Upload progress if any exists
  if (Object.keys(progress.completedLevels).length > 0) {
    await saveProgressToCloud(
      cloudChild.id,
      progress.completedLevels,
      progress.totalStars,
      progress.lastPlayedLevelId,
      progress.lastPlayedAt
    );
  }

  return cloudChild.id;
}

/**
 * Migrate all localStorage profiles to the cloud.
 * Returns the number of successfully migrated profiles.
 */
export async function migrateAllProfilesToCloud(): Promise<number> {
  const candidates = getLocalMigrationCandidates();
  let migrated = 0;

  for (const candidate of candidates) {
    const result = await migrateProfileToCloud(
      candidate.profile,
      candidate.progress
    );
    if (result) migrated++;
  }

  return migrated;
}
