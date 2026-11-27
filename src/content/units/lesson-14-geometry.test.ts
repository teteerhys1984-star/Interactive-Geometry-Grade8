import { describe, expect, it } from 'vitest';
import {
  L14_CASES,
  L14_CHECK,
  L14_DEFINITION,
  L14_EXAMPLE_ONE,
  L14_EXAMPLE_TWO,
  L14_PRACTICE_FOUR,
  L14_PRACTICE_ONE,
  L14_PRACTICE_TWO,
  L14_PROOF,
  altitudeFoot,
  buildAltitudeLabScene,
  buildAltitudeScene,
  buildProofScene,
  isRightAngleAt,
  measureAngle,
  onSegment,
  orthocenter,
  projectOnLine,
  type Triangle,
} from './lesson-14-geometry';
import { cross2D, distXY, dot2D, midPoint } from './lesson-10-geometry';

type P = readonly [number, number];

function distanceToLine(p: P, from: P, to: P): number {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  return Math.abs((p[0] - from[0]) * dy - (p[1] - from[1]) * dx) / len;
}

describe('Lesson 14 — altitude basics', () => {
  it('projects a vertex perpendicularly onto the opposite side', () => {
    const t: Triangle = { A: [2, 5], B: [0, 0], C: [6, 1] };
    const foot = altitudeFoot(t.A, t.B, t.C);
    // foot lies on (BC) and (A foot) ⟂ (BC)
    expect(Math.abs(cross2D(t.B, t.C, t.B, foot))).toBeLessThan(1e-9);
    expect(Math.abs(dot2D(t.A, foot, t.B, t.C))).toBeLessThan(1e-9);
  });

  it('the orthocenter lies on all three altitude lines', () => {
    for (const c of L14_CASES) {
      const t: Triangle = { A: c.A, B: c.B, C: c.C };
      const H = orthocenter(t);
      const feet = [
        altitudeFoot(t.A, t.B, t.C),
        altitudeFoot(t.B, t.A, t.C),
        altitudeFoot(t.C, t.A, t.B),
      ];
      const verts = [t.A, t.B, t.C];
      feet.forEach((f, i) => {
        expect(distanceToLine(H, verts[i]!, f)).toBeLessThan(1e-7);
      });
    }
  });

  it('each drawn altitude span carries its vertex, its foot and H', () => {
    for (const c of L14_CASES) {
      expect(c.concurrent).toBe(true);
      const verts = [c.A, c.B, c.C];
      const feet = [c.feet.A, c.feet.B, c.feet.C];
      c.spans.forEach((s, i) => {
        expect(distanceToLine(verts[i]!, s.from, s.to)).toBeLessThan(1e-7);
        expect(distanceToLine(feet[i]!, s.from, s.to)).toBeLessThan(1e-7);
        expect(distanceToLine(c.H, s.from, s.to)).toBeLessThan(1e-7);
      });
    }
  });
});

describe('Lesson 14 — the three printed panels (page 57)', () => {
  it('places H inside the acute triangle', () => {
    expect(L14_CASES[0]!.position).toBe('inside');
  });
  it('places H outside the triangle obtuse in A', () => {
    const c = L14_CASES[1]!;
    expect(c.position).toBe('outside');
    expect(measureAngle(c.B, c.A, c.C)).toBeGreaterThan(90);
  });
  it('places H at the right-angle vertex A of the right triangle', () => {
    const c = L14_CASES[2]!;
    expect(c.position).toBe('vertex');
    expect(isRightAngleAt(c.A, c.B, c.C)).toBe(true);
    expect(distXY(c.H, c.A)).toBeLessThan(1e-6);
  });
});

describe('Lesson 14 — the page-56 proof (anticomplementary triangle MNP)', () => {
  const s = L14_PROOF;
  it('A, B, C are the midpoints of [MP], [MN], [NP]', () => {
    expect(s.midpoints).toEqual({ A: true, B: true, C: true });
    expect(distXY(midPoint(s.M, s.P), s.A)).toBeLessThan(1e-9);
    expect(distXY(midPoint(s.M, s.N), s.B)).toBeLessThan(1e-9);
    expect(distXY(midPoint(s.N, s.P), s.C)).toBeLessThan(1e-9);
  });

  it('each side of MNP is parallel to the opposite side of ABC', () => {
    // MP ∥ BC, MN ∥ AC, NP ∥ AB
    expect(Math.abs(cross2D(s.M, s.P, s.B, s.C))).toBeLessThan(1e-9);
    expect(Math.abs(cross2D(s.M, s.N, s.A, s.C))).toBeLessThan(1e-9);
    expect(Math.abs(cross2D(s.N, s.P, s.A, s.B))).toBeLessThan(1e-9);
  });

  it('MACB and BACN and ABCP are parallelograms (MA=AP, MB=BN, NC=CP)', () => {
    expect(s.equalities).toEqual({ MA_AP: true, MB_BN: true, NC_CP: true });
    expect(distXY(s.M, s.A)).toBeCloseTo(distXY(s.A, s.P), 9);
    expect(distXY(s.M, s.A)).toBeCloseTo(distXY(s.B, s.C), 9); // MACB: MA = BC
    expect(distXY(s.A, s.P)).toBeCloseTo(distXY(s.B, s.C), 9); // ABCP: AP = BC
  });

  it('the perpendicular bisectors of MNP are the altitudes of ABC and meet at H', () => {
    // H is the circumcenter of MNP: HM = HN = HP.
    expect(distXY(s.H, s.M)).toBeCloseTo(distXY(s.H, s.N), 8);
    expect(distXY(s.H, s.N)).toBeCloseTo(distXY(s.H, s.P), 8);
    // H is also the orthocenter of ABC.
    const t: Triangle = { A: s.A, B: s.B, C: s.C };
    expect(distXY(s.H, orthocenter(t))).toBeLessThan(1e-8);
    // Each drawn bisector passes through H.
    for (const b of s.bisectors) {
      expect(distanceToLine(s.H, b.from, b.to)).toBeLessThan(1e-7);
    }
  });

  it('is robust for another scalene triangle', () => {
    const other = buildProofScene({ A: [4, 6], B: [1, 1], C: [7, 2] });
    expect(other.midpoints).toEqual({ A: true, B: true, C: true });
    expect(other.equalities).toEqual({ MA_AP: true, MB_BN: true, NC_CP: true });
  });
});

describe('Lesson 14 — definition figure (page 56)', () => {
  it('draws (d) through A perpendicular to (BC) at the foot P', () => {
    const d = L14_DEFINITION;
    expect(Math.abs(dot2D(d.A, d.foot, d.B, d.C))).toBeLessThan(1e-9);
    expect(Math.abs(cross2D(d.B, d.C, d.B, d.foot))).toBeLessThan(1e-9);
    // the drawn line passes through A and the foot
    expect(distanceToLine(d.A, d.from, d.to)).toBeLessThan(1e-9);
    expect(distanceToLine(d.foot, d.from, d.to)).toBeLessThan(1e-9);
  });
});

describe('Lesson 14 — example 1 (page 57, obtuse at A)', () => {
  const s = L14_EXAMPLE_ONE;
  it('is obtuse at A and H lies outside the triangle', () => {
    expect(measureAngle(s.B, s.A, s.C)).toBeGreaterThan(90);
    expect(s.position).toBe('outside');
  });
  it('the altitude from B meets (CA) extended beyond A at a right angle', () => {
    expect(Math.abs(dot2D(s.B, s.footB, s.C, s.A))).toBeLessThan(1e-9);
    // footB is on line (CA) but beyond A (outside segment [CA])
    expect(Math.abs(cross2D(s.C, s.A, s.C, s.footB))).toBeLessThan(1e-9);
    expect(onSegment(s.footB, s.C, s.A)).toBe(false);
  });
});

describe('Lesson 14 — example 2 (pages 57–58): orthocenter of AHC is B', () => {
  const s = L14_EXAMPLE_TWO;
  it('[AL] ⟂ (BC) and [CK] ⟂ (AB), meeting at H', () => {
    expect(Math.abs(dot2D(s.A, s.L, s.B, s.C))).toBeLessThan(1e-9);
    expect(Math.abs(dot2D(s.C, s.K, s.A, s.B))).toBeLessThan(1e-9);
    expect(distanceToLine(s.H, s.A, s.L)).toBeLessThan(1e-7);
    expect(distanceToLine(s.H, s.C, s.K)).toBeLessThan(1e-7);
  });
  it('the orthocenter of triangle AHC is exactly B', () => {
    expect(distXY(s.orthocenterOfAHC, s.B)).toBeLessThan(1e-7);
  });
});

describe('Lesson 14 — check (page 58): B = 120°, BA = 5, BC = 4', () => {
  const s = L14_CHECK;
  it('honours the printed magnitudes', () => {
    expect(measureAngle(s.A, s.B, s.C)).toBeCloseTo(120, 6);
    expect(distXY(s.B, s.A) / s.scale).toBeCloseTo(5, 6);
    expect(distXY(s.B, s.C) / s.scale).toBeCloseTo(4, 6);
  });
  it('obtuse at B ⇒ orthocenter outside the triangle', () => {
    expect(s.position).toBe('outside');
    expect(s.concurrent).toBe(true);
  });
});

describe('Lesson 14 — practice ①: orthocenters of AHB, AHC, BHC', () => {
  const s = L14_PRACTICE_ONE;
  it('are C, B, A respectively', () => {
    expect(distXY(s.orthocenters.AHB, s.C)).toBeLessThan(1e-7);
    expect(distXY(s.orthocenters.AHC, s.B)).toBeLessThan(1e-7);
    expect(distXY(s.orthocenters.BHC, s.A)).toBeLessThan(1e-7);
  });
});

describe('Lesson 14 — practice ②: orthocenter of AJB is C', () => {
  const s = L14_PRACTICE_TWO;
  it('[BE] ⟂ (AC), [CF] ⟂ (AB), meeting at J', () => {
    expect(Math.abs(dot2D(s.B, s.E, s.A, s.C))).toBeLessThan(1e-9);
    expect(Math.abs(dot2D(s.C, s.F, s.A, s.B))).toBeLessThan(1e-9);
    expect(distanceToLine(s.J, s.B, s.E)).toBeLessThan(1e-7);
    expect(distanceToLine(s.J, s.C, s.F)).toBeLessThan(1e-7);
  });
  it('the orthocenter of triangle AJB is exactly C', () => {
    expect(distXY(s.orthocenterOfAJB, s.C)).toBeLessThan(1e-7);
  });
});

describe('Lesson 14 — practice ④: rectangle, orthocenter of AMC is N', () => {
  const s = L14_PRACTICE_FOUR;
  it('ABCD is a rectangle with center O the midpoint of both diagonals', () => {
    expect(distXY(midPoint(s.A, s.C), s.O)).toBeLessThan(1e-9);
    expect(distXY(midPoint(s.B, s.D), s.O)).toBeLessThan(1e-9);
    expect(isRightAngleAt(s.A, s.B, s.D)).toBe(true);
  });
  it('(MN) passes through O and is perpendicular to (AC)', () => {
    expect(distanceToLine(s.O, s.M, s.N)).toBeLessThan(1e-9);
    expect(Math.abs(dot2D(s.M, s.N, s.A, s.C))).toBeLessThan(1e-9);
  });
  it('N lies on [DC] and M lies on (AD) beyond D', () => {
    expect(s.nOnDC).toBe(true);
    expect(s.mBeyondD).toBe(true);
  });
  it('the orthocenter of triangle AMC is exactly N', () => {
    expect(distXY(s.orthocenterOfAMC, s.N)).toBeLessThan(1e-7);
  });
  it('the third altitude from A is perpendicular to (MC) and passes through N', () => {
    expect(Math.abs(dot2D(s.A, s.footThird, s.M, s.C))).toBeLessThan(1e-9);
    expect(distanceToLine(s.N, s.A, s.footThird)).toBeLessThan(1e-7);
  });
});

describe('Lesson 14 — the altitude lab recomputes concurrence for any triangle', () => {
  it.each([
    { A: [3, 6], B: [1, 1], C: [7, 1.5] },
    { A: [3, 2], B: [1, 5], C: [7, 5.5] },
    { A: [2, 5], B: [1, 1], C: [6, 1] },
  ] as Triangle[])('case %#', (t) => {
    const scene = buildAltitudeLabScene(t);
    expect(scene.concurrent).toBe(true);
    const H = orthocenter(t);
    expect(distXY(scene.H, H)).toBeLessThan(1e-9);
    // each altitude is perpendicular to its opposite side
    expect(Math.abs(dot2D(t.A, scene.feet.A, t.B, t.C))).toBeLessThan(1e-9);
    expect(Math.abs(dot2D(t.B, scene.feet.B, t.A, t.C))).toBeLessThan(1e-9);
    expect(Math.abs(dot2D(t.C, scene.feet.C, t.A, t.B))).toBeLessThan(1e-9);
  });

  it('projectOnLine is idempotent on a point already on the line', () => {
    const p = projectOnLine([3, 0], [0, 0], [6, 0]);
    expect(distXY(p, [3, 0])).toBeLessThan(1e-9);
  });

  it('buildAltitudeScene agrees with the lab scene', () => {
    const t: Triangle = { A: [3, 6], B: [1, 1], C: [7, 1.5] };
    const a = buildAltitudeScene(t);
    const b = buildAltitudeLabScene(t);
    expect(distXY(a.H, b.H)).toBeLessThan(1e-12);
    expect(a.position).toBe(b.position);
  });
});
