import { memo } from 'react';
import { Block } from '@/components/content';
import type { ContentBlock } from '@/content/schema';

/** A lesson-specific answer to "does this block hold learner state?".
 * Only lessons that opt in to retained panels pass their own predicate; the
 * default is the Lesson 1 pilot. No lab or shared renderer is modified.
 */
export type HasLocalState = (block: ContentBlock) => boolean;

/** Lesson 1 pilot only: retain actual local state, not whole static stations.
 * Nested stateful content keeps its containing block so React identity is stable.
 * No lab/teaching implementation or shared renderer needs to change.
 */
const lessonOneHasLocalState: HasLocalState = (block) => {
  if (block.type === 'figure') {
    const diagram = block.diagram;
    if (diagram.kind !== 'interactive') return false;
    // These lesson-one-lab modes draw fixed source geometry without controls.
    // They are registered as interactive but have no learner state to retain.
    return !(
      diagram.renderer === 'lesson-one-lab' &&
      ['area', 'diagonals', 'marked'].includes(String(diagram.params.mode))
    );
  }
  if (block.type === 'teaching') {
    return block.collapsible || block.blocks.some(lessonOneHasLocalState);
  }
  return block.type === 'callout' && block.blocks.some(lessonOneHasLocalState);
};

// Content objects come from the stable registry. Hidden retained blocks must
// not re-render on every route change; static blocks are unmounted altogether.
const StableBlock = memo(Block);

export const LessonOnePanel = memo(function LessonOnePanel({
  blocks,
  active,
  className,
  hasState = lessonOneHasLocalState,
}: {
  blocks: ContentBlock[];
  active: boolean;
  className?: string;
  hasState?: HasLocalState;
}) {
  if (!active && !blocks.some(hasState)) return null;
  return (
    <div hidden={!active} className={className}>
      {blocks.map((block, index) =>
        active || hasState(block) ? <StableBlock key={index} block={block} /> : null,
      )}
    </div>
  );
});
