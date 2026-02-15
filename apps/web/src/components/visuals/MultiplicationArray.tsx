'use client';

interface MultiplicationArrayProps {
  rows: number;
  cols: number;
  highlightCount?: number;
}

const COLORS = ['#3B82F6', '#22C55E', '#F97316', '#A855F7', '#EF4444', '#0EA5E9'];

export default function MultiplicationArray({
  rows,
  cols,
  highlightCount,
}: MultiplicationArrayProps) {
  // Clamp to reasonable size
  const safeRows = Math.min(Math.max(rows, 1), 12);
  const safeCols = Math.min(Math.max(cols, 1), 12);
  const total = safeRows * safeCols;

  return (
    <div
      className="inline-block p-3 bg-white/10 rounded-lg"
      data-testid="multiplication-array"
      role="img"
      aria-label={`${safeRows} rows of ${safeCols} dots showing ${safeRows} times ${safeCols} equals ${total}`}
    >
      <div
        className="grid gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${safeCols}, 1fr)`,
        }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const isHighlighted = highlightCount !== undefined && i < highlightCount;
          const rowIndex = Math.floor(i / safeCols);
          const color = COLORS[rowIndex % COLORS.length];
          return (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-colors ${
                isHighlighted ? 'ring-2 ring-yellow-400' : ''
              }`}
              style={{ backgroundColor: color, opacity: isHighlighted ? 1 : 0.7 }}
            />
          );
        })}
      </div>
      <p className="text-center text-xs text-white/60 mt-2">
        {safeRows} × {safeCols} = {total}
      </p>
    </div>
  );
}
