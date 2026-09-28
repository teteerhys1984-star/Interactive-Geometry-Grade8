# Authoring content

## The golden rule

**Every piece of student-facing content must come from the printed textbook and
carry a `source` reference.** Nothing is invented, paraphrased into existence,
or filled with placeholder text. The source-fidelity test suite enforces this
and fails CI if it is violated.

## Where content lives

```
src/content/units/
├── index.ts                  ← registers units in curriculum order
└── unit-01-<topic>.ts        ← one file per unit (none exist yet)
```

`src/content/units/index.ts` is currently an empty array. It is the **only**
file you edit to add curriculum.

## Adding a unit

### 1. Create the unit file

```ts
// src/content/units/unit-01-triangles.ts
import type { Unit } from '../schema';

export const unit01: Unit = {
  id: 'unit-01-triangles',
  title: '…', // from the textbook
  summary: '…',
  source: { book: '…', page: '…' },
  lessons: [
    {
      id: 'lesson-01-…',
      title: '…',
      summary: '…',
      objectives: ['…'],
      vocabulary: [{ term: '…', definition: '…' }],
      estimatedMinutes: 30,
      source: { book: '…', page: 12, locator: 'الدرس الأول' },
      steps: [
        {
          id: 'step-01-…',
          title: '…',
          blocks: [
            { type: 'paragraph', text: 'طول الضلع $AB$ يساوي $5$ سم' },
            { type: 'math', latex: 'a^2 + b^2 = c^2', label: 'قانون فيثاغورس' },
            { type: 'callout', variant: 'definition', blocks: [{ type: 'paragraph', text: '…' }] },
            {
              type: 'figure',
              diagram: {
                kind: 'image',
                id: 'u1-fig-1',
                alt: 'وصف عربي للرسم',
                src: 'diagrams/unit-01/fig-1.svg',
                aspectRatio: 4 / 3,
                source: { book: '…', page: 12, locator: 'الشكل ١' },
              },
            },
          ],
        },
      ],
    },
  ],
};
```

### 2. Register it

```ts
// src/content/units/index.ts
import { unit01 } from './unit-01-triangles';

const rawUnits: unknown[] = [unit01];
```

### 3. Run the checks

```bash
npm run verify
```

That is the whole process. Routing, the lesson outline, the step-by-step flow,
Previous/Next across unit boundaries, the progress bar, the completion screen,
the teacher area listing and the assessments all update automatically.

## Content block reference

| Block       | Shape                                 | Notes                                                                   |
| ----------- | ------------------------------------- | ----------------------------------------------------------------------- |
| `paragraph` | `{ type, text }`                      | Arabic prose; `$…$` for inline maths                                    |
| `math`      | `{ type, latex, label? }`             | Display equation, LTR-isolated                                          |
| `list`      | `{ type, ordered, items[] }`          | Items support `$…$`                                                     |
| `figure`    | `{ type, diagram }`                   | See `docs/DIAGRAMS.md`                                                  |
| `callout`   | `{ type, variant, title?, blocks[] }` | `definition` \| `theorem` \| `note` \| `warning` \| `example`; nestable |

## Question reference

Two shapes, both requiring a `source`:

```ts
// Multiple choice
{ id: 'q-1', type: 'multiple-choice',
  prompt: [{ type: 'paragraph', text: '…' }],
  choices: [{ id: 'a', blocks: [...] }, { id: 'b', blocks: [...] }],
  correctChoiceId: 'a',
  explanation: [{ type: 'paragraph', text: '…' }],
  source: { book: '…', page: 14, locator: 'تمرين ٣' } }

// Numeric
{ id: 'q-2', type: 'numeric',
  prompt: [{ type: 'paragraph', text: '…' }],
  answer: 13, tolerance: 0.01, unit: 'سم',
  source: { book: '…', page: 14, locator: 'تمرين ٤' } }
```

Questions may be attached to a step (`step.check`), a unit (`unit.assessment`)
or the course (`subject.finalAssessment`).

## Rules the tests enforce

| Rule                                                      | Failure mode                   |
| --------------------------------------------------------- | ------------------------------ |
| Content validates against the Zod schema                  | Throws at module load          |
| Every lesson has a `source`                               | Fidelity test fails            |
| Every question has a `source`                             | Fidelity test fails            |
| No placeholder markers (`TODO`, `lorem`, `درس تجريبي`, …) | Fidelity test fails            |
| Unique unit / lesson / step / question ids                | Fidelity test fails            |
| Every diagram has non-empty Arabic `alt`                  | Schema rejects                 |
| Image `src` is base-relative                              | Schema rejects + fidelity test |
| No bare maths notation outside `$…$`                      | BIDI fidelity test fails       |

See `docs/BIDI-AND-MATH.md` for the notation rules in detail.
