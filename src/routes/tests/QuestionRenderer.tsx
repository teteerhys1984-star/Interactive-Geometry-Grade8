import type { ChangeEvent } from 'react';
import { Blocks } from '@/components/content';
import { RichText } from '@/components/math';
import type { AnswerValue, TestQuestion } from '@/tests/schema';
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
 *  Renders one question during the active test.
 *
 *  SECURITY & INTEGRITY:
 *  - Correct answers are NEVER rendered here.
 *  - No `data-correct` attributes are written to the DOM.
 *  - Feedback (green/red) is strictly forbidden while solving.
 *  - Fully accessible: native radio/checkbox/inputs with labels, keyboard support.
 * ============================================================================
 */
export function QuestionRenderer({ question, value, onChange }: QuestionRendererProps) {
  return (
    <article className={styles.questionCard}>
      <div className={styles.prompt}>
        <Blocks blocks={question.prompt} />
      </div>

      <div className={styles.inputArea}>
        {question.type === 'single-choice' || question.type === 'error-analysis' ? (
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
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------------ */
/*  Inputs implementations                                                  */
/* ------------------------------------------------------------------------ */

function SingleChoiceInput({
  questionId,
  choices,
  selectedId,
  onSelect,
}: {
  questionId: string;
  choices: { id: string; text: string }[];
  selectedId: string | undefined;
  onSelect: (id: string) => void;
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
            <div className={styles.matchingRight}>
              <select
                className={styles.matchingSelect}
                value={currentRightId}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  const val = event.target.value;
                  const next = { ...pairs };
                  if (val) next[item.id] = val;
                  else delete next[item.id];
                  onChange(next);
                }}
              >
                <option value="">-- اختر ما يناسبه --</option>
                {right.map((target) => (
                  <option key={target.id} value={target.id}>
                    {target.text}
                  </option>
                ))}
              </select>
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
