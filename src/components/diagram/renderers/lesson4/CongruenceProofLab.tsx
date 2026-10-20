import type { InteractiveDiagram } from '@/content/schema';
import { plainText } from '@/lib/bidi';
import { ChoiceLab } from './ChoiceLab';
import { readChoiceTasks, readFigure, readText } from './params';

/**
 * `congruence-proof-lab` — «تدرّب ③» as a guided proof.
 *
 * The four printed sub-parts become four decisions inside one deduction:
 * which equalities prove MEB ≅ MFC, what the previous congruence hands to
 * MEA ≅ MFA, why AB = AC follows, and why (AM) is both a height and the
 * bisector. Each decision is reviewed with its justification.
 */
export function CongruenceProofLab({ spec }: { spec: InteractiveDiagram }) {
  const figure = readFigure(spec.params.figure);
  const tasks = readChoiceTasks(spec.params.tasks);
  if (!figure || !tasks) return null;

  return (
    <ChoiceLab
      ariaLabel={plainText(spec.alt)}
      eyebrow="برهان موجّه · التمرين ③ — صفحة ١٩"
      title={readText(spec.params.title, 'برهان في مثلث متساوي الساقين')}
      intro={readText(
        spec.params.intro,
        'أجب عن المهام الأربع ثم راجع برهانك كاملاً. لا تظهر أي نتيجة قبل المراجعة.',
      )}
      figure={figure}
      figureLabel={plainText(spec.alt)}
      tasks={tasks}
      reviewLabel="راجع برهاني"
      resetLabel="أعد البرهان"
      taskWord="الخطوة المكتملة"
      footerNote="كل خطوة في البرهان تستند إلى تطابق مُثبت أو إلى معطى مطبوع، لا إلى مظهر الرسم."
    />
  );
}
