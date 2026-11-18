import { describe, expect, it } from 'vitest';

import {
  L13_ACTIVITY_TRIANGLE,
  L13_CHECK,
  L13_DEFINITION,
  L13_OPENER_ARCS,
  L13_OPENER_ANGLE_PANELS,
  L13_OPENER_LINE_PANELS,
  L13_OPENER_SEGMENT,
  L13_PRACTICE_ONE,
  L13_PRACTICE_THREE,
  L13_PRACTICE_TWO,
  L13_PROPERTY,
  L13_SEGMENT_ARCS,
  L13_SPECIAL_CASES,
  angleDeg,
  buildActivityScene,
  buildBisectorLabScene,
  isRightAngleAt,
  measureAngle,
  perpendicularBisector,
} from './lesson-13-geometry';
import { distXY, midPoint, unitVec } from './lesson-10-geometry';

type P = readonly [number, number];
type Line = { from: P; to: P };

/** Distance from `p` to the infinite line through the two points of `line`. */
function distanceToLine(p: P, line: Line): number {
  const [a, b] = [line.from, line.to];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const length = Math.hypot(dx, dy) || 1;
  return Math.abs((p[0] - a[0]) * dy - (p[1] - a[1]) * dx) / length;
}

/** A bisector given as foot + direction, in the shape `distanceToLine` wants. */
function asLine(bisector: { foot: P; dir: P }): Line {
  return {
    from: bisector.foot,
    to: [bisector.foot[0] + bisector.dir[0], bisector.foot[1] + bisector.dir[1]],
  };
}

const SIDE_ORDER = ['[AB]', '[BC]', '[CA]'] as const;

describe('Lesson 13 — the three bisectors of a triangle meet at one point', () => {
  const scenes = [
    { name: 'النشاط — صفحة ٥٤', scene: buildBisectorLabScene(L13_ACTIVITY_TRIANGLE, 0) },
    ...L13_SPECIAL_CASES.map((scene) => ({ name: scene.id, scene })),
  ];

  it.each(scenes)('$name: O is the real intersection of all three drawn lines', ({ scene }) => {
    expect(scene.bisectors).toHaveLength(3);
    for (const line of scene.bisectors) {
      // O must lie ON each line as drawn: the figure shows the concurrence, so
      // the strokes have to carry the point, not merely be stored beside it.
      expect(distanceToLine(scene.O, line)).toBeLessThan(1e-9);
    }
  });

  it.each(scenes)('$name: OA = OB = OC, so O is the centre of the circle', ({ scene }) => {
    expect(distXY(scene.O, scene.A)).toBeCloseTo(distXY(scene.O, scene.B), 9);
    expect(distXY(scene.O, scene.B)).toBeCloseTo(distXY(scene.O, scene.C), 9);
    expect(scene.R ?? distXY(scene.O, scene.A)).toBeCloseTo(distXY(scene.O, scene.A), 9);
  });

  it('each drawn line is perpendicular to its own side, through its midpoint', () => {
    for (const scene of L13_SPECIAL_CASES) {
      const sides: [P, P][] = [
        [scene.A, scene.B],
        [scene.B, scene.C],
        [scene.A, scene.C],
      ];
      sides.forEach(([p, q], index) => {
        const line = scene.bisectors[index]!;
        const side = unitVec(p, q);
        const stroke = unitVec(line.from, line.to);
        expect(Math.abs(side[0] * stroke[0] + side[1] * stroke[1])).toBeLessThan(1e-9);
        expect(distanceToLine(midPoint(p, q), line)).toBeLessThan(1e-9);
      });
    }
  });

  it('the activity triangle is neither right nor isosceles, as the page demands', () => {
    // «يجب ألا يرسم شكل في حالة خاصة (لا مثلث قائم ولا متساوي الساقين)»
    const scene = buildActivityScene(L13_ACTIVITY_TRIANGLE);
    expect(scene.isScalene).toBe(true);
    expect(scene.hasNoRightAngle).toBe(true);
    expect(scene.oOnDSecond).toBe(true);
    expect(scene.equalities).toEqual({ OA_OB: true, OB_OC: true, OA_OC: true });
    const lab = buildBisectorLabScene(L13_ACTIVITY_TRIANGLE, 0);
    expect(lab.concurrent).toBe(true);
    expect(lab.equalRadii).toBe(true);
    expect(lab.position).toBe('inside');
  });
});

describe('Lesson 13 — the special cases of page 55', () => {
  const [acute, obtuse, right] = L13_SPECIAL_CASES;

  it('numbers the panels ① acute, ② obtuse, ③ right', () => {
    expect([acute!.id, obtuse!.id, right!.id]).toEqual(['acute', 'obtuse', 'right']);
  });

  it('places O inside, outside, and on the side, as the printed panels show', () => {
    expect(acute!.position).toBe('inside');
    expect(obtuse!.position).toBe('outside');
    expect(right!.position).toBe('on-side');
  });

  it('makes the right panel right at A, with O the midpoint of the hypotenuse', () => {
    expect(isRightAngleAt(right!.A, right!.B, right!.C)).toBe(true);
    const midpoint = midPoint(right!.B, right!.C);
    expect(right!.O[0]).toBeCloseTo(midpoint[0], 9);
    expect(right!.O[1]).toBeCloseTo(midpoint[1], 9);
  });

  it('keeps the obtuse panel obtuse at A and the acute panel acute', () => {
    expect(measureAngle(obtuse!.B, obtuse!.A, obtuse!.C)).toBeGreaterThan(90);
    expect(measureAngle(acute!.B, acute!.A, acute!.C)).toBeLessThan(90);
  });
});

describe('Lesson 13 — page 54: the property M ∈ (d) ⇔ MB = MC', () => {
  it('keeps MB = MC for every position of M on the bisector', () => {
    for (let t = -3; t <= 3; t += 0.25) {
      const scene = buildBisectorLabScene(L13_ACTIVITY_TRIANGLE, t);
      expect(scene.MB).toBeCloseTo(scene.MC, 9);
      expect(scene.equidistant).toBe(true);
    }
  });

  it('really moves M along the bisector of [BC] (the lab would be a lie otherwise)', () => {
    const a = buildBisectorLabScene(L13_ACTIVITY_TRIANGLE, -1.5);
    const b = buildBisectorLabScene(L13_ACTIVITY_TRIANGLE, 1.5);
    expect(distXY(a.M, b.M)).toBeGreaterThan(1);
    for (const scene of [a, b]) {
      expect(distanceToLine(scene.M, asLine(perpendicularBisector(scene.B, scene.C)))).toBeLessThan(
        1e-9,
      );
      expect(distanceToLine(scene.M, scene.bisectors[1]!)).toBeLessThan(1e-9);
    }
  });

  it('draws the definition figure with the bisector of [BC] at its midpoint', () => {
    const { A, B, C, bisector, from, to } = L13_DEFINITION;
    expect(distXY(bisector.foot, B)).toBeCloseTo(distXY(bisector.foot, C), 9);
    expect(distanceToLine(bisector.foot, { from: B, to: C })).toBeLessThan(1e-9);
    // The stroke drawn on the page is that very line, and it is perpendicular.
    expect(distanceToLine(bisector.foot, { from, to })).toBeLessThan(1e-9);
    const side = unitVec(B, C);
    const stroke = unitVec(from, to);
    expect(Math.abs(side[0] * stroke[0] + side[1] * stroke[1])).toBeLessThan(1e-9);
    expect(distanceToLine(A, { from, to })).toBeGreaterThan(0.5);
  });

  it('draws the property figure as an isosceles triangle MBC', () => {
    const { M, B, C, MB, MC } = L13_PROPERTY;
    expect(MB).toBeCloseTo(MC, 9);
    expect(distXY(M, B)).toBeCloseTo(distXY(M, C), 9);
    expect(measureAngle(B, M, C)).toBeGreaterThan(0);
  });
});

describe('Lesson 13 — page 53, questions ① and ②', () => {
  const byId = Object.fromEntries(L13_OPENER_LINE_PANELS.map((panel) => [panel.id, panel]));

  it('has exactly three panels, using the SAME triangle so only the marks differ', () => {
    expect(L13_OPENER_LINE_PANELS).toHaveLength(3);
    const [first, second, third] = L13_OPENER_LINE_PANELS;
    expect(first!.triangle).toEqual(second!.triangle);
    expect(second!.triangle).toEqual(third!.triangle);
  });

  it('panel ① is the altitude: through A, square at the foot, foot NOT the midpoint', () => {
    const panel = byId.one!;
    expect(panel.hasRightAngle).toBe(true);
    expect(panel.passesThroughA).toBe(true);
    expect(panel.footIsMidpoint).toBe(false);
    expect(panel.hasMidpointTicks).toBe(false);
    const side = unitVec(panel.triangle.B, panel.triangle.C);
    const stroke = unitVec(panel.line.from, panel.line.to);
    expect(Math.abs(side[0] * stroke[0] + side[1] * stroke[1])).toBeLessThan(1e-9);
    expect(distanceToLine(panel.triangle.A, panel.line)).toBeLessThan(1e-9);
    // The stroke reaches A: the altitude is drawn from the vertex, not below it.
    expect(distXY(panel.line.to, panel.triangle.A)).toBeLessThan(0.5);
    expect(distXY(panel.foot, panel.triangle.A)).toBeGreaterThan(0.5);
  });

  it('panel ② is the bisector of [BC]: at the midpoint, perpendicular, not through A', () => {
    const panel = byId.two!;
    expect(panel.hasRightAngle).toBe(true);
    expect(panel.hasMidpointTicks).toBe(true);
    expect(panel.footIsMidpoint).toBe(true);
    expect(panel.passesThroughA).toBe(false);
    expect(distXY(panel.foot, midPoint(panel.triangle.B, panel.triangle.C))).toBeLessThan(1e-9);
    expect(distanceToLine(panel.triangle.A, panel.line)).toBeGreaterThan(0.5);
  });

  it('panel ③ is the median: through A and the midpoint, but NOT perpendicular', () => {
    const panel = byId.three!;
    expect(panel.passesThroughA).toBe(true);
    expect(panel.footIsMidpoint).toBe(true);
    expect(panel.hasMidpointTicks).toBe(true);
    expect(panel.hasRightAngle).toBe(false);
    const side = unitVec(panel.triangle.B, panel.triangle.C);
    const stroke = unitVec(panel.line.from, panel.line.to);
    expect(Math.abs(side[0] * stroke[0] + side[1] * stroke[1])).toBeGreaterThan(0.1);
    expect(distanceToLine(panel.triangle.A, panel.line)).toBeLessThan(1e-9);
  });

  it('question ③: every point of (d) is equidistant from J and K', () => {
    const { J, K, M, bisector, MJ, MK } = L13_OPENER_SEGMENT;
    expect(MJ).toBeCloseTo(MK, 9);
    expect(distXY(M, J)).toBeCloseTo(distXY(M, K), 9);
    expect(distanceToLine(M, asLine(bisector))).toBeLessThan(1e-9);
    expect(distXY(bisector.foot, J)).toBeCloseTo(distXY(bisector.foot, K), 9);
    // The drawn stroke is the same line, and M is ON it.
    expect(
      distanceToLine(M, { from: L13_OPENER_SEGMENT.from, to: L13_OPENER_SEGMENT.to }),
    ).toBeLessThan(1e-9);
  });
});

describe('Lesson 13 — page 53, question ④: the bisector of the angle at M', () => {
  const byId = Object.fromEntries(L13_OPENER_ANGLE_PANELS.map((panel) => [panel.id, panel]));

  it('has exactly three panels, all with the same vertex M', () => {
    expect(L13_OPENER_ANGLE_PANELS).toHaveLength(3);
    const [first, second, third] = L13_OPENER_ANGLE_PANELS;
    expect(first!.M).toEqual(second!.M);
    expect(second!.M).toEqual(third!.M);
    // ① and ③ print the SAME isosceles angle; ② prints the right triangle of
    // the page (a right angle at A), so its arms differ on purpose.
    expect(first!.K).toEqual(third!.K);
    expect(first!.A).toEqual(third!.A);
    expect(second!.K[0]).toBeCloseTo(second!.A[0], 9);
    expect(second!.K[1]).toBeGreaterThan(second!.A[1]);
  });

  it('only panel ③ marks the two angles at M as equal', () => {
    expect(byId.three!.equalAngleMarks).toBe(true);
    expect(byId.one!.equalAngleMarks).toBe(false);
    expect(byId.two!.equalAngleMarks).toBe(false);
  });

  it('panel ① marks MK = MA and says nothing about the angles', () => {
    const panel = byId.one!;
    expect(panel.marksSides).toBe(true);
    expect(panel.equalAngleMarks).toBe(false);
    expect(distXY(panel.M, panel.K)).toBeCloseTo(distXY(panel.M, panel.A), 9);
    expect(Math.abs(panel.angles.upper - panel.angles.lower)).toBeGreaterThan(1);
  });

  it('panel ② joins M to the midpoint of [AK] with a right angle at A (the median, not a bisector)', () => {
    const panel = byId.two!;
    expect(panel.joinsMidpointOfKA).toBe(true);
    expect(panel.rightAngleAtA).toBe(true);
    expect(isRightAngleAt(panel.A, panel.M, panel.K)).toBe(true);
    // The line really passes through the midpoint of [AK] and runs past it.
    const midpoint = midPoint(panel.K, panel.A);
    expect(distanceToLine(midpoint, panel.line)).toBeLessThan(1e-9);
    expect(distXY(panel.line.to, midpoint)).toBeGreaterThan(0.3);
    // ... and the two angles at M are NOT equal, so it cannot be the bisector.
    expect(Math.abs(panel.angles.upper - panel.angles.lower)).toBeGreaterThan(1);
    expect(panel.angles.upper + panel.angles.lower).toBeCloseTo(
      measureAngle(panel.K, panel.M, panel.A),
      6,
    );
  });

  it('panel ③ draws the angle bisector, and the drawn line splits the angle in half', () => {
    const panel = byId.three!;
    const whole = measureAngle(panel.K, panel.M, panel.A);
    const first = measureAngle(panel.K, panel.M, panel.line.to);
    const second = measureAngle(panel.line.to, panel.M, panel.A);
    expect(first).toBeCloseTo(second, 6);
    expect(first + second).toBeCloseTo(whole, 6);
    expect(panel.angles.upper).toBeCloseTo(panel.angles.lower, 6);
  });
});

describe('Lesson 13 — page 53, question ⑤: the equal compass arcs', () => {
  it('draws an arc centred at A through E and F, both at the same distance', () => {
    expect(L13_OPENER_ARCS.AE).toBeCloseTo(L13_OPENER_ARCS.rA, 9);
    expect(L13_OPENER_ARCS.AF).toBeCloseTo(L13_OPENER_ARCS.rA, 9);
  });

  it('makes the two arcs of E and F meet, with PE = PF', () => {
    const arcs = L13_OPENER_ARCS;
    expect(arcs.rEF).toBeGreaterThan(arcs.PE - 1e-9);
    expect(arcs.PE).toBeCloseTo(arcs.rEF, 9);
    expect(arcs.PF).toBeCloseTo(arcs.rEF, 9);
    // The arcs actually meet: r is longer than half the chord [EF].
    expect(arcs.rEF).toBeGreaterThan(distXY(arcs.E, arcs.F) / 2);
    expect(arcs.rEF).toBeLessThan(arcs.rA);
  });

  it('lands the meeting point INSIDE the angle, so [AP) really bisects it', () => {
    const arcs = L13_OPENER_ARCS;
    expect(arcs.angleEAP).toBeCloseTo(arcs.anglePAF, 6);
    expect(arcs.angleEAP + arcs.anglePAF).toBeCloseTo(measureAngle(arcs.E, arcs.A, arcs.F), 6);
  });

  it('sweeps the arc centred at A on the inside of the angle, from E to F', () => {
    const { arcA, A, E, F, rA } = L13_OPENER_ARCS;
    const ccw = (arcA.to - arcA.from + 360) % 360;
    expect(ccw).toBeGreaterThan(0);
    const onCircle = (angle: number): P => [
      A[0] + rA * Math.cos((angle * Math.PI) / 180),
      A[1] + rA * Math.sin((angle * Math.PI) / 180),
    ];
    expect(Math.min(distXY(onCircle(arcA.from), E), distXY(onCircle(arcA.from), F))).toBeLessThan(
      1e-6,
    );
    expect(Math.min(distXY(onCircle(arcA.to), E), distXY(onCircle(arcA.to), F))).toBeLessThan(1e-6);
    // The arc passes through the bisector point, i.e. it is the inner arc.
    const through = angleDeg(A, L13_OPENER_ARCS.bisectorTarget);
    expect((through - arcA.from + 360) % 360).toBeLessThanOrEqual(ccw + 1e-9);
  });

  it('page 54: the two equal arcs centred at B and C both pass through P and Q', () => {
    const arcs = L13_SEGMENT_ARCS;
    for (const target of [arcs.P1, arcs.P2]) {
      expect(distXY(arcs.B, target)).toBeCloseTo(arcs.r, 6);
      expect(distXY(arcs.C, target)).toBeCloseTo(arcs.r, 6);
    }
    // Each of the four short marks is centred on one of those two points.
    expect(arcs.shortArcs).toHaveLength(4);
    for (const mark of arcs.shortArcs) {
      const middle = (mark.from + mark.to) / 2;
      const centre = mark.at === arcs.B ? arcs.B : arcs.C;
      const point = [
        centre[0] + arcs.r * Math.cos((middle * Math.PI) / 180),
        centre[1] + arcs.r * Math.sin((middle * Math.PI) / 180),
      ] as P;
      expect(Math.min(distXY(point, arcs.P1), distXY(point, arcs.P2))).toBeLessThan(1e-6);
      expect(mark.to - mark.from).toBeCloseTo(30, 6);
    }
    // P and Q lie on opposite sides of [BC]: the bisector joins them.
    const side = unitVec(arcs.B, arcs.C);
    const normal: P = [-side[1], side[0]];
    const signed = (p: P) => (p[0] - arcs.B[0]) * normal[0] + (p[1] - arcs.B[1]) * normal[1];
    expect(Math.sign(signed(arcs.P1))).toBe(-Math.sign(signed(arcs.P2)));
    // And the drawn bisector passes through both.
    const line = { from: arcs.from, to: arcs.to };
    expect(distanceToLine(arcs.P1, line)).toBeLessThan(1e-9);
    expect(distanceToLine(arcs.P2, line)).toBeLessThan(1e-9);
  });
});

describe('Lesson 13 — page 55, تدرّب', () => {
  it('① puts M on both bisectors, so MA = MB = MC and MAC is isosceles at M', () => {
    const { M, spans, A, B, C, MA, MB, MC } = L13_PRACTICE_ONE;
    expect(distanceToLine(M, spans[0]!)).toBeLessThan(1e-9);
    expect(distanceToLine(M, spans[1]!)).toBeLessThan(1e-9);
    expect(MA).toBeCloseTo(MB, 9);
    expect(MB).toBeCloseTo(MC, 9);
    expect(distXY(M, A)).toBeCloseTo(distXY(M, C), 9);
    void A;
    void B;
    void C;
  });

  it('② is isosceles at A twice over, so A is the centre of the circle through B, C, D', () => {
    const { A, B, C, D, radius } = L13_PRACTICE_TWO;
    expect(distXY(A, B)).toBeCloseTo(distXY(A, C), 9);
    expect(distXY(A, B)).toBeCloseTo(distXY(A, D), 9);
    expect(distXY(A, B)).toBeCloseTo(radius, 9);
  });

  it('③ keeps the printed side lengths 5 / 7.5 / 8 and a radius larger than 5', () => {
    const { sidesCm, radiusCm, A, B, C, scale } = L13_PRACTICE_THREE;
    expect(sidesCm).toEqual({ AB: 5, BC: 7.5, CA: 8 });
    expect(distXY(A, B) / scale).toBeCloseTo(5, 6);
    expect(distXY(B, C) / scale).toBeCloseTo(7.5, 6);
    expect(distXY(C, A) / scale).toBeCloseTo(8, 6);
    expect(radiusCm).toBeGreaterThan(5);
    // The condition that makes the construction possible in every pair.
    expect(radiusCm).toBeGreaterThan(8 / 2);
  });

  it('③ puts the two intersections of each circle pair on that side’s bisector', () => {
    const { commonChords, bisectors, radius, B, C, A } = L13_PRACTICE_THREE;
    expect(commonChords).toHaveLength(3);
    const sides: Record<string, [P, P]> = { AB: [A, B], BC: [B, C], CA: [C, A] };
    const order: [string, number][] = [
      ['AB', 0],
      ['BC', 1],
      ['CA', 2],
    ];
    for (const [name, index] of order) {
      const chord = commonChords.find((item) => item.side === name)!;
      expect(chord).toBeDefined();
      const [p, q] = sides[name]!;
      for (const point of chord.points) {
        expect(distXY(p, point)).toBeCloseTo(radius, 9);
        expect(distXY(q, point)).toBeCloseTo(radius, 9);
        expect(distanceToLine(point, bisectors[index]!)).toBeLessThan(1e-9);
        expect(distanceToLine(point, asLine(perpendicularBisector(p, q)))).toBeLessThan(1e-9);
      }
    }
  });

  it('③ has its three bisectors concurrent at the centre of the circle through the vertices', () => {
    const { O, A, B, C, bisectors } = L13_PRACTICE_THREE;
    for (const line of bisectors) {
      expect(distanceToLine(O, line)).toBeLessThan(1e-9);
    }
    expect(distXY(O, A)).toBeCloseTo(distXY(O, B), 9);
    expect(distXY(O, B)).toBeCloseTo(distXY(O, C), 9);
  });
});

describe('Lesson 13 — تحقّق من فهمك', () => {
  it('is a triangle whose circumcentre lies inside it, on the three bisectors', () => {
    const { A, B, C, O, R, bisectors } = L13_CHECK;
    expect(distXY(O, A)).toBeCloseTo(R, 9);
    expect(distXY(O, B)).toBeCloseTo(R, 9);
    expect(distXY(O, C)).toBeCloseTo(R, 9);
    expect(isRightAngleAt(A, B, C)).toBe(false);
    for (const line of bisectors) {
      expect(distanceToLine(O, line)).toBeLessThan(1e-9);
    }
  });
});

describe('Lesson 13 — the sides the figures cite', () => {
  it('keeps the three special panels on the same labelling', () => {
    for (const scene of L13_SPECIAL_CASES) {
      expect(distXY(scene.O, scene.A)).toBeGreaterThan(1);
      expect(SIDE_ORDER).toHaveLength(3);
    }
  });
});
