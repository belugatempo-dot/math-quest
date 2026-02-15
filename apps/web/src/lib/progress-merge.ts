import type { LevelProgress, GameProgress } from '@/lib/storage';

/**
 * Merge local and cloud progress for a child.
 *
 * Per-level merge strategy:
 * - stars: Math.max(local, cloud)
 * - attempts: local + cloud (cumulative from both sources)
 * - hintsUsed: Math.min(local, cloud) (best run)
 * - completedAt: latest timestamp
 *
 * Top-level fields:
 * - totalStars: sum of all merged level stars
 * - lastPlayedLevelId: from whichever has the latest lastPlayedAt
 * - lastPlayedAt: max of both
 */
export function mergeProgress(
  local: GameProgress,
  cloud: GameProgress
): GameProgress {
  const mergedLevels: Record<string, LevelProgress> = {};

  // Collect all level IDs from both sources
  const allLevelIds = new Set([
    ...Object.keys(local.completedLevels),
    ...Object.keys(cloud.completedLevels),
  ]);

  let totalStars = 0;

  for (const levelId of allLevelIds) {
    const localLevel = local.completedLevels[levelId];
    const cloudLevel = cloud.completedLevels[levelId];

    if (localLevel && cloudLevel) {
      // Both exist — merge
      const mergedStars = Math.max(localLevel.stars, cloudLevel.stars);
      mergedLevels[levelId] = {
        stars: mergedStars,
        attempts: localLevel.attempts + cloudLevel.attempts,
        hintsUsed: Math.min(localLevel.hintsUsed, cloudLevel.hintsUsed),
        completedAt:
          localLevel.completedAt > cloudLevel.completedAt
            ? localLevel.completedAt
            : cloudLevel.completedAt,
      };
      totalStars += mergedStars;
    } else if (localLevel) {
      mergedLevels[levelId] = { ...localLevel };
      totalStars += localLevel.stars;
    } else if (cloudLevel) {
      mergedLevels[levelId] = { ...cloudLevel };
      totalStars += cloudLevel.stars;
    }
  }

  // Determine lastPlayedAt / lastPlayedLevelId
  const localTime = local.lastPlayedAt ?? '';
  const cloudTime = cloud.lastPlayedAt ?? '';
  let lastPlayedAt: string | null;
  let lastPlayedLevelId: string | null;

  if (localTime >= cloudTime) {
    lastPlayedAt = local.lastPlayedAt;
    lastPlayedLevelId = local.lastPlayedLevelId;
  } else {
    lastPlayedAt = cloud.lastPlayedAt;
    lastPlayedLevelId = cloud.lastPlayedLevelId;
  }

  return {
    completedLevels: mergedLevels,
    totalStars,
    lastPlayedLevelId,
    lastPlayedAt,
  };
}
