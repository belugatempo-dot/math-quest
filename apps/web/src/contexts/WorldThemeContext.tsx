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
  primary: '#3B82F6',
  secondary: '#F97316',
  accent: '#22C55E',
  background: '#0F172A',
  text: '#E2E8F0',
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
