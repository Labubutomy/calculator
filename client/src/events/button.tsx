import { createEffect, createEvent, createStore } from 'effector';
import { calculateRequest } from '../shared/api/calculate';

export enum ButtonTypes {
  ADD_VALUE = "addValue",
  CALCULATE = "calculate",
  CLEAR_HISTORY = "clearHistory",
  CLEAR = "clear"
}

export interface AddValueButton {
  type: ButtonTypes.ADD_VALUE;
  value: string
}

export interface CalculateButton {
  type: ButtonTypes.CALCULATE
}

export interface ClearHistoryButton {
  type: ButtonTypes.CLEAR_HISTORY
}

export interface ClearButton {
  type: ButtonTypes.CLEAR
}

export type ButtonPayload =
  | AddValueButton
  | CalculateButton
  | ClearHistoryButton
  | ClearButton;

export const buttonClicked = createEvent<ButtonPayload>();
export const clearExpression = createEvent();
export const clearHistory = createEvent();
export const clearResult = createEvent();

export const addToExpressionFx = createEffect(async (param: { value: string, shouldClear?: boolean }) => {
  if (param.shouldClear)
    clearResult()

  return param.value
})

export const calculateExpressionFx = createEffect(async (expression: string) => {
  const result = await calculateRequest({ expression });
  console.log(result)
  return { expression, result: result.answer };
})

const HISTORY_KEY = 'calculator_history';
const MAX_HISTORY_ITEMS = 4;

export const getHistoryFromStorage = () => {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  catch {
    return [];
  }
}

const saveHitoryToStorage = (history: string[]) => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
  catch (error) {
    console.error("Failed to save history:", error);
  }

  return history;
}

export const $expression = createStore<string>("")
  .on(addToExpressionFx.doneData, (expr, newValue) => expr + newValue)
  .on(calculateExpressionFx.doneData, (_, { expression }) => expression)
  .on(clearExpression, () => "")

export const $result = createStore<string>("")
  .on(calculateExpressionFx.doneData, (_, { result }) => result)
  .on(clearExpression, () => "")
  .on(clearResult, () => "")

export const $history = createStore<string[]>(getHistoryFromStorage())
  .on(calculateExpressionFx.doneData, (history, { expression, result }) => {
    const newItem = `${expression} = ${result}`;
    const newHistory = [newItem, ...history].splice(0, MAX_HISTORY_ITEMS);
    saveHitoryToStorage(newHistory);
    return newHistory;
  })
  .on(clearHistory, () => saveHitoryToStorage([]))
