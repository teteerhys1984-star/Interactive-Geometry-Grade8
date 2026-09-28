import type { ContentBlock } from '@/content/schema';
import { Diagram } from '@/components/diagram';
import { Math, RichText } from '@/components/math';
import { Callout } from '@/components/ui';
import type { CalloutVariant } from '@/components/ui';
import { QuestionGroup } from './QuestionGroup';
import { TeachingBlock } from './TeachingBlock';
import type { TeachingVariant } from './TeachingBlock';
import { CompareTable } from './CompareTable';

/**
 * Renders the typed content-block list produced by authored lessons.
 *
 * Authors never write HTML. They write blocks, and this renderer decides how
 * each block is presented — which is what lets us guarantee BIDI correctness
 * and responsive diagrams globally instead of per lesson.
 */
export function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </>
  );
}

export function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p>
          <RichText text={block.text} />
        </p>
      );

    case 'math':
      return <Math latex={block.latex} display label={block.label} />;

    case 'list': {
      const items = block.items.map((item, index) => (
        <li key={index}>
          <RichText text={item} />
        </li>
      ));
      return block.ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
    }

    case 'figure':
      return <Diagram spec={block.diagram} />;

    case 'questionGroup':
      return <QuestionGroup title={block.title} items={block.items} />;

    case 'compare':
      return <CompareTable title={block.title} columns={block.columns} rows={block.rows} />;

    case 'teaching':
      return (
        <TeachingBlock
          variant={block.variant as TeachingVariant}
          title={block.title}
          collapsible={block.collapsible}
          revealLabel={block.revealLabel}
        >
          <Blocks blocks={block.blocks} />
        </TeachingBlock>
      );

    case 'callout':
      return (
        <Callout variant={block.variant as CalloutVariant} title={block.title}>
          <Blocks blocks={block.blocks} />
        </Callout>
      );

    default:
      return null;
  }
}
