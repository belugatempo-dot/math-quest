const PROFILES_KEY = 'mathquest-profiles';

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

export interface ProfileStore {
  profiles: Profile[];
  activeProfileId: string | null;
}

const defaultStore: ProfileStore = {
  profiles: [],
  activeProfileId: null,
};

function generateId(): string {
  return crypto.randomUUID();
}

export function loadProfiles(): ProfileStore {
  if (typeof window === 'undefined') return defaultStore;

  try {
    const stored = localStorage.getItem(PROFILES_KEY);
    if (stored) {
      return JSON.parse(stored) as ProfileStore;
    }
  } catch (e) {
    console.error('Failed to load profiles:', e);
  }
  return defaultStore;
}

export function saveProfiles(store: ProfileStore): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(store));
  } catch (e) {
    console.error('Failed to save profiles:', e);
  }
}

export function createProfile(name: string, avatar: string): Profile {
  const store = loadProfiles();
  const profile: Profile = {
    id: generateId(),
    name,
    avatar,
    createdAt: new Date().toISOString(),
  };
  store.profiles.push(profile);
  store.activeProfileId = profile.id;
  saveProfiles(store);
  return profile;
}

export function deleteProfile(profileId: string): void {
  const store = loadProfiles();
  store.profiles = store.profiles.filter((p) => p.id !== profileId);
  if (store.activeProfileId === profileId) {
    store.activeProfileId = store.profiles[0]?.id ?? null;
  }
  saveProfiles(store);

  // Remove per-profile progress
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(`mathquest-progress-${profileId}`);
    } catch (e) {
      console.error('Failed to remove profile progress:', e);
    }
  }
}

export function setActiveProfile(profileId: string | null): void {
  const store = loadProfiles();
  if (profileId === null || profileId === '') {
    store.activeProfileId = null;
    saveProfiles(store);
    return;
  }
  const exists = store.profiles.some((p) => p.id === profileId);
  if (!exists) return;
  store.activeProfileId = profileId;
  saveProfiles(store);
}

export function getActiveProfile(): Profile | null {
  const store = loadProfiles();
  if (!store.activeProfileId) return null;
  return store.profiles.find((p) => p.id === store.activeProfileId) ?? null;
}
