import { createEffect, createEvent, createStore, sample } from 'effector';
import { calculateRequest } from '../shared/api/calculate';
import { persist } from 'effector-storage/local';

export enum ButtonTypes {
  ADD_VALUE = 'addValue',
  CALCULATE = 'calculate',
  CLEAR_HISTORY = 'clearHistory',
  CLEAR = 'clear',
}

export interface AddValueButton {
  type: ButtonTypes.ADD_VALUE;
  value: string;
}

export interface CalculateButton {
  type: ButtonTypes.CALCULATE;
}

export interface ClearHistoryButton {
  type: ButtonTypes.CLEAR_HISTORY;
}

export interface ClearButton {
  type: ButtonTypes.CLEAR;
}

export type ButtonPayload = {
  type: ButtonTypes;
  value?: string;
};

export const buttonClicked = createEvent<ButtonPayload>();
export const clearExpression = createEvent();
export const clearHistory = createEvent();
export const clearResult = createEvent();

export const addToExpressionFx = createEffect(
  async (param: { value: string; shouldClear?: boolean }) => {
    if (param.shouldClear) clearResult();

    return param.value;
  }
);

export const calculateExpressionFx = createEffect(
  async (expression: string) => {
    const result = await calculateRequest({ expression });

    return { expression, result: result.answer };
  }
);

const MAX_HISTORY_ITEMS = 4;

export const $expression = createStore<string>('');

sample({
  clock: addToExpressionFx.doneData,
  source: $expression,
  fn: (expression, value) => expression + value,
  target: $expression,
});

sample({
  clock: calculateExpressionFx.doneData,
  fn: ({ expression }) => expression,
  target: $expression,
});

sample({
  clock: clearExpression,
  fn: () => '',
  target: $expression,
});

export const $result = createStore<string>('')
  .on(calculateExpressionFx.doneData, (_, { result }) => result)
  .on(clearExpression, () => '')
  .on(clearResult, () => '');

export const $history = createStore<[string, string][]>([])
  .on(calculateExpressionFx.doneData, (history, { expression, result }) => {
    if (result === '') return history;

    const newHistory = [[expression, result], ...history].splice(
      0,
      MAX_HISTORY_ITEMS
    );
    return newHistory as [string, string][];
  })
  .on(clearHistory, () => []);

persist({ store: $history, key: 'history' });

export const $isCalculateError = createStore<boolean>(false);

sample({
  clock: calculateExpressionFx.doneData,
  fn: ({ result }) => result === '',
  target: $isCalculateError,
});

sample({
  clock: [addToExpressionFx.doneData, clearExpression, clearResult],
  fn: () => false,
  target: $isCalculateError,
});

sample({
  clock: $isCalculateError,
  fn: () => '',
  target: $expression,
});
