package main

import (
	"errors"
	"math"
	"strings"

	"github.com/Knetic/govaluate"
)

var errInvalidInput = errors.New("invalid input")

var functions = map[string]govaluate.ExpressionFunction{
	"sqrt": func(args ...any) (any, error) {
		if len(args) != 1 {
			return nil, errInvalidInput
		}

		answer, ok := args[0].(float64)
		if !ok {
			return nil, errInvalidInput
		}

		res := math.Sqrt(answer)
		return res, nil
	},

	"sin": func(args ...any) (any, error) {
		if len(args) != 1 {
			return nil, errInvalidInput
		}

		answer, ok := args[0].(float64)
		if !ok {
			return nil, errInvalidInput
		}

		res := math.Sin(answer)
		return res, nil
	},

	"cos": func(args ...any) (any, error) {
		if len(args) != 1 {
			return nil, errInvalidInput
		}

		answer, ok := args[0].(float64)
		if !ok {
			return nil, errInvalidInput
		}

		res := math.Cos(answer)
		return res, nil
	},

	"tg": func(args ...any) (any, error) {
		if len(args) != 1 {
			return nil, errInvalidInput
		}
		answer, ok := args[0].(float64)

		if !ok {
			return nil, errInvalidInput
		}

		res := math.Tan(answer)
		return res, nil
	},
}

func calculate(s string) (float64, error) {
	expression, err := govaluate.NewEvaluableExpressionWithFunctions(strings.ToLower(s), functions)

	if err != nil {
		if err.Error() == "Unbalanced parenthesis" { // В случае "2a" он передает плохую ошибку
			return 0, err
		}
		return 0, errInvalidInput
	}

	result, err := expression.Evaluate(map[string]any{})

	if err != nil {
		return 0, errInvalidInput
	}

	answer, ok := result.(float64)

	if !ok || math.IsNaN(answer) || math.IsInf(answer, 1) || math.IsInf(answer, 0) {
		return 0, errInvalidInput
	}

	return answer, nil
}
