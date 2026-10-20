import { useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import { LtrIsolate, RichText } from '@/components/math';
import { plainText } from '@/lib/bidi';
import type { FigureSpec } from '@/lib/geometryFigure';
import { FigureSvg } from './FigureSvg';
import { readCases, readPoint, readText } from './params';
import type { LabCase } from './params';
import styles from './lab.module.css';
import { congruenceReport, distance, add } from '@/content/units/lesson-04-geometry';
import type { XY } from '@/content/units/lesson-04-geometry';

/**
 * ============================================================================
 *  «مختبر الحالات» — the page-17 activity, built as an interaction
 * ============================================================================
 *
 *  The printed activity asks the student to
 *    1. copy the three panels,
 *    2. complete ① and ② into the triangle ABC,
 *    3. draw the image of ABC under the translation that carries N onto M,
 *    4. say what those cases have in common.
 *
 *  The lab follows exactly that order, for each printed case:
 *    «المعطيات» → «إكمال ABD… ABC» → «الصورة وفق الانسحاب N M»
 *
 *  At the last stage the read-out is COMPUTED from the coordinates, not
 *  asserted: every side and every angle of the image is compared with the
 *  original by `congruenceReport`, so the student sees why the image is
 *  congruent instead of being told so.
 * ============================================================================
 */

const STAGES = ['المعطيات المطبوعة', 'إكمال المثلث ABC', 'الصورة وفق الانسحاب'] as const;

/**
 * Drawing window of the lab, fitted to the activity's coordinates: the printed
 * panel sits at x 2.4…7, and the image (translated by N→M = 4 units) reaches
 * x 10.1 with its labels. Stability across stages matters more than a
 * per-stage fit.
 */
const LAB_VIEW_BOX = { x: 1.3, y: 0.2, w: 10.4, h: 6.6 } as const;

/** The image triangle: same three vertices, moved by the translation N→M. */
function imageOf(triangle: { A: XY; B: XY; C: XY }, vector: XY) {
  return {
    A: add(triangle.A, vector),
    B: add(triangle.B, vector),
    C: add(triangle.C, vector),
  };
}

function imageSpec(image: { A: XY; B: XY; C: XY }): FigureSpec {
  const sides: [XY, XY][] = [
    [image.A, image.B],
    [image.B, image.C],
    [image.C, image.A],
  ];
  return {
    viewBox: { x: 0, y: 0, w: 0, h: 0 },
    polygons: [{ points: [image.A, image.B, image.C], tone: 'image' }],
    segments: sides.map(([from, to]) => ({ from, to, tone: 'image' as const })),
    angles: [
      { at: image.A, from: image.B, to: image.C, tone: 'image' as const },
      { at: image.B, from: image.A, to: image.C, tone: 'image' as const },
      { at: image.C, from: image.A, to: image.B, tone: 'image' as const },
    ],
    points: [
      { at: image.A, label: 'A′', place: 'sw', tone: 'image' as const },
      { at: image.B, label: 'B′', place: 'se', tone: 'image' as const },
      { at: image.C, label: 'C′', place: 'n', tone: 'image' as const },
    ],
    texts: [],
  };
}

/** Merge element lists of two specs into one drawing window. */
function mergeSpecs(viewBox: FigureSpec['viewBox'], specs: FigureSpec[]): FigureSpec {
  return {
    viewBox,
    polygons: specs.flatMap((spec) => spec.polygons ?? []),
    segments: specs.flatMap((spec) => spec.segments ?? []),
    angles: specs.flatMap((spec) => spec.angles ?? []),
    points: specs.flatMap((spec) => spec.points ?? []),
    texts: specs.flatMap((spec) => spec.texts ?? []),
  };
}

export function CongruenceCasesLab({ spec }: { spec: InteractiveDiagram }) {
  const cases = readCases(spec.params.cases);
  const vectorFrom = readPoint(
    (spec.params.vector as Record<string, unknown> | undefined)?.from,
  );
  const vectorTo = readPoint((spec.params.vector as Record<string, unknown> | undefined)?.to);
  const [activeCase, setActiveCase] = useState(0);
  const [stage, setStage] = useState(0);

  if (!cases || !vectorFrom || !vectorTo) return null;

  const current = cases[Math.min(activeCase, cases.length - 1)] as LabCase;
  const vector: XY = [vectorTo[0] - vectorFrom[0], vectorTo[1] - vectorFrom[1]];
  const image = imageOf(current.triangle, vector);
  const report = congruenceReport(current.triangle, image);

  const baseSpec = stage === 0 ? current.given : current.completed;
  /*
   * The window is fitted to the lesson's own activity coordinates (the three
   * panels of page 17, plus the image of the last stage four units to the
   * right). It is deliberately the SAME at every stage, so switching stages
   * never rescales the figure under the student's eyes; but it is tight enough
   * that the drawing fills the canvas instead of floating in empty space.
   */
  const viewBox = LAB_VIEW_BOX;

  const drawing =
    stage < 2
      ? mergeSpecs(viewBox, [baseSpec])
      : mergeSpecs(viewBox, [
          current.completed,
          imageSpec(image),
          {
            viewBox,
            segments: [
              { from: current.triangle.A, to: image.A, tone: 'aux', dashed: true, arrow: true },
              { from: current.triangle.B, to: image.B, tone: 'aux', dashed: true, arrow: true },
              { from: current.triangle.C, to: image.C, tone: 'aux', dashed: true, arrow: true },
            ],
          },
        ]);

  const sidePairs: [string, number, number][] = [
    ['AB', distance(current.triangle.A, current.triangle.B), distance(image.A, image.B)],
    ['BC', distance(current.triangle.B, current.triangle.C), distance(image.B, image.C)],
    ['CA', distance(current.triangle.C, current.triangle.A), distance(image.C, image.A)],
  ];

  return (
    <section className={styles.lab} aria-label={plainText(spec.alt)} dir="rtl">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>مختبر من إعداد المنصّة · النشاط — صفحة ١٧</p>
          <h3 className={styles.title}>
            <RichText text={readText(spec.params.title, 'أكمل المثلث ثم انقله')} />
          </h3>
        </div>
        <span className={styles.badge}>رسم تعليمي</span>
      </header>

      <p className={styles.intro}>
        <RichText
          text={readText(
            spec.params.intro,
            'اختر حالة، ثم أكمل المثلث، ثم ارسم صورته وفق الانسحاب الذي ينقل N إلى M.',
          )}
        />
      </p>

      <div className={styles.tabs} role="group" aria-label="حالات التطابق المطبوعة">
        {cases.map((entry, index) => (
          <button
            key={entry.id}
            type="button"
            className={index === activeCase ? styles.tabActive : styles.tab}
            aria-pressed={index === activeCase}
            onClick={() => {
              setActiveCase(index);
              setStage(0);
            }}
          >
            <span dir="ltr">{entry.label}</span> {entry.name}
          </button>
        ))}
      </div>

      <div className={styles.stages} role="group" aria-label="مراحل البناء">
        {STAGES.map((label, index) => (
          <button
            key={label}
            type="button"
            className={stage === index ? styles.stageActive : styles.stageButton}
            aria-pressed={stage === index}
            onClick={() => setStage(index)}
          >
            <span dir="ltr">{index + 1}</span> {label}
          </button>
        ))}
      </div>

      <div className={styles.canvas}>
        <FigureSvg
          spec={drawing}
          ariaLabel={`${plainText(spec.alt)} — ${current.name} — ${STAGES[stage]}`}
        />
      </div>

      <p className={styles.caseNote}>
        <RichText text={current.note} />
      </p>

      {stage >= 1 ? (
        <div className={styles.readout} role="status">
          <div className={styles.readoutRow}>
            <strong>أطوال أضلاع الأصل والصورة:</strong>
            {sidePairs.map(([name, original, copy]) => (
              <span
                key={name}
                className={`${styles.chip} ${
                  Math.abs(original - copy) <= 1e-6 ? styles.chipOk : styles.chipNo
                }`}
              >
                <LtrIsolate>{`${name} = ${original.toFixed(2)}`}</LtrIsolate>
                {' / '}
                <LtrIsolate>{`${name}′ = ${copy.toFixed(2)}`}</LtrIsolate>
              </span>
            ))}
          </div>

          {stage >= 2 ? (
            <>
              <div className={styles.readoutRow}>
                <strong>الزوايا:</strong>
                <span
                  className={`${styles.chip} ${
                    report.anglesEqual.every(Boolean) ? styles.chipOk : styles.chipNo
                  }`}
                >
                  <LtrIsolate>
                    {report.anglesEqual.every(Boolean)
                      ? 'قياسات الزوايا الثلاث محفوظة'
                      : 'قياسات الزوايا غير محفوظة'}
                  </LtrIsolate>
                </span>
                <span className={`${styles.chip} ${report.sss ? styles.chipOk : styles.chipNo}`}>
                  <LtrIsolate>
                    {report.sss ? 'الأضلاع الثلاثة متساوية مع مقابلاتها' : 'الأضلاع غير متساوية'}
                  </LtrIsolate>
                </span>
              </div>
              <p>
                الصورة <LtrIsolate>A′B′C′</LtrIsolate> هي مثلث يطابق <LtrIsolate>ABC</LtrIsolate>:
                الانسحاب يحافظ على الأطوال وقياسات الزوايا، ولذلك لا يغيّر شكل المثلث ولا حجمه.
              </p>
            </>
          ) : (
            <p>
              أكملت المثلث. انتقل إلى المرحلة الثالثة لرسم الصورة ومقارنة العناصر عنصراً بعنصر.
            </p>
          )}
        </div>
      ) : (
        <p className={styles.caseNote}>
          هذه هي المعطيات وحدها. هل تكفي لتحديد مثلث واحد لا أكثر؟ جرّب المرحلة الثانية.
        </p>
      )}
    </section>
  );
}
