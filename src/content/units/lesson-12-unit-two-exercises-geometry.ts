/**
 * ============================================================================
 *  UNIT 2 — «تمارين الوحدة الثانية» · MEASURED SOURCE GEOMETRY (Q28–Q34)
 * ============================================================================
 *
 *  Every coordinate below was READ FROM THE SUPPLIED SCAN. Nothing here was
 *  invented, fitted to a "nicer" shape, or derived from visual plausibility.
 *  The scan pixel position of each point is quoted beside it so the reading
 *  can be checked against the scan again; the SVG coordinate is that reading
 *  mapped into the renderer's canvas by ONE affine transform (uniform scale
 *  + translation — no shear, no per-axis stretch), so every printed relation
 *  (incidence, order along a line, which marks are printed where) survives the
 *  mapping unchanged.
 *
 *  WHAT IS ASSERTED, AND WHAT IS NOT
 *  ----------------------------------------------------------------------------
 *  The printed figures of these exercises carry their meaning in INCIDENCE
 *  and in the MARKS (the equality ticks, the parallel arrowheads, the printed
 *  measurements). Proportions in them carry no mathematical information —
 *  the same convention the Unit 1 exercise figures follow (see
 *  docs/LESSON-07-FIGURES.md). Therefore:
 *
 *    • asserted here and in `lesson-12-unit-two-exercises-geometry.test.ts`:
 *      which point lies on which segment, the order of the points along a
 *      line, the collinear triples the page prints, the printed parallel
 *      relations, the printed lengths, and which equality mark is printed on
 *      which sub-segment;
 *
 *    • NOT asserted, and deliberately not "cleaned up": the drawn angles, the
 *      drawn lengths, and the small wobbles of a printed line. In particular
 *      the scan's own line A–E of case ② of Question 33 wobbles by up to 9 px
 *      around the straight line; the reconstruction keeps the measured
 *      positions rather than straightening them, and the collinearity test
 *      uses the tolerance the scan itself warrants.
 *
 *  The full per-figure verification record is in
 *  docs/UNIT-02-EXERCISES-FIGURES.md.
 * ============================================================================
 */

export interface FigurePoint {
  readonly x: number;
  readonly y: number;
}

/* -------------------------------------------------------------------------- */
/*  Question 28 — «من توازٍ إلى توازٍ»                                          */
/* -------------------------------------------------------------------------- */

/**
 * Scan: batch-3 image 1 (Q28), figure region x 60–510, y 175–500.
 * Mapping: scale 1.3067, offset (-52.4, -202.7) → viewBox 640 × 495.
 *
 *   E (226.8,180.6)  F (72.4,437.3)  G (426.2,506.4)  H (499.3,290.1)
 *   M (150.0,306.5)  N (326.6,343.6)  P (363.0,235.2)
 *
 * The four vertices are not guessed from the label positions: each of the
 * five drawn lines was fitted to the scan, and every vertex is the
 * intersection of the lines that meet there. The result is self-consistent:
 * M lies on [EF] to within 0.9 px and is 2.5 px from its midpoint, N lies on
 * [EG] to within 0.0 px and 0.1 px from its midpoint, and P lies on [EH] to
 * within 0.1 px.
 *
 * Read from the scan: the quadrilateral E-H-G-F with the diagonal E-G; the
 * solid dot at M on [EF]; the red line (NP) crossing [EH] at P and passing
 * through N; two blue ticks on each of [EN] and [NG]; TWO blue ticks on each
 * of [EM] and [MF]; one red arrowhead on (NP) and one black arrowhead on
 * (HG) — the printed parallel marks.
 */
export const Q28_VIEW_BOX = '0 0 640 495';

export const Q28_POINTS = {
  E: { x: 243.9, y: 41.3 },
  F: { x: 42.2, y: 376.8 },
  G: { x: 504.4, y: 467.0 },
  H: { x: 600.0, y: 184.4 },
  M: { x: 143.6, y: 205.8 },
  N: { x: 374.3, y: 254.3 },
  P: { x: 421.9, y: 112.6 },
} as const;

/** The two ends of the printed red line (NP) — it runs past P and past N. */
export const Q28_RED_LINE = {
  from: { x: 445.0, y: 43.9 },
  to: { x: 346.4, y: 337.3 },
} as const;

/** The printed red arrowhead on (NP) — scan (344,290) — and the black one on (HG). */
export const Q28_ARROWS = {
  // The red arrowhead on (NP) sits at scan (344.6, 290) — on the printed line.
  red: { x: 397.9, y: 184.2 },
  // The black arrowhead on (HG) sits at scan (460, 406) — also on its line.
  black: { x: 548.7, y: 335.8 },
} as const;

/** The printed equality ticks: two strokes on each half of [EF], one on each half of [EG]. */
export const Q28_TICKS = {
  em: { x: 186.7, y: 133.3, count: 2 },
  mf: { x: 100.5, y: 278.3, count: 2 },
  en: { x: 318.7, y: 163.4, count: 1 },
  ng: { x: 429.8, y: 346.3, count: 1 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 29 — «نسب متساوية»                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Scan: batch-3 image 2 (Q29), figure region x 50–760, y 90–440.
 * Mapping: scale 0.8282, offset (-15.4, -48.5) → viewBox 640 × 342.
 *
 *   A (606,103)  B (739,424)  C (65,424)
 *   N (374,242)  M (660,242)  J (546,242)  K (471,424)
 *
 * Read from the scan: the triangle A-B-C with the base [CB] and the segment
 * [NM] printed in BLUE; the transversal A-J-K printed in RED, crossing [NM]
 * at J and the base at K; the printed lengths 3 (between N and J), 2
 * (between J and M) and 4.5 (between K and B) in RED.
 */
export const Q29_VIEW_BOX = '0 0 640 342';

export const Q29_POINTS = {
  A: { x: 486.5, y: 36.8 },
  B: { x: 596.6, y: 302.6 },
  C: { x: 38.4, y: 302.6 },
  N: { x: 294.3, y: 151.9 },
  M: { x: 531.2, y: 151.9 },
  J: { x: 436.8, y: 151.9 },
  K: { x: 374.7, y: 302.6 },
} as const;

/** The printed red lengths of Question 29. */
export const Q29_MEASURES = {
  three: { x: 362.3, y: 172.6 },
  two: { x: 485.7, y: 170.9 },
  fourPointFive: { x: 471.6, y: 320.0 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 30 — «تقسيم قطعة مستقيمة»                                          */
/* -------------------------------------------------------------------------- */

/**
 * Scan: batch-3 image 3 (Q30), figure region x 55–580, y 115–345.
 * Mapping: scale 1.1200, offset (-35.6, -102.8) → viewBox 640 × 330.
 *
 *   A (64,333)  B (164,333)  C (262,333)  D (367,333)  E (466,333)  F (570,333)
 *   ray end x (566,123)
 *
 * Read from the scan: the BLACK segment [AF] with a RED tick on each of
 * [AB], [BC], [CD], [DE] and [EF]; the BLUE ray from A towards the printed
 * «x». The point M is NOT labelled in the printed figure — the exercise asks
 * the student to place it on the ray.
 */
export const Q30_VIEW_BOX = '0 0 640 330';

export const Q30_POINTS = {
  A: { x: 36.1, y: 270.2 },
  B: { x: 148.1, y: 270.2 },
  C: { x: 257.8, y: 270.2 },
  D: { x: 375.4, y: 270.2 },
  E: { x: 486.3, y: 270.2 },
  F: { x: 602.8, y: 270.2 },
} as const;

/** The end of the printed blue ray (Ax). */
export const Q30_RAY_END = { x: 598.3, y: 35.0 } as const;

/* -------------------------------------------------------------------------- */
/*  Question 32 — «قياس المسافة بين نقطتين لا يمكن الوصول إليهما»                */
/* -------------------------------------------------------------------------- */

/**
 * Scan: batch-3 image 5 (Q32), figure region x 190–1460, y 30–300.
 * Mapping: scale 0.4630, offset (-62.0, 12.1) → viewBox 640 × 177.
 *
 *   A (250,40)  B (250,296)  C (551,106)  M (551,295)  K (1418,296)
 *
 * Read from the scan: the BLUE verticals [AB] and [MC]; the BLACK ground
 * line [BK] and the BLACK sight line [AK] through C; the printed lengths 40
 * (on [AB]) and 30 (on [MC]) in RED, and the printed 50 (on [BM]) and x (on
 * [MK]) in RED below the ground line.
 */
export const Q32_VIEW_BOX = '0 0 640 177';

export const Q32_POINTS = {
  A: { x: 53.8, y: 30.6 },
  B: { x: 53.8, y: 149.2 },
  C: { x: 193.1, y: 61.2 },
  M: { x: 193.1, y: 148.7 },
  K: { x: 594.6, y: 149.2 },
} as const;

/** The printed red lengths of Question 32. */
export const Q32_MEASURES = {
  forty: { x: 37.1, y: 88.9 },
  thirty: { x: 183.4, y: 100.9 },
  fifty: { x: 120.4, y: 159.8 },
  x: { x: 371.4, y: 159.8 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 33 — case ①                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Scan: batch-3 image 6 (Q33), case ① figure, region x 920–1450, y 490–860.
 * Mapping: scale 1.1094, offset (-994.6, -517.6) → viewBox 640 × 462.
 *
 *   S (1101,541)  T (928,851)  U (1441,851)
 *   N (1048,641)  K (1208,641)  I (977,774)  J (1350,774)
 *
 * Read from the scan: the triangle S-T-U; the two RED segments [NK] and [IJ]
 * printed horizontally. The page prints S, N, I, T on one straight line and
 * S, K, J, U on another, then (IJ) ∥ (NK) and (IJ) ∥ (TU).
 */
export const Q33_CASE_ONE_VIEW_BOX = '0 0 640 462';

export const Q33_CASE_ONE_POINTS = {
  S: { x: 226.8, y: 82.6 },
  T: { x: 34.9, y: 426.5 },
  U: { x: 604.0, y: 426.5 },
  N: { x: 168.0, y: 193.5 },
  K: { x: 345.5, y: 193.5 },
  I: { x: 89.2, y: 341.1 },
  J: { x: 503.1, y: 341.1 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 33 — case ②                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Scan: batch-3 image 6 (Q33), case ② figure, region x 155–625, y 530–960.
 * Mapping: scale 1.2511, offset (-167.9, -637.1) → viewBox 640 × 590.
 *
 *   A (162,745)  B (318,659)  C (449,584)
 *   H (303,738)  D (422,743)  I (499,747)  E (601,738)
 *   M (485,836)  G (394,911)
 *
 * Read from the scan: the ray A-B-C; the line A-H-D-I-E; the line E-M-G; and
 * the three RED segments [BH], [CG] and [IM]. D is the crossing of the red
 * segment [CG] with the line A-H-D-I-E.
 *
 * KNOWN SOURCE DISCREPANCY (not repaired here): the page prints
 * «(CG) ∥ (IF)» while the printed figure labels the end of the red segment
 * that starts at I with M, and no F is labelled anywhere in the figure. The
 * reconstruction reproduces the figure as printed (the point is M) and the
 * printed text keeps «(IF)»; the discrepancy is recorded in
 * `lesson-12-teacher.ts` and in docs/UNIT-02-EXERCISES-FIGURES.md.
 */
export const Q33_CASE_TWO_VIEW_BOX = '0 0 640 590';

export const Q33_CASE_TWO_POINTS = {
  A: { x: 34.8, y: 295.1 },
  B: { x: 230.0, y: 187.3 },
  C: { x: 393.8, y: 93.6 },
  D: { x: 360.8, y: 289.8 },
  E: { x: 583.9, y: 286.2 },
  G: { x: 325.0, y: 502.4 },
  H: { x: 211.2, y: 286.2 },
  I: { x: 456.4, y: 297.4 },
  M: { x: 438.9, y: 408.8 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Shared helpers — used by the verification test                               */
/* -------------------------------------------------------------------------- */

/** Distance between two points. */
export function distance(a: FigurePoint, b: FigurePoint): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/** Twice the signed area of the triangle (a, b, c) — zero when they are collinear. */
export function crossProduct(a: FigurePoint, b: FigurePoint, c: FigurePoint): number {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

/**
 * True when `p` lies on the segment [a, b] within `tol` pixels — the measure
 * the printed figure itself warrants (see the header of this file).
 */
export function isOnSegment(p: FigurePoint, a: FigurePoint, b: FigurePoint, tol: number): boolean {
  const length = distance(a, b);
  if (length === 0) return false;
  const cross = Math.abs(crossProduct(a, b, p));
  const gap = cross / length;
  if (gap > tol) return false;
  const along = (p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y);
  return along >= -tol * length && along <= length * length + tol * length;
}

/** True when the three points are collinear within `tol` pixels. */
export function areCollinear(
  a: FigurePoint,
  b: FigurePoint,
  c: FigurePoint,
  tol: number,
): boolean {
  const length = distance(a, c) || 1;
  return Math.abs(crossProduct(a, c, b)) / length <= tol;
}

/* ========================================================================== */
/*  BATCH 2 — Questions 20–27 (scans preserved in /tmp/source-scans)          */
/* ========================================================================== */

/*
 * The Batch 2 figures are reproduced in the SCAN PIXEL GRID itself: the SVG
 * coordinate system of each of them IS the pixel grid of the figure region
 * of its scan (only the region origin is folded into the viewBox). That keeps
 * every reading checkable against the scan by eye, and it keeps the two
 * figures whose drawings ARE to scale (Questions 26 and 27) in their printed
 * proportions: in Q26 one printed centimetre measures 100 scan pixels, in
 * Q27 one printed unit measures about 54 scan pixels.
 */

/* -------------------------------------------------------------------------- */
/*  Question 20 — «تحليل مخطط الإثبات» (the printed proof flowchart)          */
/* -------------------------------------------------------------------------- */

/**
 * Scan: batch-2 image 8 (Q20), the whole page (900 × 945).
 *
 * The printed figure is a FLOWCHART of blue boxes, not a geometric drawing.
 * Every rectangle was measured from the scan by locating the blue horizontal
 * and vertical runs of its border, so the boxes below are the printed ones
 * and not a redrawn arrangement. The five boxes that print a dotted line are
 * the printed BLANKS of the exercise; they stay empty.
 */
export const Q20_VIEW_BOX = '60 290 800 560';

export interface FlowBox {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  /** The printed wording of the box, when it carries one. */
  readonly text?: string;
  /** The printed dotted blank inside the box. */
  readonly blank?: boolean;
}

/** The fourteen printed boxes of the flowchart, by their printed role. */
export interface FlowBoxes {
  readonly given: FlowBox;
  readonly cMidpoint: FlowBox;
  readonly aMidpoint: FlowBox;
  readonly bMidpoint: FlowBox;
  readonly blankLeft: FlowBox;
  readonly blankRight: FlowBox;
  readonly parallelOne: FlowBox;
  readonly parallelTwo: FlowBox;
  readonly blankMiddle: FlowBox;
  readonly rightTriangle: FlowBox;
  readonly angle: FlowBox;
  readonly parallelogram: FlowBox;
  readonly blankBottom: FlowBox;
  readonly rectangle: FlowBox;
}

export const Q20_BOXES: FlowBoxes = {
  /** «$ABC$ قائم في $A$» — the head of the left column. */
  given: { x: 84, y: 311, width: 157, height: 71, text: 'ABC قائم في A' },
  /** «$C'$ منتصف $[AB]$». */
  cMidpoint: { x: 257, y: 311, width: 191, height: 71, text: "C′ منتصف [AB]" },
  /** «$A'$ منتصف $[BC]$». */
  aMidpoint: { x: 454, y: 311, width: 181, height: 71, text: "A′ منتصف [BC]" },
  /** «$B'$ منتصف $[AC]$». */
  bMidpoint: { x: 642, y: 311, width: 188, height: 71, text: "B′ منتصف [AC]" },
  /** the printed dotted blank under the two midpoints of [AB] and [BC]. */
  blankLeft: { x: 374, y: 413, width: 145, height: 46, blank: true },
  /** the printed dotted blank under the two midpoints of [BC] and [AC]. */
  blankRight: { x: 557, y: 413, width: 146, height: 46, blank: true },
  /** «$(A'C') \parallel (AC)$». */
  parallelOne: { x: 365, y: 486, width: 145, height: 48, text: '(A′C′) ∥ (AC)' },
  /** «$(A'B') \parallel (AB)$». */
  parallelTwo: { x: 534, y: 486, width: 146, height: 48, text: '(A′B′) ∥ (AB)' },
  /** the printed dotted blank that closes the two parallel statements. */
  blankMiddle: { x: 466, y: 553, width: 145, height: 47, blank: true },
  /** «تعريف المثلث القائم». */
  rightTriangle: { x: 93, y: 579, width: 182, height: 47, text: 'تعريف المثلث القائم' },
  /** «$\widehat{A} = 90°$». */
  angle: { x: 93, y: 650, width: 182, height: 46, text: 'Â = 90°' },
  /** «$AB'A'C'$ هو متوازي أضلاع». */
  parallelogram: { x: 402, y: 632, width: 271, height: 52, text: 'AB′A′C′ هو متوازي أضلاع' },
  /** the printed dotted blank that receives the two statements. */
  blankBottom: { x: 198, y: 715, width: 271, height: 48, blank: true },
  /** «$AB'A'C'$ هو مستطيل». */
  rectangle: { x: 213, y: 780, width: 227, height: 48, text: 'AB′A′C′ هو مستطيل' },
};

/** The printed connectors of the flowchart: a plain line, or an arrow. */
export interface FlowArrow {
  readonly from: { readonly x: number; readonly y: number };
  readonly to: { readonly x: number; readonly y: number };
  /** `false` for the plain line under the first box. */
  readonly head?: boolean;
}

/** The fourteen printed connectors of the flowchart, by their printed role. */
export interface FlowArrows {
  readonly givenToRightTriangle: FlowArrow;
  readonly rightTriangleToAngle: FlowArrow;
  readonly angleToBlank: FlowArrow;
  readonly parallelogramToBlank: FlowArrow;
  readonly blankToRectangle: FlowArrow;
  readonly blankLeftToParallelOne: FlowArrow;
  readonly blankRightToParallelTwo: FlowArrow;
  readonly parallelOneToBlankMiddle: FlowArrow;
  readonly parallelTwoToBlankMiddle: FlowArrow;
  readonly blankMiddleToParallelogram: FlowArrow;
  readonly cMidpointToBlankLeft: FlowArrow;
  readonly aMidpointToBlankLeft: FlowArrow;
  readonly aMidpointToBlankRight: FlowArrow;
  readonly bMidpointToBlankRight: FlowArrow;
}

export const Q20_ARROWS: FlowArrows = {
  /** the plain line from «$ABC$ قائم في $A$» down to «تعريف المثلث القائم». */
  givenToRightTriangle: {
    from: { x: 153, y: 382 },
    to: { x: 153, y: 579 },
    head: false,
  },
  rightTriangleToAngle: { from: { x: 153, y: 626 }, to: { x: 153, y: 650 } },
  angleToBlank: { from: { x: 232, y: 692 }, to: { x: 257, y: 716 } },
  parallelogramToBlank: { from: { x: 410, y: 682 }, to: { x: 385, y: 716 } },
  blankToRectangle: { from: { x: 333, y: 763 }, to: { x: 333, y: 780 } },
  blankLeftToParallelOne: { from: { x: 447, y: 459 }, to: { x: 447, y: 486 } },
  blankRightToParallelTwo: { from: { x: 627, y: 459 }, to: { x: 627, y: 487 } },
  parallelOneToBlankMiddle: { from: { x: 455, y: 534 }, to: { x: 490, y: 553 } },
  parallelTwoToBlankMiddle: { from: { x: 580, y: 534 }, to: { x: 555, y: 553 } },
  blankMiddleToParallelogram: { from: { x: 536, y: 600 }, to: { x: 536, y: 632 } },
  cMidpointToBlankLeft: { from: { x: 405, y: 382 }, to: { x: 430, y: 413 } },
  aMidpointToBlankLeft: { from: { x: 495, y: 382 }, to: { x: 465, y: 413 } },
  aMidpointToBlankRight: { from: { x: 590, y: 382 }, to: { x: 620, y: 413 } },
  bMidpointToBlankRight: { from: { x: 685, y: 382 }, to: { x: 650, y: 413 } },
};

/* -------------------------------------------------------------------------- */
/*  Question 21 — «في شكلٍ رباعي»                                               */
/* -------------------------------------------------------------------------- */

/**
 * Scan: unit-02 exercises Q21, figure region x 40–560, y 20–350.
 *
 *   A (207,54)  B (73,318)  C (497,318)  D (524,122)
 *   E (144,186) F (285,315) G (511,221) H (369,89)
 *
 * Read from the scan: the quadrilateral $ABCD$ is printed in BLUE and the
 * quadrilateral $EFGH$ in RED. Each vertex was obtained by intersecting the
 * two lines that meet there, and the result is self-consistent with the
 * printed sentence — $E$, $F$, $G$ and $H$ are the midpoints of the four
 * sides: E is 4 px from the midpoint of [AB], F 1 px from the midpoint of
 * [BC], G 1 px from the midpoint of [CD] and H 4 px from the midpoint of
 * [DA].
 *
 * Verified against the complete uncropped scan: the page ends with clean
 * white margin below the stem and carries no additional sub-items.
 */
export const Q21_VIEW_BOX = '40 20 520 340';

export const Q21_POINTS = {
  A: { x: 207, y: 54 },
  B: { x: 73, y: 318 },
  C: { x: 497, y: 318 },
  D: { x: 524, y: 122 },
  E: { x: 144, y: 186 },
  F: { x: 285, y: 315 },
  G: { x: 511, y: 221 },
  H: { x: 369, y: 89 },
} as const;

/** Where each printed point name stands in the scan. */
export const Q21_LABELS = {
  A: { x: 200, y: 26 },
  B: { x: 62, y: 340 },
  C: { x: 497, y: 342 },
  D: { x: 528, y: 104 },
  E: { x: 108, y: 170 },
  F: { x: 285, y: 348 },
  G: { x: 522, y: 226 },
  H: { x: 360, y: 60 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 24 — «ارتفاع ومحور»                                               */
/* -------------------------------------------------------------------------- */

/**
 * Scan: batch-2 image 12 (Q24), figure region x 30–560, y 130–450.
 *
 *   A (220,164)  B (80,405)  C (500,404)  H (220,406)
 *   I (146,286)  J (356,285)  K (220,286)
 *
 * Read from the scan: the triangle $ABC$ and its base [BC] are printed in
 * BLACK, the altitude [AH] in BLUE with the right-angle mark at H, and the
 * line (IJ) in RED — it is drawn well beyond I and beyond J. The four
 * equality marks are RED: a DOUBLE tick on each of [AI] and [IB], and a
 * SINGLE tick on each of [AJ] and [JC].
 *
 * Self-consistency: I is 4 px from the midpoint of [AB], J 4 px from the
 * midpoint of [AC] and K 1 px from the midpoint of [AH].
 */
export const Q24_VIEW_BOX = '30 130 530 320';

export const Q24_POINTS = {
  A: { x: 220, y: 164 },
  B: { x: 80, y: 405 },
  C: { x: 500, y: 404 },
  H: { x: 220, y: 406 },
  I: { x: 146, y: 286 },
  J: { x: 356, y: 285 },
  K: { x: 220, y: 286 },
} as const;

/** The printed red line (IJ) — it runs past I and past J. */
export const Q24_RED_LINE = {
  from: { x: 64, y: 288 },
  to: { x: 547, y: 288 },
} as const;

/** The printed red equality marks: two strokes on each half of [AB]. */
export const Q24_TICKS = {
  ai: { x: 171.5, y: 227.5, count: 2 },
  ib: { x: 109, y: 330, count: 2 },
  aj: { x: 298, y: 231.5, count: 1 },
  jc: { x: 427, y: 348, count: 1 },
} as const;

/** The printed blue right-angle mark at H. */
export const Q24_RIGHT_ANGLE = {
  at: { x: 220, y: 406 },
  size: 24,
} as const;

/** Where each printed point name stands in the scan. */
export const Q24_LABELS = {
  A: { x: 222, y: 150 },
  B: { x: 55, y: 412 },
  C: { x: 527, y: 410 },
  H: { x: 220, y: 436 },
  I: { x: 135, y: 264 },
  J: { x: 376, y: 264 },
  K: { x: 238, y: 266 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 26 — «محيط ومساحة مثلث»                                            */
/* -------------------------------------------------------------------------- */

/**
 * Scan: batch-2 image 14 (Q26), figure region x 20–700, y 150–540.
 *
 *   A (454,201)  B (52,499)  C (680,499)  H (454,499)
 *   M (248,353)  N (353,499)
 *
 * Read from the scan: the sides [AB] and [BC] are printed in BLACK, the
 * sides [AC] and [MN] in BLUE, and the altitude [AH] in RED with the
 * right-angle mark at H.
 *
 * THIS DRAWING IS TO SCALE: one printed centimetre measures 100 scan
 * pixels. Measured on the reconstruction, BM = 244 px = 2.4 cm, BN = 301 px
 * = 3 cm, AB = 501 px = 5 cm, MN = 180 px = 1.8 cm and AH = 298 px = 3 cm —
 * the five printed lengths, each within 1 px. (MN) and (AC) are drawn at
 * 53.2° and 53.4°, i.e. parallel as the sentence prints them.
 */
export const Q26_VIEW_BOX = '20 150 700 390';

export const Q26_POINTS = {
  A: { x: 454, y: 201 },
  B: { x: 52, y: 499 },
  C: { x: 680, y: 499 },
  H: { x: 454, y: 499 },
  M: { x: 248, y: 353 },
  N: { x: 353, y: 499 },
} as const;

/** The printed red right-angle mark at H. */
export const Q26_RIGHT_ANGLE = {
  at: { x: 454, y: 499 },
  size: 22,
} as const;

/** Where each printed point name stands in the scan. */
export const Q26_LABELS = {
  A: { x: 468, y: 177 },
  B: { x: 27, y: 505 },
  C: { x: 702, y: 504 },
  H: { x: 450, y: 525 },
  M: { x: 227, y: 333 },
  N: { x: 360, y: 518 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 27 — «استعمال مجاهيل»                                              */
/* -------------------------------------------------------------------------- */

/**
 * Scan: batch-2 image 15 (Q27), figure region x 20–810, y 30–540.
 *
 *   F (70,398)  G (507,398)  E (778,58)  S (509,188)  T (342,398)
 *
 * Read from the scan: the sides [FE] and [FG] are printed in BLACK, the
 * segments [ST] and [GE] in BLUE; the six printed measurements 9, x, y, 3, 8
 * and 5 are printed in RED.
 *
 * THIS DRAWING IS TO SCALE: one printed unit measures about 54 scan
 * pixels. Measured on the reconstruction, FS = 487 px = 9 units, TG = 165 px
 * = 3 units, ST = 268 px = 5 units and GE = 435 px = 8 units, and the two
 * printed ratios hold — FS/FE = 0.620 and ST/GE = 0.617, which is the
 * equality of Thales that the exercise asks the student to use.
 */
export const Q27_VIEW_BOX = '20 30 790 420';

export const Q27_POINTS = {
  E: { x: 778, y: 58 },
  F: { x: 70, y: 398 },
  G: { x: 507, y: 398 },
  S: { x: 509, y: 188 },
  T: { x: 342, y: 398 },
} as const;

/** The printed red measurements, where each one stands in the scan. */
export const Q27_MEASURES = {
  nine: { x: 274, y: 272 },
  x: { x: 622, y: 116 },
  five: { x: 459, y: 294 },
  eight: { x: 658, y: 254 },
  y: { x: 208, y: 423 },
  three: { x: 426, y: 425 },
} as const;

/** Where each printed point name stands in the scan. */
export const Q27_LABELS = {
  E: { x: 790, y: 48 },
  F: { x: 36, y: 402 },
  G: { x: 540, y: 408 },
  S: { x: 520, y: 172 },
  T: { x: 327, y: 415 },
} as const;

/* ========================================================================== */
/*  BATCH 2 — Questions 18 and 19 (`docs/source-scans/unit-02-exercises/batch2`) */
/* ========================================================================== */

/* -------------------------------------------------------------------------- */
/*  Question 18, case ① (`batch2/image-1.png`, top)                           */
/* -------------------------------------------------------------------------- */

/**
 * Scan: `batch2/image-1.png` (1057 × 520), top figure region x 30–645,
 * y 14–229, mapped by pure translation (-30, -14) into `0 0 615 215`:
 *
 *   E (80,150)  H (268,49)  K (609,150)  F (152.3,111.2)  J (283.5,150)
 *
 * F and J divide [EH] and [EK] in the printed ratio 5 : 8 (within 2 px of the
 * raw scan), keeping (FJ) ∥ (HK). A black dashed double-headed arrow runs
 * below [EK] carrying the red measurement 32.5, while 5 and 8 are printed in
 * red outside [EF] and [FH].
 */
export const Q18_CASE_ONE_VIEW_BOX = '0 0 615 215';

export const Q18_CASE_ONE_POINTS = {
  E: { x: 50, y: 136 },
  H: { x: 238, y: 35 },
  K: { x: 579, y: 136 },
  F: { x: 122.31, y: 97.15 },
  J: { x: 253.46, y: 136 },
  ekArrow: { from: { x: 57, y: 167 }, to: { x: 576, y: 167 } },
} as const;

export const Q18_CASE_ONE_MEASURES = {
  five: { x: 81, y: 105 },
  eight: { x: 173, y: 58 },
  thirtyTwoPointFive: { x: 316, y: 196 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 18, case ② (`batch2/image-1.png`, bottom)                        */
/* -------------------------------------------------------------------------- */

/**
 * Scan: `batch2/image-1.png` (1057 × 520), bottom figure region x 36–556,
 * y 288–503, mapped by pure translation (-36, -288) into `0 0 520 215`:
 *
 *   M (86,466)  B (234,323)  A (508,466)  E (123,430.3)  J (191.5,466)
 *
 * E and J divide [MB] and [MA] in the printed ratio 3 : 9 = 1 : 3 (within
 * 2.5 px of the raw scan), keeping (EJ) ∥ (BA). The three red measurements
 * 3, 9 and 8 stand directly beside [MJ], [JA] and [BA] with no dashed arrows.
 */
export const Q18_CASE_TWO_VIEW_BOX = '0 0 520 215';

export const Q18_CASE_TWO_POINTS = {
  M: { x: 50, y: 178 },
  B: { x: 198, y: 35 },
  A: { x: 472, y: 178 },
  E: { x: 87, y: 142.25 },
  J: { x: 155.5, y: 178 },
} as const;

export const Q18_CASE_TWO_MEASURES = {
  three: { x: 103, y: 202 },
  nine: { x: 314, y: 202 },
  eight: { x: 337, y: 92 },
} as const;

/* -------------------------------------------------------------------------- */
/*  Question 19 — «تعلُّم تحرير إثبات» (`batch2/image-2.png`)                   */
/* -------------------------------------------------------------------------- */

/**
 * Scan: `batch2/image-2.png` (1575 × 1033), left figure region x 60–560,
 * y 194–599, mapped by pure translation (-60, -194) into `0 0 500 405`:
 *
 *   A (293,229)  I (229.3,340.3)  B (165.7,451.7)  K (102,563)
 *   J (404.5,340.3)  C (516,451.7)  D (253.3,451.7)
 *
 * Read from the scan: A–I–B–K are collinear with THREE equal sub-segments
 * [AI], [IB] and [BK], each marked with ONE red tick; A–J–C are collinear
 * with J at the midpoint of [AC], marked with TWO red ticks on each of [AJ]
 * and [JC]; [IJ] and [BC] are horizontal; and [KJ] crosses [BC] at D, the
 * midpoint of [KJ].
 */
export const Q19_VIEW_BOX = '0 0 500 405';

export const Q19_POINTS = {
  A: { x: 233, y: 35 },
  I: { x: 169.33, y: 146.33 },
  B: { x: 105.67, y: 257.67 },
  K: { x: 42, y: 369 },
  J: { x: 344.5, y: 146.33 },
  C: { x: 456, y: 257.67 },
  D: { x: 193.25, y: 257.67 },
} as const;

export const Q19_TICKS = {
  ai: { x: 201.17, y: 90.67, count: 1 },
  ib: { x: 137.5, y: 202.0, count: 1 },
  bk: { x: 73.83, y: 313.33, count: 1 },
  aj: { x: 288.75, y: 90.67, count: 2 },
  jc: { x: 400.25, y: 202.0, count: 2 },
} as const;
