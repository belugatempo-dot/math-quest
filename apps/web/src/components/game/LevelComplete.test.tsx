import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import LevelComplete from './LevelComplete';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('LevelComplete', () => {
  const defaultProps = {
    levelName: 'Mountain Base',
    stars: 3,
    attempts: 5,
    hintsUsed: 1,
    chapterId: 'chapter-3-1',
  };

  describe('star messages', () => {
    it('should show "Perfect!" for 3 stars', () => {
      render(<LevelComplete {...defaultProps} stars={3} />);
      expect(screen.getByText(/Perfect!/)).toBeInTheDocument();
    });

    it('should show "Great job!" for 2 stars', () => {
      render(<LevelComplete {...defaultProps} stars={2} />);
      expect(screen.getByText(/Great job!/)).toBeInTheDocument();
    });

    it('should show "You did it!" for 1 star', () => {
      render(<LevelComplete {...defaultProps} stars={1} />);
      expect(screen.getByText(/You did it!/)).toBeInTheDocument();
    });

    it('should show "Level Complete" for 0 stars', () => {
      render(<LevelComplete {...defaultProps} stars={0} />);
      expect(screen.getByText(/Level Complete/)).toBeInTheDocument();
    });
  });

  it('should display the level name', () => {
    render(<LevelComplete {...defaultProps} />);
    expect(screen.getByText('Mountain Base')).toBeInTheDocument();
  });

  it('should display star count via StarDisplay', () => {
    render(<LevelComplete {...defaultProps} stars={2} />);
    expect(screen.getByRole('img', { name: '2 out of 3 stars' })).toBeInTheDocument();
  });

  it('should display attempt count', () => {
    render(<LevelComplete {...defaultProps} />);
    expect(screen.getByText('Attempts')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should display hints used count', () => {
    render(<LevelComplete {...defaultProps} />);
    expect(screen.getByText('Hints Used')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  describe('teaching point', () => {
    it('should show teaching point when provided', () => {
      render(<LevelComplete {...defaultProps} teachingPoint="Remember: multiplication is fun" />);
      expect(screen.getByText('Remember:')).toBeInTheDocument();
      expect(screen.getByText('Remember: multiplication is fun')).toBeInTheDocument();
    });

    it('should not show teaching point when not provided', () => {
      render(<LevelComplete {...defaultProps} />);
      expect(screen.queryByText('Remember:')).not.toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('should show Next Level link when nextLevelId is provided', () => {
      render(<LevelComplete {...defaultProps} nextLevelId="level-3-1-2" />);
      const link = screen.getByRole('link', { name: /Next Level/ });
      expect(link).toHaveAttribute('href', '/play/level-3-1-2');
    });

    it('should show Chapter Complete button when no nextLevelId', () => {
      render(<LevelComplete {...defaultProps} />);
      expect(screen.getByText('Chapter Complete!')).toBeInTheDocument();
    });

    it('should always show Back to Chapter link', () => {
      render(<LevelComplete {...defaultProps} />);
      const backLink = screen.getByRole('link', { name: /Back to Chapter/ });
      expect(backLink).toHaveAttribute('href', '/chapter/chapter-3-1');
    });
  });
});
