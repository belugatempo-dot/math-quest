'use client';

export interface TriangleDef {
  label?: string;
  sides: [number, number, number];
}

interface TriangleVisualProps {
  triangles: TriangleDef[];
}

const COLORS = [
  { fill: '#DBEAFE', stroke: '#3B82F6' },  // blue
  { fill: '#DCFCE7', stroke: '#22C55E' },  // green
  { fill: '#FFF7ED', stroke: '#F97316' },  // orange
  { fill: '#F3E8FF', stroke: '#A855F7' },  // purple
];

const TRIANGLE_WIDTH = 120;
const TRIANGLE_HEIGHT = 100;
const PADDING = 15;
const LABEL_HEIGHT = 20;
const SPACING = 20;
const MIN_HEIGHT = 15;

function isValidTriangle(sides: [number, number, number]): boolean {
  const [a, b, c] = sides;
  return a + b > c && a + c > b && b + c > a && a > 0 && b > 0 && c > 0;
}

/**
 * Compute triangle vertices using law of cosines.
 * Places side `a` (sides[0]) along the bottom, computes apex from angles.
 * Returns vertices normalized to fit within TRIANGLE_WIDTH x TRIANGLE_HEIGHT.
 */
function computeVertices(
  sides: [number, number, number]
): [number, number][] {
  const [a, b, c] = sides;

  // Place side `a` along x-axis: vertex B at origin, vertex C at (a, 0)
  // Compute vertex A using law of cosines: cos(B) = (a² + c² - b²) / (2ac)
  const cosB = (a * a + c * c - b * b) / (2 * a * c);
  const sinB = Math.sqrt(1 - cosB * cosB);

  const rawVertices: [number, number][] = [
    [0, 0],           // B (bottom-left)
    [a, 0],           // C (bottom-right)
    [c * cosB, -c * sinB], // A (apex, negative y = up in math coords)
  ];

  // Find bounding box
  const xs = rawVertices.map(([x]) => x);
  const ys = rawVertices.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const rawW = maxX - minX;
  const rawH = Math.max(maxY - minY, MIN_HEIGHT);

  const availW = TRIANGLE_WIDTH - 2 * PADDING;
  const availH = TRIANGLE_HEIGHT - 2 * PADDING;
  const scale = Math.min(availW / rawW, availH / rawH);

  // Center within the bounding box
  const scaledW = rawW * scale;
  const scaledH = rawH * scale;
  const offsetX = PADDING + (availW - scaledW) / 2 - minX * scale;
  const offsetY = PADDING + (availH - scaledH) / 2 - minY * scale;

  return rawVertices.map(([x, y]) => [
    x * scale + offsetX,
    y * scale + offsetY,
  ]);
}

function midpoint(p1: [number, number], p2: [number, number]): [number, number] {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
}

/**
 * Offset a label position outward from the triangle center
 * so labels don't overlap the edges.
 */
function labelOffset(
  mid: [number, number],
  center: [number, number],
  distance: number
): [number, number] {
  const dx = mid[0] - center[0];
  const dy = mid[1] - center[1];
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return [mid[0] + (dx / len) * distance, mid[1] + (dy / len) * distance];
}

function buildAriaLabel(triangles: TriangleDef[]): string {
  return triangles
    .map((t) => {
      const prefix = t.label ? `Triangle ${t.label}` : 'Triangle';
      return `${prefix} with sides ${t.sides.join(', ')}`;
    })
    .join('. ');
}

export default function TriangleVisual({ triangles }: TriangleVisualProps) {
  const validTriangles = triangles.filter((t) => isValidTriangle(t.sides));
  if (validTriangles.length === 0) return null;

  const totalWidth =
    validTriangles.length * TRIANGLE_WIDTH +
    (validTriangles.length - 1) * SPACING;
  const totalHeight = TRIANGLE_HEIGHT + LABEL_HEIGHT;

  return (
    <div
      className="inline-block p-3 bg-gray-50 rounded-lg"
      data-testid="triangle-visual"
      role="img"
      aria-label={buildAriaLabel(validTriangles)}
    >
      <svg
        width={totalWidth}
        height={totalHeight}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      >
        {validTriangles.map((tri, i) => {
          const xOffset = i * (TRIANGLE_WIDTH + SPACING);
          const verts = computeVertices(tri.sides);
          const color = COLORS[i % COLORS.length];

          const points = verts
            .map(([x, y]) => `${x + xOffset},${y + LABEL_HEIGHT}`)
            .join(' ');

          // Offset vertices for label placement
          const offsetVerts = verts.map(
            ([x, y]) => [x + xOffset, y + LABEL_HEIGHT] as [number, number]
          );

          const center: [number, number] = [
            (offsetVerts[0][0] + offsetVerts[1][0] + offsetVerts[2][0]) / 3,
            (offsetVerts[0][1] + offsetVerts[1][1] + offsetVerts[2][1]) / 3,
          ];

          // Side labels: sides[0] = B→C (bottom), sides[1] = A→C (right-ish), sides[2] = A→B (left-ish)
          const edgeMids: [number, number][] = [
            midpoint(offsetVerts[0], offsetVerts[1]),  // side a (bottom)
            midpoint(offsetVerts[1], offsetVerts[2]),  // side b
            midpoint(offsetVerts[2], offsetVerts[0]),  // side c
          ];

          return (
            <g key={i}>
              <polygon
                points={points}
                fill={color.fill}
                stroke={color.stroke}
                strokeWidth={2}
              />
              {/* Side length labels */}
              {tri.sides.map((s, si) => {
                const pos = labelOffset(edgeMids[si], center, 10);
                return (
                  <text
                    key={si}
                    x={pos[0]}
                    y={pos[1]}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={11}
                    fill="#374151"
                    fontWeight={600}
                  >
                    {s}
                  </text>
                );
              })}
              {/* Letter label above triangle */}
              {tri.label && (
                <text
                  x={xOffset + TRIANGLE_WIDTH / 2}
                  y={12}
                  textAnchor="middle"
                  fontSize={13}
                  fill="#374151"
                  fontWeight={700}
                >
                  {tri.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
