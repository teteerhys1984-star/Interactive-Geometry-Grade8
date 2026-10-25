import { z } from 'zod';
import { diagramSpecSchema } from '@/content/schema';

/**
 * ============================================================================
 *  SCHOOL WORKSHEETS («أوراق عمل مدرسية») — DATA CONTRACT
 * ============================================================================
 *
 *  Keep school worksheets strictly separate from textbook lessons
 *  (`src/content/registry.ts`) and the Test Area (`src/tests/registry.ts`).
 *
 *  Every worksheet is authored from its primary source images, preserving:
 *    - printed header information (title, grade, school/institution),
 *    - original page boundaries and reference scans,
 *    - exact question wording, numbering, options, and sub-questions,
 *    - mathematically isolated notation (`$…$`),
 *    - faithful geometric diagrams alongside original page scan access.
 *
 *  No fabricated answer keys are stored here when the source worksheet does
 *  not print answers.
 * ============================================================================
 */

export const worksheetOptionSchema = z.object({
  id: z.enum(['A', 'B', 'C', 'D']),
  text: z.string().min(1),
});

export const worksheetMcqItemSchema = z.object({
  id: z.string().min(1),
  /** Printed item number, e.g. "1" … "12". */
  number: z.string().min(1),
  prompt: z.string().min(1),
  options: z.array(worksheetOptionSchema).min(2),
});

export const worksheetStatementItemSchema = z.object({
  id: z.string().min(1),
  /** Printed sub-item marker, e.g. "١)" … "٧)". */
  label: z.string().min(1),
  text: z.string().min(1),
});

export const worksheetProblemSubItemSchema = z.object({
  id: z.string().min(1),
  /** Printed sub-item marker, e.g. "١)", "٢)", "٣)". */
  label: z.string().min(1),
  text: z.string().min(1),
});

export const worksheetProblemItemSchema = z.object({
  id: z.string().min(1),
  /** Printed problem heading, e.g. "المسألة الأولى :". */
  title: z.string().min(1),
  /** Printed problem stem / given statement. */
  stem: z.string().min(1),
  subItems: z.array(worksheetProblemSubItemSchema).min(1),
  diagram: diagramSpecSchema.optional(),
});

export const worksheetMultipleChoiceGroupSchema = z.object({
  id: z.string().min(1),
  kind: z.literal('multiple-choice'),
  title: z.string().min(1),
  items: z.array(worksheetMcqItemSchema).min(1),
});

export const worksheetAgreeDisagreeGroupSchema = z.object({
  id: z.string().min(1),
  kind: z.literal('agree-disagree'),
  title: z.string().min(1),
  items: z.array(worksheetStatementItemSchema).min(1),
});

export const worksheetFillBlanksGroupSchema = z.object({
  id: z.string().min(1),
  kind: z.literal('fill-blanks'),
  title: z.string().min(1),
  items: z.array(worksheetStatementItemSchema).min(1),
});

export const worksheetProblemsGroupSchema = z.object({
  id: z.string().min(1),
  kind: z.literal('problems'),
  title: z.string().min(1),
  problems: z.array(worksheetProblemItemSchema).min(1),
});

export const worksheetQuestionGroupSchema = z.discriminatedUnion('kind', [
  worksheetMultipleChoiceGroupSchema,
  worksheetAgreeDisagreeGroupSchema,
  worksheetFillBlanksGroupSchema,
  worksheetProblemsGroupSchema,
]);

export const worksheetOriginalImageSchema = z.object({
  /** Base-relative path under `public/`, e.g. "worksheets/unit-01-worksheet-01/page-1.jpg". */
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().min(1),
});

export const worksheetPageSchema = z.object({
  pageNumber: z.number().int().positive(),
  title: z.string().min(1),
  originalImage: worksheetOriginalImageSchema,
  questionGroups: z.array(worksheetQuestionGroupSchema).min(1),
  /** Printed page footer such as "== انتهت الأسئلة ==". */
  footerNote: z.string().min(1).optional(),
});

export const schoolWorksheetSchema = z.object({
  id: z.string().min(1),
  /** Printed worksheet title, e.g. "ورقة عمل الوحدة الأولى هندسة". */
  title: z.string().min(1),
  /** Printed grade header, e.g. "الصف الثامن". */
  gradeLabel: z.string().min(1),
  /** Printed institution/school label when present on the page, e.g. "آفاق المستقبل". */
  institutionLabel: z.string().min(1).optional(),
  summary: z.string().min(1),
  pages: z.array(worksheetPageSchema).min(1),
  /** Editorial / source-fidelity notes about the printed worksheet. */
  sourceNotes: z.array(z.string().min(1)).default([]),
});

export type WorksheetOption = z.output<typeof worksheetOptionSchema>;
export type WorksheetMcqItem = z.output<typeof worksheetMcqItemSchema>;
export type WorksheetStatementItem = z.output<typeof worksheetStatementItemSchema>;
export type WorksheetProblemSubItem = z.output<typeof worksheetProblemSubItemSchema>;
export type WorksheetProblemItem = z.output<typeof worksheetProblemItemSchema>;
export type WorksheetQuestionGroup = z.output<typeof worksheetQuestionGroupSchema>;
export type WorksheetOriginalImage = z.output<typeof worksheetOriginalImageSchema>;
export type WorksheetPage = z.output<typeof worksheetPageSchema>;
export type SchoolWorksheet = z.output<typeof schoolWorksheetSchema>;
export type SchoolWorksheetInput = z.input<typeof schoolWorksheetSchema>;
