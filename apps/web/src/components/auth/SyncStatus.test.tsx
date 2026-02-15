import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SyncStatus from './SyncStatus';

const mockUseAuth = vi.fn();

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

describe('SyncStatus', () => {
  it('should render nothing when Supabase is not configured', () => {
    mockUseAuth.mockReturnValue({
      isConfigured: false,
      isAuthenticated: false,
      user: null,
    });

    const { container } = render(<SyncStatus />);
    expect(container.firstChild).toBeNull();
  });

  it('should show "Local only" when configured but not authenticated', () => {
    mockUseAuth.mockReturnValue({
      isConfigured: true,
      isAuthenticated: false,
      user: null,
    });

    render(<SyncStatus />);
    expect(screen.getByText('Local only')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Not signed in - progress saved locally')
    ).toBeInTheDocument();
  });

  it('should show "Cloud sync" when authenticated', () => {
    mockUseAuth.mockReturnValue({
      isConfigured: true,
      isAuthenticated: true,
      user: {
        id: 'user-123',
        displayName: 'Test Parent',
        email: 'test@test.com',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    });

    render(<SyncStatus />);
    expect(screen.getByText('Cloud sync')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Syncing as Test Parent')
    ).toBeInTheDocument();
  });

  it('should fall back to "user" when display name is missing', () => {
    mockUseAuth.mockReturnValue({
      isConfigured: true,
      isAuthenticated: true,
      user: null,
    });

    render(<SyncStatus />);
    expect(screen.getByLabelText('Syncing as user')).toBeInTheDocument();
  });
});
