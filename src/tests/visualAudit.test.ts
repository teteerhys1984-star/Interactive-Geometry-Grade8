import { describe, expect, it } from 'vitest';
import type { ConstructedDiagram, ContentBlock } from '@/content/schema';
import {
  testFigureSpecSchema,
  type ParsedTestFigureSpec,
} from '@/components/diagram/renderers/testFigureSpec';
import { plainTextIsolated } from '@/lib/bidi';
import { testQuestions } from './registry';
import {
  ALL_AUDITED_QUESTION_IDS,
  FIGURE_BENEFICIAL_QUESTION_IDS,
  FIGURE_REQUIRED_QUESTION_IDS,
  questionFigureLabelsFromPrompt,
  visualAuditByQuestion,
  visualAuditCounts,
} from './visualAudit';
import type { TestQuestion } from './schema';

const EXPECTED_AUDIT_COUNTS = { A: 11, B: 3, C: 186 } as const;

interface AuditedFigure {
  question: TestQuestion;
  diagram: ConstructedDiagram;
  scene: ParsedTestFigureSpec;
}

function figuresInPrompt(prompt: TestQuestion['prompt']): ConstructedDiagram[] {
  const diagrams: ConstructedDiagram[] = [];
  const visit = (block: ContentBlock) => {
    switch (block.type) {
      case 'figure':
        if (
          block.diagram.kind === 'constructed' &&
          block.diagram.renderer === 'test-geometry-figure'
        ) {
          diagrams.push(block.diagram);
        }
        break;
      case 'callout':
      case 'teaching':
        block.blocks.forEach(visit);
        break;
      default:
        break;
    }
  };
  prompt.forEach(visit);
  return diagrams;
}

function auditedFigures(): AuditedFigure[] {
  return testQuestions.flatMap((question) =>
    figuresInPrompt(question.prompt).flatMap((diagram) => {
      const parsed = testFigureSpecSchema.safeParse(diagram.construction);
      return parsed.success ? [{ question, diagram, scene: parsed.data }] : [];
    }),
  );
}

function visualAnswerText(question: TestQuestion): string[] {
  switch (question.type) {
    case 'single-choice':
    case 'error-analysis':
      return [question.choices.find((choice) => choice.id === question.answerId)?.text ?? ''];
    case 'multi-select':
      return question.choices
        .filter((choice) => question.answerIds.includes(choice.id))
        .map((choice) => choice.text);
    case 'true-false':
      return [question.answer ? 'صحيح' : 'خطأ'];
    case 'numeric':
      return [String(question.answer)];
    case 'exact':
      return [
        String(question.answer.numerator),
        `${question.answer.numerator}/${question.answer.denominator}`,
      ];
    case 'ordering':
      return [question.answerOrder.join(' ')];
    case 'matching':
    case 'classification':
      return [];
  }
}

function renderedSceneText(diagram: ConstructedDiagram, scene: ParsedTestFigureSpec): string {
  return [
    diagram.alt,
    diagram.caption ?? '',
    ...scene.points.filter((point) => point.showLabel).map((point) => point.label ?? point.id),
    ...(scene.annotations ?? []).map((annotation) => annotation.text),
  ].join(' ');
}

function textFromPrompt(prompt: TestQuestion['prompt']): string {
  const chunks: string[] = [];
  const visit = (block: ContentBlock) => {
    switch (block.type) {
      case 'paragraph':
        chunks.push(block.text);
        break;
      case 'math':
        chunks.push(block.latex);
        break;
      case 'list':
        chunks.push(...block.items);
        break;
      case 'callout':
      case 'teaching':
        block.blocks.forEach(visit);
        break;
      default:
        break;
    }
  };
  prompt.forEach(visit);
  return chunks.join(' ');
}

function normalizeNotation(text: string): string {
  return text
    .normalize('NFKC')
    .replace(/\\+/g, '\\')
    .replaceAll('\\mathrm{', '')
    .replaceAll('}', '')
    .replace(/\\[ ,;:!]/g, '')
    .replace(/[^A-Za-z0-9]/g, '')
    .toLowerCase();
}

describe('Visual Question Audit — 200-question inventory', () => {
  it('classifies every live lesson and unit question exactly once as A, B or C', () => {
    const liveIds = testQuestions.map((question) => question.id).sort();
    expect(liveIds).toHaveLength(200);
    expect(new Set(liveIds).size).toBe(200);
    expect(liveIds).toEqual([...ALL_AUDITED_QUESTION_IDS].sort());
    expect(visualAuditByQuestion.size).toBe(200);
    expect(visualAuditCounts(testQuestions)).toEqual(EXPECTED_AUDIT_COUNTS);
    expect(Object.values(EXPECTED_AUDIT_COUNTS).reduce((sum, value) => sum + value, 0)).toBe(200);

    for (const question of testQuestions) {
      const entry = visualAuditByQuestion.get(question.id);
      expect(entry?.rationale.length, `${question.id} needs an audit rationale`).toBeGreaterThan(
        10,
      );
    }

    expect(visualAuditByQuestion.get('geo-u01-t01-q21')?.rationale).toContain('الصورة الناتجة');
    expect(visualAuditByQuestion.get('geo-u01-t01-q31')?.rationale).toContain('غير معلّمة');
    expect(visualAuditByQuestion.get('geo-u01-t01-q41')?.rationale).toContain('رسم التحويل');
    expect(visualAuditByQuestion.get('geo-u01-t01-q48')?.rationale).toContain('رسم النتيجة');
    expect(visualAuditByQuestion.get('geo-u01-t01-q55')?.rationale).toContain('مهارة البرهان');
  });

  it('requires a real figure for every A/B question and none for text-only C questions', () => {
    const idsWithFigures = new Set<string>();
    for (const question of testQuestions) {
      const figures = figuresInPrompt(question.prompt);
      expect(
        figures.length,
        `${question.id} must not have duplicate question figures`,
      ).toBeLessThanOrEqual(1);
      if (figures.length > 0) idsWithFigures.add(question.id);

      const category = visualAuditByQuestion.get(question.id)?.category;
      if (category === 'A' || category === 'B') {
        expect(figures.length, `${question.id} (${category}) needs its audited figure`).toBe(1);
      } else {
        expect(
          figures.length,
          `${question.id} is text-only and must not gain an unjustified figure`,
        ).toBe(0);
      }
    }

    expect([...FIGURE_REQUIRED_QUESTION_IDS].every((id) => idsWithFigures.has(id))).toBe(true);
    expect([...FIGURE_BENEFICIAL_QUESTION_IDS].every((id) => idsWithFigures.has(id))).toBe(true);
    expect(idsWithFigures.size).toBe(EXPECTED_AUDIT_COUNTS.A + EXPECTED_AUDIT_COUNTS.B);
  });

  it('validates each SVG scene, source reference, and every visible point-label against its prompt', () => {
    const figures = auditedFigures();
    const diagramIds = figures.map(({ diagram }) => diagram.id);
    expect(new Set(diagramIds).size).toBe(diagramIds.length);
    expect(figures).toHaveLength(EXPECTED_AUDIT_COUNTS.A + EXPECTED_AUDIT_COUNTS.B);

    for (const { question, diagram, scene } of figures) {
      expect(diagram.origin).toBe('authored');
      expect(diagram.source, `${diagram.id} needs source provenance`).toBeDefined();
      expect(
        question.sourceRefs.some((source) => String(source.page) === String(diagram.source?.page)),
        `${diagram.id} source page must occur in its question provenance`,
      ).toBe(true);

      const promptLabels = questionFigureLabelsFromPrompt(question.prompt);
      const promptNotation = normalizeNotation(textFromPrompt(question.prompt));
      for (const text of [diagram.alt, diagram.caption ?? '']) {
        expect(
          text.replace(/\$[^$]*\$/g, ''),
          `${question.id} figure prose must isolate LTR geometry notation with math delimiters`,
        ).not.toMatch(/[A-Za-z0-9°]/u);
      }
      if (diagram.alt.includes('$')) {
        expect(plainTextIsolated(diagram.alt)).toContain('\u2066');
        expect(plainTextIsolated(diagram.alt)).toContain('\u2069');
      }
      for (const annotation of scene.annotations ?? []) {
        expect(
          promptNotation,
          `${question.id} annotation "${annotation.text}" must be stated in the prompt`,
        ).toContain(normalizeNotation(annotation.text));
      }
      for (const label of scene.questionLabels) {
        expect(promptLabels.has(label), `${question.id} uses unstated figure label ${label}`).toBe(
          true,
        );
      }
      expect(
        new Set(scene.questionLabels).size,
        `${question.id} questionLabels must be unique`,
      ).toBe(scene.questionLabels.length);
    }
  });

  it('does not print an answer as an annotation or expose a numeric result', () => {
    for (const { question, diagram, scene } of auditedFigures()) {
      const text = renderedSceneText(diagram, scene);
      const answers = visualAnswerText(question).filter((answer) => answer.length > 2);
      for (const answer of answers) {
        expect(text, `${question.id} figure must not state its answer`).not.toContain(answer);
      }

      if (question.type === 'numeric' || question.type === 'exact') {
        const answer =
          question.type === 'numeric'
            ? String(question.answer)
            : String(question.answer.numerator / question.answer.denominator);
        for (const annotation of scene.annotations ?? []) {
          expect(
            annotation.text.match(/\d+(?:\.\d+)?/g) ?? [],
            `${question.id} must not label the requested numeric result`,
          ).not.toContain(answer);
        }
      }
    }
  });

  it('keeps the two compass candidates visually equivalent and shows only the given translation vector', () => {
    for (const id of ['geo-l02-t01-q08', 'geo-u01-t01-q19']) {
      const figure = auditedFigures().find(({ question }) => question.id === id);
      expect(figure, `${id} should have a compass construction`).toBeDefined();
      if (!figure) continue;
      const { scene } = figure;
      const points = new Map(scene.points.map((point) => [point.id, point]));
      expect(points.get('X')?.mark).toBe('open');
      expect(points.get('Y')?.mark).toBe('open');
      expect(scene.circles).toHaveLength(2);
      for (const circle of scene.circles ?? []) {
        const center = points.get(circle.center);
        expect(center).toBeDefined();
        for (const candidate of ['X', 'Y']) {
          const point = points.get(candidate);
          expect(point).toBeDefined();
          if (!center || !point) continue;
          expect(Math.hypot(point.x - center.x, point.y - center.y)).toBeCloseTo(circle.radius, 10);
        }
      }
      expect(scene.segments).toHaveLength(1);
      expect(scene.segments?.[0]?.arrow).toBe('end');
      expect(scene.segments?.[0]?.from).toBe(id === 'geo-l02-t01-q08' ? 'G' : 'A');
      expect(scene.segments?.[0]?.to).toBe(id === 'geo-l02-t01-q08' ? 'H' : 'B');
      expect(scene.angles ?? []).toHaveLength(0);
      expect(scene.annotations ?? []).toHaveLength(0);
    }
  });
});

describe('Test figure scene schema', () => {
  const validTriangle = {
    points: [
      { id: 'A', x: 0, y: 0 },
      { id: 'B', x: 4, y: 0 },
      { id: 'C', x: 0, y: 3 },
    ],
    polygons: [{ points: ['A', 'B', 'C'] }],
    rightAngles: [{ at: 'A', from: 'B', to: 'C' }],
    questionLabels: ['A', 'B', 'C'],
  };

  it('accepts a valid, perpendicular, non-degenerate labelled scene', () => {
    expect(testFigureSpecSchema.safeParse(validTriangle).success).toBe(true);
  });

  it('rejects unknown references, repeated vertices, and zero-area polygons', () => {
    expect(
      testFigureSpecSchema.safeParse({
        ...validTriangle,
        segments: [{ from: 'A', to: 'missing' }],
      }).success,
    ).toBe(false);
    expect(
      testFigureSpecSchema.safeParse({
        ...validTriangle,
        polygons: [{ points: ['A', 'B', 'A'] }],
      }).success,
    ).toBe(false);
    expect(
      testFigureSpecSchema.safeParse({
        points: [
          { id: 'A', x: 0, y: 0 },
          { id: 'B', x: 1, y: 0 },
          { id: 'C', x: 2, y: 0 },
        ],
        polygons: [{ points: ['A', 'B', 'C'] }],
      }).success,
    ).toBe(false);
  });

  it('rejects false right-angle marks and mismatched visible-label inventories', () => {
    expect(
      testFigureSpecSchema.safeParse({
        ...validTriangle,
        rightAngles: [{ at: 'A', from: 'B', to: 'C' }],
        points: [
          { id: 'A', x: 0, y: 0 },
          { id: 'B', x: 4, y: 0 },
          { id: 'C', x: 1, y: 3 },
        ],
      }).success,
    ).toBe(false);
    expect(
      testFigureSpecSchema.safeParse({
        ...validTriangle,
        questionLabels: ['A', 'B'],
      }).success,
    ).toBe(false);
  });
});
