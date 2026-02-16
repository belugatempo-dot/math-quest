/**
 * World 5 Chapters 1-3: Solid Shore, Integer Isles, Expression Expanse
 * 39 levels, 117 problems
 */

// ── helpers ──────────────────────────────────────────────
function mc(value, display) {
  return { value, displayValue: display || value };
}
function num(value, display) {
  return { value: Number(value), displayValue: display || String(value) };
}
function txt(value, display) {
  return { value, displayValue: display || value };
}
function hint(tier, text, type) {
  const costs = { 1: 0, 2: 1, 3: 2 };
  return { tier, cost: costs[tier], text, type };
}
function problem(id, levelId, seq, opts) {
  return {
    id,
    levelId,
    sequence: seq,
    type: opts.type || 'numeric_input',
    category: opts.category || 'thinking',
    statement: opts.statement,
    inputType: opts.inputType || 'number_pad',
    correctAnswer: opts.answer,
    hints: opts.hints,
    solutionExplanation: opts.solution,
    teachingPoint: opts.teachingPoint,
    tags: opts.tags || [],
    difficulty: opts.difficulty || 2,
  };
}
function level(id, chapterId, number, name, type, diff, story, problems, extra) {
  return {
    id,
    chapterId,
    worldId: 'world-5',
    number,
    name,
    type,
    storyContext: story,
    problems,
    difficulty: diff,
    estimatedMinutes: type === 'boss' ? 10 : type === 'challenge' ? 7 : type === 'practice' ? 5 : 4,
    isChallenge: type === 'challenge' || type === 'boss',
    isBoss: type === 'boss',
    ...(extra || {}),
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHAPTER 1 — Solid Shore (3D Solids)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function createChapter1() {
  const ch = 1;
  const cid = `chapter-5-${ch}`;

  const levels = [
    // Level 1 — Welcome to the Archipelago (teaching, diff 1)
    level(`level-5-${ch}-1`, cid, 1, 'Welcome to the Archipelago', 'teaching', 1,
      'Prof. Owlbert welcomes you to the shores of Solid Shore. "Before we explore, we need to know our shapes! 3D solids are all around us."',
      [
        problem(`problem-5-${ch}-1-1`, `level-5-${ch}-1`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'Which of these is a 3D solid? A) Circle B) Sphere C) Square D) Triangle',
          answer: mc('B) Sphere', 'B — A sphere is a 3D solid; the others are flat 2D shapes'),
          hints: [
            hint(1, 'Think about which shape you could hold in your hand like a ball.', 'conceptual'),
            hint(2, '2D shapes are flat (circle, square, triangle). 3D shapes have depth.', 'directional'),
            hint(3, 'A sphere is a 3D ball shape. Circles, squares, and triangles are flat.', 'scaffolded'),
          ],
          solution: 'A sphere is a 3D solid — it has depth, unlike flat 2D shapes.',
          teachingPoint: '3D solids have length, width, and height. 2D shapes are flat — they only have length and width.',
          tags: ['3d-solids', 'identification'], difficulty: 1,
        }),
        problem(`problem-5-${ch}-1-2`, `level-5-${ch}-1`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'A cylinder looks like a soup can. How many flat surfaces does a cylinder have? A) 0 B) 1 C) 2 D) 3',
          answer: mc('C) 2', 'C — A cylinder has 2 flat circular faces (top and bottom) and 1 curved surface'),
          hints: [
            hint(1, 'Picture a soup can. How many flat parts can it stand on?', 'conceptual'),
            hint(2, 'A cylinder has a flat top and a flat bottom. The side is curved.', 'directional'),
            hint(3, 'The top circle and the bottom circle are both flat faces. That gives 2.', 'scaffolded'),
          ],
          solution: '2 flat faces (top and bottom circles)',
          teachingPoint: 'A cylinder has 2 flat circular faces and 1 curved surface that wraps around the side.',
          tags: ['3d-solids', 'cylinder', 'faces'], difficulty: 1,
        }),
        problem(`problem-5-${ch}-1-3`, `level-5-${ch}-1`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'Match the real-world object to its 3D shape: A basketball is most like a: A) Cube B) Cone C) Sphere D) Cylinder',
          answer: mc('C) Sphere', 'C — A basketball is shaped like a sphere'),
          hints: [
            hint(1, 'Think about the shape of a basketball — does it have any flat parts?', 'conceptual'),
            hint(2, 'A basketball is perfectly round in every direction.', 'directional'),
            hint(3, 'A perfectly round 3D shape with no flat faces is called a sphere.', 'scaffolded'),
          ],
          solution: 'A basketball is a sphere — perfectly round with no flat faces.',
          teachingPoint: 'Spheres are perfectly round 3D solids. Every point on the surface is the same distance from the center.',
          tags: ['3d-solids', 'sphere', 'real-world'], difficulty: 1,
        }),
      ]
    ),

    // Level 2 — Naming the Fleet (teaching, diff 2)
    level(`level-5-${ch}-2`, cid, 2, 'Naming the Fleet', 'teaching', 2,
      'Lizzie inspects the fleet of ships. "Each ship hull has a different cross-section. Prisms have rectangles, pyramids have triangles!"',
      [
        problem(`problem-5-${ch}-2-1`, `level-5-${ch}-2`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'A prism has two identical bases connected by rectangular faces. If the bases are triangles, what is the prism called? A) Triangular pyramid B) Triangular prism C) Rectangular prism D) Cone',
          answer: mc('B) Triangular prism', 'B — A prism named after its base shape: triangular bases = triangular prism'),
          hints: [
            hint(1, 'Prisms are named after the shape of their bases.', 'conceptual'),
            hint(2, 'Triangle bases mean it is a "triangular" something.', 'directional'),
            hint(3, 'Two triangular bases + rectangular sides = triangular prism.', 'scaffolded'),
          ],
          solution: 'Triangular prism — named after its triangular bases.',
          teachingPoint: 'Prisms are named by their base shape. A triangular prism has triangular bases; a rectangular prism has rectangular bases.',
          tags: ['3d-solids', 'prism', 'classification'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-2-2`, `level-5-${ch}-2`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'A pyramid has one base and triangular faces that meet at a point (apex). If the base is a square, what is the pyramid called? A) Triangular pyramid B) Rectangular pyramid C) Square pyramid D) Pentagonal pyramid',
          answer: mc('C) Square pyramid', 'C — A square base pyramid is called a square pyramid'),
          hints: [
            hint(1, 'Pyramids are also named by their base shape.', 'conceptual'),
            hint(2, 'The base is a square, so the name starts with "square."', 'directional'),
            hint(3, 'Square base + triangular sides meeting at an apex = square pyramid.', 'scaffolded'),
          ],
          solution: 'Square pyramid — named after its square base.',
          teachingPoint: 'Pyramids are named by their base shape. A square pyramid has a square base; a triangular pyramid (tetrahedron) has a triangular base.',
          tags: ['3d-solids', 'pyramid', 'classification'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-2-3`, `level-5-${ch}-2`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'How is a cylinder different from a prism? A) A cylinder has curved surfaces B) A cylinder has more faces C) A prism has curved surfaces D) They are the same shape',
          answer: mc('A) A cylinder has curved surfaces', 'A — A cylinder has a curved lateral surface, while prism faces are all flat'),
          hints: [
            hint(1, 'Run your hand along a soup can vs a cereal box. What feels different?', 'conceptual'),
            hint(2, 'One has flat sides (prism) and one has a rounded side.', 'directional'),
            hint(3, 'A cylinder has a curved surface connecting its circular bases. A prism has only flat faces.', 'scaffolded'),
          ],
          solution: 'A cylinder has a curved surface; prisms have only flat rectangular faces.',
          teachingPoint: 'Cylinders and prisms both have two identical bases, but cylinders have a curved surface while prisms have flat rectangular faces.',
          tags: ['3d-solids', 'cylinder', 'prism', 'comparison'], difficulty: 2,
        }),
      ]
    ),

    // Level 3 — Counting Faces (practice, diff 2)
    level(`level-5-${ch}-3`, cid, 3, 'Counting Faces', 'practice', 2,
      'Grogg tries counting the sides of a cube. "One... two... wait, did I count that one already?" Let\'s help him count carefully.',
      [
        problem(`problem-5-${ch}-3-1`, `level-5-${ch}-3`, 1, {
          statement: 'A cube has how many faces?',
          answer: num(6, '6 faces'),
          hints: [
            hint(1, 'Think of a die — how many numbers can it show?', 'conceptual'),
            hint(2, 'A cube has a top, bottom, front, back, left, and right face.', 'directional'),
            hint(3, 'Count: top + bottom + front + back + left + right = 6 faces.', 'scaffolded'),
          ],
          solution: '6 faces — top, bottom, front, back, left, right',
          teachingPoint: 'A cube has 6 square faces. Each face is identical in size and shape.',
          tags: ['3d-solids', 'cube', 'faces'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-3-2`, `level-5-${ch}-3`, 2, {
          statement: 'A triangular prism has how many faces? (Count both triangular bases and rectangular sides.)',
          answer: num(5, '5 faces'),
          hints: [
            hint(1, 'A triangular prism has triangular bases and rectangular sides.', 'conceptual'),
            hint(2, 'It has 2 triangular bases. How many rectangles connect them?', 'directional'),
            hint(3, 'A triangle has 3 sides, so 3 rectangles connect the bases. Total: 2 + 3 = 5.', 'scaffolded'),
          ],
          solution: '5 faces: 2 triangular bases + 3 rectangular sides',
          teachingPoint: 'A triangular prism has 5 faces: 2 triangular bases and 3 rectangular lateral faces.',
          tags: ['3d-solids', 'triangular-prism', 'faces'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-3-3`, `level-5-${ch}-3`, 3, {
          statement: 'A square pyramid has how many faces in total? (Count the base and all the triangular sides.)',
          answer: num(5, '5 faces'),
          hints: [
            hint(1, 'A square pyramid has a square base and triangular sides.', 'conceptual'),
            hint(2, 'The square base has 4 edges. Each edge has a triangle above it.', 'directional'),
            hint(3, '1 square base + 4 triangular faces = 5 faces total.', 'scaffolded'),
          ],
          solution: '5 faces: 1 square base + 4 triangular faces',
          teachingPoint: 'A pyramid with an n-sided base has n + 1 faces: 1 base + n triangular sides.',
          tags: ['3d-solids', 'square-pyramid', 'faces'], difficulty: 2,
        }),
      ]
    ),

    // Level 4 — Edges and Vertices (practice, diff 2)
    level(`level-5-${ch}-4`, cid, 4, 'Edges and Vertices', 'practice', 2,
      'Lizzie traces the edges of each solid with her finger. "An edge is where two faces meet. A vertex is a corner point."',
      [
        problem(`problem-5-${ch}-4-1`, `level-5-${ch}-4`, 1, {
          statement: 'A cube has how many edges? (An edge is a line segment where two faces meet.)',
          answer: num(12, '12 edges'),
          hints: [
            hint(1, 'Think about the top face — it has 4 edges. But edges are shared.', 'conceptual'),
            hint(2, 'A cube has 4 edges on top, 4 on bottom, and 4 vertical edges connecting them.', 'directional'),
            hint(3, 'Top edges: 4, bottom edges: 4, vertical edges: 4. Total = 12.', 'scaffolded'),
          ],
          solution: '12 edges: 4 on top + 4 on bottom + 4 vertical',
          teachingPoint: 'A cube has 12 edges. Edges are line segments where two faces meet.',
          tags: ['3d-solids', 'cube', 'edges'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-4-2`, `level-5-${ch}-4`, 2, {
          statement: 'A cube has how many vertices? (A vertex is a corner point where edges meet.)',
          answer: num(8, '8 vertices'),
          hints: [
            hint(1, 'Vertices are corner points. How many corners does a box have?', 'conceptual'),
            hint(2, 'The top face has 4 corners. The bottom face has 4 corners.', 'directional'),
            hint(3, '4 corners on top + 4 corners on bottom = 8 vertices.', 'scaffolded'),
          ],
          solution: '8 vertices: 4 on top + 4 on bottom',
          teachingPoint: 'A cube has 8 vertices. A vertex is a point where three or more edges meet.',
          tags: ['3d-solids', 'cube', 'vertices'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-4-3`, `level-5-${ch}-4`, 3, {
          statement: 'A triangular pyramid (tetrahedron) has 4 triangular faces. How many vertices does it have?',
          answer: num(4, '4 vertices'),
          hints: [
            hint(1, 'A triangular pyramid has a triangular base and an apex point above it.', 'conceptual'),
            hint(2, 'The base triangle has 3 corners. Plus the apex point on top.', 'directional'),
            hint(3, '3 base vertices + 1 apex vertex = 4 vertices total.', 'scaffolded'),
          ],
          solution: '4 vertices: 3 base corners + 1 apex',
          teachingPoint: 'A tetrahedron has 4 vertices, 6 edges, and 4 triangular faces. It is the simplest 3D solid with all flat faces.',
          tags: ['3d-solids', 'tetrahedron', 'vertices'], difficulty: 2,
        }),
      ]
    ),

    // Level 5 — Euler's Discovery (teaching, diff 3)
    level(`level-5-${ch}-5`, cid, 5, "Euler's Discovery", 'teaching', 3,
      'Prof. Owlbert pulls out an ancient scroll. "The great mathematician Euler found a pattern connecting vertices, edges, and faces of every solid!"',
      [
        problem(`problem-5-${ch}-5-1`, `level-5-${ch}-5`, 1, {
          category: 'pattern_discovery',
          statement: 'A cube has V=8 vertices, E=12 edges, F=6 faces. Calculate V - E + F.',
          answer: num(2, '8 - 12 + 6 = 2'),
          hints: [
            hint(1, 'Substitute the values: V=8, E=12, F=6 into V - E + F.', 'conceptual'),
            hint(2, 'Calculate step by step: first 8 - 12 = -4, then -4 + 6 = ?', 'directional'),
            hint(3, '8 - 12 + 6 = -4 + 6 = 2.', 'scaffolded'),
          ],
          solution: 'V - E + F = 8 - 12 + 6 = 2',
          teachingPoint: "Euler's formula states that for any convex polyhedron, V - E + F = 2. This works for every solid with flat faces!",
          tags: ['eulers-formula', 'pattern-discovery', '3d-solids'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-5-2`, `level-5-${ch}-5`, 2, {
          category: 'pattern_discovery',
          statement: 'A triangular prism has V=6, E=9, F=5. What is V - E + F?',
          answer: num(2, '6 - 9 + 5 = 2'),
          hints: [
            hint(1, 'Substitute V=6, E=9, F=5 into the formula V - E + F.', 'conceptual'),
            hint(2, '6 - 9 = -3. Then add 5.', 'directional'),
            hint(3, '6 - 9 + 5 = -3 + 5 = 2. The same result as the cube!', 'scaffolded'),
          ],
          solution: 'V - E + F = 6 - 9 + 5 = 2 — same as the cube!',
          teachingPoint: "This is Euler's formula: V - E + F always equals 2 for convex polyhedra. It works for cubes, prisms, pyramids, and more!",
          tags: ['eulers-formula', 'pattern-discovery', 'triangular-prism'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-5-3`, `level-5-${ch}-5`, 3, {
          category: 'pattern_discovery',
          statement: 'A square pyramid has V=5, E=8. Using Euler\'s formula V - E + F = 2, how many faces does a square pyramid have?',
          answer: num(5, 'F = 2 - V + E = 2 - 5 + 8 = 5'),
          hints: [
            hint(1, "Use Euler's formula: V - E + F = 2. You know V and E — solve for F.", 'conceptual'),
            hint(2, '5 - 8 + F = 2, so F = 2 - 5 + 8.', 'directional'),
            hint(3, 'F = 2 - 5 + 8 = 5. A square pyramid has 5 faces.', 'scaffolded'),
          ],
          solution: 'F = 2 - V + E = 2 - 5 + 8 = 5 faces',
          teachingPoint: "Euler's formula can predict any one of V, E, or F if you know the other two. It is a powerful tool for checking your work!",
          tags: ['eulers-formula', 'square-pyramid', 'algebra'], difficulty: 3,
        }),
      ]
    ),

    // Level 6 — Testing Euler's Formula (practice, diff 3)
    level(`level-5-${ch}-6`, cid, 6, "Testing Euler's Formula", 'practice', 3,
      'Grogg wants to test the formula on every shape he can find. "Let me check — does it REALLY always work?"',
      [
        problem(`problem-5-${ch}-6-1`, `level-5-${ch}-6`, 1, {
          statement: 'A pentagonal prism has 7 faces and 10 vertices. Using V - E + F = 2, how many edges does it have?',
          answer: num(15, 'E = V + F - 2 = 10 + 7 - 2 = 15'),
          hints: [
            hint(1, "Rearrange Euler's formula to solve for E: E = V + F - 2.", 'conceptual'),
            hint(2, 'Substitute: E = 10 + 7 - 2.', 'directional'),
            hint(3, 'E = 10 + 7 - 2 = 15 edges.', 'scaffolded'),
          ],
          solution: 'E = V + F - 2 = 10 + 7 - 2 = 15 edges',
          teachingPoint: "You can rearrange Euler's formula to find any missing value: E = V + F - 2.",
          tags: ['eulers-formula', 'pentagonal-prism'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-6-2`, `level-5-${ch}-6`, 2, {
          statement: 'A hexagonal pyramid has 7 vertices and 12 edges. How many faces does it have?',
          answer: num(7, 'F = 2 - V + E = 2 - 7 + 12 = 7'),
          hints: [
            hint(1, "Use Euler's formula: V - E + F = 2, and solve for F.", 'conceptual'),
            hint(2, '7 - 12 + F = 2, so F = 2 + 12 - 7.', 'directional'),
            hint(3, 'F = 2 - 7 + 12 = 7 faces (1 hexagonal base + 6 triangles).', 'scaffolded'),
          ],
          solution: 'F = 7 faces: 1 hexagonal base + 6 triangular sides',
          teachingPoint: "A hexagonal pyramid has 7 faces. Euler's formula confirms: 7 - 12 + 7 = 2. It checks out!",
          tags: ['eulers-formula', 'hexagonal-pyramid'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-6-3`, `level-5-${ch}-6`, 3, {
          statement: 'An octahedron has 6 vertices and 8 faces. How many edges does it have?',
          answer: num(12, 'E = V + F - 2 = 6 + 8 - 2 = 12'),
          hints: [
            hint(1, "Apply Euler's formula: E = V + F - 2.", 'conceptual'),
            hint(2, 'E = 6 + 8 - 2. Calculate step by step.', 'directional'),
            hint(3, 'E = 6 + 8 - 2 = 12 edges.', 'scaffolded'),
          ],
          solution: 'E = 12 edges for an octahedron',
          teachingPoint: "An octahedron (8 triangular faces) has 12 edges and 6 vertices. Euler's formula: 6 - 12 + 8 = 2.",
          tags: ['eulers-formula', 'octahedron'], difficulty: 3,
        }),
      ]
    ),

    // Level 7 — Slicing Solids (teaching, diff 2)
    level(`level-5-${ch}-7`, cid, 7, 'Slicing Solids', 'teaching', 2,
      'Lizzie picks up a clay cube and slices it with a wire. "Look — the shape where I cut is called a cross-section!"',
      [
        problem(`problem-5-${ch}-7-1`, `level-5-${ch}-7`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'If you slice a cube straight across parallel to one face, what shape is the cross-section? A) Triangle B) Square C) Circle D) Pentagon',
          answer: mc('B) Square', 'B — Slicing a cube parallel to a face creates a square cross-section'),
          hints: [
            hint(1, 'Imagine cutting a block of cheese straight across. What shape is the flat cut?', 'conceptual'),
            hint(2, 'If you cut parallel to one of the square faces, the cross-section matches that face.', 'directional'),
            hint(3, 'Cutting parallel to a square face of a cube gives a square cross-section.', 'scaffolded'),
          ],
          solution: 'A square cross-section — cutting parallel to a face gives that face shape.',
          teachingPoint: 'A cross-section is the shape you get when you slice through a 3D solid. Cutting parallel to a face gives a cross-section that matches the face.',
          tags: ['cross-sections', 'cube'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-7-2`, `level-5-${ch}-7`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'If you slice a cylinder horizontally (parallel to its circular base), what shape is the cross-section? A) Rectangle B) Oval C) Circle D) Triangle',
          answer: mc('C) Circle', 'C — Slicing a cylinder parallel to its base gives a circle'),
          hints: [
            hint(1, 'Think about cutting a can of soup sideways. What shape is the cut?', 'conceptual'),
            hint(2, 'The base of a cylinder is circular. A parallel cut matches the base shape.', 'directional'),
            hint(3, 'Cutting parallel to the circular base gives a circle cross-section.', 'scaffolded'),
          ],
          solution: 'A circle — parallel to the circular base.',
          teachingPoint: 'Slicing a cylinder parallel to its base always produces a circle. Slicing vertically through the center produces a rectangle.',
          tags: ['cross-sections', 'cylinder'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-7-3`, `level-5-${ch}-7`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'If you slice a cone horizontally (parallel to its base), what shape is the cross-section? A) Triangle B) Circle C) Square D) Oval',
          answer: mc('B) Circle', 'B — A horizontal slice of a cone gives a smaller circle'),
          hints: [
            hint(1, 'Think about what happens if you cut an ice cream cone sideways.', 'conceptual'),
            hint(2, 'The base of a cone is a circle. A parallel cut should be a similar shape.', 'directional'),
            hint(3, 'A horizontal slice of a cone gives a smaller circle than the base.', 'scaffolded'),
          ],
          solution: 'A circle — smaller than the base. Higher cuts give smaller circles.',
          teachingPoint: 'A horizontal cross-section of a cone is always a circle. The higher you cut, the smaller the circle.',
          tags: ['cross-sections', 'cone'], difficulty: 2,
        }),
      ]
    ),

    // Level 8 — Cross-Section Challenge (challenge, diff 3)
    level(`level-5-${ch}-8`, cid, 8, 'Cross-Section Challenge', 'challenge', 3,
      'Admiral Axiom appears. "Can you figure out the TRICKY cross-sections? Not all slices are straight across!"',
      [
        problem(`problem-5-${ch}-8-1`, `level-5-${ch}-8`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'If you slice a cube diagonally from one edge to the opposite edge, what shape could the cross-section be? A) Only a square B) Only a triangle C) A rectangle or triangle D) A hexagon',
          answer: mc('C) A rectangle or triangle', 'C — Diagonal slices of a cube can produce rectangles or triangles depending on angle'),
          hints: [
            hint(1, 'Imagine cutting from a top edge to the opposite bottom edge at an angle.', 'conceptual'),
            hint(2, 'A diagonal cut through a corner can create a triangle. Other angles create rectangles.', 'directional'),
            hint(3, 'Cutting corner to corner gives a triangle; cutting edge to opposite edge gives a rectangle.', 'scaffolded'),
          ],
          solution: 'Diagonal cuts can produce rectangles or triangles depending on the angle.',
          teachingPoint: 'A single solid can have many different cross-section shapes depending on the angle and position of the cut.',
          tags: ['cross-sections', 'cube', 'diagonal'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-8-2`, `level-5-${ch}-8`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'impossibility',
          statement: 'Which cross-section is IMPOSSIBLE to make by slicing a cube? A) Triangle B) Rectangle C) Pentagon D) Circle',
          answer: mc('D) Circle', 'D — You cannot create a circular cross-section from a cube (all cube faces are flat and straight)'),
          hints: [
            hint(1, 'Think about what shapes a straight cut through flat surfaces can make.', 'conceptual'),
            hint(2, 'Cubes have only flat, straight edges. Can a straight cut make a curved shape?', 'directional'),
            hint(3, 'A circle is curved, but all cube cross-sections have straight edges. Circles are impossible.', 'scaffolded'),
          ],
          solution: 'A circle — impossible because cube faces are flat, so cross-sections have straight edges.',
          teachingPoint: 'Cross-sections of polyhedra (flat-faced solids) always have straight edges. You can never get a circle from slicing a cube!',
          tags: ['cross-sections', 'cube', 'impossibility'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-8-3`, `level-5-${ch}-8`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'If you slice a cylinder vertically through its center (perpendicular to the base), what shape is the cross-section? A) Circle B) Rectangle C) Triangle D) Oval',
          answer: mc('B) Rectangle', 'B — A vertical slice through a cylinder gives a rectangle'),
          hints: [
            hint(1, 'Imagine cutting a soup can straight down through the middle.', 'conceptual'),
            hint(2, 'The height of the cylinder becomes one side, the diameter becomes the other.', 'directional'),
            hint(3, 'The cross-section is a rectangle with width = diameter and height = cylinder height.', 'scaffolded'),
          ],
          solution: 'A rectangle with width equal to the diameter and height equal to the cylinder height.',
          teachingPoint: 'Different orientations of the same cut produce different cross-sections. Horizontal cuts of a cylinder give circles; vertical cuts give rectangles.',
          tags: ['cross-sections', 'cylinder', 'vertical'], difficulty: 3,
        }),
      ]
    ),

    // Level 9 — Unfolding Shapes (teaching, diff 2)
    level(`level-5-${ch}-9`, cid, 9, 'Unfolding Shapes', 'teaching', 2,
      'Grogg finds a flattened cardboard box. "If I unfold a 3D shape flat, that pattern is called a NET!"',
      [
        problem(`problem-5-${ch}-9-1`, `level-5-${ch}-9`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'A cube has 6 square faces. When you unfold a cube into a net, how many squares will the net have? A) 4 B) 5 C) 6 D) 8',
          answer: mc('C) 6', 'C — A cube net has exactly 6 squares, one for each face'),
          hints: [
            hint(1, 'Each face of the cube becomes one shape in the net.', 'conceptual'),
            hint(2, 'A cube has 6 faces, so its net needs exactly 6 squares.', 'directional'),
            hint(3, 'A cube has 6 faces → the net has 6 squares arranged so they fold back into a cube.', 'scaffolded'),
          ],
          solution: '6 squares — one for each face of the cube.',
          teachingPoint: 'A net is a 2D pattern that folds into a 3D shape. The number of shapes in the net equals the number of faces.',
          tags: ['nets', 'cube'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-9-2`, `level-5-${ch}-9`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'A net is a cross-shaped arrangement of 6 squares. Can this fold into a cube? A) Yes B) No',
          answer: mc('A) Yes', 'A — The cross shape is one of 11 possible nets for a cube'),
          hints: [
            hint(1, 'Imagine folding each square up from the center square.', 'conceptual'),
            hint(2, 'The center is the bottom, the four arms fold up as sides, and one arm becomes the top.', 'directional'),
            hint(3, 'A cross of 6 squares folds into a cube. The center becomes one face, and 4 sides fold up plus 1 top.', 'scaffolded'),
          ],
          solution: 'Yes — the cross is a valid cube net.',
          teachingPoint: 'There are exactly 11 different nets that fold into a cube. The cross shape is the most recognizable one.',
          tags: ['nets', 'cube', 'cross-pattern'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-9-3`, `level-5-${ch}-9`, 3, {
          statement: 'A rectangular prism (box) has 6 rectangular faces. When you unfold it, how many rectangles are in its net?',
          answer: num(6, '6 rectangles'),
          hints: [
            hint(1, 'Just like a cube, each face becomes one shape in the net.', 'conceptual'),
            hint(2, 'A rectangular prism has 6 faces (3 pairs of matching rectangles).', 'directional'),
            hint(3, 'The net has 6 rectangles: top, bottom, front, back, left, right.', 'scaffolded'),
          ],
          solution: '6 rectangles — one for each face of the rectangular prism.',
          teachingPoint: 'A rectangular prism net has 6 rectangles: 3 pairs of identical rectangles (top/bottom, front/back, left/right).',
          tags: ['nets', 'rectangular-prism'], difficulty: 2,
        }),
      ]
    ),

    // Level 10 — Net Detective (practice, diff 3)
    level(`level-5-${ch}-10`, cid, 10, 'Net Detective', 'practice', 3,
      'Lizzie lays out flat patterns. "Which ones actually fold into 3D shapes? Some are tricky impostors!"',
      [
        problem(`problem-5-${ch}-10-1`, `level-5-${ch}-10`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'compare_without_calc',
          statement: 'A net has 6 squares arranged in a straight line (1×6 strip). Can this fold into a cube? A) Yes B) No',
          answer: mc('B) No', 'B — A straight line of 6 squares cannot fold into a cube because squares would overlap'),
          hints: [
            hint(1, 'Try to imagine folding a strip of 6 squares into a box shape.', 'conceptual'),
            hint(2, 'When you fold a straight strip, the 5th and 6th squares would overlap earlier ones.', 'directional'),
            hint(3, 'A 1×6 strip is NOT a valid cube net. Two squares would need to be on the same face.', 'scaffolded'),
          ],
          solution: 'No — a straight line of 6 squares overlaps when folded, so it is not a valid cube net.',
          teachingPoint: 'Not every arrangement of 6 squares is a valid cube net. The squares must be arranged so no two overlap when folded.',
          tags: ['nets', 'cube', 'compare-without-calc'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-10-2`, `level-5-${ch}-10`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'compare_without_calc',
          statement: 'A T-shape made of 6 squares (3 in a row on top, 3 going down from the middle) — can this fold into a cube? A) Yes B) No',
          answer: mc('A) Yes', 'A — The T-shape is one of the 11 valid cube nets'),
          hints: [
            hint(1, 'Imagine the bottom of the T as the base, then fold the arms up.', 'conceptual'),
            hint(2, 'The bottom 3 squares fold up as front, bottom, and back. The top 2 become sides, and 1 becomes top.', 'directional'),
            hint(3, 'The T-shape is a valid cube net — it is one of exactly 11 arrangements that work.', 'scaffolded'),
          ],
          solution: 'Yes — the T-shape is a valid cube net.',
          teachingPoint: 'Of the 35 possible arrangements of 6 connected squares, exactly 11 are valid cube nets. The T-shape is one of them.',
          tags: ['nets', 'cube', 'compare-without-calc'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-10-3`, `level-5-${ch}-10`, 3, {
          statement: 'There are exactly how many different nets that can fold into a cube?',
          answer: num(11, '11 distinct nets'),
          hints: [
            hint(1, 'This is a famous result in geometry. It is more than 5 but less than 20.', 'conceptual'),
            hint(2, 'Mathematicians have proven the exact number. It is a two-digit number starting with 1.', 'directional'),
            hint(3, 'There are exactly 11 distinct nets that fold into a cube.', 'scaffolded'),
          ],
          solution: '11 distinct cube nets — verified by systematic enumeration.',
          teachingPoint: 'There are exactly 11 different nets that fold into a cube. This was proven by systematically checking all possible arrangements of 6 connected squares.',
          tags: ['nets', 'cube', 'enumeration'], difficulty: 3,
        }),
      ]
    ),

    // Level 11 — Surface Area Foundations (teaching, diff 2)
    level(`level-5-${ch}-11`, cid, 11, 'Surface Area Foundations', 'teaching', 2,
      'Prof. Owlbert explains: "Surface area is the total area of all the faces. Imagine painting every outside surface of the shape!"',
      [
        problem(`problem-5-${ch}-11-1`, `level-5-${ch}-11`, 1, {
          statement: 'A cube has 6 faces, each a square with side length 3 cm. What is the area of ONE face in square cm?',
          answer: num(9, '3 × 3 = 9 sq cm'),
          hints: [
            hint(1, 'The area of a square is side × side.', 'conceptual'),
            hint(2, 'Each face is a 3 cm × 3 cm square.', 'directional'),
            hint(3, '3 × 3 = 9 square centimeters per face.', 'scaffolded'),
          ],
          solution: '9 sq cm — area of a 3 cm × 3 cm square face',
          teachingPoint: 'The area of a square is side × side (or side²). For a 3 cm square, the area is 3² = 9 sq cm.',
          tags: ['surface-area', 'cube', 'area'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-11-2`, `level-5-${ch}-11`, 2, {
          statement: 'A cube has 6 faces, each with area 9 sq cm. What is the total surface area of the cube in square cm?',
          answer: num(54, '6 × 9 = 54 sq cm'),
          hints: [
            hint(1, 'Surface area = sum of all face areas.', 'conceptual'),
            hint(2, 'All 6 faces are identical, so multiply one face area by 6.', 'directional'),
            hint(3, '6 faces × 9 sq cm = 54 sq cm total surface area.', 'scaffolded'),
          ],
          solution: 'SA = 6 × 9 = 54 sq cm',
          teachingPoint: 'For a cube with side length s, the surface area is 6s². Here: 6 × 3² = 6 × 9 = 54 sq cm.',
          tags: ['surface-area', 'cube'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-11-3`, `level-5-${ch}-11`, 3, {
          statement: 'A rectangular prism is 4 cm long, 3 cm wide, and 2 cm tall. What is its total surface area in square cm? (Hint: find the area of each pair of faces.)',
          answer: num(52, '2(4×3) + 2(4×2) + 2(3×2) = 24 + 16 + 12 = 52'),
          hints: [
            hint(1, 'A rectangular prism has 3 pairs of identical faces: top/bottom, front/back, left/right.', 'conceptual'),
            hint(2, 'Top/bottom: 4×3. Front/back: 4×2. Left/right: 3×2. Each pair has 2 faces.', 'directional'),
            hint(3, '2(4×3) + 2(4×2) + 2(3×2) = 2(12) + 2(8) + 2(6) = 24+16+12 = 52 sq cm.', 'scaffolded'),
          ],
          solution: 'SA = 2(lw + lh + wh) = 2(12 + 8 + 6) = 52 sq cm',
          teachingPoint: 'Surface area of a rectangular prism = 2(lw + lh + wh). Multiply each pair of dimensions and double them since each face appears twice.',
          tags: ['surface-area', 'rectangular-prism'], difficulty: 2,
        }),
      ]
    ),

    // Level 12 — Surface Area Workshop (challenge, diff 4)
    level(`level-5-${ch}-12`, cid, 12, 'Surface Area Workshop', 'challenge', 4,
      'Admiral Axiom challenges: "Can you handle surface area when the shapes get tricky?"',
      [
        problem(`problem-5-${ch}-12-1`, `level-5-${ch}-12`, 1, {
          category: 'thinking',
          statement: 'A cube has a surface area of 150 sq cm. What is the side length of the cube in cm?',
          answer: num(5, 'SA = 6s², so s² = 25, s = 5'),
          hints: [
            hint(1, 'Surface area of a cube = 6 × (side)². Work backwards from 150.', 'conceptual'),
            hint(2, 'If 6s² = 150, then s² = 150 ÷ 6 = 25.', 'directional'),
            hint(3, 's² = 25, so s = √25 = 5 cm.', 'scaffolded'),
          ],
          solution: '6s² = 150, s² = 25, s = 5 cm',
          teachingPoint: 'To find the side length from surface area: divide by 6, then take the square root. SA/6 = s², so s = √(SA/6).',
          tags: ['surface-area', 'cube', 'working-backwards'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-12-2`, `level-5-${ch}-12`, 2, {
          category: 'compare_without_calc',
          statement: 'Rectangular prism A is 5×5×2. Prism B is 4×4×4. Without fully calculating, which has the greater surface area? Enter A or B.',
          answer: txt('B', 'B has SA = 96; A has SA = 90. The cube has greater surface area.'),
          hints: [
            hint(1, 'Think about how "spread out" each shape is versus being compact like a cube.', 'conceptual'),
            hint(2, 'The cube (B) has SA = 6×16 = 96. For A: 2(25+10+10) = 2(45) = 90.', 'directional'),
            hint(3, 'A: 2(5×5 + 5×2 + 5×2) = 2(25+10+10) = 90. B: 6(4²) = 96. B is larger.', 'scaffolded'),
          ],
          solution: 'A has SA = 90, B has SA = 96. B has the greater surface area.',
          teachingPoint: 'A cube has the least surface area for a given volume among rectangular prisms, but it can still have more surface area than a flatter shape with less volume.',
          tags: ['surface-area', 'comparison'], difficulty: 4,
          type: 'text_input', inputType: 'text_field',
        }),
        problem(`problem-5-${ch}-12-3`, `level-5-${ch}-12`, 3, {
          statement: 'A rectangular prism is 6 cm × 4 cm × 3 cm. What is its total surface area in square cm?',
          answer: num(108, '2(24+18+12) = 2(54) = 108'),
          hints: [
            hint(1, 'Find the three different face areas, then sum and double.', 'conceptual'),
            hint(2, 'Faces: 6×4=24, 6×3=18, 4×3=12. Each appears twice.', 'directional'),
            hint(3, 'SA = 2(24+18+12) = 2(54) = 108 sq cm.', 'scaffolded'),
          ],
          solution: 'SA = 2(6×4 + 6×3 + 4×3) = 2(24+18+12) = 108 sq cm',
          teachingPoint: 'Surface area of a rectangular prism: add the three different face areas and multiply by 2. SA = 2(lw + lh + wh).',
          tags: ['surface-area', 'rectangular-prism'], difficulty: 4,
        }),
      ]
    ),

    // Level 13 — Guardian of Solid Shore (boss, diff 5)
    level(`level-5-${ch}-13`, cid, 13, 'Guardian of Solid Shore', 'boss', 5,
      'The Guardian of Solid Shore rises from the rocks! "Prove your mastery of 3D solids — Euler\'s formula, cross-sections, and surface area!"',
      [
        problem(`problem-5-${ch}-13-1`, `level-5-${ch}-13`, 1, {
          category: 'thinking',
          statement: 'A solid has 20 triangular faces and 12 vertices. Using Euler\'s formula V - E + F = 2, how many edges does it have?',
          answer: num(30, 'E = V + F - 2 = 12 + 20 - 2 = 30'),
          hints: [
            hint(1, "Apply Euler's formula: V - E + F = 2. You know V and F.", 'conceptual'),
            hint(2, 'E = V + F - 2 = 12 + 20 - 2.', 'directional'),
            hint(3, 'E = 12 + 20 - 2 = 30 edges. (This is an icosahedron!)', 'scaffolded'),
          ],
          solution: 'E = V + F - 2 = 30 edges (an icosahedron)',
          teachingPoint: "This is an icosahedron — one of the five Platonic solids. Euler's formula works for all convex polyhedra.",
          tags: ['eulers-formula', 'icosahedron', 'boss'], difficulty: 5,
        }),
        problem(`problem-5-${ch}-13-2`, `level-5-${ch}-13`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'You slice a cube at an angle through 6 edges (one on each face). What shape is the cross-section? A) Triangle B) Square C) Hexagon D) Circle',
          answer: mc('C) Hexagon', 'C — Slicing through all 6 faces at an angle creates a hexagonal cross-section'),
          hints: [
            hint(1, 'If the slice passes through all 6 faces, the cross-section has 6 sides.', 'conceptual'),
            hint(2, 'Each face contributes one edge to the cross-section. 6 faces = 6 edges.', 'directional'),
            hint(3, 'A slice through all 6 faces of a cube creates a regular hexagon at the right angle.', 'scaffolded'),
          ],
          solution: 'A hexagon — 6 faces means 6 edges in the cross-section.',
          teachingPoint: 'A cross-section of a cube that passes through all 6 faces creates a hexagon. At the right angle, it is a regular hexagon!',
          tags: ['cross-sections', 'cube', 'hexagon', 'boss'], difficulty: 5,
        }),
        problem(`problem-5-${ch}-13-3`, `level-5-${ch}-13`, 3, {
          category: 'thinking',
          statement: 'A cube has a surface area of 216 sq cm. What is the volume of the cube in cubic cm? (Volume = side × side × side)',
          answer: num(216, 'Side = 6, Volume = 6³ = 216'),
          hints: [
            hint(1, 'First find the side length from the surface area, then compute volume.', 'conceptual'),
            hint(2, '6s² = 216, so s² = 36, s = 6. Now find s³.', 'directional'),
            hint(3, 's = 6 cm. Volume = 6 × 6 × 6 = 216 cubic cm.', 'scaffolded'),
          ],
          solution: 'SA = 216, s² = 36, s = 6. Volume = 6³ = 216 cm³',
          teachingPoint: 'To go from surface area to volume: find s from SA = 6s², then compute V = s³. Here the surface area and volume happen to be the same number!',
          tags: ['surface-area', 'volume', 'cube', 'boss'], difficulty: 5,
        }),
      ]
    ),
  ];

  return {
    id: cid,
    worldId: 'world-5',
    number: ch,
    name: 'Solid Shore',
    topic: '3d-solids',
    weekStart: 1,
    weekEnd: 3,
    levels,
    learningObjectives: [
      'Identify 3D solids: prisms, pyramids, cylinders, cones, spheres',
      'Count faces, edges, and vertices of polyhedra',
      "Apply Euler's formula V - E + F = 2",
      'Determine cross-sections of 3D solids',
      'Identify and analyze nets of cubes and prisms',
      'Calculate surface area of cubes and rectangular prisms',
    ],
    signatureContent: [
      "Euler's formula",
      'cross-section reasoning',
      'net identification',
      'surface area calculation',
    ],
    isBoss: true,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHAPTER 2 — Integer Isles (Integers)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function createChapter2() {
  const ch = 2;
  const cid = `chapter-5-${ch}`;

  const levels = [
    // Level 1 — Below Zero (teaching, diff 1)
    level(`level-5-${ch}-1`, cid, 1, 'Below Zero', 'teaching', 1,
      'Grogg shivers on Integer Isles. "Brrr! The temperature is -5°C! What does a negative number even mean?"',
      [
        problem(`problem-5-${ch}-1-1`, `level-5-${ch}-1`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'The temperature is -5°C. Is this above or below freezing (0°C)? A) Above freezing B) Below freezing C) At freezing',
          answer: mc('B) Below freezing', 'B — Negative numbers are below zero'),
          hints: [
            hint(1, 'What does the minus sign in front of 5 tell you?', 'conceptual'),
            hint(2, 'Negative numbers are less than zero. Freezing is 0°C.', 'directional'),
            hint(3, '-5°C is 5 degrees below zero, so it is below freezing.', 'scaffolded'),
          ],
          solution: 'Below freezing — negative numbers are less than zero.',
          teachingPoint: 'Negative numbers represent values less than zero. They are used for temperatures below freezing, depths below sea level, and debts.',
          tags: ['integers', 'negative-numbers', 'temperature'], difficulty: 1,
        }),
        problem(`problem-5-${ch}-1-2`, `level-5-${ch}-1`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'A submarine is at -200 meters (200 meters below sea level). A bird is at +50 meters. Who is higher? A) The submarine B) The bird C) They are at the same height',
          answer: mc('B) The bird', 'B — +50 meters is higher than -200 meters'),
          hints: [
            hint(1, 'Positive means above sea level. Negative means below sea level.', 'conceptual'),
            hint(2, '+50 is above the surface. -200 is deep underwater.', 'directional'),
            hint(3, 'The bird at +50m is 250 meters above the submarine at -200m.', 'scaffolded'),
          ],
          solution: 'The bird at +50m is higher than the submarine at -200m.',
          teachingPoint: 'Positive numbers represent positions above a reference point (like sea level). Negative numbers represent positions below it.',
          tags: ['integers', 'negative-numbers', 'elevation'], difficulty: 1,
        }),
        problem(`problem-5-${ch}-1-3`, `level-5-${ch}-1`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'Which of these represents a $15 debt? A) +15 B) -15 C) 0 D) 15',
          answer: mc('B) -15', 'B — Debts are represented by negative numbers'),
          hints: [
            hint(1, 'A debt means you owe money — it is money you do not have.', 'conceptual'),
            hint(2, 'Debts are like being "below zero" in your bank account.', 'directional'),
            hint(3, 'A $15 debt is represented as -15 because it is 15 below zero.', 'scaffolded'),
          ],
          solution: '-15 represents a $15 debt.',
          teachingPoint: 'In real life, negative numbers represent debts, losses, or decreases. A balance of -15 means you owe $15.',
          tags: ['integers', 'negative-numbers', 'money'], difficulty: 1,
        }),
      ]
    ),

    // Level 2 — The Number Line Dock (teaching, diff 2)
    level(`level-5-${ch}-2`, cid, 2, 'The Number Line Dock', 'teaching', 2,
      'Lizzie draws a number line on the dock. "Zero is in the middle. Positive numbers go right, negative numbers go left."',
      [
        problem(`problem-5-${ch}-2-1`, `level-5-${ch}-2`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'On a number line, which direction do negative numbers go? A) Right B) Left C) Up D) Down',
          answer: mc('B) Left', 'B — Negative numbers go to the left of zero on a number line'),
          hints: [
            hint(1, 'Think about where zero is and which side has smaller numbers.', 'conceptual'),
            hint(2, 'Numbers decrease as you move left. Negative numbers are less than zero.', 'directional'),
            hint(3, 'On a horizontal number line, negatives are to the LEFT of zero.', 'scaffolded'),
          ],
          solution: 'Left — negative numbers are to the left of zero.',
          teachingPoint: 'On a horizontal number line, numbers increase to the right and decrease to the left. Negative numbers are always to the left of zero.',
          tags: ['integers', 'number-line'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-2-2`, `level-5-${ch}-2`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'Place these numbers in order from least to greatest: 3, -7, 0, -2, 5. Which comes first (is least)? A) 3 B) -7 C) 0 D) -2',
          answer: mc('B) -7', 'B — On a number line, -7 is farthest to the left, so it is the least'),
          hints: [
            hint(1, 'The least number is farthest to the left on the number line.', 'conceptual'),
            hint(2, 'Compare the negative numbers: -7 is farther from zero than -2.', 'directional'),
            hint(3, 'Order: -7, -2, 0, 3, 5. The least is -7.', 'scaffolded'),
          ],
          solution: '-7 is the least. Full order: -7, -2, 0, 3, 5.',
          teachingPoint: 'When ordering integers, more negative means smaller. -7 < -2 < 0 < 3 < 5.',
          tags: ['integers', 'ordering', 'number-line'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-2-3`, `level-5-${ch}-2`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'Which number is farther from zero on the number line: -8 or 6? A) -8 B) 6 C) They are the same distance',
          answer: mc('A) -8', 'A — The distance from zero to -8 is 8 units, while 6 is only 6 units from zero'),
          hints: [
            hint(1, 'Distance from zero ignores the sign — just look at how far each is from 0.', 'conceptual'),
            hint(2, '-8 is 8 units from zero. 6 is 6 units from zero.', 'directional'),
            hint(3, '8 > 6, so -8 is farther from zero than 6 is.', 'scaffolded'),
          ],
          solution: '-8 is 8 units from zero; 6 is 6 units from zero. -8 is farther.',
          teachingPoint: 'Distance from zero is called absolute value. |-8| = 8 and |6| = 6. Since 8 > 6, -8 is farther from zero.',
          tags: ['integers', 'distance', 'number-line'], difficulty: 2,
        }),
      ]
    ),

    // Level 3 — Distance from Zero (teaching, diff 2)
    level(`level-5-${ch}-3`, cid, 3, 'Distance from Zero', 'teaching', 2,
      'Prof. Owlbert introduces a new symbol. "The absolute value bars |x| mean the distance from zero. Distance is always positive!"',
      [
        problem(`problem-5-${ch}-3-1`, `level-5-${ch}-3`, 1, {
          statement: 'What is the absolute value of -9? (Write just the number.)',
          answer: num(9, '|-9| = 9'),
          hints: [
            hint(1, 'Absolute value is the distance from zero — it drops the negative sign.', 'conceptual'),
            hint(2, '-9 is 9 units away from zero on the number line.', 'directional'),
            hint(3, '|-9| = 9. The distance from zero to -9 is 9 units.', 'scaffolded'),
          ],
          solution: '|-9| = 9',
          teachingPoint: 'Absolute value |x| is the distance from x to zero. It is always non-negative. |-9| = 9 and |9| = 9.',
          tags: ['integers', 'absolute-value'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-3-2`, `level-5-${ch}-3`, 2, {
          statement: 'What is |7| + |-3|?',
          answer: num(10, '7 + 3 = 10'),
          hints: [
            hint(1, 'Find each absolute value first, then add.', 'conceptual'),
            hint(2, '|7| = 7 and |-3| = 3. Now add them.', 'directional'),
            hint(3, '7 + 3 = 10.', 'scaffolded'),
          ],
          solution: '|7| + |-3| = 7 + 3 = 10',
          teachingPoint: 'Compute each absolute value separately, then perform the operation. |7| = 7, |-3| = 3, so the sum is 10.',
          tags: ['integers', 'absolute-value', 'addition'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-3-3`, `level-5-${ch}-3`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'True or false: |-5| = |5|. A) True B) False',
          answer: mc('A) True', 'A — Both are 5 units from zero, so both absolute values are 5'),
          hints: [
            hint(1, 'Absolute value measures distance from zero, regardless of direction.', 'conceptual'),
            hint(2, '-5 is 5 units left of zero; 5 is 5 units right. Same distance.', 'directional'),
            hint(3, '|-5| = 5 and |5| = 5. They are equal.', 'scaffolded'),
          ],
          solution: 'True — both are 5 units from zero.',
          teachingPoint: 'A number and its opposite always have the same absolute value. |-a| = |a| for any number a.',
          tags: ['integers', 'absolute-value', 'opposites'], difficulty: 2,
        }),
      ]
    ),

    // Level 4 — Comparing Integers (practice, diff 2)
    level(`level-5-${ch}-4`, cid, 4, 'Comparing Integers', 'practice', 2,
      'Grogg lines up integers on the dock. "Is -3 greater than -7? This is confusing!" Let\'s compare carefully.',
      [
        problem(`problem-5-${ch}-4-1`, `level-5-${ch}-4`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'compare_without_calc',
          statement: 'Which is greater: -3 or -7? A) -3 B) -7 C) They are equal',
          answer: mc('A) -3', 'A — On a number line, -3 is to the right of -7, so -3 > -7'),
          hints: [
            hint(1, 'Think about temperature: -3°C or -7°C — which is warmer?', 'conceptual'),
            hint(2, '-3 is closer to zero than -7. Closer to zero means greater.', 'directional'),
            hint(3, '-3 > -7 because -3 is to the right of -7 on the number line.', 'scaffolded'),
          ],
          solution: '-3 > -7. Farther left on the number line means smaller.',
          teachingPoint: 'For negative numbers, the one closer to zero is greater. -3 > -7 because -3 is only 3 units from zero while -7 is 7 units away.',
          tags: ['integers', 'comparing', 'compare-without-calc'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-4-2`, `level-5-${ch}-4`, 2, {
          type: 'text_input', inputType: 'text_field', category: 'compare_without_calc',
          statement: 'Put the correct symbol (<, >, or =) between these numbers: -4 ___ 2',
          answer: txt('<', '-4 < 2 — any negative is less than any positive'),
          hints: [
            hint(1, 'Is a negative number ever greater than a positive number?', 'conceptual'),
            hint(2, 'All negative numbers are to the left of all positive numbers on the number line.', 'directional'),
            hint(3, '-4 < 2. Every negative number is less than every positive number.', 'scaffolded'),
          ],
          solution: '-4 < 2',
          teachingPoint: 'Every negative number is less than every positive number. The number line shows: all negatives are left of zero, all positives are right.',
          tags: ['integers', 'comparing', 'compare-without-calc'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-4-3`, `level-5-${ch}-4`, 3, {
          type: 'text_input', inputType: 'text_field', category: 'thinking',
          statement: 'Order these integers from least to greatest, separated by commas: 4, -1, -6, 0, 2',
          answer: txt('-6, -1, 0, 2, 4', 'Ordered: -6, -1, 0, 2, 4'),
          hints: [
            hint(1, 'Start with the most negative number and work towards the most positive.', 'conceptual'),
            hint(2, 'The negatives come first: -6, then -1, then 0, then the positives.', 'directional'),
            hint(3, 'Least to greatest: -6, -1, 0, 2, 4.', 'scaffolded'),
          ],
          solution: '-6, -1, 0, 2, 4',
          teachingPoint: 'To order integers: start with the most negative (farthest left on the number line) and go right to the most positive.',
          tags: ['integers', 'ordering'], difficulty: 2,
        }),
      ]
    ),

    // Level 5 — Adding Same Signs (teaching, diff 2)
    level(`level-5-${ch}-5`, cid, 5, 'Adding Same Signs', 'teaching', 2,
      'Prof. Owlbert explains: "When you add two positive numbers OR two negative numbers, just add and keep the sign!"',
      [
        problem(`problem-5-${ch}-5-1`, `level-5-${ch}-5`, 1, {
          statement: 'What is (-3) + (-5)?',
          answer: num(-8, '(-3) + (-5) = -8'),
          hints: [
            hint(1, 'Both numbers are negative, so the sum is also negative.', 'conceptual'),
            hint(2, 'Add the absolute values: 3 + 5 = 8. Then make it negative.', 'directional'),
            hint(3, '(-3) + (-5) = -(3+5) = -8.', 'scaffolded'),
          ],
          solution: '(-3) + (-5) = -8',
          teachingPoint: 'When adding two negatives, add their absolute values and keep the negative sign. (-3) + (-5) = -(3+5) = -8.',
          tags: ['integers', 'addition', 'same-signs'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-5-2`, `level-5-${ch}-5`, 2, {
          statement: 'What is (-7) + (-4)?',
          answer: num(-11, '(-7) + (-4) = -11'),
          hints: [
            hint(1, 'Same sign addition: add the values, keep the sign.', 'conceptual'),
            hint(2, '7 + 4 = 11. Both are negative, so the answer is negative.', 'directional'),
            hint(3, '(-7) + (-4) = -(7+4) = -11.', 'scaffolded'),
          ],
          solution: '(-7) + (-4) = -11',
          teachingPoint: 'Same sign rule: add the absolute values and keep the common sign. Two negatives added give a more negative result.',
          tags: ['integers', 'addition', 'same-signs'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-5-3`, `level-5-${ch}-5`, 3, {
          statement: 'What is (-12) + (-8)?',
          answer: num(-20, '(-12) + (-8) = -20'),
          hints: [
            hint(1, 'Two negative numbers added together — the result is negative.', 'conceptual'),
            hint(2, '12 + 8 = 20. Keep the negative sign.', 'directional'),
            hint(3, '(-12) + (-8) = -(12+8) = -20.', 'scaffolded'),
          ],
          solution: '(-12) + (-8) = -20',
          teachingPoint: 'Adding two negatives always gives a more negative number. Think of it as going further left on the number line.',
          tags: ['integers', 'addition', 'same-signs'], difficulty: 2,
        }),
      ]
    ),

    // Level 6 — Adding Different Signs (teaching, diff 3)
    level(`level-5-${ch}-6`, cid, 6, 'Adding Different Signs', 'teaching', 3,
      'Lizzie explains: "When one number is positive and one is negative, subtract and keep the sign of the bigger absolute value."',
      [
        problem(`problem-5-${ch}-6-1`, `level-5-${ch}-6`, 1, {
          statement: 'What is 8 + (-3)?',
          answer: num(5, '8 + (-3) = 5'),
          hints: [
            hint(1, 'Positive and negative: subtract the smaller from the larger absolute value.', 'conceptual'),
            hint(2, '|8| = 8 > |-3| = 3. Subtract: 8 - 3 = 5. The larger is positive, so the answer is positive.', 'directional'),
            hint(3, '8 + (-3) = 8 - 3 = 5.', 'scaffolded'),
          ],
          solution: '8 + (-3) = 5',
          teachingPoint: 'Different signs: subtract the smaller absolute value from the larger one. The result takes the sign of the number with the larger absolute value.',
          tags: ['integers', 'addition', 'different-signs'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-6-2`, `level-5-${ch}-6`, 2, {
          statement: 'What is (-10) + 4?',
          answer: num(-6, '(-10) + 4 = -6'),
          hints: [
            hint(1, 'Different signs: subtract the absolute values and keep the sign of the bigger one.', 'conceptual'),
            hint(2, '|-10| = 10 > |4| = 4. Subtract: 10 - 4 = 6. The bigger is negative.', 'directional'),
            hint(3, '(-10) + 4 = -(10-4) = -6.', 'scaffolded'),
          ],
          solution: '(-10) + 4 = -6',
          teachingPoint: 'Since |-10| > |4|, the answer takes the negative sign. 10 - 4 = 6, so the result is -6.',
          tags: ['integers', 'addition', 'different-signs'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-6-3`, `level-5-${ch}-6`, 3, {
          statement: 'What is (-6) + 6?',
          answer: num(0, '(-6) + 6 = 0'),
          hints: [
            hint(1, 'What happens when you add a number and its opposite?', 'conceptual'),
            hint(2, '|-6| = |6| = 6. Same absolute value, different signs.', 'directional'),
            hint(3, '(-6) + 6 = 0. A number plus its opposite always equals zero.', 'scaffolded'),
          ],
          solution: '(-6) + 6 = 0 — opposites sum to zero.',
          teachingPoint: 'A number and its opposite are called additive inverses. They always sum to zero: a + (-a) = 0.',
          tags: ['integers', 'addition', 'additive-inverse'], difficulty: 3,
        }),
      ]
    ),

    // Level 7 — Integer Addition Practice (practice, diff 3)
    level(`level-5-${ch}-7`, cid, 7, 'Integer Addition Practice', 'practice', 3,
      'Grogg practices adding integers on the dock. "I\'m getting the hang of this — positive plus negative, negative plus negative!"',
      [
        problem(`problem-5-${ch}-7-1`, `level-5-${ch}-7`, 1, {
          statement: 'What is (-15) + 9?',
          answer: num(-6, '(-15) + 9 = -6'),
          hints: [
            hint(1, 'Different signs: subtract the smaller absolute value from the larger.', 'conceptual'),
            hint(2, '15 - 9 = 6. Since |-15| > |9|, the result is negative.', 'directional'),
            hint(3, '(-15) + 9 = -(15-9) = -6.', 'scaffolded'),
          ],
          solution: '(-15) + 9 = -6',
          teachingPoint: 'When adding integers with different signs, subtract the absolute values and use the sign of the number with the greater absolute value.',
          tags: ['integers', 'addition', 'practice'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-7-2`, `level-5-${ch}-7`, 2, {
          statement: 'What is 7 + (-11)?',
          answer: num(-4, '7 + (-11) = -4'),
          hints: [
            hint(1, 'Different signs: which has the larger absolute value?', 'conceptual'),
            hint(2, '|-11| = 11 > |7| = 7. Subtract: 11 - 7 = 4. The negative is larger.', 'directional'),
            hint(3, '7 + (-11) = -(11-7) = -4.', 'scaffolded'),
          ],
          solution: '7 + (-11) = -4',
          teachingPoint: 'The negative number has the larger absolute value (11 > 7), so the result is negative: -(11-7) = -4.',
          tags: ['integers', 'addition', 'practice'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-7-3`, `level-5-${ch}-7`, 3, {
          category: 'strategic_practice',
          statement: 'A diver is at -30 meters. She rises 12 meters. What is her new depth in meters?',
          answer: num(-18, '-30 + 12 = -18'),
          hints: [
            hint(1, 'Rising means adding a positive number to her depth.', 'conceptual'),
            hint(2, '-30 + 12: different signs, subtract: 30 - 12 = 18. Negative is larger.', 'directional'),
            hint(3, '-30 + 12 = -18 meters (still below the surface).', 'scaffolded'),
          ],
          solution: '-30 + 12 = -18 meters',
          teachingPoint: 'Word problems with integers: "rises" means add positive, "descends" means add negative. -30 + 12 = -18 meters.',
          tags: ['integers', 'addition', 'word-problem'], difficulty: 3,
        }),
      ]
    ),

    // Level 8 — Subtraction Secret (teaching, diff 3)
    level(`level-5-${ch}-8`, cid, 8, 'Subtraction Secret', 'teaching', 3,
      'Prof. Owlbert reveals: "Here is the big secret of integer subtraction: subtracting is the SAME as adding the opposite!"',
      [
        problem(`problem-5-${ch}-8-1`, `level-5-${ch}-8`, 1, {
          statement: 'What is 5 - 8? (Rewrite as 5 + (-8) first.)',
          answer: num(-3, '5 - 8 = 5 + (-8) = -3'),
          hints: [
            hint(1, 'Subtracting 8 is the same as adding -8.', 'conceptual'),
            hint(2, '5 + (-8): different signs, |8| > |5|. 8 - 5 = 3, result is negative.', 'directional'),
            hint(3, '5 - 8 = 5 + (-8) = -3.', 'scaffolded'),
          ],
          solution: '5 - 8 = 5 + (-8) = -3',
          teachingPoint: 'Subtracting a number is the same as adding its opposite: a - b = a + (-b). This rule makes all subtraction into addition!',
          tags: ['integers', 'subtraction', 'rule'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-8-2`, `level-5-${ch}-8`, 2, {
          statement: 'What is (-3) - 7?',
          answer: num(-10, '(-3) - 7 = (-3) + (-7) = -10'),
          hints: [
            hint(1, 'Rewrite subtraction as addition: (-3) - 7 = (-3) + (-7).', 'conceptual'),
            hint(2, 'Now it is two negatives: 3 + 7 = 10, result is negative.', 'directional'),
            hint(3, '(-3) + (-7) = -(3+7) = -10.', 'scaffolded'),
          ],
          solution: '(-3) - 7 = (-3) + (-7) = -10',
          teachingPoint: 'Convert to addition: (-3) - 7 = (-3) + (-7). Now apply same-sign addition: -(3+7) = -10.',
          tags: ['integers', 'subtraction'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-8-3`, `level-5-${ch}-8`, 3, {
          statement: 'What is (-4) - (-9)?',
          answer: num(5, '(-4) - (-9) = (-4) + 9 = 5'),
          hints: [
            hint(1, 'Subtracting a negative is the same as adding a positive!', 'conceptual'),
            hint(2, '(-4) - (-9) = (-4) + 9. Different signs: 9 - 4 = 5, positive.', 'directional'),
            hint(3, '(-4) + 9 = 5.', 'scaffolded'),
          ],
          solution: '(-4) - (-9) = (-4) + 9 = 5',
          teachingPoint: 'Subtracting a negative = adding a positive: a - (-b) = a + b. Two negatives make a positive!',
          tags: ['integers', 'subtraction', 'double-negative'], difficulty: 3,
        }),
      ]
    ),

    // Level 9 — Integer Subtraction Workshop (practice, diff 3)
    level(`level-5-${ch}-9`, cid, 9, 'Integer Subtraction Workshop', 'practice', 3,
      'Lizzie sets up a workshop. "Practice makes perfect. Remember: always rewrite subtraction as adding the opposite!"',
      [
        problem(`problem-5-${ch}-9-1`, `level-5-${ch}-9`, 1, {
          statement: 'What is 3 - (-5)?',
          answer: num(8, '3 - (-5) = 3 + 5 = 8'),
          hints: [
            hint(1, 'Subtracting a negative means adding a positive.', 'conceptual'),
            hint(2, '3 - (-5) = 3 + 5.', 'directional'),
            hint(3, '3 + 5 = 8.', 'scaffolded'),
          ],
          solution: '3 - (-5) = 3 + 5 = 8',
          teachingPoint: 'Remember: subtracting a negative is the same as adding. 3 - (-5) = 3 + 5 = 8.',
          tags: ['integers', 'subtraction', 'practice'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-9-2`, `level-5-${ch}-9`, 2, {
          statement: 'What is (-8) - (-3)?',
          answer: num(-5, '(-8) - (-3) = (-8) + 3 = -5'),
          hints: [
            hint(1, 'Rewrite: (-8) - (-3) = (-8) + 3.', 'conceptual'),
            hint(2, 'Different signs: 8 - 3 = 5. The negative has larger absolute value.', 'directional'),
            hint(3, '(-8) + 3 = -(8-3) = -5.', 'scaffolded'),
          ],
          solution: '(-8) - (-3) = (-8) + 3 = -5',
          teachingPoint: 'Step 1: Rewrite as addition of opposite. Step 2: Apply integer addition rules.',
          tags: ['integers', 'subtraction', 'practice'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-9-3`, `level-5-${ch}-9`, 3, {
          category: 'strategic_practice',
          statement: 'The temperature was -6°C in the morning and dropped 8 more degrees by night. What is the nighttime temperature?',
          answer: num(-14, '-6 - 8 = -6 + (-8) = -14'),
          hints: [
            hint(1, '"Dropped 8 degrees" means subtract 8 from the morning temperature.', 'conceptual'),
            hint(2, '-6 - 8 = -6 + (-8). Two negatives: add and keep negative.', 'directional'),
            hint(3, '-6 + (-8) = -(6+8) = -14°C.', 'scaffolded'),
          ],
          solution: '-6 - 8 = -14°C',
          teachingPoint: '"Dropping" temperature means subtracting. -6 - 8 = -6 + (-8) = -14°C. The temperature got even colder.',
          tags: ['integers', 'subtraction', 'word-problem', 'temperature'], difficulty: 3,
        }),
      ]
    ),

    // Level 10 — Grogg's Integer Errors (challenge, diff 3)
    level(`level-5-${ch}-10`, cid, 10, "Grogg's Integer Errors", 'challenge', 3,
      'Grogg shows his work. "I think I got these right!" Can you spot his mistakes?',
      [
        problem(`problem-5-${ch}-10-1`, `level-5-${ch}-10`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'find_the_error',
          statement: 'Grogg says: "(-5) + (-3) = 2 because the negatives cancel out." What is the correct answer? A) 2 B) -2 C) 8 D) -8',
          answer: mc('D) -8', 'D — Two negatives add to a more negative result: (-5)+(-3) = -8'),
          hints: [
            hint(1, 'Do negatives "cancel out" when you add two negative numbers?', 'conceptual'),
            hint(2, 'Adding two negatives makes a MORE negative number, not positive.', 'directional'),
            hint(3, '(-5) + (-3) = -(5+3) = -8. Grogg confused addition with subtraction rules.', 'scaffolded'),
          ],
          solution: '(-5) + (-3) = -8. Negatives only "cancel" when you add a positive and negative.',
          teachingPoint: 'Common error: Two negatives do NOT cancel when adding. They cancel when multiplying. (-5)+(-3) = -8, not +2.',
          tags: ['integers', 'find-the-error', 'addition'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-10-2`, `level-5-${ch}-10`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'find_the_error',
          statement: 'Grogg says: "7 - (-2) = 5 because 7 minus 2 is 5." What is the correct answer? A) 5 B) 9 C) -5 D) -9',
          answer: mc('B) 9', 'B — Subtracting a negative means adding: 7-(-2) = 7+2 = 9'),
          hints: [
            hint(1, 'What does subtracting a negative really mean?', 'conceptual'),
            hint(2, 'Subtracting -2 is the same as adding +2.', 'directional'),
            hint(3, '7 - (-2) = 7 + 2 = 9. Grogg forgot to change the sign.', 'scaffolded'),
          ],
          solution: '7 - (-2) = 7 + 2 = 9. Grogg treated - (-2) as just -2.',
          teachingPoint: 'Subtracting a negative = adding a positive. 7 - (-2) = 7 + 2 = 9. The two minus signs combine to make a plus.',
          tags: ['integers', 'find-the-error', 'subtraction'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-10-3`, `level-5-${ch}-10`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'find_the_error',
          statement: 'Grogg says: "|-4| = -4 because the number is negative." What is the correct value of |-4|? A) -4 B) 4 C) 0 D) -8',
          answer: mc('B) 4', 'B — Absolute value is always non-negative: |-4| = 4'),
          hints: [
            hint(1, 'Absolute value measures distance. Can distance be negative?', 'conceptual'),
            hint(2, 'Absolute value strips away the sign and gives a positive result.', 'directional'),
            hint(3, '|-4| = 4. Absolute value is ALWAYS non-negative.', 'scaffolded'),
          ],
          solution: '|-4| = 4. Absolute value is always non-negative.',
          teachingPoint: 'Absolute value is always ≥ 0. It measures distance from zero, and distance cannot be negative. |x| ≥ 0 for all x.',
          tags: ['integers', 'find-the-error', 'absolute-value'], difficulty: 3,
        }),
      ]
    ),

    // Level 11 — Elevation Explorer (practice, diff 3)
    level(`level-5-${ch}-11`, cid, 11, 'Elevation Explorer', 'practice', 3,
      'The crew explores different islands. "Each island has different elevations — some above sea level, some below!"',
      [
        problem(`problem-5-${ch}-11-1`, `level-5-${ch}-11`, 1, {
          category: 'strategic_practice',
          statement: 'A mountain peak is at 120 meters above sea level (+120). A cave entrance is at 35 meters below sea level (-35). What is the difference in elevation between the peak and cave?',
          answer: num(155, '120 - (-35) = 120 + 35 = 155 meters'),
          hints: [
            hint(1, 'Difference means subtract: peak elevation - cave elevation.', 'conceptual'),
            hint(2, '120 - (-35) = 120 + 35 because subtracting a negative is adding.', 'directional'),
            hint(3, '120 + 35 = 155 meters difference.', 'scaffolded'),
          ],
          solution: '120 - (-35) = 155 meters',
          teachingPoint: 'To find the difference between two elevations (one above, one below sea level), subtract: the result is the total vertical distance between them.',
          tags: ['integers', 'word-problem', 'elevation'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-11-2`, `level-5-${ch}-11`, 2, {
          category: 'strategic_practice',
          statement: 'A bank account has $45. A debit of $60 is made. What is the new balance?',
          answer: num(-15, '45 - 60 = -15'),
          hints: [
            hint(1, 'A debit means money is taken out — subtract from the balance.', 'conceptual'),
            hint(2, '45 - 60: the debit is more than the balance, so the result is negative.', 'directional'),
            hint(3, '45 - 60 = -15. The account is overdrawn by $15.', 'scaffolded'),
          ],
          solution: '45 - 60 = -$15 (overdrawn)',
          teachingPoint: 'When you spend more than you have, the balance goes negative. This represents a debt or overdraft.',
          tags: ['integers', 'word-problem', 'money'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-11-3`, `level-5-${ch}-11`, 3, {
          category: 'strategic_practice',
          statement: 'At 6 AM the temperature is -8°C. By noon it warms up by 15 degrees. What is the noon temperature?',
          answer: num(7, '-8 + 15 = 7'),
          hints: [
            hint(1, '"Warms up by 15" means add 15 to the current temperature.', 'conceptual'),
            hint(2, '-8 + 15: different signs, 15 - 8 = 7, positive wins.', 'directional'),
            hint(3, '-8 + 15 = 7°C. The temperature is now above freezing!', 'scaffolded'),
          ],
          solution: '-8 + 15 = 7°C',
          teachingPoint: 'Integer addition in context: warming up means adding a positive number. -8 + 15 = 7°C means the temperature crossed zero and went positive.',
          tags: ['integers', 'word-problem', 'temperature'], difficulty: 3,
        }),
      ]
    ),

    // Level 12 — Integer Puzzles (challenge, diff 4)
    level(`level-5-${ch}-12`, cid, 12, 'Integer Puzzles', 'challenge', 4,
      'Admiral Axiom presents puzzles. "Find the missing integers! Work backwards from the clues."',
      [
        problem(`problem-5-${ch}-12-1`, `level-5-${ch}-12`, 1, {
          category: 'working_backwards',
          statement: 'I think of an integer, add 7, and get 3. What was my integer?',
          answer: num(-4, 'x + 7 = 3, so x = 3 - 7 = -4'),
          hints: [
            hint(1, 'Work backwards: if adding 7 gives 3, what was the starting number?', 'conceptual'),
            hint(2, 'Undo the addition: 3 - 7 = ?', 'directional'),
            hint(3, '3 - 7 = -4. Check: -4 + 7 = 3. Correct!', 'scaffolded'),
          ],
          solution: 'x + 7 = 3, x = 3 - 7 = -4',
          teachingPoint: 'To work backwards, do the opposite operation. If x + 7 = 3, then x = 3 - 7 = -4.',
          tags: ['integers', 'working-backwards', 'puzzle'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-12-2`, `level-5-${ch}-12`, 2, {
          category: 'working_backwards',
          statement: 'I think of an integer, subtract 5, and get -9. What was my integer?',
          answer: num(-4, 'x - 5 = -9, so x = -9 + 5 = -4'),
          hints: [
            hint(1, 'If subtracting 5 gives -9, undo by adding 5.', 'conceptual'),
            hint(2, '-9 + 5 = ? Use different-sign addition.', 'directional'),
            hint(3, '-9 + 5 = -4. Check: -4 - 5 = -9. Correct!', 'scaffolded'),
          ],
          solution: 'x - 5 = -9, x = -9 + 5 = -4',
          teachingPoint: 'Undo subtraction with addition: if x - 5 = -9, then x = -9 + 5 = -4.',
          tags: ['integers', 'working-backwards', 'puzzle'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-12-3`, `level-5-${ch}-12`, 3, {
          category: 'working_backwards',
          statement: 'The sum of two integers is -3. One of the integers is 8. What is the other integer?',
          answer: num(-11, '8 + x = -3, x = -3 - 8 = -11'),
          hints: [
            hint(1, 'If 8 + x = -3, solve for x by subtracting 8 from both sides.', 'conceptual'),
            hint(2, 'x = -3 - 8 = -3 + (-8).', 'directional'),
            hint(3, '-3 + (-8) = -11. Check: 8 + (-11) = -3. Correct!', 'scaffolded'),
          ],
          solution: 'x = -3 - 8 = -11',
          teachingPoint: 'To find a missing addend: other = sum - known. -3 - 8 = -11.',
          tags: ['integers', 'working-backwards', 'puzzle'], difficulty: 4,
        }),
      ]
    ),

    // Level 13 — Guardian of Integer Isles (boss, diff 5)
    level(`level-5-${ch}-13`, cid, 13, 'Guardian of Integer Isles', 'boss', 5,
      'The Guardian of Integer Isles blocks your path! "Show me you truly understand positive, negative, and everything in between!"',
      [
        problem(`problem-5-${ch}-13-1`, `level-5-${ch}-13`, 1, {
          category: 'thinking',
          statement: 'What is (-15) + 8 - (-3) + (-6)?',
          answer: num(-10, '-15 + 8 + 3 + (-6) = -15 + 8 + 3 - 6 = -10'),
          hints: [
            hint(1, 'First convert all subtractions to adding the opposite.', 'conceptual'),
            hint(2, '= -15 + 8 + 3 + (-6). Group positives and negatives separately.', 'directional'),
            hint(3, 'Positives: 8 + 3 = 11. Negatives: -15 + (-6) = -21. Total: -21 + 11 = -10.', 'scaffolded'),
          ],
          solution: '-15 + 8 + 3 - 6 = -10',
          teachingPoint: 'For long expressions with integers, convert all subtractions to additions, then group positives and negatives separately before combining.',
          tags: ['integers', 'multi-step', 'boss'], difficulty: 5,
        }),
        problem(`problem-5-${ch}-13-2`, `level-5-${ch}-13`, 2, {
          category: 'working_backwards',
          statement: 'An elevator starts at floor -2, goes up 7 floors, then down 4 floors, then up 3 floors. What floor is it on now?',
          answer: num(4, '-2 + 7 - 4 + 3 = 4'),
          hints: [
            hint(1, 'Track each move: start at -2, then add or subtract for each move.', 'conceptual'),
            hint(2, '-2 + 7 = 5. Then 5 - 4 = 1. Then 1 + 3 = ?', 'directional'),
            hint(3, '-2 + 7 - 4 + 3 = 5 - 4 + 3 = 1 + 3 = 4. Floor 4.', 'scaffolded'),
          ],
          solution: '-2 + 7 - 4 + 3 = 4',
          teachingPoint: 'Track sequences of movements by chaining additions and subtractions. Up = add, down = subtract.',
          tags: ['integers', 'multi-step', 'word-problem', 'boss'], difficulty: 5,
        }),
        problem(`problem-5-${ch}-13-3`, `level-5-${ch}-13`, 3, {
          category: 'thinking',
          statement: 'What is |(-3) + (-8)| - |5 - 12|?',
          answer: num(4, '|-11| - |-7| = 11 - 7 = 4'),
          hints: [
            hint(1, 'Evaluate inside the absolute value bars first, then take absolute values.', 'conceptual'),
            hint(2, '(-3)+(-8) = -11, |−11| = 11. 5-12 = -7, |−7| = 7.', 'directional'),
            hint(3, '11 - 7 = 4.', 'scaffolded'),
          ],
          solution: '|(-3)+(-8)| - |5-12| = |-11| - |-7| = 11 - 7 = 4',
          teachingPoint: 'When absolute values contain expressions, evaluate the expression first, then take the absolute value. Work from the inside out.',
          tags: ['integers', 'absolute-value', 'multi-step', 'boss'], difficulty: 5,
        }),
      ]
    ),
  ];

  return {
    id: cid,
    worldId: 'world-5',
    number: ch,
    name: 'Integer Isles',
    topic: 'integers',
    weekStart: 4,
    weekEnd: 6,
    levels,
    learningObjectives: [
      'Understand negative numbers in real-world contexts',
      'Place and order integers on a number line',
      'Find absolute value of integers',
      'Add integers with same and different signs',
      'Subtract integers using the additive inverse',
      'Solve word problems involving integers',
    ],
    signatureContent: [
      'number line reasoning',
      'absolute value',
      'integer addition rules',
      'subtraction as adding the opposite',
    ],
    isBoss: true,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHAPTER 3 — Expression Expanse (Expressions & Equations)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function createChapter3() {
  const ch = 3;
  const cid = `chapter-5-${ch}`;

  const levels = [
    // Level 1 — Letters for Numbers (teaching, diff 1)
    level(`level-5-${ch}-1`, cid, 1, 'Letters for Numbers', 'teaching', 1,
      'Prof. Owlbert explains: "In algebra, we use letters to stand for unknown numbers. The letter n could be any number!"',
      [
        problem(`problem-5-${ch}-1-1`, `level-5-${ch}-1`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'If n stands for a number and n + 5 = 12, what is n? A) 5 B) 7 C) 12 D) 17',
          answer: mc('B) 7', 'B — n + 5 = 12 means n = 12 - 5 = 7'),
          hints: [
            hint(1, 'What number plus 5 equals 12?', 'conceptual'),
            hint(2, 'Think: ? + 5 = 12. Subtract 5 from 12.', 'directional'),
            hint(3, '12 - 5 = 7, so n = 7.', 'scaffolded'),
          ],
          solution: 'n = 12 - 5 = 7',
          teachingPoint: 'A variable is a letter that represents an unknown number. We can find its value by using inverse operations.',
          tags: ['variables', 'introduction', 'equations'], difficulty: 1,
        }),
        problem(`problem-5-${ch}-1-2`, `level-5-${ch}-1`, 2, {
          statement: 'If x = 4, what is 3x? (3x means 3 times x)',
          answer: num(12, '3 × 4 = 12'),
          hints: [
            hint(1, '3x means 3 multiplied by x. Substitute x = 4.', 'conceptual'),
            hint(2, '3 × 4 = ?', 'directional'),
            hint(3, '3 × 4 = 12.', 'scaffolded'),
          ],
          solution: '3x = 3 × 4 = 12',
          teachingPoint: 'When a number is written right next to a variable (like 3x), it means multiplication. 3x = 3 × x.',
          tags: ['variables', 'multiplication', 'evaluation'], difficulty: 1,
        }),
        problem(`problem-5-${ch}-1-3`, `level-5-${ch}-1`, 3, {
          statement: 'If y = 10, what is y - 3?',
          answer: num(7, '10 - 3 = 7'),
          hints: [
            hint(1, 'Replace y with 10, then subtract.', 'conceptual'),
            hint(2, 'y - 3 = 10 - 3 = ?', 'directional'),
            hint(3, '10 - 3 = 7.', 'scaffolded'),
          ],
          solution: 'y - 3 = 10 - 3 = 7',
          teachingPoint: 'To evaluate an expression, replace the variable with its value and compute. If y = 10, then y - 3 = 10 - 3 = 7.',
          tags: ['variables', 'evaluation', 'subtraction'], difficulty: 1,
        }),
      ]
    ),

    // Level 2 — Writing Expressions (teaching, diff 2)
    level(`level-5-${ch}-2`, cid, 2, 'Writing Expressions', 'teaching', 2,
      'Lizzie translates words into math. "\'Five more than a number\' becomes n + 5. Let\'s practice!"',
      [
        problem(`problem-5-${ch}-2-1`, `level-5-${ch}-2`, 1, {
          type: 'text_input', inputType: 'text_field', category: 'thinking',
          statement: 'Write an expression for "a number n increased by 8". Use n as the variable.',
          answer: txt('n + 8', 'n + 8'),
          hints: [
            hint(1, '"Increased by" means addition.', 'conceptual'),
            hint(2, 'Start with the variable n and add 8.', 'directional'),
            hint(3, '"A number n increased by 8" = n + 8.', 'scaffolded'),
          ],
          solution: 'n + 8',
          teachingPoint: '"Increased by," "more than," and "plus" all mean addition. "A number n increased by 8" translates to n + 8.',
          tags: ['expressions', 'word-to-algebra', 'addition'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-2-2`, `level-5-${ch}-2`, 2, {
          type: 'text_input', inputType: 'text_field', category: 'thinking',
          statement: 'Write an expression for "twice a number n." Use n as the variable.',
          answer: txt('2n', '2n means 2 × n'),
          hints: [
            hint(1, '"Twice" means multiplied by two.', 'conceptual'),
            hint(2, 'Twice n = 2 times n = ?', 'directional'),
            hint(3, '"Twice n" = 2n (or 2 × n).', 'scaffolded'),
          ],
          solution: '2n',
          teachingPoint: '"Twice," "double," and "two times" all mean multiply by 2. In algebra, we write 2n instead of 2 × n.',
          tags: ['expressions', 'word-to-algebra', 'multiplication'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-2-3`, `level-5-${ch}-2`, 3, {
          type: 'text_input', inputType: 'text_field', category: 'thinking',
          statement: 'Write an expression for "7 less than a number n."',
          answer: txt('n - 7', 'n - 7 (not 7 - n!)'),
          hints: [
            hint(1, '"Less than" means subtraction, but watch the order carefully.', 'conceptual'),
            hint(2, '"7 less than n" means start with n and take away 7.', 'directional'),
            hint(3, '"7 less than n" = n - 7. Be careful: it is NOT 7 - n!', 'scaffolded'),
          ],
          solution: 'n - 7',
          teachingPoint: '"7 less than n" = n - 7 (NOT 7 - n). The "less than" phrase reverses the order — start with the number, then subtract.',
          tags: ['expressions', 'word-to-algebra', 'subtraction'], difficulty: 2,
        }),
      ]
    ),

    // Level 3 — Plugging In (practice, diff 2)
    level(`level-5-${ch}-3`, cid, 3, 'Plugging In', 'practice', 2,
      'Grogg substitutes values into expressions. "Just replace the letter with the number and calculate!"',
      [
        problem(`problem-5-${ch}-3-1`, `level-5-${ch}-3`, 1, {
          statement: 'If n = 6, what is 4n + 3?',
          answer: num(27, '4(6) + 3 = 24 + 3 = 27'),
          hints: [
            hint(1, 'Replace n with 6 and follow order of operations.', 'conceptual'),
            hint(2, '4 × 6 = 24. Then add 3.', 'directional'),
            hint(3, '4(6) + 3 = 24 + 3 = 27.', 'scaffolded'),
          ],
          solution: '4(6) + 3 = 24 + 3 = 27',
          teachingPoint: 'When evaluating expressions, do multiplication before addition (order of operations). 4n + 3 = 4×6 + 3 = 27.',
          tags: ['expressions', 'evaluation', 'order-of-operations'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-3-2`, `level-5-${ch}-3`, 2, {
          statement: 'If a = 5 and b = 3, what is 2a + b?',
          answer: num(13, '2(5) + 3 = 10 + 3 = 13'),
          hints: [
            hint(1, 'Replace a with 5 and b with 3.', 'conceptual'),
            hint(2, '2 × 5 = 10. Then add 3.', 'directional'),
            hint(3, '2(5) + 3 = 10 + 3 = 13.', 'scaffolded'),
          ],
          solution: '2(5) + 3 = 13',
          teachingPoint: 'Expressions can have multiple variables. Replace each variable with its value and compute using order of operations.',
          tags: ['expressions', 'evaluation', 'two-variables'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-3-3`, `level-5-${ch}-3`, 3, {
          statement: 'If x = 8, what is (x + 2) × 3?',
          answer: num(30, '(8 + 2) × 3 = 10 × 3 = 30'),
          hints: [
            hint(1, 'Replace x with 8, then follow order of operations (parentheses first!).', 'conceptual'),
            hint(2, '(8 + 2) = 10. Then multiply by 3.', 'directional'),
            hint(3, '(8 + 2) × 3 = 10 × 3 = 30.', 'scaffolded'),
          ],
          solution: '(8 + 2) × 3 = 10 × 3 = 30',
          teachingPoint: 'Parentheses change the order! (x + 2) × 3 means add first, then multiply. Without parentheses, x + 2 × 3 would multiply first.',
          tags: ['expressions', 'evaluation', 'parentheses'], difficulty: 2,
        }),
      ]
    ),

    // Level 4 — Order of Operations (teaching, diff 2)
    level(`level-5-${ch}-4`, cid, 4, 'Order of Operations', 'teaching', 2,
      'Prof. Owlbert writes PEMDAS on the board. "Parentheses, Exponents, Multiplication/Division, Addition/Subtraction — always in this order!"',
      [
        problem(`problem-5-${ch}-4-1`, `level-5-${ch}-4`, 1, {
          statement: 'What is 3 + 4 × 2? (Remember: multiplication before addition!)',
          answer: num(11, '3 + (4×2) = 3 + 8 = 11'),
          hints: [
            hint(1, 'Which operation comes first: addition or multiplication?', 'conceptual'),
            hint(2, 'Multiplication before addition: do 4 × 2 first.', 'directional'),
            hint(3, '4 × 2 = 8. Then 3 + 8 = 11. (NOT (3+4) × 2 = 14)', 'scaffolded'),
          ],
          solution: '3 + 4 × 2 = 3 + 8 = 11',
          teachingPoint: 'PEMDAS: Multiplication comes before addition. 3 + 4 × 2 = 3 + 8 = 11, NOT 7 × 2 = 14.',
          tags: ['order-of-operations', 'PEMDAS'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-4-2`, `level-5-${ch}-4`, 2, {
          statement: 'What is (3 + 4) × 2?',
          answer: num(14, '(3+4) × 2 = 7 × 2 = 14'),
          hints: [
            hint(1, 'Parentheses override the usual order — do them first.', 'conceptual'),
            hint(2, '3 + 4 = 7 (inside parentheses). Then multiply by 2.', 'directional'),
            hint(3, '(3+4) × 2 = 7 × 2 = 14.', 'scaffolded'),
          ],
          solution: '(3 + 4) × 2 = 7 × 2 = 14',
          teachingPoint: 'Parentheses always come first in PEMDAS. They override the normal order. Compare: 3 + 4 × 2 = 11 but (3 + 4) × 2 = 14.',
          tags: ['order-of-operations', 'parentheses', 'PEMDAS'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-4-3`, `level-5-${ch}-4`, 3, {
          statement: 'What is 20 - 3 × 4 + 1?',
          answer: num(9, '20 - 12 + 1 = 9'),
          hints: [
            hint(1, 'Do multiplication first, then work left to right for addition/subtraction.', 'conceptual'),
            hint(2, '3 × 4 = 12. Then: 20 - 12 + 1.', 'directional'),
            hint(3, '20 - 12 + 1 = 8 + 1 = 9.', 'scaffolded'),
          ],
          solution: '20 - 3 × 4 + 1 = 20 - 12 + 1 = 9',
          teachingPoint: 'After handling multiplication, work left to right for addition and subtraction. They have equal priority.',
          tags: ['order-of-operations', 'PEMDAS', 'multi-step'], difficulty: 2,
        }),
      ]
    ),

    // Level 5 — Expression Comparison (challenge, diff 3)
    level(`level-5-${ch}-5`, cid, 5, 'Expression Comparison', 'challenge', 3,
      'Lizzie challenges: "Can you compare these expressions WITHOUT plugging in every value?"',
      [
        problem(`problem-5-${ch}-5-1`, `level-5-${ch}-5`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'compare_without_calc',
          statement: 'For any positive number n, which is greater: 2(n + 3) or 2n + 3? A) 2(n+3) B) 2n+3 C) They are always equal',
          answer: mc('A) 2(n+3)', 'A — 2(n+3) = 2n + 6 which is always 3 more than 2n + 3'),
          hints: [
            hint(1, 'Try expanding 2(n + 3) using the distributive property.', 'conceptual'),
            hint(2, '2(n+3) = 2n + 6. Compare that to 2n + 3.', 'directional'),
            hint(3, '2n + 6 vs 2n + 3: the first is always 3 more. So 2(n+3) > 2n + 3.', 'scaffolded'),
          ],
          solution: '2(n+3) = 2n+6 > 2n+3 for all values of n.',
          teachingPoint: 'Expand using the distributive property: 2(n+3) = 2n+6. Since 2n+6 > 2n+3 always, 2(n+3) is always greater.',
          tags: ['expressions', 'comparison', 'distributive-property'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-5-2`, `level-5-${ch}-5`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'compare_without_calc',
          statement: 'If n = 5, which is greater: n² or 2n? (n² means n × n) A) n² B) 2n C) They are equal',
          answer: mc('A) n²', 'A — 5² = 25 and 2(5) = 10, so n² is greater'),
          hints: [
            hint(1, 'Substitute n = 5 into both expressions.', 'conceptual'),
            hint(2, 'n² = 5 × 5 = 25. 2n = 2 × 5 = 10.', 'directional'),
            hint(3, '25 > 10, so n² is greater when n = 5.', 'scaffolded'),
          ],
          solution: 'n² = 25, 2n = 10. n² is greater.',
          teachingPoint: 'n² grows much faster than 2n for large n. At n = 5: n² = 25 but 2n = 10. Squaring a number makes it much larger than doubling.',
          tags: ['expressions', 'comparison', 'exponents'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-5-3`, `level-5-${ch}-5`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'compare_without_calc',
          statement: 'For any number n, are 3(n - 2) and 3n - 6 always equal? A) Yes, always B) No, only sometimes C) Never equal',
          answer: mc('A) Yes, always', 'A — By the distributive property, 3(n-2) = 3n - 6 always'),
          hints: [
            hint(1, 'Try expanding 3(n - 2) using the distributive property.', 'conceptual'),
            hint(2, '3(n-2) = 3×n - 3×2 = 3n - 6.', 'directional'),
            hint(3, '3(n-2) = 3n - 6. They are always equal — they are the same expression written differently!', 'scaffolded'),
          ],
          solution: '3(n-2) = 3n - 6 by the distributive property. Always equal.',
          teachingPoint: 'The distributive property shows that a(b - c) = ab - ac. So 3(n-2) and 3n-6 are equivalent expressions — always equal for every value of n.',
          tags: ['expressions', 'distributive-property', 'equivalence'], difficulty: 3,
        }),
      ]
    ),

    // Level 6 — Solving Addition Equations (teaching, diff 2)
    level(`level-5-${ch}-6`, cid, 6, 'Solving Addition Equations', 'teaching', 2,
      'Prof. Owlbert introduces equations. "An equation says two things are equal. To solve it, we isolate the variable!"',
      [
        problem(`problem-5-${ch}-6-1`, `level-5-${ch}-6`, 1, {
          statement: 'Solve: x + 7 = 12. What is x?',
          answer: num(5, 'x = 12 - 7 = 5'),
          hints: [
            hint(1, 'To isolate x, undo the addition by subtracting.', 'conceptual'),
            hint(2, 'x + 7 = 12. Subtract 7 from both sides.', 'directional'),
            hint(3, 'x = 12 - 7 = 5. Check: 5 + 7 = 12. Correct!', 'scaffolded'),
          ],
          solution: 'x + 7 = 12, x = 5',
          teachingPoint: 'To solve addition equations, subtract the same number from both sides. x + 7 = 12 → x = 12 - 7 = 5.',
          tags: ['equations', 'one-step', 'addition'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-6-2`, `level-5-${ch}-6`, 2, {
          statement: 'Solve: n + 15 = 23. What is n?',
          answer: num(8, 'n = 23 - 15 = 8'),
          hints: [
            hint(1, 'Undo addition by subtracting 15 from both sides.', 'conceptual'),
            hint(2, 'n = 23 - 15.', 'directional'),
            hint(3, 'n = 23 - 15 = 8. Check: 8 + 15 = 23. Correct!', 'scaffolded'),
          ],
          solution: 'n = 23 - 15 = 8',
          teachingPoint: 'The inverse of adding 15 is subtracting 15. Always check your answer by substituting back into the original equation.',
          tags: ['equations', 'one-step', 'addition'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-6-3`, `level-5-${ch}-6`, 3, {
          statement: 'Solve: y - 9 = 4. What is y?',
          answer: num(13, 'y = 4 + 9 = 13'),
          hints: [
            hint(1, 'To undo subtraction, add 9 to both sides.', 'conceptual'),
            hint(2, 'y = 4 + 9.', 'directional'),
            hint(3, 'y = 4 + 9 = 13. Check: 13 - 9 = 4. Correct!', 'scaffolded'),
          ],
          solution: 'y = 4 + 9 = 13',
          teachingPoint: 'The inverse of subtracting 9 is adding 9. y - 9 = 4 → y = 4 + 9 = 13.',
          tags: ['equations', 'one-step', 'subtraction'], difficulty: 2,
        }),
      ]
    ),

    // Level 7 — Solving All One-Step (teaching, diff 3)
    level(`level-5-${ch}-7`, cid, 7, 'Solving All One-Step', 'teaching', 3,
      'Lizzie expands the toolkit. "Addition, subtraction, multiplication, AND division equations — we can solve them all!"',
      [
        problem(`problem-5-${ch}-7-1`, `level-5-${ch}-7`, 1, {
          statement: 'Solve: 5x = 35. What is x?',
          answer: num(7, 'x = 35 ÷ 5 = 7'),
          hints: [
            hint(1, '5x means 5 times x. Undo multiplication by dividing.', 'conceptual'),
            hint(2, 'Divide both sides by 5: x = 35 ÷ 5.', 'directional'),
            hint(3, 'x = 35 ÷ 5 = 7. Check: 5 × 7 = 35. Correct!', 'scaffolded'),
          ],
          solution: '5x = 35, x = 7',
          teachingPoint: 'To solve multiplication equations, divide both sides by the coefficient. 5x = 35 → x = 35/5 = 7.',
          tags: ['equations', 'one-step', 'multiplication'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-7-2`, `level-5-${ch}-7`, 2, {
          statement: 'Solve: n ÷ 4 = 9. What is n?',
          answer: num(36, 'n = 9 × 4 = 36'),
          hints: [
            hint(1, 'n divided by 4 equals 9. Undo division by multiplying.', 'conceptual'),
            hint(2, 'Multiply both sides by 4: n = 9 × 4.', 'directional'),
            hint(3, 'n = 9 × 4 = 36. Check: 36 ÷ 4 = 9. Correct!', 'scaffolded'),
          ],
          solution: 'n ÷ 4 = 9, n = 36',
          teachingPoint: 'To solve division equations, multiply both sides by the divisor. n/4 = 9 → n = 9 × 4 = 36.',
          tags: ['equations', 'one-step', 'division'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-7-3`, `level-5-${ch}-7`, 3, {
          statement: 'Solve: 8x = 72. What is x?',
          answer: num(9, 'x = 72 ÷ 8 = 9'),
          hints: [
            hint(1, 'Divide both sides by 8 to isolate x.', 'conceptual'),
            hint(2, 'x = 72 ÷ 8.', 'directional'),
            hint(3, 'x = 72 ÷ 8 = 9. Check: 8 × 9 = 72. Correct!', 'scaffolded'),
          ],
          solution: '8x = 72, x = 9',
          teachingPoint: 'Inverse operations: addition↔subtraction, multiplication↔division. Always use the opposite operation to solve.',
          tags: ['equations', 'one-step', 'multiplication'], difficulty: 3,
        }),
      ]
    ),

    // Level 8 — Equation Practice (practice, diff 3)
    level(`level-5-${ch}-8`, cid, 8, 'Equation Practice', 'practice', 3,
      'Grogg practices solving equations of all types. "Let me check my answers by plugging back in!"',
      [
        problem(`problem-5-${ch}-8-1`, `level-5-${ch}-8`, 1, {
          statement: 'Solve: x - 14 = 20. What is x?',
          answer: num(34, 'x = 20 + 14 = 34'),
          hints: [
            hint(1, 'Undo subtraction by adding 14 to both sides.', 'conceptual'),
            hint(2, 'x = 20 + 14.', 'directional'),
            hint(3, 'x = 34. Check: 34 - 14 = 20. Correct!', 'scaffolded'),
          ],
          solution: 'x = 20 + 14 = 34',
          teachingPoint: 'Always check your answer by substituting back. 34 - 14 = 20. It works!',
          tags: ['equations', 'practice', 'subtraction'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-8-2`, `level-5-${ch}-8`, 2, {
          statement: 'Solve: 6n = 54. What is n?',
          answer: num(9, 'n = 54 ÷ 6 = 9'),
          hints: [
            hint(1, 'Divide both sides by 6.', 'conceptual'),
            hint(2, 'n = 54 ÷ 6.', 'directional'),
            hint(3, 'n = 9. Check: 6 × 9 = 54. Correct!', 'scaffolded'),
          ],
          solution: '6n = 54, n = 9',
          teachingPoint: 'Solving 6n = 54: divide by 6 to get n = 9. The coefficient 6 is "undone" by dividing.',
          tags: ['equations', 'practice', 'multiplication'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-8-3`, `level-5-${ch}-8`, 3, {
          statement: 'Solve: m ÷ 7 = 8. What is m?',
          answer: num(56, 'm = 8 × 7 = 56'),
          hints: [
            hint(1, 'Undo division by multiplying both sides by 7.', 'conceptual'),
            hint(2, 'm = 8 × 7.', 'directional'),
            hint(3, 'm = 56. Check: 56 ÷ 7 = 8. Correct!', 'scaffolded'),
          ],
          solution: 'm = 8 × 7 = 56',
          teachingPoint: 'Multiply both sides by 7 to undo the division: m/7 = 8 → m = 56.',
          tags: ['equations', 'practice', 'division'], difficulty: 3,
        }),
      ]
    ),

    // Level 9 — From Words to Equations (teaching, diff 3)
    level(`level-5-${ch}-9`, cid, 9, 'From Words to Equations', 'teaching', 3,
      'Prof. Owlbert explains: "The hardest part of algebra is translating words into equations. Let\'s practice that bridge."',
      [
        problem(`problem-5-${ch}-9-1`, `level-5-${ch}-9`, 1, {
          statement: '"A number plus 12 equals 30." Solve for the number.',
          answer: num(18, 'n + 12 = 30, n = 18'),
          hints: [
            hint(1, 'Write the equation: n + 12 = 30.', 'conceptual'),
            hint(2, 'Subtract 12 from both sides: n = 30 - 12.', 'directional'),
            hint(3, 'n = 18. Check: 18 + 12 = 30. Correct!', 'scaffolded'),
          ],
          solution: 'n + 12 = 30, n = 18',
          teachingPoint: 'Translate step by step: "a number" = n, "plus 12" = + 12, "equals 30" = = 30. Then solve the equation.',
          tags: ['equations', 'word-problems', 'translation'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-9-2`, `level-5-${ch}-9`, 2, {
          statement: '"Three times a number equals 45." Solve for the number.',
          answer: num(15, '3n = 45, n = 15'),
          hints: [
            hint(1, '"Three times a number" → 3n. "Equals 45" → = 45.', 'conceptual'),
            hint(2, '3n = 45. Divide both sides by 3.', 'directional'),
            hint(3, 'n = 45 ÷ 3 = 15. Check: 3 × 15 = 45. Correct!', 'scaffolded'),
          ],
          solution: '3n = 45, n = 15',
          teachingPoint: '"Times" means multiplication. "Three times a number equals 45" → 3n = 45 → n = 15.',
          tags: ['equations', 'word-problems', 'multiplication'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-9-3`, `level-5-${ch}-9`, 3, {
          statement: '"A baker makes cookies in batches of 8. After selling some, she has 24 cookies left. How many batches are left?"',
          answer: num(3, '8b = 24, b = 3'),
          hints: [
            hint(1, 'Let b = number of batches. Each batch has 8 cookies.', 'conceptual'),
            hint(2, '8b = 24 (8 cookies per batch, 24 total).', 'directional'),
            hint(3, 'b = 24 ÷ 8 = 3 batches.', 'scaffolded'),
          ],
          solution: '8b = 24, b = 3 batches',
          teachingPoint: 'Real-world problems require choosing what the variable represents, writing the equation, then solving. Here b = batches, 8b = 24, b = 3.',
          tags: ['equations', 'word-problems', 'real-world'], difficulty: 3,
        }),
      ]
    ),

    // Level 10 — Grogg's Equation Blunders (challenge, diff 3)
    level(`level-5-${ch}-10`, cid, 10, "Grogg's Equation Blunders", 'challenge', 3,
      'Grogg shows his equation-solving work. "Check my answers! I think I got them all right." Did he?',
      [
        problem(`problem-5-${ch}-10-1`, `level-5-${ch}-10`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'find_the_error',
          statement: 'Grogg solves x + 9 = 15 and gets x = 24. He added 9 to both sides. What should x be? A) 24 B) 6 C) -6 D) 135',
          answer: mc('B) 6', 'B — To solve x + 9 = 15, subtract 9 from both sides: x = 6'),
          hints: [
            hint(1, 'What is the inverse of adding 9? Grogg used the wrong operation.', 'conceptual'),
            hint(2, 'He should subtract 9, not add 9. x = 15 - 9.', 'directional'),
            hint(3, 'x = 15 - 9 = 6. Grogg added instead of subtracting.', 'scaffolded'),
          ],
          solution: 'x = 15 - 9 = 6. Grogg added instead of subtracting.',
          teachingPoint: 'To undo addition, SUBTRACT from both sides. Adding to both sides would move farther from the answer.',
          tags: ['equations', 'find-the-error'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-10-2`, `level-5-${ch}-10`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'find_the_error',
          statement: 'Grogg solves 4x = 28 by subtracting 4: "x = 28 - 4 = 24." What should x be? A) 24 B) 7 C) 32 D) 112',
          answer: mc('B) 7', 'B — For multiplication, divide: x = 28 ÷ 4 = 7'),
          hints: [
            hint(1, '4x means 4 TIMES x. What undoes multiplication?', 'conceptual'),
            hint(2, 'Division undoes multiplication. Divide both sides by 4.', 'directional'),
            hint(3, 'x = 28 ÷ 4 = 7. Grogg subtracted instead of dividing.', 'scaffolded'),
          ],
          solution: 'x = 28 ÷ 4 = 7. Grogg used subtraction instead of division.',
          teachingPoint: 'Match the inverse operation to the equation type. 4x = 28 uses multiplication, so divide to solve: x = 7.',
          tags: ['equations', 'find-the-error'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-10-3`, `level-5-${ch}-10`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'find_the_error',
          statement: 'Grogg translates "5 less than a number is 20" as 5 - n = 20. What is the correct equation and answer? A) 5-n=20, n=-15 B) n-5=20, n=25 C) n+5=20, n=15 D) 5n=20, n=4',
          answer: mc('B) n-5=20, n=25', 'B — "5 less than a number" means n - 5, not 5 - n'),
          hints: [
            hint(1, '"5 less than a number" — which comes first, the number or the 5?', 'conceptual'),
            hint(2, '"Less than" means subtract FROM the number: n - 5, not 5 - n.', 'directional'),
            hint(3, 'n - 5 = 20, so n = 25. Grogg reversed the subtraction order.', 'scaffolded'),
          ],
          solution: 'n - 5 = 20, n = 25. "5 less than n" = n - 5, not 5 - n.',
          teachingPoint: '"5 less than n" means n - 5. The "less than" phrase reverses the order in English vs math. This is one of the most common algebra mistakes!',
          tags: ['equations', 'find-the-error', 'translation'], difficulty: 3,
        }),
      ]
    ),

    // Level 11 — Inequalities (teaching, diff 3)
    level(`level-5-${ch}-11`, cid, 11, 'Inequalities', 'teaching', 3,
      'Lizzie introduces a new symbol. "Not everything is equal! Sometimes we need < and > for ranges of values."',
      [
        problem(`problem-5-${ch}-11-1`, `level-5-${ch}-11`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'If x + 3 > 10, which values of x work? A) x = 6 B) x = 7 C) x = 8 D) Both B and C',
          answer: mc('C) x = 8', 'C — x + 3 > 10 means x > 7. Only x = 8 is greater than 7.'),
          hints: [
            hint(1, 'Solve x + 3 > 10 by subtracting 3 from both sides.', 'conceptual'),
            hint(2, 'x > 7 means x must be greater than 7 (not equal to 7).', 'directional'),
            hint(3, 'x > 7: x = 6 gives 9 (no), x = 7 gives 10 (not >), x = 8 gives 11 (yes). Only C works.', 'scaffolded'),
          ],
          solution: 'x > 7. Only x = 8 gives x + 3 = 11 > 10.',
          teachingPoint: 'An inequality like x + 3 > 10 means x > 7. The solution is all numbers greater than 7 (not including 7 itself).',
          tags: ['inequalities', 'solving', 'introduction'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-11-2`, `level-5-${ch}-11`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'thinking',
          statement: 'Solve: 2n < 16. Which describes ALL solutions? A) n < 8 B) n < 14 C) n > 8 D) n = 8',
          answer: mc('A) n < 8', 'A — Divide both sides by 2: n < 8'),
          hints: [
            hint(1, 'Solve like an equation: divide both sides by 2.', 'conceptual'),
            hint(2, '2n < 16 → n < 16 ÷ 2 → n < 8.', 'directional'),
            hint(3, 'n < 8 means any number less than 8 works (like 7, 5, 0, -3...).', 'scaffolded'),
          ],
          solution: '2n < 16 → n < 8',
          teachingPoint: 'Solve inequalities the same way as equations. Divide both sides by 2: 2n < 16 → n < 8. The inequality sign stays the same when dividing by a positive number.',
          tags: ['inequalities', 'solving', 'division'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-11-3`, `level-5-${ch}-11`, 3, {
          type: 'text_input', inputType: 'text_field', category: 'thinking',
          statement: 'Write the inequality: "A number n is at least 5." Use ≥ or >= for "at least."',
          answer: txt('n >= 5', 'n ≥ 5 means n is 5 or greater'),
          hints: [
            hint(1, '"At least 5" means 5 or more.', 'conceptual'),
            hint(2, '"At least" translates to ≥ (greater than or equal to).', 'directional'),
            hint(3, '"n is at least 5" means n ≥ 5 (or n >= 5).', 'scaffolded'),
          ],
          solution: 'n >= 5 (n is greater than or equal to 5)',
          teachingPoint: '"At least" means ≥ (greater than or equal to). "At most" means ≤ (less than or equal to). These include the boundary value.',
          tags: ['inequalities', 'translation', 'word-to-algebra'], difficulty: 3,
        }),
      ]
    ),

    // Level 12 — Equation Puzzles (challenge, diff 4)
    level(`level-5-${ch}-12`, cid, 12, 'Equation Puzzles', 'challenge', 4,
      'Admiral Axiom speaks in riddles. "I\'m thinking of a number... Can you figure it out from my clues?"',
      [
        problem(`problem-5-${ch}-12-1`, `level-5-${ch}-12`, 1, {
          category: 'working_backwards',
          statement: '"I think of a number, double it, then add 3, and get 19." What is the number?',
          answer: num(8, '2n + 3 = 19, 2n = 16, n = 8'),
          hints: [
            hint(1, 'Write the equation: 2n + 3 = 19.', 'conceptual'),
            hint(2, 'First subtract 3: 2n = 16. Then divide by 2.', 'directional'),
            hint(3, '2n = 16, n = 8. Check: 2(8) + 3 = 16 + 3 = 19. Correct!', 'scaffolded'),
          ],
          solution: '2n + 3 = 19, 2n = 16, n = 8',
          teachingPoint: 'For two-step equations, undo operations in reverse order: undo addition first, then undo multiplication.',
          tags: ['equations', 'two-step', 'working-backwards'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-12-2`, `level-5-${ch}-12`, 2, {
          category: 'working_backwards',
          statement: '"I think of a number, subtract 7, then multiply by 3, and get 18." What is the number?',
          answer: num(13, '3(n-7)=18, n-7=6, n=13'),
          hints: [
            hint(1, 'Write the equation: 3(n - 7) = 18.', 'conceptual'),
            hint(2, 'First divide by 3: n - 7 = 6. Then add 7.', 'directional'),
            hint(3, 'n - 7 = 6, n = 13. Check: 3(13-7) = 3(6) = 18. Correct!', 'scaffolded'),
          ],
          solution: '3(n-7) = 18, n-7 = 6, n = 13',
          teachingPoint: 'Work backwards through the operations: undo the last operation (multiply) first, then undo the first (subtract). Reverse order!',
          tags: ['equations', 'two-step', 'working-backwards'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-12-3`, `level-5-${ch}-12`, 3, {
          category: 'working_backwards',
          statement: '"I think of a number, add 5, then divide by 2, and get 9." What is the number?',
          answer: num(13, '(n+5)/2=9, n+5=18, n=13'),
          hints: [
            hint(1, 'Write the equation: (n + 5) ÷ 2 = 9.', 'conceptual'),
            hint(2, 'First multiply by 2: n + 5 = 18. Then subtract 5.', 'directional'),
            hint(3, 'n + 5 = 18, n = 13. Check: (13+5)/2 = 18/2 = 9. Correct!', 'scaffolded'),
          ],
          solution: '(n+5)/2 = 9, n+5 = 18, n = 13',
          teachingPoint: 'Multi-step equations: undo operations in reverse order. Last operation done → first to undo.',
          tags: ['equations', 'two-step', 'working-backwards'], difficulty: 4,
        }),
      ]
    ),

    // Level 13 — Guardian of Expression Expanse (boss, diff 5)
    level(`level-5-${ch}-13`, cid, 13, 'Guardian of Expression Expanse', 'boss', 5,
      'The Guardian of Expression Expanse appears! "Expressions, equations, AND inequalities — show me you have mastered them all!"',
      [
        problem(`problem-5-${ch}-13-1`, `level-5-${ch}-13`, 1, {
          category: 'thinking',
          statement: 'If 4(x + 2) = 36, what is x?',
          answer: num(7, '4(x+2)=36, x+2=9, x=7'),
          hints: [
            hint(1, 'First divide both sides by 4, then solve for x.', 'conceptual'),
            hint(2, 'x + 2 = 36 ÷ 4 = 9. Then x = 9 - 2.', 'directional'),
            hint(3, 'x = 9 - 2 = 7. Check: 4(7+2) = 4(9) = 36. Correct!', 'scaffolded'),
          ],
          solution: '4(x+2) = 36 → x+2 = 9 → x = 7',
          teachingPoint: 'For equations with parentheses, you can either distribute first or divide first. Here dividing by 4 first is simpler.',
          tags: ['equations', 'two-step', 'parentheses', 'boss'], difficulty: 5,
        }),
        problem(`problem-5-${ch}-13-2`, `level-5-${ch}-13`, 2, {
          category: 'thinking',
          statement: 'Evaluate: 3 × (8 - 2)² ÷ 6 + 1. (Remember: parentheses, then exponents, then multiply/divide, then add.)',
          answer: num(19, '3×36÷6+1 = 3×6²÷6+1 = 3×36÷6+1 = 18+1 = 19'),
          hints: [
            hint(1, 'Follow PEMDAS strictly: Parentheses first, then exponents.', 'conceptual'),
            hint(2, '(8-2) = 6. Then 6² = 36. Then 3 × 36 ÷ 6 + 1.', 'directional'),
            hint(3, '3 × 36 = 108. 108 ÷ 6 = 18. 18 + 1 = 19.', 'scaffolded'),
          ],
          solution: '3 × (8-2)² ÷ 6 + 1 = 3 × 36 ÷ 6 + 1 = 18 + 1 = 19',
          teachingPoint: 'PEMDAS in action: (8-2)=6, then 6²=36, then left-to-right for ×÷: 3×36÷6=18, finally +1=19.',
          tags: ['order-of-operations', 'PEMDAS', 'multi-step', 'boss'], difficulty: 5,
        }),
        problem(`problem-5-${ch}-13-3`, `level-5-${ch}-13`, 3, {
          category: 'working_backwards',
          statement: '"I think of a number, multiply by 5, subtract 8, and get 32." What is the number?',
          answer: num(8, '5n - 8 = 32, 5n = 40, n = 8'),
          hints: [
            hint(1, 'Write the equation: 5n - 8 = 32.', 'conceptual'),
            hint(2, 'Add 8 to both sides: 5n = 40. Then divide by 5.', 'directional'),
            hint(3, '5n = 40, n = 8. Check: 5(8) - 8 = 40 - 8 = 32. Correct!', 'scaffolded'),
          ],
          solution: '5n - 8 = 32, 5n = 40, n = 8',
          teachingPoint: 'Two-step equation solving: undo the subtraction first (add 8), then undo the multiplication (divide by 5). Always undo in reverse order.',
          tags: ['equations', 'two-step', 'working-backwards', 'boss'], difficulty: 5,
        }),
      ]
    ),
  ];

  return {
    id: cid,
    worldId: 'world-5',
    number: ch,
    name: 'Expression Expanse',
    topic: 'expressions-equations',
    weekStart: 7,
    weekEnd: 9,
    levels,
    learningObjectives: [
      'Use variables to represent unknown numbers',
      'Write algebraic expressions from word descriptions',
      'Evaluate expressions using order of operations (PEMDAS)',
      'Solve one-step equations with all four operations',
      'Translate word problems into equations and solve',
      'Write and interpret basic inequalities',
    ],
    signatureContent: [
      'variable expressions',
      'equation solving',
      'word-to-equation translation',
      'inequality reasoning',
    ],
    isBoss: true,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function createChapters1to3() {
  return [createChapter1(), createChapter2(), createChapter3()];
}
