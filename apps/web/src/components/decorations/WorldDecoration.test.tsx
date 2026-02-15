import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WorldDecoration from './WorldDecoration';
import type { WorldTheme } from './WorldDecoration';

describe('WorldDecoration', () => {
  const themes: WorldTheme[] = ['adventure', 'tropical', 'forest', 'castle'];

  it.each(themes)('should render decoration for %s theme', (theme) => {
    render(<WorldDecoration theme={theme} />);
    expect(screen.getByTestId('world-decoration')).toBeInTheDocument();
  });

  it('should render SVG as aria-hidden', () => {
    const { container } = render(<WorldDecoration theme="adventure" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should apply custom className', () => {
    render(<WorldDecoration theme="adventure" className="mt-4" />);
    const decoration = screen.getByTestId('world-decoration');
    expect(decoration.className).toContain('mt-4');
  });

  it('should fall back to mountain for unknown theme', () => {
    render(<WorldDecoration theme={'unknown' as WorldTheme} />);
    expect(screen.getByTestId('world-decoration')).toBeInTheDocument();
  });
});
