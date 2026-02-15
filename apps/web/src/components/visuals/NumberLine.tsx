'use client';

interface NumberLineProps {
  min: number;
  max: number;
  marks?: number[];
  highlight?: number;
}

export default function NumberLine({
  min,
  max,
  marks = [],
  highlight,
}: NumberLineProps) {
  const range = max - min;
  if (range <= 0) return null;

  const allMarks = [...new Set([min, max, ...marks])].sort((a, b) => a - b);
  const getX = (value: number) => ((value - min) / range) * 280 + 30;

  return (
    <div
      className="p-3 bg-slate-800/50 rounded-lg"
      data-testid="number-line"
      role="img"
      aria-label={`Number line from ${min} to ${max}`}
    >
      <svg viewBox="0 0 340 60" className="w-full h-12">
        {/* Main line */}
        <line x1="25" y1="30" x2="315" y2="30" stroke="#94A3B8" strokeWidth="2" />
        {/* Arrows */}
        <polygon points="20,30 28,26 28,34" fill="#94A3B8" />
        <polygon points="320,30 312,26 312,34" fill="#94A3B8" />

        {/* Marks */}
        {allMarks.map((value) => {
          const x = getX(value);
          const isHighlighted = highlight === value;
          return (
            <g key={value}>
              <line
                x1={x}
                y1="22"
                x2={x}
                y2="38"
                stroke={isHighlighted ? '#3B82F6' : '#64748B'}
                strokeWidth={isHighlighted ? 3 : 1.5}
              />
              <text
                x={x}
                y="52"
                textAnchor="middle"
                fontSize="10"
                fill={isHighlighted ? '#3B82F6' : '#64748B'}
                fontWeight={isHighlighted ? 'bold' : 'normal'}
              >
                {value}
              </text>
              {isHighlighted && (
                <circle cx={x} cy="30" r="5" fill="#3B82F6" />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
