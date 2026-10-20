/// <reference types="node" />
// The application `types` array in tsconfig.app.json is deliberately browser
// only (no `node`), so this one test opts in locally: it reads the real
// stylesheets from disk, which is the only way to see the cascade that ships
// (`test.css` is `false`, and the `?raw` glob is emptied by it).
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import type { ConstructedDiagram, InteractiveDiagram } from '@/content/schema';
import {
  casesLabDiagram,
  fig17Cases,
  fig18Asa,
  fig18Sas,
  fig18Sss,
  fig19Check,
  fig19Isosceles,
  fig19Kite,
  fig19Pairs,
  figDefinitionPair,
  figTranslation,
  teacherActivityFigure,
  teacherCheckFigure,
  teacherIsoscelesFigure,
  teacherKiteFigure,
} from '@/content/units/lesson-04-figures';
import { readFigureSpec } from '@/lib/geometryFigure';
import type { FigureSpec } from '@/lib/geometryFigure';
import { LessonOneLab } from '../LessonOneLab';
import { UnitExerciseFigure } from '../UnitExerciseFigure';
import { CongruenceCasesLab } from './CongruenceCasesLab';
import { CongruenceFigure } from './index';
import figureStyles from './figure.module.css';
import labStyles from './lab.module.css';
import unitExerciseStyles from '../UnitExerciseFigure.module.css';
import lessonOneStyles from '../LessonOneLab.module.css';

/**
 * ============================================================================
 *  LESSON 4 — THE CASCADE THAT ACTUALLY PAINTS THE LABELS
 * ============================================================================
 *
 *  `lesson4-typography.test.tsx` proves that the renderer *declares* the right
 *  size: `figureTypography` returns 16 px for a vertex at the reference width,
 *  and `FigureSvg` writes it onto every `<text>` as a `font-size` attribute.
 *
 *  It could not prove that the declared size is the size that is PAINTED, and
 *  for four merged revisions it was not. `FigureSvg` set `font-size` as an SVG
 *  *presentation attribute*, the weakest declaration in the author origin. One
 *  unscoped rule in another component's stylesheet —
 *
 *      text { … font-size: 5px }        (UnitExerciseFigure.module.css)
 *
 *  — reached the shared bundle unhashed (CSS Modules hash classes and ids,
 *  never bare type selectors), so it beat every figure label in the lesson:
 *  correct in the markup, 7–28× too large on screen, and green in CI
 *  throughout, because the suite runs with `css: false` and every assertion
 *  read the attribute.
 *
 *  These tests close that gap by installing the application's real stylesheets
 *  and asking the DOM what it computed. The stylesheets are read from disk
 *  (`css: false` empties them in the test pipeline, and reading the source is
 *  what actually ships anyway). Selectors are rewritten to Vite's hashed class
 *  names for the four modules whose scope matters; a *scoped* rule in any other
 *  module cannot match a figure label, and every *unscoped* rule — the only
 *  kind that can leak — is reproduced byte-for-byte.
 *
 *  What these tests still cannot see: a real browser's layout, real font
 *  metrics, RTL flow, and the rasterised page. They assert the computed
 *  cascade, not the final paint (see docs/LESSON-04-LABEL-AUDIT.md §2).
 * ============================================================================
 */

/* --------------------------------------------------------------------------
 *  The application stylesheet
 * ----------------------------------------------------------------------- */

const SOURCE_ROOT = resolve(process.cwd(), 'src');

/** Every `*.module.css` in the app, keyed by its repo-relative path. */
function readModuleStylesheets(): Record<string, string> {
  const found: Record<string, string> = {};
  for (const entry of readdirSync(SOURCE_ROOT, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.module.css')) continue;
    const full = join(entry.parentPath, entry.name);
    found[full.slice(SOURCE_ROOT.length + 1)] = readFileSync(full, 'utf8');
  }
  return found;
}

/** Every global stylesheet (`tokens`, `rtl`, `global`). */
function readGlobalStylesheets(): string[] {
  return ['tokens.css', 'rtl.css', 'global.css'].map((name) =>
    readFileSync(resolve(SOURCE_ROOT, 'styles', name), 'utf8'),
  );
}

/**
 * Only these modules need hashed selectors, because only these stylesheets can
 * be *scoped* to an element the tests render. Anything else is left unhashed:
 * its scoped rules then match nothing, which is conservative — and its
 * unscoped rules, the ones that can actually leak, are element selectors that
 * CSS Modules would never hash in the first place.
 */
const CLASS_MAPS: Record<string, Record<string, string>> = {
  'components/diagram/renderers/lesson4/figure.module.css': figureStyles as unknown as Record<
    string,
    string
  >,
  'components/diagram/renderers/lesson4/lab.module.css': labStyles as unknown as Record<
    string,
    string
  >,
  'components/diagram/renderers/UnitExerciseFigure.module.css':
    unitExerciseStyles as unknown as Record<string, string>,
  'components/diagram/renderers/LessonOneLab.module.css': lessonOneStyles as unknown as Record<
    string,
    string
  >,
};

const moduleStylesheets = readModuleStylesheets();

/** `.class` → Vite's hashed class name. Numeric tokens are untouched. */
function hashSelectors(source: string, classes: Record<string, string>): string {
  return source.replace(/\.([A-Za-z_][\w-]*)/g, (match, name: string) =>
    classes[name] ? `.${classes[name]}` : match,
  );
}

/** The application's cascade, in the form the browser receives it. */
function applicationStylesheet(): string {
  const parts = readGlobalStylesheets();
  for (const [id, source] of Object.entries(moduleStylesheets)) {
    parts.push(hashSelectors(source, CLASS_MAPS[id] ?? {}));
  }
  return parts.join('\n');
}

let installed: HTMLStyleElement | undefined;

/** Install the stylesheet once for the whole file. */
function useApplicationStyles(): void {
  if (installed) return;
  const css = applicationStylesheet();
  // An empty or truncated sheet would make these guards pass for the wrong
  // reason. The application ships ~130 kB of CSS; 20 kB is a deliberately
  // loose floor that still catches a loader that returns nothing.
  expect(css.length, 'the application stylesheet did not load').toBeGreaterThan(20_000);
  installed = document.createElement('style');
  installed.dataset.testid = 'application-stylesheet';
  installed.textContent = css;
  document.head.append(installed);
}

/* --------------------------------------------------------------------------
 *  Measurement helpers
 * ----------------------------------------------------------------------- */

interface Measurement {
  text: string;
  declared: number;
  painted: number;
}

/** Every `<text>` under `root`, with its declared and its painted size. */
function measureLabels(root: ParentNode): Measurement[] {
  return Array.from(root.querySelectorAll('svg text')).map((label) => ({
    text: (label.textContent ?? '').trim(),
    declared: Number(label.getAttribute('font-size')),
    painted: Number.parseFloat(window.getComputedStyle(label).fontSize),
  }));
}

/** The labels whose painted size is not the size the renderer declared. */
const describeDrift = (measurements: Measurement[]): string[] =>
  measurements
    .filter(({ declared, painted }) => !(Math.abs(declared - painted) < 1e-6))
    .map(
      ({ text, declared, painted }) =>
        `«${text}» declared ${declared.toFixed(3)}px but painted ${painted.toFixed(3)}px`,
    );

/* --------------------------------------------------------------------------
 *  Fixtures
 * ----------------------------------------------------------------------- */

const constructionOf = (diagram: ConstructedDiagram): FigureSpec => {
  const spec = readFigureSpec(diagram.construction);
  if (!spec) throw new Error(`unreadable construction: ${diagram.id}`);
  return spec;
};

/** The 14 constructed figures: 8 textbook, 2 authored, 4 teacher-only. */
const figures: Record<string, FigureSpec> = {
  'fig-17-activity-cases': constructionOf(fig17Cases),
  'fig-18-example-sas': constructionOf(fig18Sas),
  'fig-18-example-asa': constructionOf(fig18Asa),
  'fig-18-example-sss': constructionOf(fig18Sss),
  'fig-19-check-rectangle': constructionOf(fig19Check),
  'fig-19-kite': constructionOf(fig19Kite),
  'fig-19-pairs': constructionOf(fig19Pairs),
  'fig-19-isosceles': constructionOf(fig19Isosceles),
  'auth-04-translation-intro': constructionOf(figTranslation),
  'auth-04-definition-pair': constructionOf(figDefinitionPair),
  'auth-04-teacher-activity': constructionOf(teacherActivityFigure),
  'auth-04-teacher-check': constructionOf(teacherCheckFigure),
  'auth-04-teacher-kite': constructionOf(teacherKiteFigure),
  'auth-04-teacher-isosceles': constructionOf(teacherIsoscelesFigure),
};

const asConstructed = (id: string, spec: FigureSpec): ConstructedDiagram => ({
  kind: 'constructed',
  origin: 'authored',
  renderer: 'congruence-figure',
  id,
  alt: 'شكل للتحقق من تنسيق الوسوم',
  construction: spec as unknown as Record<string, unknown>,
});

/** Lesson 5's exercise figure: the component whose rule used to leak. */
const lesson5Spec = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'cascade-probe-lesson-5',
  renderer: 'unit-exercise-figure',
  alt: 'شكل تدريبي للدرس الخامس',
  params: { scenario: 'translation-candidates' },
} as unknown as InteractiveDiagram;

/** Lesson 1's lab: the other component with bare `<text>` nodes of its own. */
const lesson1Spec = {
  kind: 'interactive',
  origin: 'textbook',
  id: 'cascade-probe-lesson-1',
  renderer: 'lesson-one-lab',
  alt: 'مختبر الدرس الأول',
  params: { mode: 'grid' },
} as unknown as InteractiveDiagram;

/* --------------------------------------------------------------------------
 *  The guards
 * ----------------------------------------------------------------------- */

describe('figure labels are painted at the size the renderer declares', () => {
  it('covers the whole lesson: 14 constructed figures and 9 lab panels', () => {
    expect(Object.keys(figures)).toHaveLength(14);
    expect(casesLabDiagram.params.cases as unknown[]).toHaveLength(3);
  });

  it.each(Object.entries(figures))(
    '%s: no label is repainted by the application stylesheet',
    (name, spec) => {
      useApplicationStyles();

      const { container, unmount } = render(
        <CongruenceFigure spec={asConstructed(`cascade-${name}`, spec)} />,
      );
      const measurements = measureLabels(container);
      unmount();

      expect(measurements.length, `${name}: no labels were rendered`).toBeGreaterThan(0);
      expect(describeDrift(measurements)).toEqual([]);
    },
  );

  it('the congruence lab: all 3 cases × 3 stages keep their declared sizes', () => {
    useApplicationStyles();

    const { container, unmount } = render(<CongruenceCasesLab spec={casesLabDiagram} />);
    const groups = Array.from(container.querySelectorAll('[role="group"]'));
    expect(groups, 'the lab must expose its case tabs and its stage buttons').toHaveLength(2);
    const caseTabs = Array.from(groups[0]!.querySelectorAll('button'));
    const stageButtons = Array.from(groups[1]!.querySelectorAll('button'));
    expect(caseTabs).toHaveLength(3);
    expect(stageButtons).toHaveLength(3);

    let panels = 0;
    let labels = 0;
    const drift: string[] = [];

    for (const [caseIndex, caseTab] of caseTabs.entries()) {
      fireEvent.click(caseTab);
      for (const [stageIndex, stageButton] of stageButtons.entries()) {
        fireEvent.click(stageButton);
        const measurements = measureLabels(container);
        panels += 1;
        labels += measurements.length;
        drift.push(
          ...describeDrift(measurements).map(
            (entry) => `case ${caseIndex + 1}, stage ${stageIndex + 1}: ${entry}`,
          ),
        );
      }
    }
    unmount();

    expect(panels).toBe(9);
    expect(labels).toBeGreaterThan(0);
    expect(drift).toEqual([]);
  });
});

describe('no stylesheet may claim a figure label', () => {
  /**
   * An element-only compound (`text`, `svg text`, `*`) written in a CSS Module
   * is NOT hashed — CSS Modules rewrite classes and ids only — so it applies to
   * every `<svg>` in the application. That is how a Lesson 5 rule came to set
   * the size of every Lesson 4 label.
   */
  const isUnscopedCompound = (compound: string): boolean => /^([a-zA-Z][\w-]*|\*)$/.test(compound);

  const isUnscopedSelector = (selector: string): boolean => {
    const compounds = selector.split(/[\s>+~]+/).filter(Boolean);
    return compounds.length > 0 && compounds.every(isUnscopedCompound);
  };

  const selectorsOf = (source: string): string[] => {
    const selectors: string[] = [];
    for (const match of source.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{/g)) {
      const selector = match[1]!.trim();
      if (!selector || selector.startsWith('@')) continue;
      selectors.push(...selector.split(',').map((part) => part.trim()));
    }
    return selectors.filter(Boolean);
  };

  it('ships no unscoped element rule that sets type on a <text>', () => {
    const offenders = Object.entries(moduleStylesheets).flatMap(([id, source]) =>
      selectorsOf(source)
        .filter((selector) => /(^|[\s>+~])text\b/.test(selector))
        .filter(isUnscopedSelector)
        .map((selector) => `${id}: ${selector}`),
    );
    expect(offenders).toEqual([]);
  });

  it('keeps the two legitimate scoped <text> rules intact', () => {
    const textSelectors = (id: string) =>
      selectorsOf(moduleStylesheets[id]!).filter((selector) => /(^|[\s>+~])text\b/.test(selector));

    // Lesson 5's figures are 5 user units tall by design and carry no
    // `font-size` of their own: this rule is what sets their type.
    expect(textSelectors('components/diagram/renderers/UnitExerciseFigure.module.css')).toEqual([
      '.wrap text',
    ]);
    // Lesson 1 sets its own type on its own class.
    expect(textSelectors('components/diagram/renderers/LessonOneLab.module.css')).toEqual([
      '.svg text',
    ]);
  });
});

describe('the cascade fix does not move another lesson', () => {
  it('keeps Lesson 5’s exercise figures at 5 px', () => {
    useApplicationStyles();
    const { container, unmount } = render(<UnitExerciseFigure spec={lesson5Spec} />);
    const sizes = measureLabels(container).map(({ painted }) => painted);
    unmount();
    expect(sizes.length).toBeGreaterThan(0);
    // The rule that used to leak is now scoped to `.wrap`, which this renderer
    // already draws around its <svg>. Its figures must be pixel-identical.
    expect(new Set(sizes)).toEqual(new Set([5]));
  });

  it('keeps Lesson 1’s lab labels at 16 px', () => {
    useApplicationStyles();
    const { container, unmount } = render(<LessonOneLab spec={lesson1Spec} />);
    const labels = measureLabels(container);
    unmount();
    expect(labels.length).toBeGreaterThan(0);
    // `.svg text { font: 16px sans-serif }` was already scoped and must stay.
    expect(new Set(labels.map(({ painted }) => painted))).toEqual(new Set([16]));
  });
});
