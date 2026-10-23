import type { ChangeEvent } from 'react';
import { Blocks } from '@/components/content';
import { plainTextIsolated } from '@/lib/bidi';
import { RichText } from '@/components/math';
import type {
  AnswerValue,
  ChoicePart,
  MultiPartItem,
  PartAnswerValue,
  TestQuestion,
} from '@/tests/schema';
import { answers } from '@/tests/scoring';
import styles from './QuestionRenderer.module.css';

interface QuestionRendererProps {
  question: TestQuestion;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
}

/**
 * ============================================================================
 *  TEST QUESTION RENDERER
 * ============================================================================
 *
 *  Renders one question during the active test. All new answer types are
 *  structured controls: authored choices, controlled terms, numeric/rational
 *  fields, or independently scored sub-parts. No correct answer is rendered in
 *  the active runner and no feedback is emitted before submission.
 * ============================================================================
 */
export function QuestionRenderer({ question, value, onChange }: QuestionRendererProps) {
  return (
    <article className={styles.questionCard}>
      <div className={styles.prompt}>
        <Blocks blocks={question.prompt} />
      </div>

      <div className={styles.inputArea}>
        {question.type === 'single-choice' ? (
          <SingleChoiceInput
            questionId={question.id}
            choices={question.choices}
            selectedId={value?.kind === 'single' ? value.optionId : undefined}
            onSelect={(id) => onChange(answers.single(id))}
          />
        ) : null}

        {question.type === 'multi-select' ? (
          <MultiSelectInput
            questionId={question.id}
            choices={question.choices}
            selectedIds={value?.kind === 'multi' ? value.optionIds : []}
            onToggle={(id) => {
              const current = value?.kind === 'multi' ? value.optionIds : [];
              const next = current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id];
              onChange(answers.multi(next));
            }}
          />
        ) : null}

        {question.type === 'true-false' ? (
          <TrueFalseInput
            questionId={question.id}
            selected={value?.kind === 'boolean' ? value.value : undefined}
            onSelect={(val) => onChange(answers.boolean(val))}
          />
        ) : null}

        {question.type === 'true-false-justify' ? (
          <TrueFalseJustifyInput
            question={question}
            value={value?.kind === 'true-false-justify' ? value : undefined}
            onChange={onChange}
          />
        ) : null}

        {question.type === 'short-answer' ? (
          <ShortAnswerInput
            raw={value?.kind === 'short-answer' ? value.raw : ''}
            onChange={(raw) => onChange(answers.shortAnswer(raw))}
          />
        ) : null}

        {question.type === 'fill-in' ? (
          <FillInInput
            blanks={question.blanks}
            values={value?.kind === 'fill-in' ? value.values : {}}
            onChange={(values) => onChange(answers.fillIn(values))}
          />
        ) : null}

        {question.type === 'numeric' ? (
          <NumericInput
            raw={value?.kind === 'numeric' ? value.raw : ''}
            unit={question.unit}
            onChange={(raw) => onChange(answers.numeric(raw))}
          />
        ) : null}

        {question.type === 'exact' ? (
          <ExactInput
            raw={value?.kind === 'exact' ? value.raw : ''}
            unit={question.unit}
            onChange={(raw) => onChange(answers.exact(raw))}
          />
        ) : null}

        {question.type === 'ordering' ? (
          <OrderingInput
            items={question.items}
            currentOrder={
              value?.kind === 'order' ? value.itemIds : question.items.map((item) => item.id)
            }
            onChange={(itemIds) => onChange(answers.order(itemIds))}
          />
        ) : null}

        {question.type === 'matching' ? (
          <MatchingInput
            left={question.left}
            right={question.right}
            pairs={value?.kind === 'matching' ? value.pairs : {}}
            onChange={(pairs) => onChange(answers.matching(pairs))}
          />
        ) : null}

        {question.type === 'classification' ? (
          <ClassificationInput
            categories={question.categories}
            items={question.items}
            assignments={value?.kind === 'classification' ? value.assignments : {}}
            onChange={(assignments) => onChange(answers.classification(assignments))}
          />
        ) : null}

        {question.type === 'justification' ? (
          <JustificationInput
            questionId={question.id}
            steps={question.steps}
            selections={value?.kind === 'justification' ? value.selections : {}}
            onChange={(selections) => onChange(answers.justification(selections))}
          />
        ) : null}

        {question.type === 'multi-part' ||
        question.type === 'diagram-reading' ||
        question.type === 'transformation-application' ? (
          <MultiPartInput
            questionId={question.id}
            parts={question.parts}
            values={value?.kind === 'multi-part' ? value.parts : {}}
            onChange={(parts) => onChange(answers.multiPart(parts))}
          />
        ) : null}

        {question.type === 'error-analysis' ? (
          <ErrorAnalysisInput question={question} value={value} onChange={onChange} />
        ) : null}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------------ */
/*  Shared structured inputs                                                 */
/* ------------------------------------------------------------------------ */

function ChoicePartInput({
  part,
  selectedId,
  onSelect,
  namePrefix,
  disabled = false,
}: {
  part: ChoicePart;
  selectedId: string | undefined;
  onSelect: (id: string) => void;
  namePrefix: string;
  disabled?: boolean;
}) {
  return (
    <section className={styles.structuredPart} aria-label={part.id}>
      <div className={styles.partPrompt}>
        <Blocks blocks={part.prompt} />
      </div>
      <SingleChoiceInput
        questionId={`${namePrefix}-${part.id}`}
        choices={part.choices}
        selectedId={selectedId}
        onSelect={onSelect}
        disabled={disabled}
      />
    </section>
  );
}

function TrueFalseJustifyInput({
  question,
  value,
  onChange,
}: {
  question: Extract<TestQuestion, { type: 'true-false-justify' }>;
  value: Extract<AnswerValue, { kind: 'true-false-justify' }> | undefined;
  onChange: (value: AnswerValue) => void;
}) {
  const update = (patch: { value?: boolean; correctionId?: string; justificationId?: string }) =>
    onChange(
      answers.trueFalseJustify(
        patch.value ?? value?.value ?? false,
        patch.correctionId ?? value?.correctionId,
        patch.justificationId ?? value?.justificationId,
      ),
    );

  return (
    <div className={styles.structuredParts}>
      <TrueFalseInput
        questionId={`${question.id}-verdict`}
        selected={value?.value}
        onSelect={(next) => update({ value: next })}
      />
      {question.answer === false && question.correction ? (
        <ChoicePartInput
          part={question.correction}
          selectedId={value?.correctionId}
          namePrefix={question.id}
          disabled={value?.value !== false}
          onSelect={(id) => update({ correctionId: id })}
        />
      ) : null}
      {question.justification ? (
        <ChoicePartInput
          part={question.justification}
          selectedId={value?.justificationId}
          namePrefix={question.id}
          onSelect={(id) => update({ justificationId: id })}
        />
      ) : null}
    </div>
  );
}

function ErrorAnalysisInput({
  question,
  value,
  onChange,
}: {
  question: Extract<TestQuestion, { type: 'error-analysis' }>;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
}) {
  const selectedStepId =
    value?.kind === 'error-analysis'
      ? value.stepId
      : value?.kind === 'single'
        ? value.optionId
        : undefined;
  const selectedCorrectionId = value?.kind === 'error-analysis' ? value.correctionId : undefined;
  const selectedJustificationId =
    value?.kind === 'error-analysis' ? value.justificationId : undefined;

  return (
    <div className={styles.errorAnalysisWrapper}>
      <div className={styles.errorSteps} aria-label="خطوات الحل المعروض">
        <h3 className={styles.subsectionHeading}>الحل المعروض للتحليل</h3>
        <ol className={styles.errorStepList}>
          {question.steps.map((step, index) => (
            <li key={step.id} className={styles.errorStep}>
              <span className={styles.errorStepNumber} dir="ltr">
                {index + 1}
              </span>
              <span className={styles.errorStepText}>
                <RichText text={step.text} />
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.structuredPart}>
        <h3 className={styles.subsectionHeading}>أي خطوة تحتوي على الخطأ؟</h3>
        <SingleChoiceInput
          questionId={`${question.id}-error-step`}
          choices={question.choices}
          selectedId={selectedStepId}
          onSelect={(stepId) => onChange(answers.errorAnalysis(stepId))}
        />
      </div>
      {question.correction ? (
        <ChoicePartInput
          part={question.correction}
          selectedId={selectedCorrectionId}
          namePrefix={question.id}
          disabled={!selectedStepId}
          onSelect={(id) =>
            onChange(answers.errorAnalysis(selectedStepId ?? '', id, selectedJustificationId))
          }
        />
      ) : null}
      {question.justification ? (
        <ChoicePartInput
          part={question.justification}
          selectedId={selectedJustificationId}
          namePrefix={question.id}
          disabled={!selectedStepId}
          onSelect={(id) =>
            onChange(answers.errorAnalysis(selectedStepId ?? '', selectedCorrectionId, id))
          }
        />
      ) : null}
    </div>
  );
}

function JustificationInput({
  questionId,
  steps,
  selections,
  onChange,
}: {
  questionId: string;
  steps: ChoicePart[];
  selections: Record<string, string>;
  onChange: (selections: Record<string, string>) => void;
}) {
  return (
    <div className={styles.structuredParts}>
      {steps.map((step, index) => (
        <div key={step.id} className={styles.partCard}>
          <div className={styles.partHeading}>
            <span className={styles.partNumber} dir="ltr">
              {index + 1}
            </span>
            <span>خطوة التبرير</span>
          </div>
          <ChoicePartInput
            part={step}
            selectedId={selections[step.id]}
            namePrefix={questionId}
            onSelect={(id) => onChange({ ...selections, [step.id]: id })}
          />
        </div>
      ))}
    </div>
  );
}

function MultiPartInput({
  questionId,
  parts,
  values,
  onChange,
}: {
  questionId: string;
  parts: MultiPartItem[];
  values: Record<string, PartAnswerValue>;
  onChange: (values: Record<string, PartAnswerValue>) => void;
}) {
  return (
    <div className={styles.multiPartList}>
      {parts.map((part, index) => (
        <section key={part.id} className={styles.partCard}>
          <div className={styles.partHeading}>
            <span className={styles.partNumber} dir="ltr">
              {index + 1}
            </span>
            <span>الجزء {index + 1}</span>
            <span className={styles.partPoints} dir="ltr">
              {part.points} {part.points === 1 ? 'درجة' : 'درجات'}
            </span>
          </div>
          <div className={styles.partPrompt}>
            <Blocks blocks={part.prompt} />
          </div>
          <PartInput
            questionId={questionId}
            part={part}
            value={values[part.id]}
            onChange={(next) => onChange({ ...values, [part.id]: next })}
          />
        </section>
      ))}
    </div>
  );
}

function PartInput({
  questionId,
  part,
  value,
  onChange,
}: {
  questionId: string;
  part: MultiPartItem;
  value: PartAnswerValue | undefined;
  onChange: (value: PartAnswerValue) => void;
}) {
  const nestedId = `${questionId}-${part.id}`;
  switch (part.type) {
    case 'single-choice':
      return (
        <SingleChoiceInput
          questionId={nestedId}
          choices={part.choices}
          selectedId={value?.kind === 'single' ? value.optionId : undefined}
          onSelect={(id) => onChange(answers.single(id))}
        />
      );
    case 'multi-select':
      return (
        <MultiSelectInput
          questionId={nestedId}
          choices={part.choices}
          selectedIds={value?.kind === 'multi' ? value.optionIds : []}
          onToggle={(id) => {
            const current = value?.kind === 'multi' ? value.optionIds : [];
            onChange(
              answers.multi(
                current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
              ),
            );
          }}
        />
      );
    case 'true-false':
      return (
        <TrueFalseInput
          questionId={nestedId}
          selected={value?.kind === 'boolean' ? value.value : undefined}
          onSelect={(next) => onChange(answers.boolean(next))}
        />
      );
    case 'numeric':
      return (
        <NumericInput
          raw={value?.kind === 'numeric' ? value.raw : ''}
          unit={part.unit}
          onChange={(raw) => onChange(answers.numeric(raw))}
        />
      );
    case 'exact':
      return (
        <ExactInput
          raw={value?.kind === 'exact' ? value.raw : ''}
          unit={part.unit}
          onChange={(raw) => onChange(answers.exact(raw))}
        />
      );
    case 'ordering':
      return (
        <OrderingInput
          items={part.items}
          currentOrder={value?.kind === 'order' ? value.itemIds : part.items.map((item) => item.id)}
          onChange={(next) => onChange(answers.order(next))}
        />
      );
    case 'matching':
      return (
        <MatchingInput
          left={part.left}
          right={part.right}
          pairs={value?.kind === 'matching' ? value.pairs : {}}
          onChange={(next) => onChange(answers.matching(next))}
        />
      );
    case 'fill-in':
      return (
        <FillInInput
          blanks={part.blanks}
          values={value?.kind === 'fill-in' ? value.values : {}}
          onChange={(next) => onChange(answers.fillIn(next))}
        />
      );
    case 'short-answer':
      return (
        <ShortAnswerInput
          raw={value?.kind === 'short-answer' ? value.raw : ''}
          onChange={(raw) => onChange(answers.shortAnswer(raw))}
        />
      );
  }
}

/* ------------------------------------------------------------------------ */
/*  Basic inputs                                                             */
/* ------------------------------------------------------------------------ */

function SingleChoiceInput({
  questionId,
  choices,
  selectedId,
  onSelect,
  disabled = false,
}: {
  questionId: string;
  choices: { id: string; text: string }[];
  selectedId: string | undefined;
  onSelect: (id: string) => void;
  disabled?: boolean;
}) {
  return (
    <ul className={styles.optionsList} role="radiogroup">
      {choices.map((choice) => {
        const isChecked = selectedId === choice.id;
        return (
          <li key={choice.id}>
            <label className={`${styles.optionLabel} ${isChecked ? styles.selected : ''}`}>
              <input
                type="radio"
                name={`q-${questionId}`}
                value={choice.id}
                checked={isChecked}
                disabled={disabled}
                onChange={() => onSelect(choice.id)}
                className={styles.radioInput}
              />
              <span className={styles.optionText}>
                <RichText text={choice.text} />
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function MultiSelectInput({
  questionId,
  choices,
  selectedIds,
  onToggle,
}: {
  questionId: string;
  choices: { id: string; text: string }[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <ul className={styles.optionsList}>
      {choices.map((choice) => {
        const isChecked = selectedIds.includes(choice.id);
        return (
          <li key={choice.id}>
            <label className={`${styles.optionLabel} ${isChecked ? styles.selected : ''}`}>
              <input
                type="checkbox"
                name={`q-${questionId}-${choice.id}`}
                checked={isChecked}
                onChange={() => onToggle(choice.id)}
                className={styles.checkboxInput}
              />
              <span className={styles.optionText}>
                <RichText text={choice.text} />
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function TrueFalseInput({
  questionId,
  selected,
  onSelect,
}: {
  questionId: string;
  selected: boolean | undefined;
  onSelect: (value: boolean) => void;
}) {
  return (
    <div className={styles.trueFalseGroup} role="radiogroup">
      <label className={`${styles.tfOption} ${selected === true ? styles.selected : ''}`}>
        <input
          type="radio"
          name={`q-${questionId}`}
          checked={selected === true}
          onChange={() => onSelect(true)}
          className={styles.radioInput}
        />
        <span>صح</span>
      </label>
      <label className={`${styles.tfOption} ${selected === false ? styles.selected : ''}`}>
        <input
          type="radio"
          name={`q-${questionId}`}
          checked={selected === false}
          onChange={() => onSelect(false)}
          className={styles.radioInput}
        />
        <span>خطأ</span>
      </label>
    </div>
  );
}

function ShortAnswerInput({ raw, onChange }: { raw: string; onChange: (value: string) => void }) {
  return (
    <input
      type="text"
      dir="auto"
      className={styles.shortAnswerField}
      value={raw}
      placeholder="اكتب المصطلح أو العبارة المقبولة"
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
    />
  );
}

function FillInInput({
  blanks,
  values,
  onChange,
}: {
  blanks: { id: string; label: string }[];
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
}) {
  return (
    <div className={styles.fillInList}>
      {blanks.map((blank, index) => (
        <label key={blank.id} className={styles.fillInRow}>
          <span className={styles.fillInLabel}>
            <span className={styles.partNumber} dir="ltr">
              {index + 1}
            </span>
            <RichText text={blank.label} />
          </span>
          <input
            type="text"
            dir="auto"
            className={styles.shortAnswerField}
            value={values[blank.id] ?? ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange({ ...values, [blank.id]: event.target.value })
            }
          />
        </label>
      ))}
    </div>
  );
}

function NumericInput({
  raw,
  unit,
  onChange,
}: {
  raw: string;
  unit?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.textInputRow}>
      <input
        type="text"
        inputMode="decimal"
        dir="ltr"
        className={styles.numericField}
        value={raw}
        placeholder="اكتب القيمة العددية"
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      />
      {unit ? <span className={styles.unitBadge}>{unit}</span> : null}
    </div>
  );
}

function ExactInput({
  raw,
  unit,
  onChange,
}: {
  raw: string;
  unit?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.textInputRow}>
      <input
        type="text"
        dir="ltr"
        className={styles.numericField}
        value={raw}
        placeholder="مثال: 1/2 أو 0.5"
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      />
      {unit ? <span className={styles.unitBadge}>{unit}</span> : null}
    </div>
  );
}

function OrderingInput({
  items,
  currentOrder,
  onChange,
}: {
  items: { id: string; text: string }[];
  currentOrder: string[];
  onChange: (order: string[]) => void;
}) {
  const itemMap = new Map(items.map((item) => [item.id, item]));

  const move = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= currentOrder.length) return;
    const next = [...currentOrder];
    const [removed] = next.splice(fromIndex, 1);
    if (removed) next.splice(toIndex, 0, removed);
    onChange(next);
  };

  return (
    <div className={styles.orderingWrapper}>
      <p className={styles.orderingHint}>استخدم الأسهم لإعادة ترتيب العناصر:</p>
      <ol className={styles.orderingList}>
        {currentOrder.map((id, index) => {
          const item = itemMap.get(id);
          if (!item) return null;
          return (
            <li key={id} className={styles.orderingItem}>
              <span className={styles.orderIndex} dir="ltr">
                {index + 1}
              </span>
              <span className={styles.orderText}>
                <RichText text={item.text} />
              </span>
              <div className={styles.orderControls}>
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => move(index, index - 1)}
                  className={styles.orderBtn}
                  aria-label="تحريك لأعلى"
                >
                  ▲
                </button>
                <button
                  type="button"
                  disabled={index === currentOrder.length - 1}
                  onClick={() => move(index, index + 1)}
                  className={styles.orderBtn}
                  aria-label="تحريك لأسفل"
                >
                  ▼
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * Structured matching control: every left item owns a labelled radiogroup of
 * the right-column targets. Targets are rendered through <RichText> exactly
 * like every other authored string — a native <select> can NEVER be used here
 * because <option> elements cannot hold KaTeX output, so authored `$…$` runs
 * would leak to the learner as raw LaTeX source without LTR isolation.
 */
function MatchingInput({
  left,
  right,
  pairs,
  onChange,
}: {
  left: { id: string; text: string }[];
  right: { id: string; text: string }[];
  pairs: Record<string, string>;
  onChange: (pairs: Record<string, string>) => void;
}) {
  return (
    <div className={styles.matchingTable}>
      {left.map((item) => {
        const currentRightId = pairs[item.id] ?? '';
        return (
          <div key={item.id} className={styles.matchingRow}>
            <div className={styles.matchingLeft}>
              <RichText text={item.text} />
            </div>
            <div className={styles.matchingArrow} aria-hidden="true">
              ←
            </div>
            <div
              className={styles.matchingOptions}
              role="radiogroup"
              aria-label={plainTextIsolated(item.text)}
            >
              {right.map((target) => {
                const isChecked = currentRightId === target.id;
                return (
                  <label
                    key={target.id}
                    className={`${styles.matchingOption} ${isChecked ? styles.selected : ''}`}
                  >
                    <input
                      type="radio"
                      name={`q-matching-${item.id}`}
                      value={target.id}
                      checked={isChecked}
                      onChange={() => onChange({ ...pairs, [item.id]: target.id })}
                      className={styles.radioInput}
                    />
                    <span className={styles.optionText}>
                      <RichText text={target.text} />
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ClassificationInput({
  categories,
  items,
  assignments,
  onChange,
}: {
  categories: { id: string; text: string }[];
  items: { id: string; text: string }[];
  assignments: Record<string, string>;
  onChange: (assignments: Record<string, string>) => void;
}) {
  return (
    <div className={styles.classificationList}>
      {items.map((item) => {
        const assignedCatId = assignments[item.id] ?? '';
        return (
          <div key={item.id} className={styles.classificationRow}>
            <div className={styles.classItemText}>
              <RichText text={item.text} />
            </div>
            <div className={styles.classCategories}>
              {categories.map((cat) => {
                const isSelected = assignedCatId === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`${styles.classCatBtn} ${isSelected ? styles.selected : ''}`}
                    onClick={() => {
                      const next = { ...assignments, [item.id]: cat.id };
                      onChange(next);
                    }}
                  >
                    <RichText text={cat.text} />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
