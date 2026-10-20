import { useId, useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import { LtrIsolate, RichText } from '@/components/math';
import { plainText } from '@/lib/bidi';
import { FigureSvg } from './FigureSvg';
import { readFigure, readPairOptions, readText } from './params';
import styles from './lab.module.css';

/**
 * `kite-pair-lab` — «تدرّب ①» as an interaction.
 *
 * The printed question asks the student to find the congruent pairs of
 * triangles inside the kite. Selecting is deliberately multi-answer, and the
 * whole selection is reviewed at once: the reasons arrive together, so an
 * early click cannot reveal which pairs are the right ones.
 */
export function KitePairLab({ spec }: { spec: InteractiveDiagram }) {
  const figure = readFigure(spec.params.figure);
  const options = readPairOptions(spec.params.options);
  const [chosen, setChosen] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  if (!figure || !options) return null;

  const toggle = (id: string) =>
    setChosen((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    );

  const correctPicks = options.filter((option) => option.answer);
  const hits = correctPicks.filter((option) => chosen.includes(option.id)).length;
  const falsePicks = options.filter((option) => !option.answer && chosen.includes(option.id)).length;

  return (
    <section className={styles.lab} aria-label={plainText(spec.alt)} dir="rtl">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>تدرّب · التمرين ① — صفحة ١٩</p>
          <h3 className={styles.title}>
            <RichText
              text={readText(spec.params.title, 'أزواج المثلثات في الطائرة الورقية')}
            />
          </h3>
        </div>
        <span className={styles.badge}>رسم تعليمي</span>
      </header>

      <p className={styles.intro}>
        <RichText
          text={readText(
            spec.params.intro,
            'حدّد كل زوج من المثلثات تعتقد أنه متطابق، ثم راجع اختيارك.',
          )}
        />
      </p>

      <div className={styles.figureWrap}>
        <FigureSvg spec={figure} ariaLabel={plainText(spec.alt)} />
      </div>

      <fieldset className={styles.options} disabled={submitted}>
        <legend className="visually-hidden">أزواج المثلثات</legend>
        {options.map((option) => {
          const picked = chosen.includes(option.id);
          return (
            <label key={option.id} className={picked ? styles.optionOn : styles.option}>
              <input
                type="checkbox"
                name={`${uid}-${option.id}`}
                checked={picked}
                onChange={() => toggle(option.id)}
              />
              <span>
                <RichText text={option.label} />
              </span>
            </label>
          );
        })}
      </fieldset>

      {submitted ? (
        <div className={styles.tasks} role="status">
          <div className={styles.card}>
            <p>
              <strong>المراجعة:</strong>{' '}
              <LtrIsolate>{`${hits}/${correctPicks.length}`}</LtrIsolate> من الأزواج الصحيحة،
              و<LtrIsolate>{falsePicks}</LtrIsolate> اختياراً غير صحيح.
            </p>
            <ul className={styles.reviewList}>
              {options
                .filter((option) => chosen.includes(option.id))
                .map((option) => (
                  <li key={option.id} className={option.answer ? styles.cardCorrect : styles.cardWrong}>
                    <p>
                      <RichText text={option.label} /> —{' '}
                      {option.answer ? 'زوج متطابق.' : 'ليس زوجاً متطابقاً.'}
                    </p>
                    <p className={styles.reason}>
                      <RichText text={option.reason} />
                    </p>
                  </li>
                ))}
            </ul>
            <p className={styles.reason}>
              الأزواج الصحيحة هي:{' '}
              {correctPicks.map((option, index) => (
                <span key={option.id}>
                  {index > 0 ? '، ' : ''}
                  <RichText text={option.label} />
                </span>
              ))}
              .
            </p>
          </div>
        </div>
      ) : null}

      <footer className={styles.actions}>
        {submitted ? (
          <button
            type="button"
            className={styles.secondary}
            onClick={() => {
              setChosen([]);
              setSubmitted(false);
            }}
          >
            أعد المحاولة
          </button>
        ) : (
          <>
            <p>لا يظهر التصحيح قبل المراجعة، ولا تُحتسب إلا الأزواج التي تختارها.</p>
            <button
              type="button"
              className={styles.primary}
              disabled={chosen.length === 0}
              onClick={() => setSubmitted(true)}
            >
              راجع اختياري
            </button>
          </>
        )}
      </footer>
    </section>
  );
}
