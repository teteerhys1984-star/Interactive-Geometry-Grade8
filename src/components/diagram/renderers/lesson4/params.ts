import { readFigureSpec } from '@/lib/geometryFigure';
import type { FigureSpec, XY } from '@/lib/geometryFigure';

/**
 * Runtime readers for Lesson 4 lab parameters.
 *
 * Every reader returns `null` when the data is unusable, so a malformed figure
 * or task list degrades to nothing instead of to a misleading drawing.
 */

export interface ChoiceLabTask {
  id: string;
  label?: string;
  prompt: string;
  options: { id: string; label: string }[];
  answer: string;
  /** Shown only after review — the mathematical why. */
  reason: string;
}

export function readText(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}

export function readFigure(value: unknown): FigureSpec | null {
  return readFigureSpec(value);
}

export function readPoint(value: unknown): XY | null {
  if (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === 'number' &&
    typeof value[1] === 'number'
  ) {
    return [value[0], value[1]];
  }
  return null;
}

export function readChoiceTasks(value: unknown): ChoiceLabTask[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  const tasks: ChoiceLabTask[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') return null;
    const record = item as Record<string, unknown>;
    if (
      typeof record.id !== 'string' ||
      typeof record.prompt !== 'string' ||
      typeof record.answer !== 'string' ||
      typeof record.reason !== 'string' ||
      !Array.isArray(record.options)
    ) {
      return null;
    }
    const options: { id: string; label: string }[] = [];
    for (const option of record.options) {
      if (!option || typeof option !== 'object') return null;
      const optionRecord = option as Record<string, unknown>;
      if (typeof optionRecord.id !== 'string' || typeof optionRecord.label !== 'string') {
        return null;
      }
      options.push({ id: optionRecord.id, label: optionRecord.label });
    }
    if (options.length < 2) return null;
    if (!options.some((option) => option.id === record.answer)) return null;
    tasks.push({
      id: record.id,
      label: typeof record.label === 'string' ? record.label : undefined,
      prompt: record.prompt,
      options,
      answer: record.answer,
      reason: record.reason,
    });
  }
  return tasks;
}

export interface PairOption {
  id: string;
  label: string;
  answer: boolean;
  reason: string;
}

export function readPairOptions(value: unknown): PairOption[] | null {
  if (!Array.isArray(value) || value.length < 2) return null;
  const options: PairOption[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') return null;
    const record = item as Record<string, unknown>;
    if (
      typeof record.id !== 'string' ||
      typeof record.label !== 'string' ||
      typeof record.answer !== 'boolean' ||
      typeof record.reason !== 'string'
    ) {
      return null;
    }
    options.push({
      id: record.id,
      label: record.label,
      answer: record.answer,
      reason: record.reason,
    });
  }
  return options;
}

export interface LabCase {
  id: string;
  label: string;
  name: string;
  given: FigureSpec;
  completed: FigureSpec;
  triangle: { A: XY; B: XY; C: XY };
  note: string;
}

export function readCases(value: unknown): LabCase[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  const cases: LabCase[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') return null;
    const record = item as Record<string, unknown>;
    const given = readFigure(record.given);
    const completed = readFigure(record.completed);
    const triangle = record.triangle as Record<string, unknown> | undefined;
    if (!given || !completed || !triangle) return null;
    const A = readPoint(triangle.A);
    const B = readPoint(triangle.B);
    const C = readPoint(triangle.C);
    if (!A || !B || !C) return null;
    if (typeof record.id !== 'string' || typeof record.label !== 'string') return null;
    cases.push({
      id: record.id,
      label: record.label,
      name: readText(record.name, ''),
      given,
      completed,
      triangle: { A, B, C },
      note: readText(record.note, ''),
    });
  }
  return cases;
}
