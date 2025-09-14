package main

import (
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/wait"
)

func TestRedisIntegrationWithTestcontainers(t *testing.T) {
	ctx := context.Background()

	req := testcontainers.ContainerRequest{
		Image:        "redis:latest",
		ExposedPorts: []string{"6379/tcp"},
		WaitingFor:   wait.ForListeningPort("6379/tcp"),
	}
	redisC, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
		ContainerRequest: req,
		Started:          true,
	})
	if err != nil {
		t.Fatalf("Ошибка при запуске контейнера Redis: %v", err)
	}
	defer func() {
		if err := redisC.Terminate(ctx); err != nil {
			t.Fatalf("Ошибка при завершении контейнера Redis: %v", err)
		}
	}()

	host, err := redisC.Host(ctx)
	if err != nil {
		t.Fatalf("Ошибка при получении host контейнера Redis: %v", err)
	}
	port, err := redisC.MappedPort(ctx, "6379")
	if err != nil {
		t.Fatalf("Ошибка при получении mapped port контейнера Redis: %v", err)
	}
	redisAddr := fmt.Sprintf("%s:%s", host, port.Port())

	rdb := redis.NewClient(&redis.Options{
		Addr:        redisAddr,
		DialTimeout: 5 * time.Second,
	})

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
