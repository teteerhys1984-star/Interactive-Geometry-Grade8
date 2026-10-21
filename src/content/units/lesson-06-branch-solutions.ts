import type { ContentBlock } from '../schema';

/**
 * ============================================================================
 *  LESSON 6 — ONE SOLUTION RECORD PER PRINTED SUB-PART
 * ============================================================================
 *
 *  The Lesson 6 continuation prints 46 branch instructions (numbered items and
 *  circled cases) under 13 main questions. The learner record keeps ONE
 *  canonical entry per main question, and each entry carries its branches in
 *  printed order. The same branch records feed:
 *
 *    - the progressive reveal inside the student lesson, and
 *    - the single teacher solution of that main question,
 *
 *  so the printed order and the wording can never drift between the two areas.
 *
 *  A branch never repeats the printed prompt: `aim` states what the branch is
 *  asked to do, while `steps` carry the reasoning and its justification.
 */

export interface BranchSolution {
  /** Printed label of this branch, e.g. `1.`, `2.①`, `(1)-③`. */
  label: string;
  /** What the branch asks for, in one short line — never a copy of the prompt. */
  aim: string;
  /** Definition / criterion / property used by this branch, when it needs one. */
  rule?: string;
  /** Why the given information satisfies that criterion here. */
  why?: string;
  /** Ordered mathematical inferences; each step states its own justification. */
  steps: string[];
  /** The branch answer or conclusion. */
  result: string;
  /** A concrete check the teacher can require for this branch. */
  verify?: string;
  /** Branch-specific common error. */
  warning?: string;
}

/** Renders one branch record as a labelled block shared by both surfaces. */
export function branchSolutionBlocks(branches: BranchSolution[]): ContentBlock[] {
  return branches.map((branch) => ({
    type: 'callout',
    variant: 'example',
    // The title stays plain text on both surfaces; the aim is a rich paragraph
    // so any geometry notation inside it is isolated as math.
    title: `الفرع ${branch.label}`,
    blocks: [
      { type: 'paragraph' as const, text: `المطلوب في هذا الفرع: ${branch.aim}` },
      ...(branch.rule
        ? [{ type: 'paragraph' as const, text: `القاعدة المستعملة: ${branch.rule}` }]
        : []),
      ...(branch.why
        ? [{ type: 'paragraph' as const, text: `لماذا تنطبق هنا؟ ${branch.why}` }]
        : []),
      { type: 'list' as const, ordered: true, items: branch.steps },
      { type: 'paragraph' as const, text: `النتيجة: ${branch.result}` },
      ...(branch.verify ? [{ type: 'paragraph' as const, text: `التحقق: ${branch.verify}` }] : []),
      ...(branch.warning
        ? [{ type: 'paragraph' as const, text: `خطأ شائع: ${branch.warning}` }]
        : []),
    ],
  }));
}
