import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock next/headers
const mockCookieStore = {
  getAll: vi.fn().mockReturnValue([]),
  set: vi.fn(),
};
vi.mock('next/headers', () => ({
  cookies: () => mockCookieStore,
}));

// Mock @supabase/ssr
const mockExchangeCodeForSession = vi.fn();
vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      exchangeCodeForSession: mockExchangeCodeForSession,
    },
  })),
}));

import { GET } from './route';

describe('GET /auth/callback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
  });

  it('should redirect to / with error when no code is provided', async () => {
    const request = new Request('http://localhost:3000/auth/callback');

    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('Location')).toBe('http://localhost:3000/?auth_error=missing_code');
  });

  it('should exchange code for session and redirect to / on success', async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: null });
    const request = new Request('http://localhost:3000/auth/callback?code=test-code-123');

    const response = await GET(request);

    expect(mockExchangeCodeForSession).toHaveBeenCalledWith('test-code-123');
    expect(response.status).toBe(307);
    expect(response.headers.get('Location')).toBe('http://localhost:3000/');
  });

  it('should redirect with error when code exchange fails', async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      error: { message: 'Invalid code' },
    });
    const request = new Request('http://localhost:3000/auth/callback?code=bad-code');

    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('Location')).toBe('http://localhost:3000/?auth_error=exchange_failed');
  });
});
