package main

import (
	"math"
	_ "runtime/debug"
	"testing"
)

func TestIncorrectInput(t *testing.T) {
	for _, tc := range []struct {
		input string
		err   string
	}{
		{"(x))", "Unbalanced parenthesis"},
		{"sin(x + 2) - cos(5)", "Invalid input"},
		{"x=2 5+x - 12", "Invalid input"},
		{"tg(tralala)", "Invalid input"},
		{"5 ** z - sqrt(-12)", "Invalid input"},
		{"xyz % x >= yz", "Invalid input"},
		{"123s32 - 123", "Invalid input"},
		{"sqrtx(25)", "Invalid input"},
	} {
		_, err := calculate(tc.input)
		if err == nil {
			t.Errorf("Undetected error in %s", tc.input)
		}
	}
}

func TestPositiveSimple(t *testing.T) {
	for _, tc := range []struct {
		input    string
		expected float64
	}{
		{" 1 + 2 +3 +    5 ", 11},
		{"(2+3)* (20 -  19.5) /(0.5)", 5},
	} {
		ans, err := calculate(tc.input)
		if err != nil {
			t.Errorf("Unexpected error in %s", tc.input)
		}
		if ans != tc.expected {
			t.Errorf("In string %s got %f, want %f", tc.input, ans, tc.expected)
		}
	}
}

func TestNegativeSimple(t *testing.T) {
	for _, tc := range []struct {
		input string
		err   string
	}{
		{"(12+2))", "Unbalanced parenthesis"},
		{"(5)/0", "Invalid input"},
	} {
		_, err := calculate(tc.input)
		if err == nil {
			t.Errorf("Undetected error in %s", tc.input)
		}
	}
}

func TestPositiveSin(t *testing.T) {
	for _, tc := range []struct {
		input    string
		expected float64
	}{
		{"sin(1)", math.Sin(1)},
		{"sin( (2 + 3) - 1 / 2)", math.Sin((2 + 3) - 0.5)},
	} {
		ans, err := calculate(tc.input)
		if err != nil {
			t.Errorf("Unexpected error in %s", tc.input)
		}
		if ans != tc.expected {
			t.Errorf("In string %s got %f, want %f", tc.input, ans, tc.expected)
		}
	}
}

func TestNegativeSin(t *testing.T) {
	for _, tc := range []struct {
		input string
		err   string
	}{
		{"sin()", "Invalid input"},
		{"sin((12)", "Unbalanced parenthesis"},
		{"sin 1", "Invalid input"},
	} {
		_, err := calculate(tc.input)
		if err == nil {
			t.Errorf("Undetected error in %s", tc.input)
		}
	}
}

func TestPositiveCos(t *testing.T) {
	for _, tc := range []struct {
		input    string
		expected float64
	}{
		{"cos(1)", math.Cos(1)},
		{"cos( (2 + 3) - 1 / 2)", math.Cos((2 + 3) - 0.5)},
	} {
		ans, err := calculate(tc.input)
		if err != nil {
			t.Errorf("Unexpected error in %s", tc.input)
		}
		if ans != tc.expected {
			t.Errorf("In string %s got %f, want %f", tc.input, ans, tc.expected)
		}
	}
}

func TestNegativeCos(t *testing.T) {
	for _, tc := range []struct {
		input string
		err   string
	}{
		{"cos()", "Invalid input"},
		{"cos((12))))))", "Unbalanced parenthesis"},
		{"cos 123", "Invalid input"},
	} {
		_, err := calculate(tc.input)
		if err == nil {
			t.Errorf("Undetected error in %s", tc.input)
		}
	}
}

func TestPositiveTg(t *testing.T) {
	for _, tc := range []struct {
		input    string
		expected float64
	}{
		{"tg(1)", math.Tan(1)},
		{"tg( (2 + 3) - 1 / 2)", math.Tan((2 + 3) - 0.5)},
	} {
		ans, err := calculate(tc.input)
		if err != nil {
			t.Errorf("Unexpected error in %s", tc.input)
		}
		if ans != tc.expected {
			t.Errorf("In string %s got %f, want %f", tc.input, ans, tc.expected)
		}
	}
}

func TestNegativeTg(t *testing.T) {
	for _, tc := range []struct {
		input string
		err   string
	}{
		{"tg()", "Invalid input"},
		{"tg((12))))))", "Unbalanced parenthesis"},
		{"tg 123", "Invalid input"},
	} {
		_, err := calculate(tc.input)
		if err == nil {
			t.Errorf("Undetected error in %s", tc.input)
		}
	}
}

func TestPositiveSqrt(t *testing.T) {
	for _, tc := range []struct {
		input    string
		expected float64
	}{
		{"sqrt(1)", math.Sqrt(1)},
		{"sqrt( (2 + 3) - 1 / 2 + tg(1))", math.Sqrt((2 + 3) - 0.5 + math.Tan(1))},
	} {
		ans, err := calculate(tc.input)
		if err != nil {
			t.Errorf("Unexpected error in %s", tc.input)
		}
		if ans != tc.expected {
			t.Errorf("In string %s got %f, want %f", tc.input, ans, tc.expected)
		}
	}
}

func TestNegativeSqrt(t *testing.T) {
	for _, tc := range []struct {
		input string
		err   string
	}{
		{"sqrt()", "Invalid input"},
		{"sqrt((12))))))", "Unbalanced parenthesis"},
		{"sqrt 123", "Invalid input"},
		{"sqrt(-12)", "Invalid input"},
	} {
		_, err := calculate(tc.input)
		if err == nil {
			t.Errorf("Undetected error in %s", tc.input)
		}
	}
}
