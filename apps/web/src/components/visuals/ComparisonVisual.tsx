'use client';

interface ComparisonVisualProps {
  leftValue: number;
  rightValue: number;
  leftLabel?: string;
  rightLabel?: string;
}

export default function ComparisonVisual({
  leftValue,
  rightValue,
  leftLabel,
  rightLabel,
}: ComparisonVisualProps) {
  const maxValue = Math.max(leftValue, rightValue, 1);

  return (
    <div
      className="p-3 bg-slate-800/50 rounded-lg"
      data-testid="comparison-visual"
      role="img"
      aria-label={`Comparing ${leftLabel ?? leftValue} and ${rightLabel ?? rightValue}`}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium w-16 text-right text-slate-400">
            {leftLabel ?? leftValue}
          </span>
          <div className="flex-1 h-6 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${(leftValue / maxValue) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium w-16 text-right text-slate-400">
            {rightLabel ?? rightValue}
          </span>
          <div className="flex-1 h-6 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${(rightValue / maxValue) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
