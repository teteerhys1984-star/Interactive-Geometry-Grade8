/**
 * ============================================================================
 *  UNIT 2 — «تمارين الوحدة الثانية» · SOURCE GEOMETRY OF Q1–Q17 (BATCH 1)
 * ============================================================================
 *
 *  Every coordinate below belongs to one of the twenty figures printed in the
 *  twenty scans of Batch 1 (`image-1.png` … `image-20.png` in
 *  `docs/source-scans/unit-02-exercises/batch1/`). Each figure was read from
 *  its scan: the shape of every quadrilateral, triangle, circle and rectangle,
 *  the position of every labelled point on it, and every printed mark
 *  (equality ticks, parallel arrowheads, right-angle squares, angle arcs,
 *  dashed measurement arrows, yellow highlight badges, coloured lines).
 *
 *  WHAT IS ASSERTED HERE (and in `lesson-12-batch1-geometry.test.ts`)
 *  ----------------------------------------------------------------------------
 *  • Which point lies on which segment, and in which order;
 *  • the collinear triples the page prints;
 *  • the midpoints the printed ticks announce;
 *  • the parallel relations the printed arrowheads or stems announce;
 *  • the right angles the printed squares announce, and the equal angles the
 *    printed arcs announce;
 *  • which measurement is printed on which segment.
 *
 *  THE FIGURES THAT CARRY A SOURCE DISCREPANCY
 *  ----------------------------------------------------------------------------
 *  • Question 1, item ②: the page draws `[AB]` parallel to `[CD]` and draws
 *    `B`, `J`, `K` on one straight line while the text only states
 *    `K ∈ [CD]`. Reproduced as printed; recorded in the Teacher Area.
 *  • Question 2, item ②: the text calls `K` the midpoint of `[AC]` while the
 *    page marks only `[AB]` with equality ticks. No tick is added to `[AC]`.
 * ============================================================================
 */

export interface FigurePoint {
  readonly x: number;
  readonly y: number;
}

/* -------------------------------------------------------------------------- */
/*  Question 1, item ② — the quadrilateral with I, J and K (image 1)          */
/* -------------------------------------------------------------------------- */

export const Q1_VIEW_BOX = '0 0 460 265';

/**
 * Read from scan `image-1.png` (`A(241,543) B(403,543) C(147,721) D(505,723)
 * I(194,635) J(375,635) K(347,723)`): mapped into the figure canvas so that I
 * is the exact midpoint of [AC], J is the exact midpoint of [AD], B–J–K is
 * collinear with K on [CD], and [IJ] ∥ [CD].
 */
export const Q1_POINTS = {
  A: { x: 140, y: 40 },
  B: { x: 302, y: 40 },
  C: { x: 46, y: 220 },
  D: { x: 404, y: 220 },
  I: { x: 93, y: 130 },
  J: { x: 272, y: 130 },
  K: { x: 242, y: 220 },
} as const;

/** One red tick on each half of [AC], two red ticks on each half of [AD]. */
export const Q1_TICKS = {
  ai: { x: 116.5, y: 85, count: 1 },
  ic: { x: 69.5, y: 175, count: 1 },
  aj: { x: 206, y: 85, count: 2 },
  jd: { x: 338, y: 175, count: 2 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 1, item ③ — the three candidate figures (image 2)                */
/* -------------------------------------------------------------------------- */

/** Figure ③: triangle ABC, I on [BC] with TWO red ticks on each half. */
export const Q1_CASE_THREE_VIEW_BOX = '0 0 380 375';
export const Q1_CASE_THREE_POINTS = {
  A: { x: 30, y: 210 },
  B: { x: 185, y: 25 },
  C: { x: 345, y: 305 },
  I: { x: 265, y: 165 },
  J: { x: 203.25, y: 262.25 },
} as const;
export const Q1_CASE_THREE_TICKS = {
  bi: { x: 225, y: 95, count: 2 },
  ic: { x: 305, y: 235, count: 2 },
} as const;

/** Figure ②: triangle ABC with I on [BC], J on [AC], and NO marks at all. */
export const Q1_CASE_TWO_VIEW_BOX = '0 0 340 375';
export const Q1_CASE_TWO_POINTS = {
  A: { x: 305, y: 95 },
  B: { x: 35, y: 30 },
  C: { x: 45, y: 305 },
  I: { x: 40, y: 167.5 },
  J: { x: 188, y: 189.5 },
} as const;

/** Figure ①: right triangle ABC, [IJ] ⊥ [BC], red squares at B and at I. */
export const Q1_CASE_ONE_VIEW_BOX = '0 0 280 375';
export const Q1_CASE_ONE_POINTS = {
  A: { x: 35, y: 30 },
  B: { x: 35, y: 300 },
  C: { x: 245, y: 300 },
  I: { x: 140, y: 300 },
  J: { x: 140, y: 165 },
} as const;
export const Q1_CASE_ONE_TICKS = {
  bi: { x: 87.5, y: 300, count: 2 },
  ic: { x: 192.5, y: 300, count: 2 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 1, items ④–⑤ — the Thales triangle NAB (image 3)                 */
/* -------------------------------------------------------------------------- */

/**
 * Read from scan `image-3.png`: `N(362.5,54.4) A(105,469) B(389,496)
 * M(276.7,192.6) P(371.3,201.6)` shifted by (-60, -20). Note that the printed
 * figure is to scale (`NM / NA = NP / NB = MP / AB = 1 / 3`).
 */
export const Q1_THALES_VIEW_BOX = '0 0 380 500';
export const Q1_THALES_POINTS = {
  N: { x: 302.5, y: 34.4 },
  A: { x: 45, y: 449 },
  B: { x: 329, y: 476 },
  M: { x: 216.7, y: 172.6 },
  P: { x: 311.3, y: 181.6 },
} as const;
export const Q1_THALES_MEASURES = {
  two: { x: 242, y: 112 },
  four: { x: 112, y: 322 },
  onePointEight: { x: 334, y: 122 },
  onePointTwo: { x: 262, y: 214 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 2, item ① — the two circles (image 4)                             */
/* -------------------------------------------------------------------------- */

export const Q2_CIRCLES_VIEW_BOX = '0 0 520 320';
export const Q2_CIRCLES = {
  /** The centre of the larger circle ℭ. */
  O: { x: 160, y: 150 },
  /** The centre of the smaller circle ℭ'. */
  OPrime: { x: 380, y: 150 },
  radius: 150,
  radiusPrime: 110,
  /** The upper intersection of the two circles. */
  A: { x: 293.64, y: 81.87 },
  /** Where (AO) cuts ℭ again: diametrically opposite A across O. */
  B: { x: 26.36, y: 218.13 },
  /** Where (AO') cuts ℭ' again: diametrically opposite A across O'. */
  BPrime: { x: 466.36, y: 218.13 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 2, item ② — the triangle with J and K (image 4)                   */
/* -------------------------------------------------------------------------- */

export const Q2_TRIANGLE_VIEW_BOX = '0 0 400 270';
export const Q2_TRIANGLE_POINTS = {
  A: { x: 150, y: 25 },
  B: { x: 50, y: 230 },
  C: { x: 350, y: 230 },
  J: { x: 100, y: 127.5 },
  K: { x: 250, y: 127.5 },
} as const;
/** The page ticks [AB] only — [AC] carries no tick even though the text calls
 *  K the midpoint of [AC]. */
export const Q2_TRIANGLE_TICKS = {
  aj: { x: 125, y: 76.25, count: 2 },
  jb: { x: 75, y: 178.75, count: 2 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 2, item ④ — the figure with x, y, 2, 5 and 8 (image 5)            */
/* -------------------------------------------------------------------------- */

export const Q2_QUADRILATERAL_VIEW_BOX = '0 0 560 340';
export const Q2_QUADRILATERAL_POINTS = {
  M: { x: 200, y: 25 },
  A: { x: 113.2, y: 198.6 },
  B: { x: 324, y: 198.6 },
  C: { x: 392, y: 127.4 },
  D: { x: 60, y: 305 },
  E: { x: 400, y: 305 },
  F: { x: 510, y: 190 },
} as const;
/** Where each printed measurement sits on `image-5.png`. */
export const Q2_QUADRILATERAL_MEASURES = {
  y: { x: 312, y: 80 },
  two: { x: 374, y: 184 },
  five: { x: 215, y: 232 },
  eight: { x: 230, y: 340 },
  x: { x: 472, y: 274 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 3 — the rectangle (image 6)                                        */
/* -------------------------------------------------------------------------- */

export const Q3_VIEW_BOX = '0 0 520 330';
export const Q3_POINTS = {
  A: { x: 35, y: 50 },
  B: { x: 485, y: 50 },
  C: { x: 485, y: 275 },
  D: { x: 35, y: 275 },
  I: { x: 35, y: 162.5 },
  K: { x: 147.5, y: 50 },
  J: { x: 260, y: 50 },
} as const;
/** The black double ticks that announce I as the midpoint of [AD]. */
export const Q3_TICKS = {
  ai: { x: 35, y: 106.25, count: 2 },
  id: { x: 35, y: 218.75, count: 2 },
} as const;
/** The three printed measurement arrows (dashed, double-headed, blue). */
export const Q3_ARROWS = {
  ak: { from: { x: 40, y: 32 }, to: { x: 142, y: 32 } },
  jb: { from: { x: 270, y: 32 }, to: { x: 480, y: 32 } },
  dc: { from: { x: 42, y: 295 }, to: { x: 478, y: 295 } },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 4 — the triangle with the two midpoints (image 7)                  */
/* -------------------------------------------------------------------------- */

export const Q4_VIEW_BOX = '0 0 430 340';
export const Q4_POINTS = {
  A: { x: 105, y: 25 },
  B: { x: 75, y: 295 },
  C: { x: 395, y: 295 },
  I: { x: 90, y: 160 },
  J: { x: 250, y: 160 },
} as const;
/** The five printed blue lengths, each beside the segment it measures. */
export const Q4_MEASURES = {
  ai: { x: 72, y: 105 },
  ib: { x: 58, y: 242 },
  aj: { x: 202, y: 98 },
  jc: { x: 344, y: 232 },
  bc: { x: 235, y: 334 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 5 — the triangle with its three midpoints (image 8)                */
/* -------------------------------------------------------------------------- */

export const Q5_VIEW_BOX = '0 0 560 355';
export const Q5_POINTS = {
  A: { x: 230, y: 30 },
  B: { x: 45, y: 305 },
  C: { x: 525, y: 305 },
  I: { x: 137.5, y: 167.5 },
  J: { x: 285, y: 305 },
  K: { x: 377.5, y: 167.5 },
} as const;
/** One tick on each half of [AB], two on each half of [AC], three on [BC]. */
export const Q5_TICKS = {
  ai: { x: 183.75, y: 98.75, count: 1 },
  ib: { x: 91.25, y: 236.25, count: 1 },
  ak: { x: 303.75, y: 98.75, count: 2 },
  kc: { x: 451.25, y: 236.25, count: 2 },
  bj: { x: 165, y: 305, count: 3 },
  jc: { x: 405, y: 305, count: 3 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 6 — the parallelogram and its reflection (image 9)                 */
/* -------------------------------------------------------------------------- */

export const Q6_VIEW_BOX = '0 0 680 300';
export const Q6_POINTS = {
  A: { x: 120, y: 35 },
  B: { x: 390, y: 35 },
  C: { x: 305, y: 250 },
  D: { x: 35, y: 250 },
  O: { x: 212.5, y: 142.5 },
  E: { x: 575, y: 250 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 9 — the triangle with the three midpoints (image 12)               */
/* -------------------------------------------------------------------------- */

export const Q9_VIEW_BOX = '0 0 460 350';
export const Q9_POINTS = {
  A: { x: 320, y: 30 },
  B: { x: 35, y: 315 },
  C: { x: 195, y: 315 },
  D: { x: 405, y: 315 },
  E: { x: 177.5, y: 172.5 },
  F: { x: 257.5, y: 172.5 },
  J: { x: 362.5, y: 172.5 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 10 — the two printed figures (image 13)                            */
/* -------------------------------------------------------------------------- */

/** Figure ①: right triangle ABC, green line through I & J, red squares at B & J. */
export const Q10_CASE_ONE_VIEW_BOX = '0 0 400 375';
export const Q10_CASE_ONE_POINTS = {
  A: { x: 45, y: 35 },
  B: { x: 45, y: 290 },
  C: { x: 365, y: 290 },
  I: { x: 205, y: 162.5 },
  J: { x: 205, y: 290 },
  /** The printed green line extends above I and meets [BC] at J. */
  greenTop: { x: 205, y: 15 },
  greenBottom: { x: 205, y: 290 },
} as const;
export const Q10_CASE_ONE_TICKS = {
  bj: { x: 125, y: 290, count: 2 },
  jc: { x: 285, y: 290, count: 2 },
} as const;

/**
 * Figure ②: triangle ABC with two equal red angle arcs at B and at J.
 * Both [BA] and [JI] make an angle of 65° above [BC] (`atan2(-235, 110)`).
 */
export const Q10_CASE_TWO_VIEW_BOX = '0 0 400 375';
export const Q10_CASE_TWO_POINTS = {
  A: { x: 150, y: 55 },
  B: { x: 40, y: 290 },
  C: { x: 360, y: 290 },
  I: { x: 255, y: 172.5 },
  /** J is the midpoint of [BC] — the page ticks [BJ] and [JC] as equal. */
  J: { x: 200, y: 290 },
  /** The printed green line runs from J through I and extends above [AC]. */
  greenTop: { x: 324, y: 25.1 },
  greenBottom: { x: 200, y: 290 },
} as const;
export const Q10_CASE_TWO_TICKS = {
  bj: { x: 120, y: 290, count: 2 },
  jc: { x: 280, y: 290, count: 2 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 13 — the frame with the hidden vertex (image 16)                   */
/* -------------------------------------------------------------------------- */

export const Q13_VIEW_BOX = '0 0 460 300';
export const Q13_POINTS = {
  /** The complete black frame the page draws around the picture. */
  frame: { x: 20, y: 20, width: 420, height: 260 },
  A: { x: 165, y: 45 },
  B: { x: 58, y: 250 },
  /** The two blue sides exit the right border of the frame; C stays hidden. */
  aTo: { x: 440, y: 175 },
  bTo: { x: 440, y: 250 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 14 — the triangle with the two parallel lines (image 17)           */
/* -------------------------------------------------------------------------- */

export const Q14_VIEW_BOX = '0 0 440 405';
export const Q14_POINTS = {
  A: { x: 150, y: 20 },
  B: { x: 20, y: 367 },
  C: { x: 407, y: 370 },
  /** D is the midpoint of [BC]. */
  D: { x: 213.5, y: 368.5 },
  /** M is the midpoint of [AD]. */
  M: { x: 181.75, y: 194.25 },
  /** F = (MC) ∩ [AB]. */
  F: { x: 106.7, y: 135.7 },
  /** E = the point of [AB] where the parallel to (CF) through D crosses. */
  E: { x: 63.4, y: 251.2 },
} as const;
/** The two black ticks that announce M as the midpoint of [AD]. */
export const Q14_TICKS = {
  am: { x: 165.9, y: 107.1, count: 1 },
  md: { x: 197.6, y: 281.4, count: 1 },
} as const;
/** The printed parallel marks: one black arrowhead on (FC) and one on (ED). */
export const Q14_ARROWS = {
  fc: { x: 245, y: 244 },
  ed: { x: 155, y: 323 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 15 — the triangle and the parallel segment (image 18)              */
/* -------------------------------------------------------------------------- */

export const Q15_VIEW_BOX = '0 0 540 335';
export const Q15_POINTS = {
  A: { x: 40, y: 245 },
  B: { x: 480, y: 245 },
  C: { x: 295, y: 30 },
  /** V lies on [AC] and (TV) is parallel to (CB). */
  V: { x: 147.1, y: 154.7 },
  T: { x: 224.8, y: 245 },
} as const;
/** The four printed red measurements and the dashed arrow carrying AB = 9.9. */
export const Q15_MEASURES = {
  av: { x: 76, y: 196 },
  tv: { x: 198, y: 204 },
  cb: { x: 414, y: 144 },
  ab: { x: 260, y: 322 },
  abArrow: { from: { x: 40, y: 286 }, to: { x: 480, y: 286 } },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 16 — the triangle with the parallel segment (image 19)             */
/* -------------------------------------------------------------------------- */

export const Q16_VIEW_BOX = '0 0 550 340';
export const Q16_POINTS = {
  A: { x: 470, y: 75 },
  B: { x: 45, y: 180 },
  C: { x: 375, y: 290 },
  /** D lies on [AB]. */
  D: { x: 151.25, y: 153.75 },
  /** E lies on [AC], with (DE) parallel to (BC). */
  E: { x: 398.75, y: 236.25 },
  /** The two printed dashed measurement arrows: BA = 12 and AC = 6. */
  baArrow: { from: { x: 38, y: 138 }, to: { x: 458, y: 34 } },
  acArrow: { from: { x: 505, y: 90 }, to: { x: 410, y: 305 } },
} as const;
export const Q16_MEASURES = {
  twelve: { x: 235, y: 78 },
  nine: { x: 315, y: 118 },
  six: { x: 474, y: 215 },
  de: { x: 288, y: 198 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 17 — the triangle with the parallel segment (image 20)             */
/* -------------------------------------------------------------------------- */

export const Q17_VIEW_BOX = '0 0 580 355';
export const Q17_POINTS = {
  L: { x: 65, y: 285 },
  N: { x: 285, y: 35 },
  M: { x: 505, y: 185 },
  Q: { x: 225.6, y: 102.5 },
  P: { x: 386.2, y: 212 },
  /** The two printed dashed measurement arrows outside [LN] and [LM]. */
  lnArrow: { from: { x: 42, y: 262 }, to: { x: 256, y: 19 } },
  lmArrow: { from: { x: 95, y: 318 }, to: { x: 498, y: 226 } },
} as const;
export const Q17_MEASURES = {
  sixteen: { x: 122, y: 138 },
  twentyOne: { x: 318, y: 308 },
  qn: { x: 242, y: 72 },
  qp: { x: 318, y: 162 },
} as const;
