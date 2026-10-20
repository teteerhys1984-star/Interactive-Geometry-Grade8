import type { InteractiveDiagram } from '@/content/schema';
import { plainText } from '@/lib/bidi';
import { ChoiceLab } from './ChoiceLab';
import { readChoiceTasks, readFigure, readText } from './params';

/**
 * `case-justify-lab` — «تدرّب ②» as an interaction.
 *
 * Each printed pair is shown with its own measures, and the student chooses
 * which of the three congruence cases justifies the congruence. The whole set
 * is reviewed together, so no single answer is leaked while working.
 */
export function CaseJustifyLab({ spec }: { spec: InteractiveDiagram }) {
  const figure = readFigure(spec.params.figure);
  const tasks = readChoiceTasks(spec.params.tasks);
  if (!figure || !tasks) return null;

  return (
    <ChoiceLab
      ariaLabel={plainText(spec.alt)}
      eyebrow="تدرّب · التمرين ② — صفحة ١٩"
      title={readText(spec.params.title, 'أي حالة تطابق؟')}
      intro={readText(
        spec.params.intro,
        'اختر الحالة التي تثبت تطابق كل زوج، ثم راجع عملك كاملاً.',
      )}
      figure={figure}
      figureLabel={plainText(spec.alt)}
      tasks={tasks}
      reviewLabel="راجع أجوبتي"
      resetLabel="أعد المحاولة"
      taskWord="المهمة المكتملة"
      footerNote="الزاوية المحصورة يجب أن تكون بين الضلعين المعلومين، والزاويتان المجاورتان يجب أن تكونا عند طرفي الضلع المعلوم."
    />
  );
}
