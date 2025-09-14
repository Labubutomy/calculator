package main

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/redis/go-redis/v9"
)

func TestRedisIntegration(t *testing.T) {
	// Если переменная окружения REDIS_ADDR не задана, используется адрес по умолчанию,
	// совпадающий с именем сервиса в docker-compose
	redisAddr := os.Getenv("REDIS_ADDR")
	if redisAddr == "" {
		redisAddr = "redis:6379"
	}

	rdb := redis.NewClient(&redis.Options{
		Addr:        redisAddr,
		DialTimeout: 5 * time.Second,
	})

	ctx := context.Background()

	if err := rdb.Ping(ctx).Err(); err != nil {
		t.Fatalf("Ошибка при подключении к Redis по адресу '%s': %v", redisAddr, err)
	}

	testKey := "backend_test_key"
	testValue := "test_value"

	if err := rdb.Set(ctx, testKey, testValue, 0).Err(); err != nil {
		t.Fatalf("Ошибка при записи в Redis: %v", err)
	}

	got, err := rdb.Get(ctx, testKey).Result()
	if err != nil {
		t.Fatalf("Ошибка при чтении из Redis: %v", err)
	}
	if got != testValue {
		t.Errorf("Неверное значение ключа, получено %s, ожидалось %s", got, testValue)
	}
}
