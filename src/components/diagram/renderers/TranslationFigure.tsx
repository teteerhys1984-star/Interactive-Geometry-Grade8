import type { ConstructedDiagram } from '@/content/schema';
import styles from './TranslationFigure.module.css';

/**
 * ============================================================================
 *  TRANSLATION FIGURE — authored teaching diagram
 * ============================================================================
 *
 *  Draws a shape, its image under a translation, and the translation vectors.
 *
 *  This renderer is used ONLY for `origin: 'authored'` diagrams — teaching
 *  figures this platform designs itself. It is never used to reconstruct a
 *  textbook figure, because we would have to guess at coordinates.
 *
 *  The geometry is exact by construction: every image point is computed as
 *  `P' = P + v`. Nothing is approximated or eyeballed.
 * ============================================================================
 */

type Point = [number, number];

interface Params {
  /** Polygon / polyline vertices in mathematical coordinates (y upwards). */
  shape: Point[];
  /** Translation vector [dx, dy]. */
  vector: Point;
  /** Vertex labels for the pre-image; the image is labelled with primes. */
  labels?: string[];
  /** Indices of vertices that get a drawn translation arrow. */
  connectors?: number[];
  /** Close the path into a polygon (default true). */
  closed?: boolean;
  /** Draw the translated image (default true). */
  showImage?: boolean;
  /** Shade the interiors (default true). */
  shade?: boolean;
  /** Show a light background grid (default true). */
  grid?: boolean;
  /** Caption-free label for the pre-image / image groups. */
  sourceName?: string;
  imageName?: string;
}

function readParams(raw: Record<string, unknown>): Params | null {
  const shape = raw.shape as Point[] | undefined;
  const vector = raw.vector as Point | undefined;
  if (!Array.isArray(shape) || shape.length === 0 || !Array.isArray(vector)) return null;
  return {
    shape,
    vector,
    labels: raw.labels as string[] | undefined,
    connectors: raw.connectors as number[] | undefined,
    closed: raw.closed === undefined ? true : Boolean(raw.closed),
    showImage: raw.showImage === undefined ? true : Boolean(raw.showImage),
    shade: raw.shade === undefined ? true : Boolean(raw.shade),
    grid: raw.grid === undefined ? true : Boolean(raw.grid),
    sourceName: raw.sourceName as string | undefined,
    imageName: raw.imageName as string | undefined,
  };
}

export function TranslationFigure({ spec }: { spec: ConstructedDiagram }) {
  const params = readParams(spec.construction);
  if (!params) return null;

  const { shape, vector, labels, connectors, closed, showImage, shade, grid } = params;
  const [dx, dy] = vector;

  // Exact image: P' = P + v
  const image: Point[] = shape.map(([x, y]) => [x + dx, y + dy]);

  const all = showImage ? [...shape, ...image] : shape;
  const xs = all.map(([x]) => x);
  const ys = all.map(([, y]) => y);
  const pad = 1.4;
  const minX = Math.min(...xs) - pad;
  const maxX = Math.max(...xs) + pad;
  const minY = Math.min(...ys) - pad;
  const maxY = Math.max(...ys) + pad;
  const width = maxX - minX;
  const height = maxY - minY;

  /** Mathematical (y-up) → SVG (y-down). */
  const sx = (x: number) => x - minX;
  const sy = (y: number) => maxY - y;

  const toPath = (points: Point[]) =>
    points.map(([x, y]) => `${sx(x).toFixed(3)},${sy(y).toFixed(3)}`).join(' ');

  const gridLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  if (grid) {
    for (let x = Math.ceil(minX); x <= Math.floor(maxX); x += 1) {
      gridLines.push({ x1: sx(x), y1: 0, x2: sx(x), y2: height });
    }
    for (let y = Math.ceil(minY); y <= Math.floor(maxY); y += 1) {
      gridLines.push({ x1: 0, y1: sy(y), x2: width, y2: sy(y) });
    }
  }

  const arrowIndices = connectors ?? (showImage ? shape.map((_, index) => index) : []);

  const markerId = `tf-arrow-${spec.id}`;
  const Shape = closed ? 'polygon' : 'polyline';

  return (
    <svg
      className={styles.svg}
      viewBox={`0 0 ${width.toFixed(3)} ${height.toFixed(3)}`}
      role="img"
      aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="5"
          markerHeight="5"
          refX="4.2"
          refY="2"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L4.5,2 L0,4 Z" className={styles.arrowHead} />
        </marker>
      </defs>

      {grid
        ? gridLines.map((line, index) => (
            <line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              className={styles.grid}
            />
          ))
        : null}

      {/* Translation vectors, drawn behind the shapes. */}
      {showImage
        ? arrowIndices.map((index) => {
            const from = shape[index];
            const to = image[index];
            if (!from || !to) return null;
            return (
              <line
                key={`v-${index}`}
                x1={sx(from[0])}
                y1={sy(from[1])}
                x2={sx(to[0])}
                y2={sy(to[1])}
                className={styles.vector}
                markerEnd={`url(#${markerId})`}
              />
            );
          })
        : null}

      <Shape points={toPath(shape)} className={shade ? styles.sourceFilled : styles.source} />

      {showImage ? (
        <Shape points={toPath(image)} className={shade ? styles.imageFilled : styles.image} />
      ) : null}

      {/* Vertices and labels */}
      {shape.map(([x, y], index) => (
        <g key={`p-${index}`}>
          <circle cx={sx(x)} cy={sy(y)} r={0.16} className={styles.point} />
          {labels?.[index] ? (
            <text x={sx(x)} y={sy(y) - 0.38} className={styles.label}>
              {labels[index]}
            </text>
          ) : null}
        </g>
      ))}

      {showImage
        ? image.map(([x, y], index) => (
            <g key={`i-${index}`}>
              <circle cx={sx(x)} cy={sy(y)} r={0.16} className={styles.pointImage} />
              {labels?.[index] ? (
                <text x={sx(x)} y={sy(y) - 0.38} className={styles.labelImage}>
                  {labels[index]}&#x2032;
                </text>
              ) : null}
            </g>
          ))
        : null}
    </svg>
  );
}
