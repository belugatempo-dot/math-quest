import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WorldIcon from './WorldIcon';
import type { WorldTheme } from './WorldDecoration';

describe('WorldIcon', () => {
  const themes: WorldTheme[] = ['adventure', 'tropical', 'forest', 'castle'];

  it.each(themes)('should render icon for %s theme', (theme) => {
    render(<WorldIcon theme={theme} />);
    expect(screen.getByTestId(`world-icon-${theme}`)).toBeInTheDocument();
  });

  it('should render with default size of 24', () => {
    render(<WorldIcon theme="adventure" />);
    const svg = screen.getByTestId('world-icon-adventure');
    expect(svg.getAttribute('width')).toBe('24');
    expect(svg.getAttribute('height')).toBe('24');
  });

  it('should render with custom size', () => {
    render(<WorldIcon theme="tropical" size={32} />);
    const svg = screen.getByTestId('world-icon-tropical');
    expect(svg.getAttribute('width')).toBe('32');
  });

  it('should be aria-hidden', () => {
    render(<WorldIcon theme="forest" />);
    const svg = screen.getByTestId('world-icon-forest');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });

  it('should fall back to mountain for unknown theme', () => {
    const { container } = render(<WorldIcon theme={'unknown' as WorldTheme} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
