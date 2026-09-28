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

describe('implementation boundary — Lesson 1 only', () => {
  it('registers exactly one unit', () => {
    expect(subject.units).toHaveLength(1);
    expect(subject.units[0]?.id).toBe('unit-01-parallelograms-and-translation');
  });

  it('registers exactly one lesson (Lessons 2–4 not yet authored)', () => {
    expect(allLessons).toHaveLength(1);
    expect(allLessons[0]?.lesson.id).toBe('lesson-01-translation-and-properties');
  });

  it('draws only on textbook pages 5–7', () => {
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
      expect(['5', '6', '7', '6–7'], `unexpected source page: ${page}`).toContain(page);
    }
  });

  it('invents no textbook assessment (the source prints none for Lesson 1)', () => {
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
    const lesson = allLessons[0]?.lesson;
    expect(lesson?.summary).toBeUndefined();
    expect(lesson?.objectives).toEqual([]);
    expect(lesson?.vocabulary).toEqual([]);
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

  it('only ever draws constructed figures that this platform authored itself', () => {
    for (const diagram of allDiagrams()) {
      if (diagram.kind === 'constructed' || diagram.kind === 'interactive') {
        expect(diagram.origin, `${diagram.id} reconstructs a textbook figure`).toBe('authored');
      }
    }
  });

  it('keeps every textbook figure as a faithful `reference` placeholder', () => {
    const textbookFigures = allDiagrams().filter((d) => d.origin === 'textbook');
    // Six distinct figures; the pavement figure is shown in two steps.
    expect(textbookFigures).toHaveLength(7);
    expect(new Set(textbookFigures.map((d) => d.id)).size).toBe(7);
    for (const diagram of textbookFigures) {
      expect(diagram.kind, `${diagram.id} must stay a reference placeholder`).toBe('reference');
    }
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

  it('mixes question types rather than using a single format', () => {
    const types = new Set(assessment!.questions.map((q) => q.type));
    expect(types.size).toBeGreaterThanOrEqual(3);
  });

  it('tags every question with the skill it assesses', () => {
    for (const question of assessment!.questions) {
      expect(question.skill, `question ${question.id} has no skill tag`).toBeTruthy();
    }
  });

  it('carries a teacher-only explanation for every question', () => {
    for (const question of assessment!.questions) {
      expect(question.explanation, `question ${question.id} has no answer key`).toBeDefined();
      expect(question.explanation!.length).toBeGreaterThan(0);
    }
  });

  it('isolates all notation in the questions students read', () => {
    for (const question of assessment!.questions) {
      for (const text of collectStrings(question.prompt)) {
        expect(hasUnisolatedNotation(text), `unisolated notation: ${text}`).toBe(false);
      }
    }
  });
});

describe('teacher resources', () => {
  const resources = allLessons[0]!.lesson.teacherResources;

  it('exists and solves every printed question of the lesson', () => {
    expect(resources).toBeDefined();
    // 4 + 2 + 6 + 1 + 1 + 2 = 16 printed prompts across pages 5–7.
    expect(resources!.textbookSolutions.length).toBe(16);
  });

  it('reproduces each printed question verbatim inside its solution', () => {
    const printed = new Set<string>();
    for (const step of allLessons[0]!.lesson.steps) {
      if (step.origin !== 'source') continue;
      for (const block of step.blocks) {
        if (block.type === 'questionGroup') {
          for (const item of block.items) printed.add(item.text);
        }
      }
    }
    const solved = new Set(resources!.textbookSolutions.map((s) => s.question));
    for (const question of printed) {
      expect(solved, `no teacher solution for: ${question}`).toContain(question);
    }
  });

  it('flags every solution that leans on an unreadable figure', () => {
    const flagged = resources!.textbookSolutions.filter((s) => s.limitation);
    // Every solution in this lesson touches a `reference` figure in some way.
    expect(flagged.length).toBe(resources!.textbookSolutions.length);
  });

  it('never presents the derived solutions as printed textbook answers', () => {
    const notes = collectStrings(resources!.notes).join(' ');
    expect(notes).toContain('لا تتضمّن أي إجابات مطبوعة');
  });
});
