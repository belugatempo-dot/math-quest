'use client';

interface ChapterPathProps {
  nodeCount: number;
  completedCount: number;
}

export default function ChapterPath({ nodeCount, completedCount }: ChapterPathProps) {
  if (nodeCount < 2) return null;

  const nodeSpacing = 120;
  const height = (nodeCount - 1) * nodeSpacing;

  return (
    <svg
      className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
      width="4"
      height={height}
      viewBox={`0 0 4 ${height}`}
      aria-hidden="true"
      data-testid="chapter-path"
    >
      {Array.from({ length: nodeCount - 1 }, (_, i) => {
        const y1 = i * nodeSpacing + 40;
        const y2 = (i + 1) * nodeSpacing;
        const isCompleted = i < completedCount;

        return (
          <line
            key={i}
            x1="2"
            y1={y1}
            x2="2"
            y2={y2}
            stroke={isCompleted ? 'var(--world-primary, #3B82F6)' : '#CBD5E1'}
            strokeWidth="3"
            strokeDasharray={isCompleted ? 'none' : '8 6'}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
