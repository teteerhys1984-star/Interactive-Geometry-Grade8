import { describe, expect, it } from 'vitest';
import { getLesson, lessonDiagrams } from './registry';
import { lesson06Exercises } from './units/lesson-06-unit-exercises-continuation';

const lesson = getLesson('lesson-06-unit-one-exercises-continuation')!.lesson;

/** Independent transcription pinned to the supplied Q3–Q15 scans. */
const PRINTED_PROMPTS = [
  'في الشكل المجاور، $\\widehat{xAz}=\\widehat{yAz}$.\n1. أثبت أنّ المثلثين $ABM$، $AMC$ طبوقان.\n2. استنتج أنّ $CM=MB$.',
  'في كلٍّ من الشكلين ① و ② ثلاث نقاط $A$ و $B$ و $C$.\nانقل الشكل إلى صفحة بيضاء وأكمل في كل حالة متوازي الأضلاع $ABCD$.',
  '$AOB$ مثلث متساوي الساقين في $O$. والنقطتان $C$ و $D$ هما نظيرتا $A$ و $B$ على التوالي.\n1. ارسم شكلاً يحقق معطيات المسألة.\n2. أثبت أنّ الرباعي $ABCD$ هو متوازي أضلاع.',
  'تأمّل الشكل المرسوم جانباً:\n1. انقل هذا الشكل إلى صفحة سنتمترية.\n2. ارسم صورة الشكل ① ولتكن الشكل ② وفق الانسحاب الذي ينقل $A$ إلى $C$.\n3. استعمل الانسحاب ذاته لرسم صورة الشكل ② وارمز لهذه الصورة بالرمز ③.\n4. ممّ تكون قد تحققت؟',
  'في معلم متجانس:\n1. وضّع النقاط $A(-2,0)$ و $B(2,3)$ و $M(4,1)$.\n2. وضّع صورة النقطة $M$ واكتب إحداثييها:\n① وفق الانسحاب الذي ينقل $A$ إلى $B$.\n② وفق الانسحاب الذي ينقل $B$ إلى $A$.',
  '$REC$ مثلث قائم الزاوية في $R$.\nالنقطة $A$ هي صورة $E$ وفق الانسحاب الذي ينقل $R$ إلى $C$.\n1. ارسم شكلاً متّفقاً مع معطيات المسألة.\n2. ما طبيعة الرباعي $REAC$؟ اشرح إجابتك.\n3. وازن بين طولي $[EC]$ و $[RA]$. اشرح إجابتك.',
  'ارسم، في كلّ حالة، صورة المستقيم $(d)$ وفق الانسحاب الذي ينقل النقطة $A$ إلى النقطة $B$.',
  'في الشكل المرسوم جانباً، $C$ نقطة من المستقيم $(d)$.\n1. انقل هذا الشكل إلى دفترك.\n2. ارسم $C’$ صورة النقطة $C$ وفق الانسحاب الذي ينقل $B$ إلى $A$.\n3. وباستعمال الفرجار والمسطرة، ارسم $(d’)$ صورة المستقيم $(d)$ وفق ذلك الانسحاب. اشرح عملك.',
  'في الشكل المجاور، $ABC$ مثلث متساوي الساقين.\n1. أثبت أنّ المثلثين $CNA$، $CBN$ طبوقان.\n2. استنتج أنّ $AN=NB$.\n3. هل $\\widehat{ACN}=\\widehat{NCB}$ ولماذا؟',
  'ارسم مستقيماً مارّاً بنقطتين $U$ و $V$ ونقطة $J$ لا تنتمي إليه.\n1. ارسم $(\\Delta)$ صورة المستقيم $(UV)$ وفق الانسحاب الذي ينقل $V$ إلى $J$.\n2. ارسم $(d)$ صورة المستقيم $(UV)$ وفق التناظر الذي مركزه $J$.\n3. هل المستقيمان $(\\Delta)$ و $(d)$ متوازيان؟ اشرح إجابتك.',
  'تأمّل الشكل الآتي:\n1. وفق الانسحاب الذي ينقل $A$ إلى $B$، ما صورة:\n① النقطة $C$؟ ② النقطة $F$؟ ③ النقطة $H$؟ ④ النقطة $M$؟\n2. وفق الانسحاب الذي ينقل $A$ إلى $B$، ما النقطة التي:\n① صورتها $D$؟ ② صورتها $I$؟ ③ صورتها $H$؟\nحدّد وفق الانسحاب الذي ينقل $A$ إلى $B$، مثلثين طبوقين',
  '1. ارسم، باللون الأسود، مستطيلاً $ABCD$ بعداه $AB=2\\,cm$ و $AD=4\\,cm$.\n2. ارسم:\n① باللون الأزرق، صورة المستطيل $ABCD$ وفق الانسحاب الذي ينقل $A$ إلى $B$.\n② باللون الأحمر، صورة المستطيل $ABCD$ وفق الانسحاب الذي ينقل $D$ إلى $A$.\n③ باللون الأخضر، صورة المستطيل $ABCD$ وفق الانسحاب الذي ينقل $B$ إلى $D$.',
  'المثلث $ABC$ المرسوم جانباً، قائمٌ في $A$ و $AB=3\\,cm$ و $AC=2\\,cm$. $E$ نقطة من وتره $[BC]$، $CE=1\\,cm$.\nارسم هذا المثلث على دفترك، ثم ارسم صورته وفق الانسحاب الذي ينقل $C$ إلى $E$.',
] as const;

describe('Lesson 6 — Q3–Q15 source fidelity', () => {
  it('is a separate 13-step lesson in exact question order', () => {
    expect(lesson.title).toBe('تتمة الدرس الخامس (1): تمرينات الوحدة الأولى — الأسئلة 3–15');
    expect(lesson.steps).toHaveLength(13);
    expect(lesson.steps.map((step) => step.id)).toEqual(
      Array.from({ length: 13 }, (_, index) => `exercise-q${index + 3}`),
    );
    expect(lesson.steps.every((step) => step.origin === 'source')).toBe(true);
  });

  it('keeps every complete printed prompt character-for-character', () => {
    expect(lesson06Exercises.map((exercise) => exercise.prompt)).toEqual(PRINTED_PROMPTS);
    const renderedPrompts = lesson.steps.map((step) => {
      const group = step.blocks.find((block) => block.type === 'questionGroup');
      return group?.type === 'questionGroup' ? group.items[0]?.text : undefined;
    });
    expect(renderedPrompts).toEqual(PRINTED_PROMPTS);
  });

  it('keeps the printed Q5 hint verbatim', () => {
    const q5 = lesson.steps[2]!;
    const serialized = JSON.stringify(q5.blocks);
    expect(serialized).toContain(
      'نقول إنّ المثلث $AOB$ متساوي الساقين في $O$، عندما تكون $O$ نقطة تقاطع ضلعيه المتساويين.',
    );
  });

  it('accounts for all 46 printed branches and construction tasks', () => {
    expect(lesson06Exercises.map((exercise) => exercise.printedTaskCount)).toEqual([
      2, 2, 2, 4, 3, 3, 6, 3, 3, 4, 8, 4, 2,
    ]);
    expect(lesson06Exercises.reduce((sum, exercise) => sum + exercise.printedTaskCount, 0)).toBe(
      46,
    );
  });

  it('adds no duplicate final test because the exercises are the assessment', () => {
    expect(lesson.assessment).toBeUndefined();
  });

  it('provides one detailed teacher solution per main question', () => {
    const solutions = lesson.teacherResources?.textbookSolutions ?? [];
    expect(solutions).toHaveLength(13);
    expect(solutions.map((solution) => solution.question)).toEqual(PRINTED_PROMPTS);
  });

  it('classifies all 26 diagram records exactly as documented', () => {
    const diagrams = lessonDiagrams(lesson);
    expect(diagrams).toHaveLength(26);
    expect(diagrams.filter((diagram) => diagram.kind === 'reference')).toHaveLength(5);
    expect(
      diagrams.filter((diagram) => diagram.origin === 'textbook' && diagram.kind !== 'reference'),
    ).toHaveLength(3);
    expect(diagrams.filter((diagram) => diagram.origin === 'authored')).toHaveLength(18);
  });

  it('keeps reconstructed source figures answer-free', () => {
    const reconstructed = lessonDiagrams(lesson).filter(
      (diagram) => diagram.origin === 'textbook' && diagram.kind !== 'reference',
    );
    expect(reconstructed.map((diagram) => diagram.id)).toEqual([
      'fig-ex6-q6-grid-shape',
      'fig-ex6-q13-point-grid',
      'fig-ex6-q15-right-triangle',
    ]);
    for (const diagram of reconstructed) {
      if (diagram.kind !== 'interactive') continue;
      expect(diagram.params).not.toHaveProperty('answers');
      expect(diagram.params).not.toHaveProperty('reveals');
    }
  });
});
