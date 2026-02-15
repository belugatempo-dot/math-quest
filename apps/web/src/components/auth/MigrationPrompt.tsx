'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  getLocalMigrationCandidates,
  migrateAllProfilesToCloud,
} from '@/lib/services/migration.service';

/**
 * One-time prompt shown after first sign-up/sign-in when localStorage profiles exist.
 * Offers to migrate local profiles to the cloud.
 */
export default function MigrationPrompt({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const { isAuthenticated } = useAuth();
  const [isMigrating, setIsMigrating] = useState(false);
  const [result, setResult] = useState<{
    migrated: number;
    total: number;
  } | null>(null);

  const candidates = getLocalMigrationCandidates();
  const candidatesWithProgress = candidates.filter((c) => c.hasProgress);

  // Nothing to migrate or not authenticated
  if (!isAuthenticated || candidates.length === 0) {
    return null;
  }

  const handleMigrate = async () => {
    setIsMigrating(true);
    try {
      const migrated = await migrateAllProfilesToCloud();
      setResult({ migrated, total: candidates.length });
    } finally {
      setIsMigrating(false);
    }
  };

  if (result) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 max-w-sm mx-4 border border-white/20">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Migration Complete
          </h3>
          <p className="text-white/70 mb-4">
            {result.migrated} of {result.total} profile{result.total !== 1 ? 's' : ''} migrated
            to the cloud.
          </p>
          <button
            onClick={onComplete}
            className="w-full py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 max-w-sm mx-4 border border-white/20">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Migrate Progress to Cloud?
        </h3>
        <p className="text-white/70 mb-2">
          We found {candidates.length} player profile{candidates.length !== 1 ? 's' : ''} saved
          on this device.
        </p>
        {candidatesWithProgress.length > 0 && (
          <p className="text-white/60 text-sm mb-4">
            {candidatesWithProgress.length} profile{candidatesWithProgress.length !== 1 ? 's have' : ' has'}{' '}
            game progress that will be uploaded.
          </p>
        )}
        <div className="flex gap-2">
          <button
            onClick={handleMigrate}
            disabled={isMigrating}
            className="flex-1 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {isMigrating ? 'Migrating...' : 'Migrate to Cloud'}
          </button>
          <button
            onClick={onComplete}
            disabled={isMigrating}
            className="px-4 py-2 bg-white/15 text-white/70 rounded-lg hover:bg-white/20 disabled:opacity-50 transition-colors"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
