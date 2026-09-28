export { Diagram } from './Diagram';
export { ReferenceDiagram } from './ReferenceDiagram';
export { FigureFrame } from './FigureFrame';
export {
  registerInteractiveRenderer,
  registerConstructedRenderer,
  getInteractiveRenderer,
  getConstructedRenderer,
  registeredRendererKeys,
} from './registry';
export type { InteractiveRenderer, ConstructedRenderer } from './registry';
