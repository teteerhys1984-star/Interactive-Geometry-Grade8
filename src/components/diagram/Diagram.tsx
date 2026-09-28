import type { DiagramSpec } from '@/content/schema';
import { assetUrl } from '@/lib/assets';
import { plainText } from '@/lib/bidi';
import { FigureFrame } from './FigureFrame';
import { ReferenceDiagram } from './ReferenceDiagram';
import { getConstructedRenderer, getInteractiveRenderer } from './registry';
import styles from './Diagram.module.css';

interface DiagramProps {
  spec: DiagramSpec;
}

/**
 * Dispatcher for all figures. It contains no geometry logic whatsoever — it
 * selects a renderer based on `spec.kind` and delegates.
 *
 * Two distinct fallbacks, which must never be confused:
 *   - `reference`  → a DELIBERATE faithful placeholder (see ReferenceDiagram).
 *   - unregistered → a DEFECT: a renderer was specified but never built.
 *
 * eslint react-hooks/static-components is disabled below: the rule assumes a
 * component looked up during render is *constructed* during render and will
 * therefore lose state. Here the registry returns a stable module-level
 * component reference, registered once at startup and never replaced, so its
 * identity is constant across renders.
 */
/* eslint-disable react-hooks/static-components */
export function Diagram({ spec }: DiagramProps) {
  switch (spec.kind) {
    case 'image':
      return (
        <FigureFrame caption={spec.caption} aspectRatio={spec.aspectRatio}>
          <img
            className={styles.image}
            src={assetUrl(spec.src)}
            srcSet={spec.srcSet}
            alt={plainText(spec.alt)}
            loading="lazy"
            decoding="async"
          />
        </FigureFrame>
      );

    case 'reference':
      return <ReferenceDiagram spec={spec} />;

    case 'interactive': {
      const Renderer = getInteractiveRenderer(spec.renderer);
      if (!Renderer) return <UnavailableDiagram spec={spec} rendererKey={spec.renderer} />;
      return (
        <FigureFrame caption={spec.caption} aspectRatio={spec.aspectRatio}>
          <Renderer spec={spec} />
        </FigureFrame>
      );
    }

    case 'constructed': {
      const Renderer = getConstructedRenderer(spec.renderer);
      if (!Renderer) return <UnavailableDiagram spec={spec} rendererKey={spec.renderer} />;
      return (
        <FigureFrame caption={spec.caption} aspectRatio={spec.aspectRatio}>
          <Renderer spec={spec} />
        </FigureFrame>
      );
    }

    default:
      return null;
  }
}
/* eslint-enable react-hooks/static-components */

/**
 * DEFECT STATE — a renderer key was authored but no renderer is registered.
 * Intentionally styled as provisional, unlike ReferenceDiagram.
 */
function UnavailableDiagram({ spec, rendererKey }: { spec: DiagramSpec; rendererKey: string }) {
  return (
    <FigureFrame caption={spec.caption} aspectRatio={spec.aspectRatio}>
      <div className={styles.unavailable} role="note" dir="rtl">
        <p className={styles.unavailableTitle}>الرسم غير متاح بعد</p>
        <p className={styles.unavailableAlt}>{plainText(spec.alt)}</p>
        <code className={styles.unavailableKey} dir="ltr">
          renderer: {rendererKey}
        </code>
      </div>
    </FigureFrame>
  );
}
