import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePicker from './ProfilePicker';

const mockUseProfile = vi.fn();

vi.mock('@/contexts/ProfileContext', () => ({
  useProfile: () => mockUseProfile(),
}));

const defaultMock = {
  profiles: [],
  activeProfile: null,
  createProfile: vi.fn(),
  switchProfile: vi.fn(),
  deleteProfile: vi.fn(),
  progress: { completedLevels: {}, totalStars: 0, lastPlayedLevelId: null, lastPlayedAt: null },
  completeLevel: vi.fn(),
};

describe('ProfilePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseProfile.mockReturnValue({ ...defaultMock });
  });

  describe('no profiles state', () => {
    it('should show create profile form when no profiles exist', () => {
      render(<ProfilePicker />);
      expect(screen.getByText('Create your player profile to get started!')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    it('should show avatar selection grid', () => {
      render(<ProfilePicker />);
      expect(screen.getByText('Choose your avatar')).toBeInTheDocument();
    });

    it('should disable Start Playing button when name is empty', () => {
      render(<ProfilePicker />);
      const button = screen.getByText('Start Playing');
      expect(button).toBeDisabled();
    });

    it('should enable Start Playing button when name is entered', () => {
      render(<ProfilePicker />);
      fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Alice' } });
      expect(screen.getByText('Start Playing')).not.toBeDisabled();
    });

    it('should call createProfile on submit', () => {
      const createProfile = vi.fn();
      mockUseProfile.mockReturnValue({ ...defaultMock, createProfile });
      render(<ProfilePicker />);

      fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Alice' } });
      fireEvent.click(screen.getByText('Start Playing'));

      expect(createProfile).toHaveBeenCalledWith('Alice', '🧒');
    });

    it('should call createProfile with selected avatar', () => {
      const createProfile = vi.fn();
      mockUseProfile.mockReturnValue({ ...defaultMock, createProfile });
      render(<ProfilePicker />);

      fireEvent.click(screen.getByLabelText('Select avatar 🦊'));
      fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Bob' } });
      fireEvent.click(screen.getByText('Start Playing'));

      expect(createProfile).toHaveBeenCalledWith('Bob', '🦊');
    });

    it('should not show Back button when no profiles exist', () => {
      render(<ProfilePicker />);
      expect(screen.queryByText('Back')).not.toBeInTheDocument();
    });

    it('should create profile on Enter key', () => {
      const createProfile = vi.fn();
      mockUseProfile.mockReturnValue({ ...defaultMock, createProfile });
      render(<ProfilePicker />);

      const input = screen.getByLabelText('Name');
      fireEvent.change(input, { target: { value: 'Alice' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(createProfile).toHaveBeenCalledWith('Alice', '🧒');
    });

    it('should not create profile with whitespace-only name', () => {
      const createProfile = vi.fn();
      mockUseProfile.mockReturnValue({ ...defaultMock, createProfile });
      render(<ProfilePicker />);

      fireEvent.change(screen.getByLabelText('Name'), { target: { value: '   ' } });
      fireEvent.click(screen.getByText('Start Playing'));

      expect(createProfile).not.toHaveBeenCalled();
    });
  });

  describe('existing profiles state', () => {
    const profiles = [
      { id: 'a', name: 'Alice', avatar: '🦊', createdAt: '2024-01-01' },
      { id: 'b', name: 'Bob', avatar: '🐉', createdAt: '2024-01-02' },
    ];

    beforeEach(() => {
      mockUseProfile.mockReturnValue({ ...defaultMock, profiles });
    });

    it('should show profile cards', () => {
      render(<ProfilePicker />);
      expect(screen.getByText('Who is playing today?')).toBeInTheDocument();
      expect(screen.getByLabelText('Select Alice')).toBeInTheDocument();
      expect(screen.getByLabelText('Select Bob')).toBeInTheDocument();
    });

    it('should call switchProfile when profile card is clicked', () => {
      const switchProfile = vi.fn();
      mockUseProfile.mockReturnValue({ ...defaultMock, profiles, switchProfile });
      render(<ProfilePicker />);

      fireEvent.click(screen.getByLabelText('Select Alice'));
      expect(switchProfile).toHaveBeenCalledWith('a');
    });

    it('should show Add Player button', () => {
      render(<ProfilePicker />);
      expect(screen.getByText('+ Add Player')).toBeInTheDocument();
    });

    it('should show create form when Add Player is clicked', () => {
      render(<ProfilePicker />);
      fireEvent.click(screen.getByText('+ Add Player'));
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByText('Back')).toBeInTheDocument();
    });

    it('should go back to profile list when Back is clicked', () => {
      render(<ProfilePicker />);
      fireEvent.click(screen.getByText('+ Add Player'));
      fireEvent.click(screen.getByText('Back'));
      expect(screen.getByText('+ Add Player')).toBeInTheDocument();
      expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
    });

    it('should show delete button for each profile', () => {
      render(<ProfilePicker />);
      expect(screen.getByLabelText('Delete Alice')).toBeInTheDocument();
      expect(screen.getByLabelText('Delete Bob')).toBeInTheDocument();
    });

    it('should show confirmation on delete click', () => {
      render(<ProfilePicker />);
      fireEvent.click(screen.getByLabelText('Delete Alice'));
      expect(screen.getByLabelText('Confirm delete Alice')).toBeInTheDocument();
      expect(screen.getByLabelText('Cancel delete')).toBeInTheDocument();
    });

    it('should call deleteProfile on confirm', () => {
      const deleteProfile = vi.fn();
      mockUseProfile.mockReturnValue({ ...defaultMock, profiles, deleteProfile });
      render(<ProfilePicker />);

      fireEvent.click(screen.getByLabelText('Delete Alice'));
      fireEvent.click(screen.getByLabelText('Confirm delete Alice'));
      expect(deleteProfile).toHaveBeenCalledWith('a');
    });

    it('should cancel delete on cancel click', () => {
      const deleteProfile = vi.fn();
      mockUseProfile.mockReturnValue({ ...defaultMock, profiles, deleteProfile });
      render(<ProfilePicker />);

      fireEvent.click(screen.getByLabelText('Delete Alice'));
      fireEvent.click(screen.getByLabelText('Cancel delete'));
      expect(deleteProfile).not.toHaveBeenCalled();
      expect(screen.getByLabelText('Delete Alice')).toBeInTheDocument();
    });
  });
});
