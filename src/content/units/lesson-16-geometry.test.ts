import { describe, expect, it } from 'vitest';
import {
  L16_CHECK,
  L16_DEFINITION,
  L16_PRACTICE_ONE,
  L16_PRACTICE_TWO,
  L16_PROPERTIES,
  L16_PROOF,
  L16_TEST_ABC,
  L16_TEST_EFJ_TRIANGLE,
  bisectorFoot,
  buildBisectorLabScene,
  buildBisectorProofScene,
  buildBisectorScene,
  distanceToLine,
  incenter,
  incircleRadius,
  measureAngle,
  type Triangle,
} from './lesson-16-geometry';
import { cross2D, distXY, midPoint } from './lesson-10-geometry';

type P = readonly [number, number];
function onLine(p: P, from: P, to: P): boolean {
  return (
    distanceToLine(p as [number, number], from as [number, number], to as [number, number]) < 1e-6
  );
}

describe('Lesson 16 — angle-bisector basics', () => {
  it('the bisector foot divides the opposite side in the ratio of the adjacent sides', () => {
    const t: Triangle = { A: [2, 5], B: [0, 0], C: [6, 1] };
    const f = bisectorFoot(t.B, t.A, t.C);
    // Bf/fC = AB/AC
    expect(distXY(t.B, f) / distXY(f, t.C)).toBeCloseTo(distXY(t.A, t.B) / distXY(t.A, t.C), 8);
    expect(onLine(f, t.B, t.C)).toBe(true);
  });

  it('the incenter lies on all three bisectors and is equidistant from the sides', () => {
    for (const t of [L16_TEST_ABC, L16_TEST_EFJ_TRIANGLE, L16_PROPERTIES]) {
      const scene = buildBisectorScene(t);
      expect(scene.concurrent).toBe(true);
      expect(scene.bisects).toBe(true);
      expect(scene.equidistant).toBe(true);
      const I = incenter(t);
      expect(distXY(scene.I, I)).toBeLessThan(1e-12);
      expect(distanceToLine(I, t.A, t.B)).toBeCloseTo(distanceToLine(I, t.B, t.C), 7);
      expect(distanceToLine(I, t.B, t.C)).toBeCloseTo(distanceToLine(I, t.C, t.A), 7);
    }
  });

  it('each bisector splits its vertex angle into two equal halves', () => {
    for (const t of [L16_TEST_ABC, L16_TEST_EFJ_TRIANGLE]) {
      const s = buildBisectorScene(t);
      expect(s.halves.A[0]).toBeCloseTo(s.halves.A[1], 6);
      expect(s.halves.B[0]).toBeCloseTo(s.halves.B[1], 6);
      expect(s.halves.C[0]).toBeCloseTo(s.halves.C[1], 6);
    }
  });

  it('the incircle is tangent to all three sides (radius = common distance)', () => {
    const t = L16_PROPERTIES;
    const r = incircleRadius(t);
    const I = incenter(t);
    expect(distanceToLine(I, t.A, t.B)).toBeCloseTo(r, 8);
    expect(distanceToLine(I, t.B, t.C)).toBeCloseTo(r, 8);
    expect(distanceToLine(I, t.C, t.A)).toBeCloseTo(r, 8);
  });
});

describe('Lesson 16 — definition figure (pages 62–63)', () => {
  it('the bisector from A makes two equal angles with [AB] and [AC]', () => {
    const d = L16_DEFINITION;
    expect(d.halfA[0]).toBeCloseTo(d.halfA[1], 6);
    expect(onLine(d.foot, d.B, d.C)).toBe(true);
    expect(onLine(d.A, d.span.from, d.span.to)).toBe(true);
  });
});

describe('Lesson 16 — the page-62 proof (bisectors of B̂ and Ĉ)', () => {
  const s = L16_PROOF;
  it('L is the foot of I on (BC), H on [BA] with BH = BL, K on [AC] with CK = CL', () => {
    expect(onLine(s.L, s.B, s.C)).toBe(true);
    expect(distXY(s.B, s.H)).toBeCloseTo(distXY(s.B, s.L), 6);
    expect(distXY(s.C, s.K)).toBeCloseTo(distXY(s.C, s.L), 6);
    expect(onLine(s.H, s.B, s.A)).toBe(true);
    expect(onLine(s.K, s.A, s.C)).toBe(true);
  });
  it('IH = IL, IK = IL, and IHB = IKC = 90°', () => {
    expect(s.IH_IL).toBe(true);
    expect(s.IK_IL).toBe(true);
    expect(s.IHB90).toBe(true);
    expect(s.IKC90).toBe(true);
    expect(measureAngle(s.I, s.H, s.B)).toBeCloseTo(90, 5);
    expect(measureAngle(s.I, s.K, s.C)).toBeCloseTo(90, 5);
  });
  it('AH = AK (admitted by the source) holds numerically', () => {
    expect(s.AH_AK).toBe(true);
  });
  it('(AI) is the perpendicular bisector of [HK] and the bisector of Â', () => {
    expect(s.AI_bisectsHK).toBe(true);
    expect(s.AI_bisectsA).toBe(true);
    // I is equidistant from H and K, and A is too ⇒ (AI) ⟂ [HK] at its midpoint
    expect(distXY(s.I, s.H)).toBeCloseTo(distXY(s.I, s.K), 6);
    expect(measureAngle(s.A, midPoint(s.H, s.K), s.K)).toBeCloseTo(90, 5);
  });
  it('holds for another scalene triangle', () => {
    const o = buildBisectorProofScene({ A: [4, 6], B: [1, 1], C: [7, 2] });
    expect(o.IH_IL && o.IK_IL && o.IHB90 && o.IKC90).toBe(true);
    expect(o.AI_bisectsA).toBe(true);
  });
});

describe('Lesson 16 — check (page 63): BC = 7, CBA = 36°, BCA = 64°', () => {
  const s = L16_CHECK;
  it('honours the printed magnitudes and derives Â = 80°', () => {
    expect(measureAngle(s.A, s.B, s.C)).toBeCloseTo(36, 5); // CBA at B
    expect(measureAngle(s.B, s.C, s.A)).toBeCloseTo(64, 5); // BCA at C
    expect(s.Ahat).toBeCloseTo(80, 5);
    expect(distXY(s.B, s.C) / s.scale).toBeCloseTo(7, 6);
  });
  it('the three bisectors are concurrent at the incenter', () => {
    expect(s.concurrent).toBe(true);
    expect(s.bisects).toBe(true);
  });
});

describe('Lesson 16 — practice ① (ERT, incenter C, CRT = 25°, CTR = 31°)', () => {
  const s = L16_PRACTICE_ONE;
  it('derives R̂ = 50°, T̂ = 62°, RÊT = 68°', () => {
    expect(s.Rhat).toBe(50);
    expect(s.That).toBe(62);
    expect(s.RET).toBeCloseTo(68, 5);
  });
  it('reproduces the given half-angles CRT = 25°, CTR = 31°', () => {
    expect(s.CRTcomputed).toBeCloseTo(25, 5);
    expect(s.CTRcomputed).toBeCloseTo(31, 5);
    expect(s.RhatComputed).toBeCloseTo(50, 5);
    expect(s.ThatComputed).toBeCloseTo(62, 5);
  });
  it('C is the incenter of ERT (on the bisectors from R and T)', () => {
    expect(distXY(s.C, incenter({ A: s.E, B: s.R, C: s.T }))).toBeLessThan(1e-9);
    expect(onLine(s.C, s.R, s.spanRC.to)).toBe(true);
  });
});

describe('Lesson 16 — practice ② (ABC = 84°, ACB = 62°, J incenter)', () => {
  const s = L16_PRACTICE_TWO;
  it('derives BÂC = 34°', () => {
    expect(s.Ahat).toBeCloseTo(34, 5);
    expect(measureAngle(s.A, s.B, s.C)).toBeCloseTo(84, 5);
    expect(measureAngle(s.A, s.C, s.B)).toBeCloseTo(62, 5);
  });
  it('J is the incenter (intersection of the bisectors of B̂ and Ĉ)', () => {
    expect(distXY(s.J, incenter({ A: s.A, B: s.B, C: s.C }))).toBeLessThan(1e-9);
  });
  it('triangle JAB has angles 17°, 42°, 121°', () => {
    expect(s.sub.JAB.A).toBeCloseTo(17, 4);
    expect(s.sub.JAB.B).toBeCloseTo(42, 4);
    expect(s.sub.JAB.J).toBeCloseTo(121, 4);
  });
  it('triangle JBC has angles 42°, 31°, 107°', () => {
    expect(s.sub.JBC.B).toBeCloseTo(42, 4);
    expect(s.sub.JBC.C).toBeCloseTo(31, 4);
    expect(s.sub.JBC.J).toBeCloseTo(107, 4);
  });
  it('triangle JCA has angles 31°, 17°, 132°', () => {
    expect(s.sub.JCA.C).toBeCloseTo(31, 4);
    expect(s.sub.JCA.A).toBeCloseTo(17, 4);
    expect(s.sub.JCA.J).toBeCloseTo(132, 4);
  });
  it('the angles about J sum to 360°', () => {
    expect(s.atJ.AJB + s.atJ.BJC + s.atJ.CJA).toBeCloseTo(360, 4);
  });
});

describe('Lesson 16 — the bisector lab recomputes for any triangle', () => {
  it.each([
    { A: [3, 6], B: [1, 1], C: [7, 1.5] },
    { A: [2, 2], B: [0, 5], C: [8, 5] },
    { A: [5, 5], B: [1, 1], C: [6, 2] },
  ] as Triangle[])('case %#', (t) => {
    const scene = buildBisectorLabScene(t);
    expect(scene.concurrent).toBe(true);
    expect(scene.bisects).toBe(true);
    expect(scene.equidistant).toBe(true);
    expect(scene.sideDistances.BC).toBeCloseTo(scene.radius, 7);
    expect(scene.sideDistances.CA).toBeCloseTo(scene.radius, 7);
    expect(scene.sideDistances.AB).toBeCloseTo(scene.radius, 7);
    expect(distXY(scene.circle.center, scene.I)).toBeLessThan(1e-12);
  });

  it('cross2D detects collinearity of the incenter with each bisector', () => {
    const t: Triangle = { A: [3, 6], B: [1, 1], C: [7, 1.5] };
    const s = buildBisectorScene(t);
    expect(Math.abs(cross2D(t.A, s.feet.A, t.A, s.I))).toBeLessThan(1e-7);
  });
});
