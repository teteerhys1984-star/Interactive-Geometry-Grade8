/** Normalized coordinates read from the supplied pages. Units are explanatory,
 * not printed measurements. Screen y increases downwards. */
export type XY = readonly [number, number];
export const launchGrid: Record<string, XY> = {
  A: [0, 0],
  B: [4, 0],
  C: [8, 0],
  E: [1, 2],
  D: [5, 2],
  F: [2, 4],
  G: [6, 4],
};
export const launchParallelograms = ['ABDE', 'ABGF', 'AEGD', 'BCDE', 'BCGF', 'BEFD', 'EDGF'];
export const pavementPoints: Record<string, XY> = {
  A: [18, 6],
  B: [6, 6],
  C: [17, 9],
  D: [5, 9],
  E: [21, 9],
  F: [9, 9],
  G: [0, 11],
  M: [12, 10],
  N: [11, 13],
  P: [15, 13],
};
export const pavementTiles: Record<number, XY> = {
  1: [19, 8],
  2: [7, 8],
  3: [10, 10],
  4: [13, 12],
  5: [1, 12],
  6: [16, 10],
  7: [13, 8],
  8: [4, 10],
  9: [19, 12],
  10: [7, 12],
  11: [10, 14],
  12: [1, 16],
};
export const crossOutline: XY[] = [
  [-1, -2],
  [1, -2],
  [1, -1],
  [2, -1],
  [2, 1],
  [1, 1],
  [1, 2],
  [-1, 2],
  [-1, 1],
  [-2, 1],
  [-2, -1],
  [-1, -1],
];
export function shift(point: XY, vector: XY): XY {
  return [point[0] + vector[0], point[1] + vector[1]];
}
/** Five equilateral triangles per figure, four distinct orientations. */
export const latticeOutlines: XY[][] = [
  [
    [1, 0],
    [2, 1],
    [3, 0],
    [4, 1],
    [3, 2],
    [1, 2],
    [0, 1],
  ],
  [
    [1, 0],
    [3, 0],
    [4, 1],
    [3, 2],
    [1, 2],
    [0, 1],
    [2, 1],
  ],
  [
    [1, 0],
    [3, 0],
    [4, 1],
    [3, 2],
    [2, 1],
    [1, 2],
    [0, 1],
  ],
  [
    [1, 0],
    [3, 0],
    [4, 1],
    [2, 1],
    [3, 2],
    [1, 2],
    [0, 1],
  ],
];
export const latticeFigures = [
  { n: 1, at: [0, 0] as XY, shape: 0 },
  { n: 2, at: [6, 0] as XY, shape: 1 },
  { n: 3, at: [12, 0] as XY, shape: 2 },
  { n: 4, at: [18, 0] as XY, shape: 1 },
  { n: 5, at: [1, 3] as XY, shape: 3 },
  { n: 6, at: [7, 3] as XY, shape: 2 },
  { n: 7, at: [13, 3] as XY, shape: 3 },
  { n: 8, at: [19, 3] as XY, shape: 0 },
];

/** Numbered strip: the middle row slants in the opposite direction. */
export function stripPolygon(number: number): XY[] {
  const col = Math.floor((number - 1) / 3),
    row = (number - 1) % 3;
  const x = 65 + col * 90 + (row === 1 ? -40 : 0),
    y = 35 + row * 45;
  const slant = row === 1 ? 40 : -40;
  return [
    [x, y],
    [x + 90, y],
    [x + 90 + slant, y + 45],
    [x + slant, y + 45],
  ];
}
export const stripPoints: Record<string, XY> = Object.fromEntries(
  Array.from({ length: 6 }, (_, i) => [
    [String.fromCharCode(65 + i), [25 + i * 90, 80]],
    [`${String.fromCharCode(65 + i)}'`, [25 + i * 90, 170]],
  ]).flat(),
);
