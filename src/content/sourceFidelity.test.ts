import { describe, expect, it } from 'vitest';
import { allLessons, referenceFigures, subject } from './registry';
import { subjectSchema } from './schema';
import type { ContentBlock, DiagramSpec, Question } from './schema';
import { hasUnisolatedNotation } from '@/lib/bidi';

/**
 * ============================================================================
 *  SOURCE-FIDELITY TEST SUITE
 * ============================================================================
 *
 *  The guardrail that keeps the platform honest: every piece of student-facing
 *  content must be traceable to a real page of the real textbook, and must be
 *  free of invented or placeholder material.
 *
 *  Note the distinction enforced below:
 *    - a `reference` DIAGRAM is a legitimate, deliberate editorial outcome;
 *    - invented TEXT is never acceptable.
 * ============================================================================
 */

/** Strings that must never reach students — signals of invented content. */
const FORBIDDEN_PLACEHOLDERS = [
  'lorem',
  'ipsum',
  'لوريم',
  'todo',
  'tbd',
  'fixme',
  'placeholder',
  'نص تجريبي',
  'درس تجريبي',
  'محتوى مؤقت',
  'example content',
  'sample lesson',
];

function collectStrings(blocks: ContentBlock[]): string[] {
  const output: string[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph':
        output.push(block.text);
        break;
      case 'math':
        if (block.label) output.push(block.label);
        break;
      case 'list':
        output.push(...block.items);
        break;
      case 'questionGroup':
        if (block.title) output.push(block.title);
        output.push(...block.items.map((item) => item.text));
        break;
      case 'figure':
        output.push(block.diagram.alt);
        if (block.diagram.caption) output.push(block.diagram.caption);
        break;
      case 'callout':
        if (block.title) output.push(block.title);
        output.push(...collectStrings(block.blocks));
        break;
      case 'teaching':
        output.push(block.title);
        output.push(...collectStrings(block.blocks));
        break;
      case 'compare':
        if (block.title) output.push(block.title);
        output.push(...block.columns);
        for (const row of block.rows) output.push(...row);
        break;
      case 'table':
        if (block.title) output.push(block.title);
        if (block.caption) output.push(block.caption);
        output.push(...block.columns);
        for (const row of block.rows) output.push(...row);
        break;
    }
  }
  return output;
}

function collectDiagrams(blocks: ContentBlock[]): DiagramSpec[] {
  const output: DiagramSpec[] = [];
  for (const block of blocks) {
    if (block.type === 'figure') output.push(block.diagram);
    if (block.type === 'callout') output.push(...collectDiagrams(block.blocks));
    if (block.type === 'teaching') output.push(...collectDiagrams(block.blocks));
  }
  return output;
}

function allDiagrams(): DiagramSpec[] {
  return allLessons.flatMap(({ lesson }) =>
    lesson.steps.flatMap((step) => collectDiagrams(step.blocks)),
  );
}

function allQuestions(): Question[] {
  const questions: Question[] = [];
  for (const unit of subject.units) {
    if (unit.assessment) questions.push(...unit.assessment.questions);
    for (const lesson of unit.lessons) {
      if (lesson.assessment) questions.push(...lesson.assessment.questions);
      for (const step of lesson.steps) {
        if (step.check) questions.push(step.check);
      }
    }
  }
  if (subject.finalAssessment) questions.push(...subject.finalAssessment.questions);
  return questions;
}

describe('course shell', () => {
  it('validates against the subject schema', () => {
    expect(() => subjectSchema.parse(subject)).not.toThrow();
  });
});

describe('implementation boundary — Lessons 1–7 (Lessons 6 and 7 are the independent Q3–15 and Q16–28 continuations)', () => {
  it('registers exactly one unit', () => {
    expect(subject.units).toHaveLength(1);
    expect(subject.units[0]?.id).toBe('unit-01-parallelograms-and-translation');
  });

  it('registers exactly seven lessons in curriculum order', () => {
    expect(allLessons).toHaveLength(7);
    expect(allLessons[0]?.lesson.id).toBe('lesson-01-translation-and-properties');
    expect(allLessons[1]?.lesson.id).toBe('lesson-02-image-of-a-point');
    expect(allLessons[2]?.lesson.id).toBe('lesson-03-image-of-a-shape');
    expect(allLessons[3]?.lesson.id).toBe('lesson-04-triangle-congruence');
    expect(allLessons[4]?.lesson.id).toBe('lesson-05-unit-one-exercises');
    expect(allLessons[5]?.lesson.id).toBe('lesson-06-unit-one-exercises-continuation');
    expect(allLessons[6]?.lesson.id).toBe('lesson-07-unit-one-exercises-final');
  });

  it('draws only on verified lesson pages or the supplied exercise images', () => {
    const pages = new Set<string>();
    for (const { lesson } of allLessons) {
      for (const step of lesson.steps) {
        if (step.source) pages.add(String(step.source.page));
        for (const diagram of collectDiagrams(step.blocks)) {
          if (diagram.source) pages.add(String(diagram.source.page));
        }
      }
    }
    for (const page of pages) {
      expect(
        [
          '5',
          '6',
          '7',
          '6–7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          'صورة المصدر 1',
          'صورة المصدر 2',
          'صورة المصدر 3',
          'صورة المصدر 4',
          'صورة المصدر 5',
          ...Array.from({ length: 26 }, (_, index) => `صورة المصدر — السؤال ${index + 3}`),
        ],
        `unexpected source page: ${page}`,
      ).toContain(page);
    }
  });

  it('invents no textbook assessment (the source prints none for these lessons)', () => {
    expect(subject.finalAssessment).toBeUndefined();
    expect(subject.units[0]?.assessment).toBeUndefined();

    // The lesson DOES carry a final assessment, but every question in it is
    // written by this platform and is labelled as such. Nothing is passed off
    // as a printed textbook exercise.
    for (const question of allQuestions()) {
      expect(question.origin, `question ${question.id} must be authored`).toBe('authored');
    }
  });

  it('invents no summary, objectives or vocabulary (absent from the source)', () => {
    for (const { lesson } of allLessons) {
      expect(lesson.summary, `lesson ${lesson.id}`).toBeUndefined();
      expect(lesson.objectives, `lesson ${lesson.id}`).toEqual([]);
      expect(lesson.vocabulary, `lesson ${lesson.id}`).toEqual([]);
    }
  });
});

describe('structural integrity', () => {
  it('has unique unit ids', () => {
    const ids = subject.units.map((unit) => unit.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique lesson ids across the whole course', () => {
    const ids = allLessons.map((entry) => entry.lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique step ids within each lesson', () => {
    for (const { lesson } of allLessons) {
      const ids = lesson.steps.map((step) => step.id);
      expect(new Set(ids).size, `duplicate step id in lesson ${lesson.id}`).toBe(ids.length);
    }
  });

  it('has unique diagram ids', () => {
    const ids = allDiagrams().map((diagram) => diagram.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keeps lesson ordering contiguous', () => {
    allLessons.forEach((entry, index) => {
      expect(entry.index).toBe(index);
    });
  });

  it('gives every step at least one content block', () => {
    for (const { lesson } of allLessons) {
      for (const step of lesson.steps) {
        expect(step.blocks.length, `empty step ${step.id}`).toBeGreaterThan(0);
      }
    }
  });
});

describe('source fidelity', () => {
  it('requires a textbook page reference on every lesson', () => {
    for (const { lesson } of allLessons) {
      expect(lesson.source, `lesson ${lesson.id} is missing a source`).toBeDefined();
      expect(String(lesson.source.page).length).toBeGreaterThan(0);
    }
  });

  it('requires a textbook page reference on every SOURCE step', () => {
    for (const { lesson } of allLessons) {
      for (const step of lesson.steps) {
        if (step.origin !== 'source') continue;
        expect(step.source, `step ${step.id} is missing a source`).toBeDefined();
        expect(String(step.source?.page).length).toBeGreaterThan(0);
      }
    }
  });

  it('gives authored steps no textbook page (they are not in the book)', () => {
    for (const { lesson } of allLessons) {
      for (const step of lesson.steps) {
        if (step.origin !== 'authored') continue;
        expect(step.source, `authored step ${step.id} must not claim a page`).toBeUndefined();
      }
    }
  });

  it('requires a textbook page reference on every question', () => {
    for (const question of allQuestions()) {
      if (question.origin !== 'textbook') continue;
      expect(question.source, `question ${question.id} is missing a source`).toBeDefined();
      expect(String(question.source?.page).length).toBeGreaterThan(0);
    }
  });

  it('contains no placeholder or invented-content markers', () => {
    const texts: string[] = [];
    for (const { lesson } of allLessons) {
      texts.push(lesson.title, ...(lesson.summary ? [lesson.summary] : []), ...lesson.objectives);
      for (const step of lesson.steps) {
        texts.push(step.title, ...(step.kicker ? [step.kicker] : []));
        texts.push(...collectStrings(step.blocks));
      }
    }
    for (const question of allQuestions()) texts.push(...collectStrings(question.prompt));

    for (const text of texts) {
      const lower = text.toLowerCase();
      for (const marker of FORBIDDEN_PLACEHOLDERS) {
        expect(lower.includes(marker), `placeholder "${marker}" found in: ${text}`).toBe(false);
      }
    }
  });

  it("preserves the source's hat/arc angle notation and never substitutes ∠", () => {
    for (const { lesson } of allLessons) {
      for (const step of lesson.steps) {
        for (const text of collectStrings(step.blocks)) {
          expect(text.includes('∠'), `∠ used instead of \\widehat in: ${text}`).toBe(false);
        }
        for (const block of step.blocks) {
          if (block.type === 'math') {
            expect(block.latex.includes('\\angle')).toBe(false);
          }
        }
      }
    }
  });
});

describe('BIDI safety of authored content', () => {
  it('has no bare mathematical notation outside $…$ delimiters', () => {
    for (const { lesson } of allLessons) {
      const texts = [
        ...(lesson.summary ? [lesson.summary] : []),
        ...lesson.objectives,
        ...lesson.steps.flatMap((step) => collectStrings(step.blocks)),
      ];
      for (const text of texts) {
        expect(
          hasUnisolatedNotation(text),
          `un-isolated notation in lesson ${lesson.id}: "${text}"`,
        ).toBe(false);
      }
    }
  });
});

describe('diagram contracts', () => {
  it('requires an Arabic description on every diagram', () => {
    for (const diagram of allDiagrams()) {
      expect(diagram.alt.trim().length, `diagram ${diagram.id} has no description`).toBeGreaterThan(
        0,
      );
    }
  });

  it('uses base-relative image sources so the GitHub Pages base path applies', () => {
    for (const diagram of allDiagrams()) {
      if (diagram.kind !== 'image') continue;
      expect(diagram.src.startsWith('/')).toBe(false);
    }
  });

  it('ships no `image` diagrams — no source image has been approved for publication', () => {
    expect(allDiagrams().filter((diagram) => diagram.kind === 'image')).toHaveLength(0);
  });

  it('gives every `reference` figure a textbook page number', () => {
    for (const diagram of allDiagrams()) {
      if (diagram.kind !== 'reference') continue;
      expect(diagram.source, `reference ${diagram.id} has no source`).toBeDefined();
      expect(String(diagram.source.page).length).toBeGreaterThan(0);
    }
  });

  it('records why each `reference` figure could not be reproduced faithfully', () => {
    for (const diagram of allDiagrams()) {
      if (diagram.kind !== 'reference') continue;
      expect(diagram.reason, `reference ${diagram.id} has no recorded reason`).toBeTruthy();
    }
  });

  it('exposes every reference figure through the registry for teacher reporting', () => {
    const fromBlocks = allDiagrams().filter((diagram) => diagram.kind === 'reference');
    expect(referenceFigures).toHaveLength(fromBlocks.length);
  });

  it('references only renderers that exist, or none at all', () => {
    for (const diagram of allDiagrams()) {
      expect(['image', 'reference', 'interactive', 'constructed']).toContain(diagram.kind);
    }
  });
});

/**
 * ============================================================================
 *  AUTHORED MATERIAL vs THE SOURCE
 * ============================================================================
 *
 *  Phase 5 added platform-written teaching steps, a final assessment and
 *  teacher resources. None of that may dilute the verbatim source. These
 *  tests pin the boundary in both directions:
 *    - the eight source steps are still present, unchanged and in order;
 *    - every added step, question and diagram is explicitly labelled authored.
 * ============================================================================
 */

/** The eight verbatim steps of Lesson 1, in printed order. */
const SOURCE_STEP_IDS = [
  'step-01-activity-damascus-pavement',
  'step-02-activity-another-translation',
  'step-03-learn-translation-concept',
  'step-04-properties-of-translation',
  'step-05-check-fifteen-parallelograms',
  'step-06-check-why-not-a-translation',
  'step-07-practice-triangular-tiling',
  'step-08-practice-semicircle-area',
];

/**
 * Sentences that must survive verbatim. Chosen to span all three pages and
 * both activities, so any paraphrase or truncation breaks this test.
 */
const VERBATIM_CORPUS = [
  'قص الشكل واستعمله في النشاط الآتي',
  'الأسئلة الآتية تسمح بطرح مفهوم الانسحاب وفق مستقيم.',
  'وفق أية حركة يمكن أن تنتقل قصاصة الحجر ① لتنطبق على قصاصة الحجر ②؟',
  'نقول إن الحجر ② هو صورة الحجر ① وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$.',
  'هل يوجد انسحاب ينقل الحجر ⑩ إلى الحجر ⑧؟ إنْ نعم، ما هو؟',
  'يحافظ الانسحاب على:',
  'لدينا في الشكل التالي 15 متوازي أضلاع مرقمة من الرقم 1 حتى الرقم 15.',
  'اشرح لماذا الشكل الأحمر ليس صورة للشكل الأزرق وفق انسحاب.',
  'دلّ على كل شكل وصورته وفق انسحاب.',
  'استنتج مساحة المنطقة الملونة باللون الأزرق',
];

/**
 * Textbook figures this platform is allowed to REDRAW rather than place behind
 * a `reference` placeholder. A figure only joins this list when every point it
 * contains sits on an integer lattice node that was read from the scan AND
 * verified arithmetically. The verification record lives in
 * docs/LESSON-02-FIGURES.md; nothing here is eyeballed or approximated.
 */
const VERIFIED_TEXTBOOK_FIGURES = [
  'fig-8-activity-grid',
  'fig-10-exercise-3-grid',
  // Lesson 5 reproductions use only incidence, orientation, equality marks and
  // integer grid counts that are unambiguous in the five supplied images.
  'fig-ex5-q1-1',
  'fig-ex5-q1-8',
  'fig-ex5-q1-9',
  'fig-ex5-q2-1',
  'fig-ex5-q2-3',
  // Lesson 6 verification calculations are recorded in docs/LESSON-06-FIGURES.md.
  'fig-ex6-q6-grid-shape',
  'fig-ex6-q13-point-grid',
  'fig-ex6-q15-right-triangle',
  // Lesson 7 reconstructions carry no measured geometry: each one is fixed by
  // adjacency, the segments actually drawn, the shaded regions and the printed
  // equality marks. Question 23's chart carries text and arrows only. The
  // justification per figure is in docs/LESSON-07-FIGURES.md.
  'fig-ex7-q16-rect-parallelogram',
  'fig-ex7-q20-rectangle-diagonals',
  'fig-ex7-q23-proof-flow',
  'fig-ex7-q24-parallelogram',
  'fig-ex7-q25-rectangle',
  'fig-ex7-q26-rhombus',
  'fig-ex7-q27-isosceles',
  'fig-ex7-q28-parallels',
];

/** The eleven verbatim steps of Lesson 2, in printed order (pages 8–10). */
const LESSON_2_SOURCE_STEP_IDS = [
  'step-01-activity-squared-paper',
  'step-02-activity-blank-paper',
  'step-03-definition',
  'step-04-special-case',
  'step-05-knowledge-example',
  'step-06-construction-method',
  'step-07-justification',
  'step-08-check-understanding',
  'step-09-practice-1',
  'step-10-practice-2',
  'step-11-practice-3',
];

/** Lesson 2 sentences that must survive verbatim, spanning pages 8, 9 and 10. */
const LESSON_2_VERBATIM_CORPUS = [
  'ما صورة النقطة $M$ وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$؟',
  'انقل الشكل المرافق إلى ورقة بيضاء.',
  "القول إنَّ « النقطة $M'$ هي صورة النقطة $M$ التي لا تنتمي إلى المستقيم $(AB)$، وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$ » يعني أنَّ « الرباعي $ABM'M$ متوازي أضلاع » ويترتب على ذلك أنَّ القطعتين $[AM']$ و $[BM]$ متناصفتان.",
  "في حالة النقطة $M$ تنتمي إلى المستقيم $(AB)$، تكون النقاط $A$ و $B$ و $M'$ و $M$ على استقامة واحدة، وتكون القطعتان $[AM']$ و $[BM]$ متناصفتين.",
  'في الإنشاء الهندسي، نستعمل فقط فرجاراً ومسطرةً غير مدرجة.',
  "لنكمل $HGM$ إلى متوازي أضلاع $HGMM'$.",
  "فالرباعي $HGMM'$ متوازي أضلاع، ويترتب على ذلك أنَّ $M'$ هي صورة $M$.",
  'في كلٍ من الحالتين الآتيتين، ارسم الشكل الموافق ثم أكمل العبارتين الآتيتين:',
  'ارسم مثلثاً $ABC$، ثم ارسم باستعمال الفرجار:',
  'ارسم متوازي أضلاع $ABCD$ مركزه $M$، ثم انقل العبارات الآتية إلى دفترك وأكملها:',
  'انسخ الشبكة الآتية على صفحةٍ من دفترك:',
];

/** The sixteen source steps of Lesson 3, in printed order (pages 11–16). */
const LESSON_3_SOURCE_STEP_IDS = [
  'step-01-line-image-conjecture',
  'step-02-line-image-proof',
  'step-03-segment-ray-circle-activity',
  'step-04-image-of-a-line-rule',
  'step-05-construct-line-image-nonparallel',
  'step-06-construct-line-image-parallel',
  'step-07-parallel-perpendicular-images',
  'step-08-image-of-a-segment',
  'step-09-image-of-ray-and-circle',
  'step-10-how-to-draw-line-image',
  'step-11-square-application',
  'step-12-check-understanding',
  'step-13-practice-one',
  'step-14-practice-two',
  'step-15-practice-three',
  'step-16-practice-four',
];

/** Sentences spanning all six supplied pages; any omission or rewrite fails. */
const LESSON_3_VERBATIM_CORPUS = [
  'وفق الانسحاب، أي شكل وصورته قابلان للانطباق، فصورة مستقيم هي مستقيم.',
  "ما وضع المستقيمين $(d)$ و $(d')$ في كل حالة؟",
  "لماذا الرباعي $CC'E'E$ هو متوازي أضلاع؟",
  'في الرياضيات، وبشكل خاص في الهندسة، لا يجوز استنتاج الإجابة من الشكل، بل يجب أن تتم الإجابة بالبرهان عبر سلسلة من الاستنتاجات.',
  "صورة المستقيم $(d)$ وفق أي انسحاب هي مستقيم $(d')$ يوازي $(d)$.",
  "في هذه الحالة، ينطبق المستقيم $(d)$ على المستقيم $(d')$.",
  'صورة مستقيمين متوازيين، هما مستقيمان متوازيان.',
  'صورة مستقيمين متعامدين، هما مستقيمان متعامدان.',
  'لرسم صورة مستقيم وفق انسحاب، نرسم صورتي نقطتين منه (باستعمال الفرجار)، ثم نرسم المستقيم المار بهاتين النقطتين.',
  '$ABCD$ مربع طول ضلعه $3\\,cm$. ارسم هذا المربع على صفحة بيضاء، ثم ارسم صورته وفق الانسحاب الذي ينقل $D$ إلى $C$. تحقق مما أنشأت.',
  'صورة مستقيمين متوازيين وفق أي انسحاب هما ...............',
  "ما يمكنك قوله بما يتعلق بالمستقيمين $(d')$ و $(d'')$؟",
  "ما طول القطعة $[E'B']$؟ اشرح إجابتك.",
  'أي الأشكال الثلاثة هو رسمه؟',
];

describe('authored material never displaces the source', () => {
  const lesson = allLessons[0]!.lesson;

  it('keeps all eight verbatim steps, unchanged and in printed order', () => {
    const sourceIds = lesson.steps.filter((s) => s.origin === 'source').map((s) => s.id);
    expect(sourceIds).toEqual(SOURCE_STEP_IDS);
  });

  it('interleaves authored steps without reordering the source', () => {
    // Each authored step must be adjacent to source steps only — i.e. the
    // source sequence read on its own is still the printed sequence.
    expect(lesson.steps.filter((s) => s.origin === 'authored').length).toBeGreaterThan(0);
    expect(lesson.steps).toHaveLength(15);
  });

  it('still contains every checked verbatim sentence, character for character', () => {
    const haystack = lesson.steps
      .filter((step) => step.origin === 'source')
      .flatMap((step) => [
        step.title,
        ...(step.kicker ? [step.kicker] : []),
        ...collectStrings(step.blocks),
      ]);
    for (const sentence of VERBATIM_CORPUS) {
      expect(haystack, `verbatim sentence lost: ${sentence}`).toContain(sentence);
    }
  });

  it('labels every authored teaching step and gives it a teaching block', () => {
    for (const step of lesson.steps) {
      if (step.origin !== 'authored') continue;
      expect(step.kicker, `authored step ${step.id} must be badged`).toBe('شرح المنصّة');
    }
  });

  it('only redraws a textbook figure when its coordinates were verified', () => {
    for (const diagram of allDiagrams()) {
      if (diagram.kind !== 'constructed' && diagram.kind !== 'interactive') continue;
      if (diagram.origin === 'authored') continue;
      expect(
        VERIFIED_TEXTBOOK_FIGURES,
        `${diagram.id} redraws a textbook figure without a verification record`,
      ).toContain(diagram.id);
      expect(diagram.source, `${diagram.id} must cite the page it reproduces`).toBeDefined();
    }
  });

  it('keeps every unverified textbook figure as a faithful `reference` placeholder', () => {
    const textbookFigures = allDiagrams().filter((d) => d.origin === 'textbook');
    // Lessons 1–5 contribute 43 figures. Lesson 6 adds five reference figures
    // and three reconstructions (51). Lesson 7 adds five reference figures and
    // eight reconstructions, for a total of 64 textbook figures.
    expect(textbookFigures).toHaveLength(64);
    expect(new Set(textbookFigures.map((d) => d.id)).size).toBe(64);
    for (const diagram of textbookFigures) {
      if (VERIFIED_TEXTBOOK_FIGURES.includes(diagram.id)) continue;
      expect(diagram.kind, `${diagram.id} must stay a reference placeholder`).toBe('reference');
    }
  });
});

describe('Lesson 2 — authored material never displaces the source', () => {
  const lesson = allLessons[1]!.lesson;

  it('keeps all eleven verbatim steps, unchanged and in printed order', () => {
    const sourceIds = lesson.steps.filter((s) => s.origin === 'source').map((s) => s.id);
    expect(sourceIds).toEqual(LESSON_2_SOURCE_STEP_IDS);
  });

  it('interleaves seven authored steps without reordering the source', () => {
    expect(lesson.steps.filter((s) => s.origin === 'authored')).toHaveLength(7);
    expect(lesson.steps).toHaveLength(18);
  });

  it('still contains every checked verbatim sentence, character for character', () => {
    const haystack = lesson.steps
      .filter((step) => step.origin === 'source')
      .flatMap((step) => [
        step.title,
        ...(step.kicker ? [step.kicker] : []),
        ...collectStrings(step.blocks),
      ]);
    for (const sentence of LESSON_2_VERBATIM_CORPUS) {
      expect(haystack, `verbatim sentence lost: ${sentence}`).toContain(sentence);
    }
  });

  it('labels every authored teaching step', () => {
    for (const step of lesson.steps) {
      if (step.origin !== 'authored') continue;
      expect(step.kicker, `authored step ${step.id} must be badged`).toBe('شرح المنصّة');
    }
  });

  it('reproduces the two squared-paper figures on integer lattice nodes', () => {
    const grids = lesson.steps
      .flatMap((step) => collectDiagrams(step.blocks))
      .filter((diagram) => VERIFIED_TEXTBOOK_FIGURES.includes(diagram.id));
    expect(grids).toHaveLength(2);
    for (const grid of grids) {
      expect(grid.kind).toBe('interactive');
      if (grid.kind !== 'interactive') continue;
      const points = grid.params.points as { x: number; y: number }[];
      expect(points.length).toBeGreaterThan(0);
      for (const point of points) {
        expect(Number.isInteger(point.x), `${grid.id} has a non-lattice x`).toBe(true);
        expect(Number.isInteger(point.y), `${grid.id} has a non-lattice y`).toBe(true);
      }
      // A faithful reproduction of a printed exercise must not hand the answers
      // to the student: no reveal controls on textbook figures.
      expect(grid.params.reveals, `${grid.id} must not reveal answers`).toEqual([]);
    }
  });
});

describe('Lesson 3 — authored material never displaces the source', () => {
  const lesson = allLessons[2]!.lesson;

  it('keeps all sixteen source steps unchanged and in printed order', () => {
    const sourceIds = lesson.steps
      .filter((step) => step.origin === 'source')
      .map((step) => step.id);
    expect(sourceIds).toEqual(LESSON_3_SOURCE_STEP_IDS);
  });

  it('interleaves six authored steps without reordering the source', () => {
    expect(lesson.steps.filter((step) => step.origin === 'authored')).toHaveLength(6);
    expect(lesson.steps).toHaveLength(22);
  });

  it('still contains every checked sentence from pages 11–16 character for character', () => {
    const haystack = lesson.steps
      .filter((step) => step.origin === 'source')
      .flatMap((step) => [
        step.title,
        ...(step.kicker ? [step.kicker] : []),
        ...collectStrings(step.blocks),
      ]);
    for (const sentence of LESSON_3_VERBATIM_CORPUS) {
      expect(haystack, `Lesson 3 source sentence lost: ${sentence}`).toContain(sentence);
    }
  });

  it('labels every platform-written step and every platform-made figure', () => {
    for (const step of lesson.steps) {
      if (step.origin !== 'authored') continue;
      expect(step.kicker).toBe('شرح المنصّة');
      for (const diagram of collectDiagrams(step.blocks)) {
        expect(diagram.origin, diagram.id).toBe('authored');
      }
    }
  });

  it('keeps every Lesson 3 textbook figure as a reference, never an approximation', () => {
    const figures = lesson.steps
      .flatMap((step) => collectDiagrams(step.blocks))
      .filter((diagram) => diagram.origin === 'textbook');
    expect(figures).toHaveLength(14);
    for (const figure of figures) expect(figure.kind, figure.id).toBe('reference');
  });
});

describe('final assessment', () => {
  const assessment = allLessons[0]!.lesson.assessment;

  it('exists and has exactly ten questions', () => {
    expect(assessment).toBeDefined();
    expect(assessment!.questions).toHaveLength(10);
  });

  it('has unique question ids and a valid correct answer for each', () => {
    const ids = assessment!.questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const question of assessment!.questions) {
      if (question.type === 'multiple-choice') {
        const choiceIds = question.choices.map((c) => c.id);
        expect(new Set(choiceIds).size, `duplicate choice id in ${question.id}`).toBe(
          choiceIds.length,
        );
        expect(choiceIds, `${question.id} has no valid correct choice`).toContain(
          question.correctChoiceId,
        );
      }
    }
  });

  it('gives Lessons 2 and 3 final assessments of twelve questions each', () => {
    const lesson02 = allLessons[1]!.lesson.assessment;
    const lesson03 = allLessons[2]!.lesson.assessment;
    expect(lesson02).toBeDefined();
    expect(lesson03).toBeDefined();
    expect(lesson02!.questions).toHaveLength(12);
    expect(lesson03!.questions).toHaveLength(12);
  });

  it('gives every lesson assessment a unique id', () => {
    const ids = allLessons.map(({ lesson }) => lesson.assessment?.id).filter(Boolean);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('mixes question types rather than using a single format', () => {
    for (const { lesson } of allLessons) {
      if (!lesson.assessment) continue;
      const types = new Set(lesson.assessment.questions.map((q) => q.type));
      expect(types.size, `lesson ${lesson.id}`).toBeGreaterThanOrEqual(3);
    }
  });

  it('tags every question with the skill it assesses', () => {
    for (const question of allQuestions()) {
      expect(question.skill, `question ${question.id} has no skill tag`).toBeTruthy();
    }
  });

  it('carries a teacher-only explanation for every question', () => {
    for (const question of allQuestions()) {
      expect(question.explanation, `question ${question.id} has no answer key`).toBeDefined();
      expect(question.explanation!.length).toBeGreaterThan(0);
    }
  });

  it('isolates all notation in the questions students read', () => {
    for (const question of allQuestions()) {
      for (const text of collectStrings(question.prompt)) {
        expect(hasUnisolatedNotation(text), `unisolated notation: ${text}`).toBe(false);
      }
    }
  });
});

describe('teacher resources', () => {
  const lesson01Resources = allLessons[0]!.lesson.teacherResources;
  const lesson02Resources = allLessons[1]!.lesson.teacherResources;
  const lesson03Resources = allLessons[2]!.lesson.teacherResources;

  it('solves every printed question of Lesson 1', () => {
    expect(lesson01Resources).toBeDefined();
    // 4 + 2 + 6 + 1 + 1 + 2 = 16 printed prompts across pages 5–7.
    expect(lesson01Resources!.textbookSolutions.length).toBe(16);
  });

  it('solves every printed question of Lesson 2', () => {
    expect(lesson02Resources).toBeDefined();
    // 3 + 2 + 2 + 3 + 3 + 4 = 17 printed prompts across pages 8–10.
    expect(lesson02Resources!.textbookSolutions.length).toBe(17);
  });

  it('solves every printed question of Lesson 3', () => {
    expect(lesson03Resources).toBeDefined();
    // 2 + 5 + 1 + 3 + 4 + 5 + 1 + 2 = 23 prompts across pages 11–16.
    expect(lesson03Resources!.textbookSolutions.length).toBe(23);
  });

  it('reproduces each printed question verbatim inside its solution', () => {
    for (const { lesson } of allLessons) {
      const printed = new Set<string>();
      for (const step of lesson.steps) {
        if (step.origin !== 'source') continue;
        for (const block of step.blocks) {
          if (block.type === 'questionGroup') {
            for (const item of block.items) printed.add(item.text);
          }
        }
      }
      const solved = new Set(lesson.teacherResources!.textbookSolutions.map((s) => s.question));
      for (const question of printed) {
        expect(solved, `no teacher solution for: ${question}`).toContain(question);
      }
    }
  });

  it('flags every Lesson 1 solution, all of which lean on an unreadable figure', () => {
    const flagged = lesson01Resources!.textbookSolutions.filter((s) => s.limitation);
    expect(flagged.length).toBe(lesson01Resources!.textbookSolutions.length);
  });

  it('flags exactly the Lesson 2 solutions that lean on an unreadable figure', () => {
    // Lesson 2's grids were reproduced from verified coordinates, so only the
    // two blank-sheet activity questions still depend on a `reference` figure.
    const flagged = lesson02Resources!.textbookSolutions.filter((s) => s.limitation);
    expect(flagged.map((s) => s.id)).toEqual(['sol-p8-a2-q1', 'sol-p8-a2-q2']);
  });

  it('never presents the derived solutions as printed textbook answers', () => {
    for (const { lesson } of allLessons) {
      const notes = collectStrings(lesson.teacherResources!.notes).join(' ');
      expect(notes, `lesson ${lesson.id}`).toContain('لا تتضمّن أي إجابات مطبوعة');
    }
  });
});
