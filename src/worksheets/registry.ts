import { schoolWorksheetSchema } from './schema';
import type { SchoolWorksheet, SchoolWorksheetInput } from './schema';
import { unit01Worksheet01 } from './definitions/unit-01-worksheet-01';

/**
 * ============================================================================
 *  SCHOOL WORKSHEETS REGISTRY («أوراق عمل مدرسية»)
 * ============================================================================
 *
 *  Data-driven catalog of school worksheets. Adding a future worksheet is a
 *  single entry in `rawWorksheets`; the listing page and detail route discover
 *  it automatically without UI code changes.
 * ============================================================================
 */

const rawWorksheets: SchoolWorksheetInput[] = [unit01Worksheet01];

export function buildWorksheetCatalog(inputs: SchoolWorksheetInput[]): SchoolWorksheet[] {
  const seen = new Set<string>();
  return inputs.map((input) => {
    const parsed = schoolWorksheetSchema.parse(input);
    if (seen.has(parsed.id)) {
      throw new Error(`Duplicate school worksheet id: ${parsed.id}`);
    }
    seen.add(parsed.id);
    return parsed;
  });
}

export const schoolWorksheets: SchoolWorksheet[] = buildWorksheetCatalog(rawWorksheets);

export function getSchoolWorksheet(worksheetId: string): SchoolWorksheet | undefined {
  return schoolWorksheets.find((worksheet) => worksheet.id === worksheetId);
}

/** Count of main question groups across a worksheet's pages. */
export function countWorksheetQuestionGroups(worksheet: SchoolWorksheet): number {
  return worksheet.pages.reduce((total, page) => total + page.questionGroups.length, 0);
}

/** Count of individual items/problems across a worksheet's pages. */
export function countWorksheetItems(worksheet: SchoolWorksheet): number {
  return worksheet.pages.reduce(
    (pageTotal, page) =>
      pageTotal +
      page.questionGroups.reduce((groupTotal, group) => {
        if (group.kind === 'problems') {
          return groupTotal + group.problems.length;
        }
        return groupTotal + group.items.length;
      }, 0),
    0,
  );
}
