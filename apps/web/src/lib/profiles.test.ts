import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  loadProfiles,
  saveProfiles,
  createProfile,
  deleteProfile,
  setActiveProfile,
  getActiveProfile,
  type ProfileStore,
} from './profiles';

describe('loadProfiles', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return default store when window is undefined', () => {
    vi.stubGlobal('window', undefined);
    const result = loadProfiles();
    expect(result).toEqual({ profiles: [], activeProfileId: null });
  });

  it('should return default store when localStorage is empty', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    const result = loadProfiles();
    expect(result).toEqual({ profiles: [], activeProfileId: null });
  });

  it('should return parsed store from localStorage', () => {
    const store: ProfileStore = {
      profiles: [
        { id: 'abc', name: 'Kid A', avatar: '🦊', createdAt: '2024-01-01T00:00:00.000Z' },
      ],
      activeProfileId: 'abc',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(store));
    const result = loadProfiles();
    expect(result).toEqual(store);
  });

  it('should return default store on malformed JSON', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(localStorage.getItem).mockReturnValue('{{bad');
    const result = loadProfiles();
    expect(result).toEqual({ profiles: [], activeProfileId: null });
    expect(consoleSpy).toHaveBeenCalledWith('Failed to load profiles:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});

describe('saveProfiles', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should not call localStorage when window is undefined', () => {
    vi.stubGlobal('window', undefined);
    saveProfiles({ profiles: [], activeProfileId: null });
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should call localStorage.setItem with correct key and value', () => {
    const store: ProfileStore = {
      profiles: [{ id: 'x', name: 'Test', avatar: '🧒', createdAt: '2024-01-01T00:00:00.000Z' }],
      activeProfileId: 'x',
    };
    saveProfiles(store);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'mathquest-profiles',
      JSON.stringify(store)
    );
  });

  it('should catch and log errors', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(localStorage.setItem).mockImplementation(() => {
      throw new Error('Storage full');
    });
    saveProfiles({ profiles: [], activeProfileId: null });
    expect(consoleSpy).toHaveBeenCalledWith('Failed to save profiles:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});

describe('createProfile', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
    vi.stubGlobal('crypto', { randomUUID: vi.fn(() => 'uuid-123') });
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('should create a profile with generated id and timestamp', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    const profile = createProfile('Alice', '🦊');
    expect(profile).toEqual({
      id: 'uuid-123',
      name: 'Alice',
      avatar: '🦊',
      createdAt: '2024-06-15T12:00:00.000Z',
    });
  });

  it('should add profile to store and set it as active', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    createProfile('Alice', '🦊');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'mathquest-profiles',
      expect.stringContaining('"activeProfileId":"uuid-123"')
    );
  });

  it('should add to existing profiles', () => {
    const existing: ProfileStore = {
      profiles: [{ id: 'old', name: 'Bob', avatar: '🧒', createdAt: '2024-01-01T00:00:00.000Z' }],
      activeProfileId: 'old',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(existing));
    const profile = createProfile('Alice', '🦊');
    const savedCall = vi.mocked(localStorage.setItem).mock.calls[0];
    const saved = JSON.parse(savedCall[1]) as ProfileStore;
    expect(saved.profiles).toHaveLength(2);
    expect(saved.profiles[1].id).toBe(profile.id);
    expect(saved.activeProfileId).toBe(profile.id);
  });
});

describe('deleteProfile', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should remove profile from store', () => {
    const store: ProfileStore = {
      profiles: [
        { id: 'a', name: 'A', avatar: '🧒', createdAt: '2024-01-01T00:00:00.000Z' },
        { id: 'b', name: 'B', avatar: '🦊', createdAt: '2024-01-01T00:00:00.000Z' },
      ],
      activeProfileId: 'a',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(store));
    deleteProfile('a');
    const savedCall = vi.mocked(localStorage.setItem).mock.calls[0];
    const saved = JSON.parse(savedCall[1]) as ProfileStore;
    expect(saved.profiles).toHaveLength(1);
    expect(saved.profiles[0].id).toBe('b');
  });

  it('should set activeProfileId to next profile when active is deleted', () => {
    const store: ProfileStore = {
      profiles: [
        { id: 'a', name: 'A', avatar: '🧒', createdAt: '2024-01-01T00:00:00.000Z' },
        { id: 'b', name: 'B', avatar: '🦊', createdAt: '2024-01-01T00:00:00.000Z' },
      ],
      activeProfileId: 'a',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(store));
    deleteProfile('a');
    const savedCall = vi.mocked(localStorage.setItem).mock.calls[0];
    const saved = JSON.parse(savedCall[1]) as ProfileStore;
    expect(saved.activeProfileId).toBe('b');
  });

  it('should set activeProfileId to null when last profile is deleted', () => {
    const store: ProfileStore = {
      profiles: [{ id: 'a', name: 'A', avatar: '🧒', createdAt: '2024-01-01T00:00:00.000Z' }],
      activeProfileId: 'a',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(store));
    deleteProfile('a');
    const savedCall = vi.mocked(localStorage.setItem).mock.calls[0];
    const saved = JSON.parse(savedCall[1]) as ProfileStore;
    expect(saved.activeProfileId).toBeNull();
  });

  it('should remove per-profile progress key', () => {
    const store: ProfileStore = {
      profiles: [{ id: 'a', name: 'A', avatar: '🧒', createdAt: '2024-01-01T00:00:00.000Z' }],
      activeProfileId: 'a',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(store));
    deleteProfile('a');
    expect(localStorage.removeItem).toHaveBeenCalledWith('mathquest-progress-a');
  });

  it('should not change activeProfileId when non-active profile is deleted', () => {
    const store: ProfileStore = {
      profiles: [
        { id: 'a', name: 'A', avatar: '🧒', createdAt: '2024-01-01T00:00:00.000Z' },
        { id: 'b', name: 'B', avatar: '🦊', createdAt: '2024-01-01T00:00:00.000Z' },
      ],
      activeProfileId: 'a',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(store));
    deleteProfile('b');
    const savedCall = vi.mocked(localStorage.setItem).mock.calls[0];
    const saved = JSON.parse(savedCall[1]) as ProfileStore;
    expect(saved.activeProfileId).toBe('a');
  });
});

describe('setActiveProfile', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should set active profile when profile exists', () => {
    const store: ProfileStore = {
      profiles: [
        { id: 'a', name: 'A', avatar: '🧒', createdAt: '2024-01-01T00:00:00.000Z' },
        { id: 'b', name: 'B', avatar: '🦊', createdAt: '2024-01-01T00:00:00.000Z' },
      ],
      activeProfileId: 'a',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(store));
    setActiveProfile('b');
    const savedCall = vi.mocked(localStorage.setItem).mock.calls[0];
    const saved = JSON.parse(savedCall[1]) as ProfileStore;
    expect(saved.activeProfileId).toBe('b');
  });

  it('should not set active profile when profile does not exist', () => {
    const store: ProfileStore = {
      profiles: [{ id: 'a', name: 'A', avatar: '🧒', createdAt: '2024-01-01T00:00:00.000Z' }],
      activeProfileId: 'a',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(store));
    setActiveProfile('nonexistent');
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should clear active profile when called with null', () => {
    const store: ProfileStore = {
      profiles: [{ id: 'a', name: 'A', avatar: '🧒', createdAt: '2024-01-01T00:00:00.000Z' }],
      activeProfileId: 'a',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(store));
    setActiveProfile(null);
    const savedCall = vi.mocked(localStorage.setItem).mock.calls[0];
    const saved = JSON.parse(savedCall[1]) as ProfileStore;
    expect(saved.activeProfileId).toBeNull();
  });

  it('should clear active profile when called with empty string', () => {
    const store: ProfileStore = {
      profiles: [{ id: 'a', name: 'A', avatar: '🧒', createdAt: '2024-01-01T00:00:00.000Z' }],
      activeProfileId: 'a',
    };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(store));
    setActiveProfile('');
    const savedCall = vi.mocked(localStorage.setItem).mock.calls[0];
    const saved = JSON.parse(savedCall[1]) as ProfileStore;
    expect(saved.activeProfileId).toBeNull();
  });
});

describe('getActiveProfile', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return null when no active profile', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(
      JSON.stringify({ profiles: [], activeProfileId: null })
    );
    expect(getActiveProfile()).toBeNull();
  });

  it('should return the active profile', () => {
    const profile = { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2024-01-01T00:00:00.000Z' };
    vi.mocked(localStorage.getItem).mockReturnValue(
      JSON.stringify({ profiles: [profile], activeProfileId: 'a' })
    );
    expect(getActiveProfile()).toEqual(profile);
  });

  it('should return null when activeProfileId does not match any profile', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(
      JSON.stringify({
        profiles: [{ id: 'a', name: 'A', avatar: '🧒', createdAt: '2024-01-01T00:00:00.000Z' }],
        activeProfileId: 'nonexistent',
      })
    );
    expect(getActiveProfile()).toBeNull();
  });
});
