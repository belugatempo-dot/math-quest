import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WorldThemeProvider, useWorldTheme } from './WorldThemeContext';
import type { ColorPalette } from './WorldThemeContext';

function ThemeConsumer() {
  const theme = useWorldTheme();
  return (
    <div>
      <span data-testid="primary">{theme.primary}</span>
      <span data-testid="secondary">{theme.secondary}</span>
    </div>
  );
}

describe('WorldThemeContext', () => {
  it('should provide default palette when no colorPalette prop is given', () => {
    render(
      <WorldThemeProvider>
        <ThemeConsumer />
      </WorldThemeProvider>
    );
    expect(screen.getByTestId('primary').textContent).toBe('#6366F1');
    expect(screen.getByTestId('secondary').textContent).toBe('#A855F7');
  });

  it('should provide custom palette when colorPalette prop is given', () => {
    const customPalette: ColorPalette = {
      primary: '#0EA5E9',
      secondary: '#F59E0B',
      accent: '#F472B6',
      background: '#F8FAFC',
      text: '#1E293B',
    };
    render(
      <WorldThemeProvider colorPalette={customPalette}>
        <ThemeConsumer />
      </WorldThemeProvider>
    );
    expect(screen.getByTestId('primary').textContent).toBe('#0EA5E9');
    expect(screen.getByTestId('secondary').textContent).toBe('#F59E0B');
  });

  it('should set CSS custom properties on wrapper div', () => {
    const customPalette: ColorPalette = {
      primary: '#FF0000',
      secondary: '#00FF00',
      accent: '#0000FF',
      background: '#FFFFFF',
      text: '#000000',
    };
    const { container } = render(
      <WorldThemeProvider colorPalette={customPalette}>
        <span>child</span>
      </WorldThemeProvider>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.getPropertyValue('--world-primary')).toBe('#FF0000');
    expect(wrapper.style.getPropertyValue('--world-secondary')).toBe('#00FF00');
    expect(wrapper.style.getPropertyValue('--world-accent')).toBe('#0000FF');
    expect(wrapper.style.getPropertyValue('--world-background')).toBe('#FFFFFF');
    expect(wrapper.style.getPropertyValue('--world-text')).toBe('#000000');
  });

  it('should render children', () => {
    render(
      <WorldThemeProvider>
        <span data-testid="child">Hello</span>
      </WorldThemeProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should provide default palette outside provider via useWorldTheme', () => {
    render(<ThemeConsumer />);
    expect(screen.getByTestId('primary').textContent).toBe('#6366F1');
  });
});
