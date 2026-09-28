import type { ComponentType } from 'react';
import type { ConstructedDiagram, InteractiveDiagram } from '@/content/schema';

/**
 * ============================================================================
 *  DIAGRAM RENDERER REGISTRY
 * ============================================================================
 *
 *  This is an extension point, NOT a geometry engine.
 *
 *  `DiagramSpec` can already describe three kinds of figure:
 *    - `image`       → textbook scans / exported figures.  IMPLEMENTED.
 *    - `interactive` → future draggable / manipulable figures.  NOT IMPLEMENTED.
 *    - `constructed` → future declarative vector geometry.     NOT IMPLEMENTED.
 *
 *  Nothing is registered today, on purpose. The first real textbook pages will
 *  tell us which primitives are genuinely required. When that happens:
 *
 *    1. Write the renderer component under `src/components/diagram/renderers/`.
 *    2. Call `registerInteractiveRenderer('key', Component)` (or the
 *       constructed equivalent) from `src/components/diagram/renderers/index.ts`.
 *    3. Author content referencing that `renderer` key.
 *
 *  Until then `<Diagram>` shows an explicit "renderer not registered" notice
 *  rather than crashing — an unimplemented figure can never break a lesson.
 * ============================================================================
 */

export type InteractiveRenderer = ComponentType<{ spec: InteractiveDiagram }>;
export type ConstructedRenderer = ComponentType<{ spec: ConstructedDiagram }>;

const interactiveRenderers = new Map<string, InteractiveRenderer>();
const constructedRenderers = new Map<string, ConstructedRenderer>();

export function registerInteractiveRenderer(key: string, component: InteractiveRenderer): void {
  if (interactiveRenderers.has(key)) {
    throw new Error(`Interactive diagram renderer "${key}" is already registered.`);
  }
  interactiveRenderers.set(key, component);
}

export function registerConstructedRenderer(key: string, component: ConstructedRenderer): void {
  if (constructedRenderers.has(key)) {
    throw new Error(`Constructed diagram renderer "${key}" is already registered.`);
  }
  constructedRenderers.set(key, component);
}

export function getInteractiveRenderer(key: string): InteractiveRenderer | undefined {
  return interactiveRenderers.get(key);
}

export function getConstructedRenderer(key: string): ConstructedRenderer | undefined {
  return constructedRenderers.get(key);
}

/** Introspection used by the diagram tests. */
export function registeredRendererKeys(): { interactive: string[]; constructed: string[] } {
  return {
    interactive: [...interactiveRenderers.keys()],
    constructed: [...constructedRenderers.keys()],
  };
}

/** Test-only helper — clears the registry between test cases. */
export function __resetRegistry(): void {
  interactiveRenderers.clear();
  constructedRenderers.clear();
}
