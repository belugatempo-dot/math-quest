'use client';

export type WorldTheme = 'adventure' | 'tropical' | 'forest' | 'castle';

interface WorldDecorationProps {
  theme: string;
  className?: string;
}

function MountainDecoration() {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="w-full h-16 md:h-20"
      aria-hidden="true"
    >
      <path
        d="M0 120 L100 40 L180 80 L280 20 L380 60 L450 10 L520 50 L600 30 L680 70 L760 15 L850 55 L920 25 L1000 65 L1080 35 L1150 60 L1200 40 L1200 120 Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M0 120 L150 60 L250 90 L400 30 L500 70 L600 20 L700 60 L800 40 L900 80 L1000 35 L1100 70 L1200 50 L1200 120 Z"
        fill="currentColor"
        opacity="0.18"
      />
    </svg>
  );
}

function TropicalDecoration() {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="w-full h-16 md:h-20"
      aria-hidden="true"
    >
      {/* Waves */}
      <path
        d="M0 60 Q150 20 300 60 Q450 100 600 60 Q750 20 900 60 Q1050 100 1200 60 L1200 120 L0 120 Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M0 80 Q150 50 300 80 Q450 110 600 80 Q750 50 900 80 Q1050 110 1200 80 L1200 120 L0 120 Z"
        fill="currentColor"
        opacity="0.18"
      />
      {/* Palm outline */}
      <g transform="translate(100, 10)" opacity="0.20">
        <line x1="10" y1="60" x2="10" y2="30" stroke="currentColor" strokeWidth="3" />
        <path d="M10 30 Q-10 10 -20 15 Q0 5 10 30" fill="currentColor" />
        <path d="M10 30 Q30 10 40 15 Q20 5 10 30" fill="currentColor" />
        <path d="M10 30 Q10 5 5 0 Q12 10 10 30" fill="currentColor" />
      </g>
    </svg>
  );
}

function ForestDecoration() {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="w-full h-16 md:h-20"
      aria-hidden="true"
    >
      {/* Tree silhouettes */}
      <g opacity="0.20" fill="currentColor">
        <polygon points="80,120 100,30 120,120" />
        <polygon points="200,120 230,20 260,120" />
        <polygon points="350,120 375,40 400,120" />
        <polygon points="500,120 520,25 540,120" />
        <polygon points="650,120 680,35 710,120" />
        <polygon points="800,120 825,15 850,120" />
        <polygon points="950,120 975,30 1000,120" />
        <polygon points="1100,120 1125,40 1150,120" />
      </g>
      <g opacity="0.15" fill="currentColor">
        <polygon points="140,120 165,50 190,120" />
        <polygon points="300,120 320,45 340,120" />
        <polygon points="450,120 470,35 490,120" />
        <polygon points="580,120 605,50 630,120" />
        <polygon points="730,120 755,30 780,120" />
        <polygon points="880,120 905,45 930,120" />
        <polygon points="1040,120 1060,25 1080,120" />
      </g>
    </svg>
  );
}

function CastleDecoration() {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="w-full h-16 md:h-20"
      aria-hidden="true"
    >
      {/* Castle turrets */}
      <g opacity="0.20" fill="currentColor">
        <rect x="80" y="40" width="60" height="80" />
        <rect x="80" y="30" width="15" height="15" />
        <rect x="105" y="30" width="15" height="15" />
        <rect x="100" y="60" width="20" height="30" rx="10" />

        <rect x="350" y="20" width="80" height="100" />
        <rect x="350" y="10" width="15" height="15" />
        <rect x="380" y="10" width="15" height="15" />
        <rect x="410" y="10" width="15" height="15" />
        <rect x="375" y="50" width="30" height="40" rx="15" />

        <rect x="700" y="30" width="70" height="90" />
        <rect x="700" y="20" width="15" height="15" />
        <rect x="730" y="20" width="15" height="15" />
        <rect x="755" y="20" width="15" height="15" />

        <rect x="1000" y="40" width="60" height="80" />
        <rect x="1000" y="30" width="15" height="15" />
        <rect x="1025" y="30" width="15" height="15" />
      </g>
    </svg>
  );
}

const DECORATION_MAP: Record<WorldTheme, React.FC> = {
  adventure: MountainDecoration,
  tropical: TropicalDecoration,
  forest: ForestDecoration,
  castle: CastleDecoration,
};

export default function WorldDecoration({ theme, className = '' }: WorldDecorationProps) {
  const Decoration = DECORATION_MAP[theme as WorldTheme] ?? MountainDecoration;

  return (
    <div className={`text-white ${className}`} data-testid="world-decoration">
      <Decoration />
    </div>
  );
}
