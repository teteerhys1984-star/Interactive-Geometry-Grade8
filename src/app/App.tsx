import { Route, Routes } from 'react-router-dom';
import { Footer, Header } from '@/components/layout';
import { routePatterns } from '@/lib/routes';
import {
  AssessmentPage,
  CompletionPage,
  HomePage,
  LessonOutlinePage,
  LessonStepPage,
  NotFoundPage,
  SubjectPage,
  TeacherPage,
  UnitPage,
} from '@/routes';
import { ScrollToTop } from './ScrollToTop';
import { ErrorBoundary } from './ErrorBoundary';
import styles from './App.module.css';

// Registers the authored diagram renderers. Imported here rather than from
// main.tsx so the test environment registers them too.
import '@/components/diagram/renderers';

/**
 * Application shell and route table.
 *
 * The full learning path is wired end to end:
 *   Home → Subject → Unit → Lesson Outline → Step-by-Step (Prev/Next)
 *        → Completion → Assessment, plus the Teacher Area.
 */
export function App() {
  return (
    <div className={styles.app}>
      <a className="skip-link" href="#main">
        تخطّي إلى المحتوى
      </a>
      <Header />
      <ScrollToTop />
      <main id="main" className={styles.main}>
        <ErrorBoundary>
          <Routes>
            <Route path={routePatterns.home} element={<HomePage />} />
            <Route path={routePatterns.subject} element={<SubjectPage />} />
            <Route path={routePatterns.unit} element={<UnitPage />} />
            <Route path={routePatterns.lesson} element={<LessonOutlinePage />} />
            <Route path={routePatterns.lessonStep} element={<LessonStepPage />} />
            <Route path={routePatterns.lessonCompletion} element={<CompletionPage />} />
            <Route path={routePatterns.assessment} element={<AssessmentPage />} />
            <Route path={routePatterns.teacher} element={<TeacherPage />} />
            <Route path={routePatterns.notFound} element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
