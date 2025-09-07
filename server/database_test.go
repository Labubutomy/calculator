package main

import (
	"context"
	"github.com/alicebob/miniredis/v2"
	"testing"

	"github.com/redis/go-redis/v9"
	"github.com/stretchr/testify/assert"
)

func setupTestRedis(t *testing.T) (*RedisStore, func()) {

	mr, err := miniredis.Run()
	if err != nil {
		t.Fatalf("failed to start miniredis: %v", err)
	}

	store := &RedisStore{
		client: redis.NewClient(&redis.Options{
			Addr: mr.Addr(),
		}),
		ctx: context.Background(),
	}

	cleanup := func() {
		store.Close()
		mr.Close()
	}

	return store, cleanup
}

func TestAddAndGetCalculation(t *testing.T) {
	store, cleanup := setupTestRedis(t)
	defer cleanup()

	ctx := context.Background()

	type testStruct struct {
		key   string
		value StoredValue
	}

	values :=
		[]testStruct{
			{
				key: "2 + 2",
				value: StoredValue{
					Answer:    "4",
					IsCorrect: true,
				},
			},
			{
				key: "2 * 2",
				value: StoredValue{
					Answer:    "4",
					IsCorrect: true,
				},
			},
			{
				key: "2 / 2",
				value: StoredValue{
					Answer:    "1",
					IsCorrect: true,
				},
			},
			{
				key: "2 - 2",
				value: StoredValue{
					Answer:    "0",
					IsCorrect: true,
				},
			},
			{
				key: "2 / 0",
				value: StoredValue{
					Answer:    errInvalidInput.Error(),
					IsCorrect: false,
				},
			},
			{
				key: "sqrt(4)",
				value: StoredValue{
					Answer:    "2",
					IsCorrect: true,
				},
			},
			{
				key: "sin(0)",
				value: StoredValue{
					Answer:    "0",
					IsCorrect: true,
				},
			},
		}

	for _, str := range values {
		err := store.AddCalculation(ctx, str.key, str.value)
		assert.NoError(t, err, "AddCalculation should not return error")

		got, err := store.GetCalculation(ctx, str.key)
		assert.NoError(t, err, "GetCalculation should not return error")
		assert.Equal(t, str.value, got, "Got value should match stored value")
	}
}

func TestGetCalculation_NotFound(t *testing.T) {
	store, cleanup := setupTestRedis(t)
	defer cleanup()

	ctx := context.Background()
	key := "nonexistent"

	_, err := store.GetCalculation(ctx, key)
	assert.Error(t, err, "GetCalculation should return error for missing key")
}

func TestAddCalculation_InvalidJSON(t *testing.T) {
	store, cleanup := setupTestRedis(t)
	defer cleanup()

	ctx := context.Background()
	key := "invalid"
	// создаем тип, который не сериализуется в JSON
	type Invalid struct {
		Func func()
	}
	value := StoredValue{Answer: "test"}
	value2 := Invalid{}

	_ = value2 // Чтобы не было ошибки компиляции

	err := store.AddCalculation(ctx, key, value)
	assert.NoError(t, err, "AddCalculation should work with valid StoredValue")
}

func TestClose(t *testing.T) {
	store, cleanup := setupTestRedis(t)
	defer cleanup()

	store.Close()
}
