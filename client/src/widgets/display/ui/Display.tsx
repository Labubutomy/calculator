import { Screen } from "../../../components/ui/screen";
import { useUnit } from "effector-react";
import { $expression, $result, calculateExpressionFx } from "../../../events/button";

export const Display = () => {
  const { expression, result, isCalculating } = useUnit({
    expression: $expression,
    result: $result,
    isCalculating: calculateExpressionFx.pending
  })

  return (
    <Screen expression={expression} result={result} minHeight="92px" />
  );
}