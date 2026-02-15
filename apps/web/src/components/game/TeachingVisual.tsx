'use client';

import { useState } from 'react';
import type { VisualType } from '@mathquest/shared';

interface TeachingVisualProps {
  visualType: VisualType;
  visualProps: Record<string, unknown>;
}

const ANGLE_TYPE_LABELS: Record<string, string> = {
  acute: 'Acute Angle',
  right: 'Right Angle',
  obtuse: 'Obtuse Angle',
  straight: 'Straight Angle',
  reflex: 'Reflex Angle',
};

const DIAGRAM_TITLES: Record<string, string> = {
  'complementary-angles': 'Complementary Angles',
  'supplementary-angles': 'Supplementary Angles',
  'triangle-angle-sum': 'Triangle Angle Sum',
  'right-angle-real-world': 'Right Angles in Real World',
};

function AngleDiagram({ visualProps }: { visualProps: Record<string, unknown> }) {
  const angleValue = (visualProps.angleValue as number) ?? 90;
  const angleType = (visualProps.angleType as string) ?? 'right';
  const showLabel = visualProps.showLabel as boolean;

  const angleRad = (angleValue * Math.PI) / 180;
  const armLength = 80;
  const endX = 100 + armLength * Math.cos(angleRad);
  const endY = 100 - armLength * Math.sin(angleRad);

  const arcRadius = 30;
  const arcEndX = 100 + arcRadius * Math.cos(angleRad);
  const arcEndY = 100 - arcRadius * Math.sin(angleRad);
  const largeArc = angleValue > 180 ? 1 : 0;

  return (
    <div data-testid="visual-angle-diagram" className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 200 150" className="w-full max-w-[280px]" role="img" aria-label={`${angleValue} degree angle diagram`}>
        {/* Base arm (horizontal) */}
        <line x1="100" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="2.5" className="text-purple-600" />
        {/* Angle arm */}
        <line x1="100" y1="100" x2={endX} y2={endY} stroke="currentColor" strokeWidth="2.5" className="text-purple-600" />
        {/* Arc */}
        <path
          d={`M ${100 + arcRadius} 100 A ${arcRadius} ${arcRadius} 0 ${largeArc} 0 ${arcEndX} ${arcEndY}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-purple-400"
        />
        {/* Vertex dot */}
        <circle cx="100" cy="100" r="3" fill="currentColor" className="text-purple-700" />
        {/* Right angle square indicator */}
        {angleValue === 90 && (
          <rect x="100" y="88" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-400" />
        )}
      </svg>
      {showLabel && (
        <div className="text-center space-y-1">
          <p className="text-lg font-bold text-purple-700">{angleValue}°</p>
          <p className="text-sm text-purple-600">{ANGLE_TYPE_LABELS[angleType] || angleType}</p>
        </div>
      )}
    </div>
  );
}

function WorkedExample({ visualProps }: { visualProps: Record<string, unknown> }) {
  const steps = (visualProps.steps as string[]) ?? [];
  const [revealedCount, setRevealedCount] = useState(1);

  const allRevealed = revealedCount >= steps.length;

  return (
    <div data-testid="visual-worked-example" className="space-y-3">
      <ol className="space-y-2">
        {steps.slice(0, revealedCount).map((step, i) => (
          <li
            key={i}
            className="flex items-start gap-2 rounded-lg bg-white/80 p-3 border border-purple-100 animate-fadeIn"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <span className="text-sm text-gray-700">{step}</span>
          </li>
        ))}
      </ol>
      {!allRevealed && steps.length > 0 && (
        <button
          onClick={() => setRevealedCount((c) => c + 1)}
          className="w-full py-2 text-sm font-medium text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
          aria-label="Reveal next step"
        >
          Reveal Next Step
        </button>
      )}
    </div>
  );
}

function ConceptDiagram({ visualProps }: { visualProps: Record<string, unknown> }) {
  const diagramId = (visualProps.diagramId as string) ?? '';
  const title = DIAGRAM_TITLES[diagramId] || diagramId;

  return (
    <div data-testid="visual-concept-diagram" className="flex flex-col items-center gap-3">
      <p className="text-sm font-semibold text-purple-700">{title}</p>
      <svg viewBox="0 0 200 120" className="w-full max-w-[280px]" role="img" aria-label={title}>
        {diagramId === 'complementary-angles' && (
          <g>
            <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="2" className="text-purple-600" />
            <line x1="100" y1="100" x2="100" y2="20" stroke="currentColor" strokeWidth="2" className="text-purple-600" />
            <line x1="100" y1="100" x2="160" y2="40" stroke="currentColor" strokeWidth="2" className="text-purple-400" strokeDasharray="4" />
            <rect x="100" y="88" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1" className="text-purple-400" />
            <text x="120" y="70" fontSize="11" fill="currentColor" className="text-purple-600">a°</text>
            <text x="85" y="70" fontSize="11" fill="currentColor" className="text-purple-600">b°</text>
            <text x="60" y="115" fontSize="10" fill="currentColor" className="text-purple-500">a + b = 90°</text>
          </g>
        )}
        {diagramId === 'supplementary-angles' && (
          <g>
            <line x1="20" y1="80" x2="180" y2="80" stroke="currentColor" strokeWidth="2" className="text-purple-600" />
            <line x1="100" y1="80" x2="60" y2="20" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
            <text x="70" y="65" fontSize="11" fill="currentColor" className="text-purple-600">a°</text>
            <text x="120" y="65" fontSize="11" fill="currentColor" className="text-purple-600">b°</text>
            <text x="55" y="105" fontSize="10" fill="currentColor" className="text-purple-500">a + b = 180°</text>
          </g>
        )}
        {diagramId === 'triangle-angle-sum' && (
          <g>
            <polygon points="100,15 30,100 170,100" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-600" />
            <text x="90" y="35" fontSize="11" fill="currentColor" className="text-purple-600">a°</text>
            <text x="35" y="95" fontSize="11" fill="currentColor" className="text-purple-600">b°</text>
            <text x="150" y="95" fontSize="11" fill="currentColor" className="text-purple-600">c°</text>
            <text x="50" y="115" fontSize="10" fill="currentColor" className="text-purple-500">a + b + c = 180°</text>
          </g>
        )}
      </svg>
    </div>
  );
}

export default function TeachingVisual({ visualType, visualProps }: TeachingVisualProps) {
  switch (visualType) {
    case 'angle-diagram':
      return <AngleDiagram visualProps={visualProps} />;
    case 'worked-example':
      return <WorkedExample visualProps={visualProps} />;
    case 'concept-diagram':
      return <ConceptDiagram visualProps={visualProps} />;
    case 'none':
    default:
      return null;
  }
}
