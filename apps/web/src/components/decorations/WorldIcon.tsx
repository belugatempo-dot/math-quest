'use client';

import type { WorldTheme } from './WorldDecoration';

interface WorldIconProps {
  theme: string;
  size?: number;
}

function MountainIcon() {
  return (
    <path d="M2 20 L8 6 L14 14 L18 4 L22 20 Z" fill="currentColor" />
  );
}

function TropicalIcon() {
  return (
    <g>
      <path d="M2 18 Q8 12 12 18 Q16 12 22 18 L22 22 L2 22 Z" fill="currentColor" />
      <circle cx="18" cy="6" r="3" fill="currentColor" opacity="0.5" />
    </g>
  );
}

function ForestIcon() {
  return (
    <g>
      <polygon points="8,20 12,6 16,20" fill="currentColor" />
      <polygon points="3,20 6,10 9,20" fill="currentColor" opacity="0.7" />
      <polygon points="15,20 18,8 21,20" fill="currentColor" opacity="0.7" />
    </g>
  );
}

function CastleIcon() {
  return (
    <g>
      <rect x="6" y="10" width="12" height="12" fill="currentColor" />
      <rect x="6" y="7" width="3" height="5" fill="currentColor" />
      <rect x="10.5" y="7" width="3" height="5" fill="currentColor" />
      <rect x="15" y="7" width="3" height="5" fill="currentColor" />
      <rect x="10" y="16" width="4" height="6" rx="2" fill="white" opacity="0.3" />
    </g>
  );
}

const ICON_MAP: Record<WorldTheme, React.FC> = {
  adventure: MountainIcon,
  tropical: TropicalIcon,
  forest: ForestIcon,
  castle: CastleIcon,
};

export default function WorldIcon({ theme, size = 24 }: WorldIconProps) {
  const Icon = ICON_MAP[theme as WorldTheme] ?? MountainIcon;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      data-testid={`world-icon-${theme}`}
    >
      <Icon />
    </svg>
  );
}
