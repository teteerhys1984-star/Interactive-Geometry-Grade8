import { memo } from 'react';
import { Block } from '@/components/content';
import type { ContentBlock } from '@/content/schema';

/** Lesson 1 pilot only: retain actual local state, not whole static stations.
 * Nested stateful content keeps its containing block so React identity is stable.
 * No lab/teaching implementation or shared renderer needs to change.
 */
function hasLocalState(block: ContentBlock): boolean {
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
    return block.collapsible || block.blocks.some(hasLocalState);
  }
  return block.type === 'callout' && block.blocks.some(hasLocalState);
}

// Content objects come from the stable registry. Hidden retained blocks must
// not re-render on every route change; static blocks are unmounted altogether.
const StableBlock = memo(Block);

export const LessonOnePanel = memo(function LessonOnePanel({
  blocks,
  active,
  className,
}: {
  blocks: ContentBlock[];
  active: boolean;
  className?: string;
}) {
  if (!active && !blocks.some(hasLocalState)) return null;
  return (
    <div hidden={!active} className={className}>
      {blocks.map((block, index) =>
        active || hasLocalState(block) ? <StableBlock key={index} block={block} /> : null,
      )}
    </div>
  );
});
