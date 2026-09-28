import { Link } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { EmptyState } from '@/components/ui';
import { routes } from '@/lib/routes';

export function NotFoundPage() {
  return (
    <PageShell title="الصفحة غير موجودة">
      <EmptyState
        title="لم نعثر على هذه الصفحة"
        description="قد يكون الرابط قديمًا، أو أن المحتوى المطلوب لم يُضف بعد."
      >
        <Link to={routes.home()}>العودة إلى الصفحة الرئيسية</Link>
      </EmptyState>
    </PageShell>
  );
}
