'use client';

export type CharacterId = 'grogg' | 'lizzie' | 'prof-owlbert' | 'sir-calculate' | 'captain-claw';
export type Expression = 'neutral' | 'happy' | 'thinking' | 'surprised' | 'encouraging';
export type AvatarSize = 'sm' | 'md' | 'lg';

interface CharacterAvatarProps {
  characterId: CharacterId;
  expression?: Expression;
  size?: AvatarSize;
}

const SIZE_MAP: Record<AvatarSize, number> = {
  sm: 40,
  md: 64,
  lg: 96,
};

function getMouthPath(expression: Expression): string {
  switch (expression) {
    case 'happy':
      return 'M 18 38 Q 25 46 32 38';
    case 'thinking':
      return 'M 20 40 Q 25 38 30 40';
    case 'surprised':
      return 'M 22 38 Q 25 44 28 38 Q 25 44 22 38';
    case 'encouraging':
      return 'M 18 36 Q 25 44 32 36';
    default:
      return 'M 20 38 L 30 38';
  }
}

function getEyeVariant(expression: Expression): { leftEye: string; rightEye: string } {
  switch (expression) {
    case 'happy':
      return {
        leftEye: 'M 18 26 Q 20 22 22 26',
        rightEye: 'M 28 26 Q 30 22 32 26',
      };
    case 'thinking':
      return {
        leftEye: 'M 17 24 A 3 3 0 1 1 23 24 A 3 3 0 1 1 17 24',
        rightEye: 'M 27 22 A 3 4 0 1 1 33 22 A 3 4 0 1 1 27 22',
      };
    case 'surprised':
      return {
        leftEye: 'M 16 24 A 4 4 0 1 1 24 24 A 4 4 0 1 1 16 24',
        rightEye: 'M 26 24 A 4 4 0 1 1 34 24 A 4 4 0 1 1 26 24',
      };
    default:
      return {
        leftEye: 'M 17 24 A 3 3 0 1 1 23 24 A 3 3 0 1 1 17 24',
        rightEye: 'M 27 24 A 3 3 0 1 1 33 24 A 3 3 0 1 1 27 24',
      };
  }
}

function GroggSVG({ expression }: { expression: Expression }) {
  const mouth = getMouthPath(expression);
  const eyes = getEyeVariant(expression);
  return (
    <g>
      {/* Body - green round monster */}
      <circle cx="25" cy="28" r="22" fill="#22C55E" />
      {/* Eyes */}
      <circle cx="18" cy="22" r="5" fill="white" />
      <circle cx="32" cy="22" r="5" fill="white" />
      <path d={eyes.leftEye} fill="#1E293B" />
      <path d={eyes.rightEye} fill="#1E293B" />
      {/* Mouth */}
      <path d={mouth} fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      {/* Horns */}
      <polygon points="12,10 15,2 18,10" fill="#16A34A" />
      <polygon points="32,10 35,2 38,10" fill="#16A34A" />
    </g>
  );
}

function LizzieSVG({ expression }: { expression: Expression }) {
  const mouth = getMouthPath(expression);
  const eyes = getEyeVariant(expression);
  return (
    <g>
      {/* Head - teal/purple angular lizard */}
      <path d="M 5 30 L 15 8 L 25 5 L 35 8 L 45 30 L 35 45 L 15 45 Z" fill="#6366F1" />
      {/* Eyes */}
      <circle cx="18" cy="22" r="4" fill="white" />
      <circle cx="32" cy="22" r="4" fill="white" />
      <path d={eyes.leftEye} fill="#1E293B" />
      <path d={eyes.rightEye} fill="#1E293B" />
      {/* Mouth */}
      <path d={mouth} fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      {/* Crest */}
      <path d="M 22 5 L 25 0 L 28 5" fill="#8B5CF6" />
    </g>
  );
}

function ProfOwlbertSVG({ expression }: { expression: Expression }) {
  const mouth = getMouthPath(expression);
  const eyes = getEyeVariant(expression);
  return (
    <g>
      {/* Body - brown/gold owl */}
      <ellipse cx="25" cy="30" rx="20" ry="18" fill="#92400E" />
      {/* Belly */}
      <ellipse cx="25" cy="34" rx="12" ry="10" fill="#FCD34D" />
      {/* Eyes with glasses */}
      <circle cx="18" cy="22" r="6" fill="white" stroke="#1E293B" strokeWidth="1.5" />
      <circle cx="32" cy="22" r="6" fill="white" stroke="#1E293B" strokeWidth="1.5" />
      <line x1="24" y1="22" x2="26" y2="22" stroke="#1E293B" strokeWidth="1.5" />
      <path d={eyes.leftEye} fill="#1E293B" />
      <path d={eyes.rightEye} fill="#1E293B" />
      {/* Beak */}
      <polygon points="22,28 25,32 28,28" fill="#F59E0B" />
      {/* Ears/tufts */}
      <polygon points="8,16 5,6 14,14" fill="#78350F" />
      <polygon points="42,16 45,6 36,14" fill="#78350F" />
      {/* Mouth hint below beak */}
      <path d={mouth} fill="none" stroke="#78350F" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </g>
  );
}

function SirCalculateSVG({ expression }: { expression: Expression }) {
  const mouth = getMouthPath(expression);
  const eyes = getEyeVariant(expression);
  return (
    <g>
      {/* Helmet */}
      <path d="M 10 28 L 10 14 Q 10 4 25 4 Q 40 4 40 14 L 40 28 Z" fill="#6B7280" />
      {/* Visor opening */}
      <rect x="14" y="16" width="22" height="12" rx="2" fill="#1E293B" />
      {/* Eyes in visor */}
      <circle cx="20" cy="22" r="3" fill="#60A5FA" />
      <circle cx="30" cy="22" r="3" fill="#60A5FA" />
      <path d={eyes.leftEye} fill="white" transform="translate(2, 0)" />
      <path d={eyes.rightEye} fill="white" transform="translate(-2, 0)" />
      {/* Mouth in visor */}
      <path d={mouth} fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
      {/* Plume */}
      <path d="M 25 4 Q 28 -2 35 2 Q 30 4 28 4" fill="#EF4444" />
      {/* Face guard */}
      <path d="M 14 28 L 14 36 Q 25 42 36 36 L 36 28" fill="#9CA3AF" />
    </g>
  );
}

function CaptainClawSVG({ expression }: { expression: Expression }) {
  const mouth = getMouthPath(expression);
  const eyes = getEyeVariant(expression);
  return (
    <g>
      {/* Face */}
      <circle cx="25" cy="30" r="18" fill="#FDE68A" />
      {/* Pirate hat */}
      <path d="M 5 24 Q 5 8 25 6 Q 45 8 45 24 Z" fill="#1E293B" />
      {/* Skull on hat */}
      <circle cx="25" cy="16" r="4" fill="white" />
      <circle cx="23" cy="15" r="1" fill="#1E293B" />
      <circle cx="27" cy="15" r="1" fill="#1E293B" />
      {/* Eye patch on left */}
      <circle cx="18" cy="28" r="5" fill="#1E293B" />
      <line x1="13" y1="24" x2="37" y2="18" stroke="#1E293B" strokeWidth="1.5" />
      {/* Right eye */}
      <circle cx="32" cy="28" r="4" fill="white" />
      <path d={eyes.rightEye} fill="#1E293B" transform="translate(0, 4)" />
      {/* Mouth */}
      <path d={mouth} fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" transform="translate(0, 4)" />
    </g>
  );
}

const CHARACTER_MAP: Record<CharacterId, React.FC<{ expression: Expression }>> = {
  grogg: GroggSVG,
  lizzie: LizzieSVG,
  'prof-owlbert': ProfOwlbertSVG,
  'sir-calculate': SirCalculateSVG,
  'captain-claw': CaptainClawSVG,
};

const CHARACTER_LABELS: Record<CharacterId, string> = {
  grogg: 'Grogg',
  lizzie: 'Lizzie',
  'prof-owlbert': 'Prof. Owlbert',
  'sir-calculate': 'Sir Calculate',
  'captain-claw': 'Captain Claw',
};

export default function CharacterAvatar({
  characterId,
  expression = 'neutral',
  size = 'md',
}: CharacterAvatarProps) {
  const pixelSize = SIZE_MAP[size];
  const CharacterSVG = CHARACTER_MAP[characterId];
  const label = CHARACTER_LABELS[characterId];

  if (!CharacterSVG) return null;

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 50 50"
      role="img"
      aria-label={label}
      data-testid={`avatar-${characterId}`}
    >
      <CharacterSVG expression={expression} />
    </svg>
  );
}
