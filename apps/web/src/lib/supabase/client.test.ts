import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock @supabase/ssr before importing
vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(() => ({ auth: { getUser: vi.fn() } })),
}));

import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
  _resetBrowserClient,
} from './client';
import { createBrowserClient } from '@supabase/ssr';

describe('Supabase Browser Client', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    _resetBrowserClient();
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('getSupabaseBrowserClient', () => {
    it('should return null when NEXT_PUBLIC_SUPABASE_URL is missing', () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';

      expect(getSupabaseBrowserClient()).toBeNull();
      expect(createBrowserClient).not.toHaveBeenCalled();
    });

    it('should return null when NEXT_PUBLIC_SUPABASE_ANON_KEY is missing', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      expect(getSupabaseBrowserClient()).toBeNull();
      expect(createBrowserClient).not.toHaveBeenCalled();
    });

    it('should return null when both env vars are missing', () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      expect(getSupabaseBrowserClient()).toBeNull();
    });

    it('should create a client when both env vars are present', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

      const client = getSupabaseBrowserClient();

      expect(client).not.toBeNull();
      expect(createBrowserClient).toHaveBeenCalledWith(
        'https://test.supabase.co',
        'test-anon-key'
      );
    });

    it('should return the same singleton instance on subsequent calls', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

      const client1 = getSupabaseBrowserClient();
      const client2 = getSupabaseBrowserClient();

      expect(client1).toBe(client2);
      expect(createBrowserClient).toHaveBeenCalledTimes(1);
    });

    it('should create a new client after reset', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

      getSupabaseBrowserClient();
      _resetBrowserClient();
      getSupabaseBrowserClient();

      expect(createBrowserClient).toHaveBeenCalledTimes(2);
    });
  });

  describe('isSupabaseConfigured', () => {
    it('should return false when URL is missing', () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'key';

      expect(isSupabaseConfigured()).toBe(false);
    });

    it('should return false when anon key is missing', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      expect(isSupabaseConfigured()).toBe(false);
    });

    it('should return true when both env vars are present', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'key';

      expect(isSupabaseConfigured()).toBe(true);
    });

    it('should return false when URL is empty string', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = '';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'key';

      expect(isSupabaseConfigured()).toBe(false);
    });
  });
});
