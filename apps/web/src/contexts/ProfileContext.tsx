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
  const [store, setStore] = useState<ProfileStore>({
    profiles: [],
    activeProfileId: null,
  });
  const [progress, setProgress] = useState<GameProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load profiles on mount + handle migration
  useEffect(() => {
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
  }, []);

  const activeProfile =
    store.profiles.find((p) => p.id === store.activeProfileId) ?? null;

  const createProfile = useCallback(
    (name: string, avatar: string): Profile => {
      const profile = createProfileStorage(name, avatar);
      const updated = loadProfiles();
      setStore(updated);
      setProgress(loadProgress(profile.id));
      return profile;
    },
    []
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
    },
    []
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
    },
    [store.activeProfileId]
  );

  // Don't render children until profiles are loaded to avoid flash
  if (!isLoaded) return null;

  return (
    <ProfileContext.Provider
      value={{
        activeProfile,
        profiles: store.profiles,
        createProfile,
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
