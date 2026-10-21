import { describe, expect, it } from 'vitest';
import { getLesson } from './registry';
import type { ContentBlock } from './schema';
import { lesson05ExerciseOne, lesson05ExerciseTwo } from './units/lesson-05-unit-exercises';

const lesson = getLesson('lesson-05-unit-one-exercises')!.lesson;

/**
 * ============================================================================
 *  LESSON 5 — Q1–Q2 SOURCE FIDELITY
 * ============================================================================
 *
 *  Independent transcription pinned to the verified Phase-1B audit of the
 *  supplied scans (source images 1–5). Question 1 spans images 1–3 (ten printed
 *  cases), Question 2 spans images 4–5 (nine printed parts). The pins below
 *  freeze: the verbatim wording and order of all nineteen printed parts, the
 *  option order and C/C′ notation of Question 1 case 10, the printed units and
 *  notation, the parent/subpart card structure, the figure attachments, and the
 *  one-to-one mapping of every printed part to a teacher solution.
 */

const Q1_STEM = 'لكل حالة من الحالات الآتية، إجابة صحيحة واحدة من بين ثلاث إجابات. أشر إليها.';
const Q2_STEM = 'هل أنت موافق أم لا على ما يرد في النصوص الآتية؟ اشرح إجابتك.';

const Q1_PROMPTS = [
  'نجد الشكل وصورته وفق انسحاب في الحالة:',
  '$P$ نقطة غير واقعة على المستقيم $(RS)$، $Q$ هي صورة $P$ وفق الانسحاب الذي ينقل $R$ إلى $S$. إذن: ① $RSPQ$ هو متوازي أضلاع. ② $PQRS$ هو متوازي أضلاع. ③ $RSQP$ هو متوازي أضلاع.',
  '$MNPQ$ متوازي أضلاع، فوفق الانسحاب الذي ينقل $M$ إلى $Q$: ① $P$ هي صورة $Q$. ② $N$ هي صورة $P$. ③ $P$ هي صورة $N$.',
  'مساحة شكل $F$ تساوي $15\\,cm^2$، فمساحة $F’$ صورة هذا الشكل وفق انسحاب: ① غير معلومة. ② تساوي $30\\,cm^2$. ③ تساوي $15\\,cm^2$.',
  '$ABC$ مثلث قائم، فصورته وفق أي انسحاب، هي: ① مثلث كيفي. ② مثلث متساوي الأضلاع. ③ مثلث قائم.',
  'المستقيمان $(d)$ و$(AB)$ غير متوازيين، فصورة $(d)$ وفق الانسحاب الذي ينقل $A$ إلى $B$، هي مستقيم: ① يوازي $(d)$. ② يوازي $(AB)$. ③ يمر بالنقطة $B$.',
  '$(d)$ و$(d’)$ مستقيمان متقاطعان في $A$، وصورتاهما، وفق انسحاب $r$، هما مستقيمان متقاطعان في $B$، إذن $r$ هو: ① الانسحاب الذي ينقل $A$ إلى $B$. ② أي انسحاب. ③ الانسحاب الذي ينقل $B$ إلى $A$.',
  'وفق الانسحاب الذي ينقل $A$ إلى $A’$، تكون القطعة المستقيمة الملونة باللون الأحمر صورة القطعة الملونة باللون الأزرق في الشكل:',
  'في الشكل المجاور، $DEF$، $ABC$ مثلثان طبوقان، عندئذٍ: ① $\\widehat{A} = \\widehat{E}$. ② $\\widehat{A} = \\widehat{F}$. ③ $\\widehat{A} = \\widehat{D}$.',
  'الدائرة $C’$ هي صورة الدائرة $C$ وفق انسحاب؛ فالدائرتان $C$ و$C’$: ① نصفا قطريهما متساويان. ② نصف قطر $C’$ ضعفي نصف قطر $C$. ③ نصف قطر $C$ ضعفي نصف قطر $C’$.',
] as const;

const Q2_PROMPTS = [
  'الشكل $F’$ هو صورة الشكل $F$ وفق الانسحاب الذي ينقل $A$ إلى $A’$.',
  '$ABCD$ متوازي أضلاع، إذن: وفق الانسحاب نفسه، تنتقل $B$ إلى $A$ و$D$ إلى $C$.',
  'في الشكل المرافق، المستقيم $(d’)$ هو صورة المستقيم $(d)$ وفق الانسحاب الذي ينقل $A$ إلى $B$.',
  '$(d)$ و$(d’)$ متوازيان. انسحاب واحد فقط ينقل $(d)$ إلى $(d’)$.',
  '$(d)$ و$(d’)$ مستقيمان متقاطعان. لا يوجد أي انسحاب ينقل $(d)$ إلى $(d’)$.',
  'المستقيم $(BM’)$ هو صورة المستقيم $(AM)$ وفق الانسحاب الذي ينقل $A$ إلى $B$. إذن $M’$ هي صورة $M$ وفق هذا الانسحاب.',
  'القطعة المستقيمة $[BM’]$ هي صورة القطعة $[AM]$ وفق الانسحاب الذي ينقل $A$ إلى $B$، إذن $M’$ هي صورة $M$ وفق هذا الانسحاب.',
  '$C$ و$C’$ دائرتان متساويتان. انسحاب واحد فقط ينقل $C$ إلى $C’$.',
  '$B$ هي صورة $A$ وفق الانسحاب الذي ينقل $C$ إلى $A$، إذن $B$ هي نظيرة $C$ بالنسبة إلى $A$.',
] as const;

const Q1_LABELS = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠'];
const Q2_LABELS = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

interface GroupBlock {
  type: 'questionGroup';
  title?: string;
  items: { label?: string; text: string }[];
}

function stepById(id: string) {
  const step = lesson.steps.find((entry) => entry.id === id);
  expect(step, `step ${id} must exist`).toBeDefined();
  return step!;
}

function cardOf(stepId: string): GroupBlock {
  const first = stepById(stepId).blocks[0] as ContentBlock;
  expect(first.type).toBe('questionGroup');
  return first as unknown as GroupBlock;
}

function figureIdsOf(stepId: string): string[] {
  return stepById(stepId)
    .blocks.filter((block): block is Extract<ContentBlock, { type: 'figure' }> => block.type === 'figure')
    .map((block) => block.diagram.id);
}

describe('Lesson 5 — Q1–Q2 source fidelity', () => {
  it('is a two-source-step lesson: one printed card per main question', () => {
    expect(lesson.steps.map((step) => step.id)).toEqual([
      'exercise-lab-intro',
      'exercise-q1',
      'exercise-q1-decision-lab',
      'exercise-q2',
      'exercise-q2-decision-lab',
    ]);
    expect(lesson.steps.map((step) => step.origin)).toEqual([
      'authored',
      'source',
      'authored',
      'source',
      'authored',
    ]);
    for (const id of ['exercise-q1', 'exercise-q2']) {
      const step = stepById(id);
      expect(step.source?.page).toBeTruthy();
      expect(step.source?.locator).toBeTruthy();
    }
  });

  it('keeps all nineteen printed parts verbatim, in source order', () => {
    expect(lesson05ExerciseOne.map((exercise) => exercise.question)).toEqual(Q1_PROMPTS);
    expect(lesson05ExerciseTwo.map((exercise) => exercise.question)).toEqual(Q2_PROMPTS);
  });

  it('has complete, ordered, duplicate-free branch identifiers', () => {
    expect(lesson05ExerciseOne.map((exercise) => exercise.id)).toEqual(
      Array.from({ length: 10 }, (_, index) => `q1-${index + 1}`),
    );
    expect(lesson05ExerciseTwo.map((exercise) => exercise.id)).toEqual(
      Array.from({ length: 9 }, (_, index) => `q2-${index + 1}`),
    );
    expect(lesson05ExerciseOne.map((exercise) => exercise.number)).toEqual(
      Array.from({ length: 10 }, (_, index) => String(index + 1)),
    );
    expect(lesson05ExerciseTwo.map((exercise) => exercise.number)).toEqual(
      Array.from({ length: 9 }, (_, index) => String(index + 1)),
    );
  });

  it('nests every printed part under its main-question card, labelled as printed', () => {
    const card1 = cardOf('exercise-q1');
    expect(card1.title).toBe(Q1_STEM);
    expect(card1.items).toHaveLength(10);
    expect(card1.items.map((item) => item.label)).toEqual(Q1_LABELS);
    expect(card1.items.map((item) => item.text)).toEqual([...Q1_PROMPTS]);

    const card2 = cardOf('exercise-q2');
    expect(card2.title).toBe(Q2_STEM);
    expect(card2.items).toHaveLength(9);
    expect(card2.items.map((item) => item.label)).toEqual(Q2_LABELS);
    expect(card2.items.map((item) => item.text)).toEqual([...Q2_PROMPTS]);

    // No missing or duplicated printed part across the two cards.
    const all = [...card1.items, ...card2.items];
    expect(all).toHaveLength(19);
    expect(new Set(all.map((item) => item.text)).size).toBe(19);
    expect(new Set(all.map((item) => item.label ?? '')).size).toBeGreaterThanOrEqual(9);
  });

  it('preserves Question 1 case 10: option order and the C / C′ distinction', () => {
    const case10 = Q1_PROMPTS[9];
    expect(case10).toContain('الدائرة $C’$ هي صورة الدائرة $C$ وفق انسحاب');
    const first = case10.indexOf('① نصفا قطريهما متساويان.');
    const second = case10.indexOf('② نصف قطر $C’$ ضعفي نصف قطر $C$.');
    const third = case10.indexOf('③ نصف قطر $C$ ضعفي نصف قطر $C’$.');
    expect(first).toBeGreaterThanOrEqual(0);
    expect(second).toBeGreaterThan(first);
    expect(third).toBeGreaterThan(second);
  });

  it('preserves printed notation, primes and units', () => {
    expect(Q1_PROMPTS[3]).toContain('$15\\,cm^2$');
    expect(Q1_PROMPTS[3]).toContain('$30\\,cm^2$');
    expect(Q1_PROMPTS[8]).toContain('\\widehat{A} = \\widehat{D}');
    expect(Q1_PROMPTS[6]).toContain('وفق انسحاب $r$');
    expect(Q2_PROMPTS[5]).toContain('$(BM’)$');
    expect(Q2_PROMPTS[6]).toContain('$[BM’]$');
    expect(Q2_PROMPTS[8]).toContain('نظيرة $C$ بالنسبة إلى $A$');
  });

  it('keeps the five textbook figures attached to their printed parts', () => {
    expect(figureIdsOf('exercise-q1')).toEqual([
      'fig-ex5-q1-1',
      'fig-ex5-q1-8',
      'fig-ex5-q1-9',
    ]);
    expect(figureIdsOf('exercise-q2')).toEqual(['fig-ex5-q2-1', 'fig-ex5-q2-3']);
    for (const id of ['exercise-q1', 'exercise-q2']) {
      for (const block of stepById(id).blocks) {
        if (block.type !== 'figure') continue;
        expect(block.diagram.origin).toBe('textbook');
        if (block.diagram.kind === 'interactive') {
          expect(block.diagram.renderer).toBe('unit-exercise-figure');
        }
      }
    }
    // Captions tie every figure back to its printed part.
    const captions = stepById('exercise-q1')
      .blocks.filter((block) => block.type === 'figure')
      .map((block) => (block.type === 'figure' ? block.diagram.caption : ''));
    expect(captions[0]).toContain('رسم الفقرة ١');
    expect(captions[1]).toContain('رسم الفقرة ٨');
    expect(captions[2]).toContain('رسم الفقرة ٩');
  });

  it('maps every printed part to exactly one teacher solution, without drift', () => {
    const solutions = lesson.teacherResources?.textbookSolutions ?? [];
    expect(solutions).toHaveLength(19);
    expect(solutions.map((solution) => solution.id)).toEqual([
      ...Array.from({ length: 10 }, (_, index) => `teacher-sol-q1-${index + 1}`),
      ...Array.from({ length: 9 }, (_, index) => `teacher-sol-q2-${index + 1}`),
    ]);
    const parts = [...lesson05ExerciseOne, ...lesson05ExerciseTwo];
    solutions.forEach((solution, index) => {
      expect(solution.question).toBe(parts[index]!.question);
      expect(solution.reference).toContain(`السؤال ${index < 10 ? 1 : 2}`);
      expect(solution.reference).toContain(`الفقرة ${parts[index]!.number}`);
    });
  });
});
