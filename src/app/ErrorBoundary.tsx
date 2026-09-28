import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Prevents a single malformed lesson or diagram from blanking the whole app.
 * Content errors should degrade locally, never take down the platform.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Unhandled application error:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', maxWidth: '44rem', marginInline: 'auto' }}>
          <h1>حدث خطأ غير متوقّع</h1>
          <p>تعذّر عرض هذا الجزء من المنصّة. حاول تحديث الصفحة.</p>
          <pre dir="ltr" style={{ whiteSpace: 'pre-wrap', fontSize: '0.8rem' }}>
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
