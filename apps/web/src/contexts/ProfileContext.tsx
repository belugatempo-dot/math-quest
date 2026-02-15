'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Profile, ProfileStore } from '@/lib/profiles';
import {
  loadProfiles,
  saveProfiles,
  createProfile as createProfileStorage,
  deleteProfile as deleteProfileStorage,
  setActiveProfile as setActiveProfileStorage,
} from '@/lib/profiles';
import {
  loadProgress,
  completeLevelProgress as completeLevelProgressStorage,
  migrateOldProgress,
  type GameProgress,
} from '@/lib/storage';
import { useAuth } from '@/contexts/AuthContext';
import {
  getChildProfiles,
  createChildProfile,
  deleteChildProfile,
} from '@/lib/services/child-profile.service';
import { saveProgressToCloud, loadProgressFromCloud } from '@/lib/services/progress.service';
import { mergeProgress } from '@/lib/progress-merge';
import { saveProgress } from '@/lib/storage';

export interface ProfileContextValue {
  activeProfile: Profile | null;
  profiles: Profile[];
  createProfile: (name: string, avatar: string) => Profile;
  switchProfile: (profileId: string) => void;
  deleteProfile: (profileId: string) => void;
  progress: GameProgress;
  completeLevel: (
    levelId: string,
    stars: number,
    attempts: number,
    hintsUsed: number
  ) => void;
}

const defaultProgress: GameProgress = {
  completedLevels: {},
  totalStars: 0,
  lastPlayedLevelId: null,
  lastPlayedAt: null,
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [store, setStore] = useState<ProfileStore>({
    profiles: [],
    activeProfileId: null,
  });
  const [progress, setProgress] = useState<GameProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load profiles on mount + handle migration
  useEffect(() => {
    const init = async () => {
      // If authenticated, try loading cloud profiles and merge progress
      if (isAuthenticated) {
        try {
          const cloudProfiles = await getChildProfiles();
          if (cloudProfiles.length > 0) {
            const profiles: Profile[] = cloudProfiles.map((cp) => ({
              id: cp.id,
              name: cp.displayName,
              avatar: cp.avatar,
              createdAt: cp.createdAt,
            }));
            const loaded: ProfileStore = {
              profiles,
              activeProfileId: profiles[0].id,
            };
            setStore(loaded);

            // Load local + cloud progress and merge
            const activeId = loaded.activeProfileId!;
            const localProgress = loadProgress(activeId);
            const cloudProgress = await loadProgressFromCloud(activeId);

            if (cloudProgress) {
              const cloudAsGameProgress: GameProgress = {
                completedLevels: cloudProgress.completedLevels,
                totalStars: cloudProgress.totalStars,
                lastPlayedLevelId: cloudProgress.lastPlayedLevelId,
                lastPlayedAt: cloudProgress.lastPlayedAt,
              };
              const merged = mergeProgress(localProgress, cloudAsGameProgress);
              // Persist merged progress back to both stores
              saveProgress(activeId, merged);
              saveProgressToCloud(
                activeId,
                merged.completedLevels,
                merged.totalStars,
                merged.lastPlayedLevelId,
                merged.lastPlayedAt
              ).catch(() => {});
              setProgress(merged);
            } else {
              setProgress(localProgress);
            }

            setIsLoaded(true);
            return;
          }
        } catch {
          // Fall through to localStorage
        }
      }

      // Fall back to localStorage
      const loaded = loadProfiles();

      // Migration: if no profiles exist but old progress does, create a default profile
      if (loaded.profiles.length === 0) {
        const tempId = crypto.randomUUID();
        const migrated = migrateOldProgress(tempId);
        if (migrated) {
          const defaultProfile: Profile = {
            id: tempId,
            name: 'Player 1',
            avatar: '🧒',
            createdAt: new Date().toISOString(),
          };
          loaded.profiles.push(defaultProfile);
          loaded.activeProfileId = tempId;
          saveProfiles(loaded);
          setStore(loaded);
          setProgress(migrated);
          setIsLoaded(true);
          return;
        }
      }

      setStore(loaded);
      if (loaded.activeProfileId) {
        setProgress(loadProgress(loaded.activeProfileId));
      }
      setIsLoaded(true);
    };

    init();
  }, [isAuthenticated]);

  const activeProfile =
    store.profiles.find((p) => p.id === store.activeProfileId) ?? null;

  const handleCreateProfile = useCallback(
    (name: string, avatar: string): Profile => {
      // Always create locally first (works offline)
      const profile = createProfileStorage(name, avatar);
      const updated = loadProfiles();
      setStore(updated);
      setProgress(loadProgress(profile.id));

      // If authenticated, also create in cloud (fire-and-forget)
      if (isAuthenticated) {
        createChildProfile({ displayName: name, avatar }).catch(() => {
          // Cloud create failed — local still works
        });
      }

      return profile;
    },
    [isAuthenticated]
  );

  const switchProfile = useCallback((profileId: string) => {
    if (profileId === '') {
      setActiveProfileStorage(null);
      const updated = loadProfiles();
      setStore(updated);
      setProgress(defaultProgress);
      return;
    }
    setActiveProfileStorage(profileId);
    const updated = loadProfiles();
    setStore(updated);
    setProgress(loadProgress(profileId));
  }, []);

  const deleteProfileAction = useCallback(
    (profileId: string) => {
      deleteProfileStorage(profileId);
      const updated = loadProfiles();
      setStore(updated);
      if (updated.activeProfileId) {
        setProgress(loadProgress(updated.activeProfileId));
      } else {
        setProgress(defaultProgress);
      }

      // If authenticated, also delete from cloud (fire-and-forget)
      if (isAuthenticated) {
        deleteChildProfile(profileId).catch(() => {
          // Cloud delete failed — local still removed
        });
      }
    },
    [isAuthenticated]
  );

  const completeLevel = useCallback(
    (
      levelId: string,
      stars: number,
      attempts: number,
      hintsUsed: number
    ) => {
      if (!store.activeProfileId) return;
      const updated = completeLevelProgressStorage(
        store.activeProfileId,
        levelId,
        stars,
        attempts,
        hintsUsed
      );
      setProgress(updated);

      // If authenticated, sync to cloud (fire-and-forget)
      if (isAuthenticated) {
        saveProgressToCloud(
          store.activeProfileId,
          updated.completedLevels,
          updated.totalStars,
          updated.lastPlayedLevelId,
          updated.lastPlayedAt
        ).catch(() => {
          // Cloud sync failed — localStorage still has the data
        });
      }
    },
    [store.activeProfileId, isAuthenticated]
  );

  // Don't render children until profiles are loaded to avoid flash
  if (!isLoaded) return null;

  return (
    <ProfileContext.Provider
      value={{
        activeProfile,
        profiles: store.profiles,
        createProfile: handleCreateProfile,
        switchProfile,
        deleteProfile: deleteProfileAction,
        progress,
        completeLevel,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
