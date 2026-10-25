import type { SchoolWorksheet } from '../schema';
import { schoolWorksheets } from '../registry';
import { worksheetSolutionSetSchema } from './schema';
import type { WorksheetSolution, WorksheetSolutionSet } from './schema';
import { unit01Worksheet01Solutions } from './unit-01-worksheet-01';

type SolutionReference = Pick<
  WorksheetSolution,
  'pageNumber' | 'groupId' | 'questionId' | 'subQuestionId'
>;

/** Source order is authoritative; a geometry problem contributes each sub-question. */
export function worksheetSolutionTargets(worksheet: SchoolWorksheet) {
  return worksheet.pages.flatMap((page) =>
    page.questionGroups.flatMap<SolutionReference>((group) => {
      const base = { pageNumber: page.pageNumber, groupId: group.id };
      return group.kind === 'problems'
        ? group.problems.flatMap((problem) =>
            problem.subItems.map((sub) => ({
              ...base,
              questionId: problem.id,
              subQuestionId: sub.id,
            })),
          )
        : group.items.map((item) => ({ ...base, questionId: item.id, subQuestionId: undefined }));
    }),
  );
}

function referenceKey(
  entry: Pick<WorksheetSolution, 'pageNumber' | 'groupId' | 'questionId' | 'subQuestionId'>,
) {
  return JSON.stringify([entry.pageNumber, entry.groupId, entry.questionId, entry.subQuestionId]);
}

/** Add definitions here, not to route components. No changes to the student schema. */
export function buildWorksheetSolutionCatalog(
  inputs: WorksheetSolutionSet[],
  worksheets: SchoolWorksheet[] = schoolWorksheets,
): WorksheetSolutionSet[] {
  const seen = new Set<string>();
  return inputs.map((input) => {
    const parsed = worksheetSolutionSetSchema.parse(input);
    const worksheet = worksheets.find((ws) => ws.id === parsed.worksheetId);
    if (!worksheet) throw new Error(`Unknown solution worksheet: ${parsed.worksheetId}`);
    if (seen.has(parsed.worksheetId))
      throw new Error(`Duplicate solution worksheet: ${parsed.worksheetId}`);
    seen.add(parsed.worksheetId);
    const targets = worksheetSolutionTargets(worksheet);
    if (
      targets.length !== parsed.entries.length ||
      targets.some((target, index) => referenceKey(target) !== referenceKey(parsed.entries[index]!))
    ) {
      throw new Error(`Solution coverage/order mismatch: ${parsed.worksheetId}`);
    }
    for (const entry of parsed.entries) {
      if (entry.status !== 'solved') continue;
      const group = worksheet.pages
        .find((p) => p.pageNumber === entry.pageNumber)!
        .questionGroups.find((g) => g.id === entry.groupId)!;
      if (group.kind === 'multiple-choice') {
        const item = group.items.find((i) => i.id === entry.questionId)!;
        if (!item.options.some((o) => o.id === entry.optionId)) {
          throw new Error(`Missing/invalid solution option: ${entry.questionId}`);
        }
      } else if (entry.optionId) {
        throw new Error(`Unexpected solution option: ${entry.questionId}`);
      }
      if ((group.kind === 'agree-disagree') !== Boolean(entry.verdict)) {
        throw new Error(`Missing/unexpected solution verdict: ${entry.questionId}`);
      }
    }
    return parsed;
  });
}

export const worksheetSolutionSets = buildWorksheetSolutionCatalog([unit01Worksheet01Solutions]);
export function getWorksheetSolutions(worksheetId: string) {
  return worksheetSolutionSets.find((set) => set.worksheetId === worksheetId);
}
