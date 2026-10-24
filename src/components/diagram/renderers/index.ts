import { LessonOneLab } from './LessonOneLab';
import { registerConstructedRenderer, registerInteractiveRenderer } from '../registry';
import { TranslationFigure } from './TranslationFigure';
import { GridFigure } from './GridFigure';
import { ConstructionFigure } from './ConstructionFigure';
import { TranslationPlayground } from './TranslationPlayground';
import { ShapeTranslationLab } from './ShapeTranslationLab';
import { TranslationChallenges } from './TranslationChallenges';
import { UnitExerciseLab } from './UnitExerciseLab';
import { UnitExerciseFigure } from './UnitExerciseFigure';
import { ExerciseReasoningLab } from './ExerciseReasoningLab';
import { UnitContinuationFigure } from './UnitContinuationFigure';
import { ProofWorkshop } from './ProofWorkshop';
import { HintLadder } from './HintLadder';
import { ProofFlow } from './ProofFlow';
import { UnitFinalFigure } from './UnitFinalFigure';
import { TestGeometryFigure } from './TestGeometryFigure';
import { TEST_FIGURE_RENDERER } from './testFigureSpec';
import { CompassLab, LatticePlacement, PointImageLab, VectorChain } from './lesson2';
import {
  CaseJustifyLab,
  CongruenceCasesLab,
  CongruenceFigure,
  CongruenceProofLab,
  KitePairLab,
} from './lesson4';
import { MidlineExplorer, MidlineFigure } from './lesson8';

/**
 * ============================================================================
 *  DIAGRAM RENDERERS
 * ============================================================================
 *
 *  Most registered renderers draw `origin: 'authored'` diagrams — teaching
 *  figures this platform designs itself, where the geometry is exact by
 *  construction.
 *
 *  A textbook figure is routed through a renderer ONLY when every coordinate
 *  it depends on was read from the scan and then verified arithmetically. That
 *  is the case for the two squared-paper figures of Lesson 2 (pages 8 and 10):
 *  the verification record is in docs/LESSON-02-FIGURES.md. Where geometry
 *  could not be verified, the figure stays a `reference` placeholder — see
 *  docs/LESSON-01-FIGURES.md.
 *
 *  Lesson 7 adds `unit-final-figure`, which follows the same rule: it redraws
 *  a printed figure only when adjacency, drawn segments, shaded regions and
 *  equality marks are all explicit in the scan (docs/LESSON-07-FIGURES.md);
 *  every other Lesson 7 figure stays a `reference`.
 *
 *  This module is imported once from `src/main.tsx`, so registration is global.
 * ============================================================================
 */
registerConstructedRenderer('translation-figure', TranslationFigure);
registerInteractiveRenderer('grid-figure', GridFigure);
registerInteractiveRenderer('construction-figure', ConstructionFigure);
registerInteractiveRenderer('translation-playground', TranslationPlayground);
registerInteractiveRenderer('shape-translation-lab', ShapeTranslationLab);
registerInteractiveRenderer('translation-challenges', TranslationChallenges);
registerInteractiveRenderer('unit-exercise-lab', UnitExerciseLab);
registerInteractiveRenderer('unit-exercise-figure', UnitExerciseFigure);
registerInteractiveRenderer('exercise-reasoning-lab', ExerciseReasoningLab);
registerInteractiveRenderer('unit-continuation-figure', UnitContinuationFigure);
registerInteractiveRenderer('proof-workshop', ProofWorkshop);
registerInteractiveRenderer('hint-ladder', HintLadder);
registerInteractiveRenderer('proof-flow', ProofFlow);
registerInteractiveRenderer('unit-final-figure', UnitFinalFigure);
registerConstructedRenderer(TEST_FIGURE_RENDERER, TestGeometryFigure);

/* Lesson 2 — the four labs that carry «صورة نقطة وفق انسحاب». */
registerInteractiveRenderer('point-image-lab', PointImageLab);
registerInteractiveRenderer('compass-lab', CompassLab);
registerInteractiveRenderer('lattice-placement', LatticePlacement);
registerInteractiveRenderer('vector-chain', VectorChain);

/* Lesson 4 — «تطابق المثلثات»: the reconstructed textbook figures, the page-17
 * activity lab, and the two practice labs that follow «تدرّب» ① and ②/③. */
registerConstructedRenderer('congruence-figure', CongruenceFigure);
registerInteractiveRenderer('congruence-cases-lab', CongruenceCasesLab);
registerInteractiveRenderer('case-justify-lab', CaseJustifyLab);
registerInteractiveRenderer('kite-pair-lab', KitePairLab);
registerInteractiveRenderer('congruence-proof-lab', CongruenceProofLab);

/* Unit 2 — «منتصفا ضلعين في المثلث»: the reconstructed figures of pages 31–33
 * and the lab that makes the page-31 observation dynamic. */
registerConstructedRenderer('midline-figure', MidlineFigure);
registerInteractiveRenderer('midline-explorer', MidlineExplorer);

export {
  TranslationFigure,
  GridFigure,
  ConstructionFigure,
  TranslationPlayground,
  ShapeTranslationLab,
  TranslationChallenges,
  UnitExerciseLab,
  UnitExerciseFigure,
  ExerciseReasoningLab,
  UnitContinuationFigure,
  ProofWorkshop,
  HintLadder,
  ProofFlow,
  UnitFinalFigure,
  TestGeometryFigure,
  PointImageLab,
  CompassLab,
  LatticePlacement,
  VectorChain,
  CongruenceFigure,
  CongruenceCasesLab,
  CaseJustifyLab,
  KitePairLab,
  CongruenceProofLab,
  MidlineFigure,
  MidlineExplorer,
};

registerInteractiveRenderer('lesson-one-lab', LessonOneLab);
