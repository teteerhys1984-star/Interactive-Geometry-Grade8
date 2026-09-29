import { useState } from 'react';
import type { ReactNode } from 'react';
import { Callout } from '@/components/ui';
import { isTeacherUnlocked, lockTeacherArea, unlockTeacherArea } from '@/lib/teacherAccess';
import styles from './TeacherGate.module.css';

/**
 * ============================================================================
 *  TEACHER GATE — the shared passphrase lock of every Teacher Area route.
 * ============================================================================
 *
 *  Children — i.e. the ENTIRE teacher-only UI — render only AFTER a successful
 *  unlock, so no teacher content ever enters the DOM before authentication.
 *
 *  ⚠️  This is a convenience speed bump, NOT real security: this is a static
 *  site with no backend. See src/lib/teacherAccess.ts.
 *
 *  Children are a render prop receiving `{ lock }`, so every gated page can
 *  offer its own «قفل المنطقة» button without duplicating gate state.
 * ============================================================================
 */
export interface TeacherGateActions {
  /** Ends the teacher session on this tab and returns to the locked gate. */
  lock: () => void;
}

interface TeacherGateProps {
  children: (actions: TeacherGateActions) => ReactNode;
}

export function TeacherGate({ children }: TeacherGateProps) {
  const [unlocked, setUnlocked] = useState(isTeacherUnlocked);

  if (!unlocked) {
    return <PassphraseForm onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <>
      {children({
        lock: () => {
          lockTeacherArea();
          setUnlocked(false);
        },
      })}
    </>
  );
}

function PassphraseForm({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (unlockTeacherArea(value)) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  }

  return (
    <div className={styles.gate}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="teacher-pass" className={styles.label}>
          كلمة المرور المشتركة
        </label>
        <input
          id="teacher-pass"
          type="password"
          dir="ltr"
          autoComplete="off"
          className={styles.input}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        {error ? (
          <p role="alert" className={styles.error}>
            كلمة المرور غير صحيحة.
          </p>
        ) : null}
        <button type="submit" className={styles.submit}>
          دخول
        </button>
      </form>

      <Callout variant="warning" title="تنبيه أمني مهم">
        <p>
          هذا الموقع ثابت (Static) ويُستضاف على GitHub Pages، ولا يوجد فيه خادم أو قاعدة بيانات أو
          نظام مصادقة. كلمة المرور موجودة داخل ملفات الموقع ويمكن لأي شخص قراءتها.
        </p>
        <p>
          الغرض منها منع الدخول العرضي للطلاب فقط، وليست حماية حقيقية. لا تضع خلفها أي بيانات سرّية
          أو درجات أو معلومات شخصية.
        </p>
      </Callout>
    </div>
  );
}
