import { z } from 'zod';

const reference = {
  pageNumber: z.number().int().positive(),
  groupId: z.string().min(1),
  /** Parent geometry problem, where applicable. */
  questionId: z.string().min(1),
  subQuestionId: z.string().min(1).optional(),
};

export const worksheetSolutionSchema = z.discriminatedUnion('status', [
  z.object({
    ...reference,
    status: z.literal('solved'),
    answer: z.string().trim().min(1),
    steps: z.array(z.string().trim().min(1)).min(1),
    optionId: z.enum(['A', 'B', 'C', 'D']).optional(),
    verdict: z.enum(['موافق', 'غير موافق']).optional(),
    sourceNote: z.string().trim().min(1).optional(),
  }),
  z.object({
    ...reference,
    status: z.literal('unresolved'),
    reason: z.string().trim().min(1),
  }),
]);

export const worksheetSolutionSetSchema = z.object({
  worksheetId: z.string().min(1),
  entries: z.array(worksheetSolutionSchema).min(1),
});

export type WorksheetSolution = z.infer<typeof worksheetSolutionSchema>;
export type WorksheetSolutionSet = z.infer<typeof worksheetSolutionSetSchema>;
