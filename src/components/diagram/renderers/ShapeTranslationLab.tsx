import { useId, useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import { LtrIsolate } from '@/components/math';
import styles from './ShapeTranslationLab.module.css';

type Point = [number, number];
type ShapeKind = 'segment' | 'triangle' | 'ray' | 'circle';

const SHAPES: readonly { id: ShapeKind; label: string }[] = [
  { id: 'segment', label: 'قطعة مستقيمة' },
  { id: 'triangle', label: 'مثلث' },
  { id: 'ray', label: 'نصف مستقيم' },
  { id: 'circle', label: 'دائرة' },
];

const pointsByShape: Record<Exclude<ShapeKind, 'circle'>, Point[]> = {
  segment: [
    [1.4, 2.2],
    [4.1, 3.1],
  ],
  triangle: [
    [1.4, 1.5],
    [4, 1.8],
    [2.2, 4.2],
  ],
  ray: [
    [1.3, 1.7],
    [4.3, 3.2],
  ],
};

const labelsByShape: Record<Exclude<ShapeKind, 'circle'>, string[]> = {
  segment: ['M', 'N'],
  triangle: ['A', 'B', 'C'],
  ray: ['M', 'H'],
};

export function ShapeTranslationLab({ spec }: { spec: InteractiveDiagram }) {
  const [shape, setShape] = useState<ShapeKind>('triangle');
  const [dx, setDx] = useState(3);
  const [dy, setDy] = useState(1);
  const [phase, setPhase] = useState(2);
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const arrowId = `shape-lab-arrow-${reactId}`;
  const rayId = `shape-lab-ray-${reactId}`;

  const sy = (y: number) => 7 - y;
  const translate = ([x, y]: Point): Point => [x + dx, y + dy];
  const sourcePoints = shape === 'circle' ? ([[2.7, 3]] as Point[]) : pointsByShape[shape];
  const imagePoints = sourcePoints.map(translate);
  const isRay = shape === 'ray';
  const isClosed = shape === 'triangle';

  function pointString(points: Point[]) {
    return points.map(([x, y]) => `${x},${sy(y)}`).join(' ');
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.shapePicker} role="group" aria-label="اختر نوع الشكل">
        {SHAPES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={shape === item.id ? styles.shapeActive : styles.shapeButton}
            aria-pressed={shape === item.id}
            onClick={() => {
              setShape(item.id);
              setPhase(2);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.controls}>
        <label className={styles.sliderLabel}>
          <span>الحركة الأفقية</span>
          <span className={styles.value} dir="ltr">
            {dx > 0 ? `+${dx}` : dx}
          </span>
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            value={dx}
            onChange={(event) => setDx(Number(event.target.value))}
          />
        </label>
        <label className={styles.sliderLabel}>
          <span>الحركة الشاقولية</span>
          <span className={styles.value} dir="ltr">
            {dy > 0 ? `+${dy}` : dy}
          </span>
          <input
            type="range"
            min="-1"
            max="2"
            step="1"
            value={dy}
            onChange={(event) => setDy(Number(event.target.value))}
          />
        </label>
      </div>

      <div className={styles.canvas} dir="ltr">
        <svg
          viewBox="0 0 11 7"
          className={styles.svg}
          role="img"
          aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker
              id={arrowId}
              markerWidth="5"
              markerHeight="5"
              refX="4.2"
              refY="2"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L4.5,2 L0,4 Z" className={styles.vectorHead} />
            </marker>
            <marker
              id={rayId}
              markerWidth="5"
              markerHeight="5"
              refX="4.2"
              refY="2"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L4.5,2 L0,4 Z" className={styles.sourceHead} />
            </marker>
          </defs>

          {Array.from({ length: 12 }, (_, x) => (
            <line key={`v${x}`} x1={x} y1={0} x2={x} y2={7} className={styles.grid} />
          ))}
          {Array.from({ length: 8 }, (_, y) => (
            <line key={`h${y}`} x1={0} y1={y} x2={11} y2={y} className={styles.grid} />
          ))}

          {shape === 'circle' ? (
            <>
              <circle cx={2.7} cy={sy(3)} r={1.05} className={styles.sourceCircle} />
              <circle cx={2.7} cy={sy(3)} r={0.1} className={styles.sourcePoint} />
              <text x={2.42} y={sy(3) - 0.25} className={styles.sourceLabel}>
                O
              </text>
            </>
          ) : isClosed ? (
            <polygon points={pointString(sourcePoints)} className={styles.sourceShape} />
          ) : (
            <polyline
              points={pointString(sourcePoints)}
              className={styles.sourceLine}
              markerEnd={isRay ? `url(#${rayId})` : undefined}
            />
          )}

          {shape !== 'circle'
            ? sourcePoints.map(([x, y], index) => (
                <g key={`source-${index}`}>
                  <circle cx={x} cy={sy(y)} r={0.1} className={styles.sourcePoint} />
                  <text x={x - 0.25} y={sy(y) + 0.45} className={styles.sourceLabel}>
                    {labelsByShape[shape][index]}
                  </text>
                </g>
              ))
            : null}

          {phase >= 1
            ? sourcePoints.map((point, index) => {
                const image = imagePoints[index]!;
                return (
                  <line
                    key={`connector-${index}`}
                    x1={point[0]}
                    y1={sy(point[1])}
                    x2={image[0]}
                    y2={sy(image[1])}
                    className={styles.vector}
                    markerEnd={`url(#${arrowId})`}
                  />
                );
              })
            : null}

          {phase >= 2 ? (
            shape === 'circle' ? (
              <>
                <circle
                  cx={imagePoints[0]![0]}
                  cy={sy(imagePoints[0]![1])}
                  r={1.05}
                  className={styles.imageCircle}
                />
                <circle
                  cx={imagePoints[0]![0]}
                  cy={sy(imagePoints[0]![1])}
                  r={0.1}
                  className={styles.imagePoint}
                />
                <text
                  x={imagePoints[0]![0] + 0.3}
                  y={sy(imagePoints[0]![1]) - 0.25}
                  className={styles.imageLabel}
                >
                  O′
                </text>
              </>
            ) : (
              <>
                {isClosed ? (
                  <polygon points={pointString(imagePoints)} className={styles.imageShape} />
                ) : (
                  <polyline
                    points={pointString(imagePoints)}
                    className={styles.imageLine}
                    markerEnd={isRay ? `url(#${arrowId})` : undefined}
                  />
                )}
                {imagePoints.map(([x, y], index) => (
                  <g key={`image-${index}`}>
                    <circle cx={x} cy={sy(y)} r={0.1} className={styles.imagePoint} />
                    <text x={x + 0.28} y={sy(y) - 0.2} className={styles.imageLabel}>
                      {labelsByShape[shape][index]}′
                    </text>
                  </g>
                ))}
              </>
            )
          ) : null}
        </svg>
      </div>

      <div className={styles.phases} role="group" aria-label="مراحل بناء الصورة">
        {['الشكل الأصلي', 'مسارات النقاط', 'الصورة الكاملة'].map((label, index) => (
          <button
            key={label}
            type="button"
            className={phase === index ? styles.phaseActive : styles.phaseButton}
            aria-pressed={phase === index}
            onClick={() => setPhase(index)}
          >
            <span dir="ltr">{index + 1}</span> {label}
          </button>
        ))}
      </div>

      <p className={styles.readout} role="status">
        الحركة الحالية: <LtrIsolate>{`(${dx}, ${dy})`}</LtrIsolate>. كل نقطة وصورتها تفصل بينهما
        الحركة نفسها، وتبقى الأطوال والزوايا محفوظة.
      </p>
    </div>
  );
}
