import { sample } from "effector";
import { buttonClicked, ButtonPayload, ButtonTypes, AddValueButton, addToExpressionFx, CalculateButton, $expression, calculateExpressionFx, ClearButton, clearExpression, ClearHistoryButton, clearHistory, clearResult, $result } from "../events/button";

sample({
  clock: buttonClicked,
  source: $result,
  filter: (_, payload: ButtonPayload): payload is AddValueButton => payload.type === ButtonTypes.ADD_VALUE,
  fn: (result, payload) => ({
    value: (payload as AddValueButton).value,
    shouldClear: result !== ""
  }),
  target: addToExpressionFx
})

sample({
  clock: addToExpressionFx,
  filter: ({ shouldClear }) => shouldClear === true,
  target: [clearExpression, clearResult],
})

sample({
  clock: buttonClicked,
  source: $expression,
  filter: (_, payload: ButtonPayload): payload is CalculateButton => payload.type === ButtonTypes.CALCULATE,
  fn: (expression) => expression,
  target: calculateExpressionFx
})

sample({
  clock: buttonClicked,
  filter: (payload: ButtonPayload): payload is ClearButton => payload.type === ButtonTypes.CLEAR,
  target: clearExpression
})

sample({
  clock: buttonClicked,
  filter: (payload: ButtonPayload): payload is ClearHistoryButton => payload.type === ButtonTypes.CLEAR_HISTORY,
  target: clearHistory
})
