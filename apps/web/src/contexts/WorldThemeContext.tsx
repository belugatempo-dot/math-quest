'use client';

import { createContext, useContext, type ReactNode } from 'react';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

const defaultPalette: ColorPalette = {
  primary: '#6366F1',
  secondary: '#A855F7',
  accent: '#22D3EE',
  background: '#5B4FCF',
  text: '#FFFFFF',
};

const WorldThemeContext = createContext<ColorPalette>(defaultPalette);

interface WorldThemeProviderProps {
  colorPalette?: ColorPalette;
  children: ReactNode;
}

export function WorldThemeProvider({
  colorPalette = defaultPalette,
  children,
}: WorldThemeProviderProps) {
  const style = {
    '--world-primary': colorPalette.primary,
    '--world-secondary': colorPalette.secondary,
    '--world-accent': colorPalette.accent,
    '--world-background': colorPalette.background,
    '--world-text': colorPalette.text,
  } as React.CSSProperties;

  return (
    <WorldThemeContext.Provider value={colorPalette}>
      <div style={style}>{children}</div>
    </WorldThemeContext.Provider>
  );
}

export function useWorldTheme(): ColorPalette {
  return useContext(WorldThemeContext);
}
