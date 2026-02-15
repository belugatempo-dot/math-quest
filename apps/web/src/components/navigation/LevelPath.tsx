'use client';

import type { Level } from '@mathquest/shared';
import type { GameProgress } from '@/lib/storage';

interface LevelPathProps {
  levels: Level[];
  progress: GameProgress | null;
  nodesPerRow?: number;
}

interface NodePosition {
  x: number;
  y: number;
  row: number;
}

function getNodePositions(count: number, nodesPerRow: number, containerWidth: number): NodePosition[] {
  const positions: NodePosition[] = [];
  const nodeSpacing = containerWidth / (nodesPerRow + 1);
  const rowHeight = 110;

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / nodesPerRow);
    const posInRow = i % nodesPerRow;
    const isReversed = row % 2 === 1;
    const col = isReversed ? nodesPerRow - 1 - posInRow : posInRow;

    positions.push({
      x: nodeSpacing * (col + 1),
      y: row * rowHeight + 50,
      row,
    });
  }

  return positions;
}

export function useLevelPathLayout(levelCount: number, nodesPerRow = 4) {
  const containerWidth = 600;
  return getNodePositions(levelCount, nodesPerRow, containerWidth);
}

export default function LevelPath({
  levels,
  progress,
  nodesPerRow = 4,
}: LevelPathProps) {
  const containerWidth = 600;
  const positions = getNodePositions(levels.length, nodesPerRow, containerWidth);
  const rows = Math.ceil(levels.length / nodesPerRow);
  const svgHeight = rows * 110 + 20;

  return (
    <svg
      className="absolute inset-0 w-full pointer-events-none"
      viewBox={`0 0 ${containerWidth} ${svgHeight}`}
      preserveAspectRatio="xMidYMin meet"
      aria-hidden="true"
      data-testid="level-path"
    >
      {positions.map((pos, i) => {
        if (i === 0) return null;
        const prev = positions[i - 1];
        const isCompleted = Boolean(
          progress?.completedLevels[levels[i - 1]?.id]?.stars
        );

        return (
          <line
            key={`path-${i}`}
            x1={prev.x}
            y1={prev.y}
            x2={pos.x}
            y2={pos.y}
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
