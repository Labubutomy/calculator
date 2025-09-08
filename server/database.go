package main

import (
	"context"
	"encoding/json"
	"errors"
	"github.com/redis/go-redis/v9"
	"log"
)

const (
	redisMaxMemory       = "10mb"
	redisMaxMemoryPolicy = "allkeys-lru"
)

var jsonFormatError = errors.New("json format error")

type StoredValue struct {
	Answer    string `json:"answer"`
	IsCorrect bool   `json:"isCorrect,omitempty"`
}

type DataBase interface {
	AddCalculation(ctx context.Context, calculation string, value StoredValue) error
	GetCalculation(ctx context.Context, calculation string) (StoredValue, error)
	Close()
}

type RedisStore struct {
	client *redis.Client
}

func (s *RedisStore) AddCalculation(ctx context.Context, calculation string, value StoredValue) error {
	data, err := json.Marshal(value)
	if err != nil {
		return jsonFormatError
	}
	return s.client.Set(ctx, calculation, data, 0).Err()
}

func (s *RedisStore) GetCalculation(ctx context.Context, calculation string) (StoredValue, error) {
	data, err := s.client.Get(ctx, calculation).Bytes()
	if err != nil {
		return StoredValue{}, err
	}
	var value StoredValue
	if err = json.Unmarshal(data, &value); err != nil {
		return StoredValue{}, jsonFormatError
	}
	return value, nil
}

func (s *RedisStore) Close() {
	err := s.client.Close()
	if err != nil {
		log.Println(err)
		return
	}
}

func NewRedisStore(ctx context.Context, addr, password string) *RedisStore {
	rdb := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: password,
		DB:       0,
	})

	rdb.ConfigSet(ctx, "maxmemory", redisMaxMemory)
	rdb.ConfigSet(ctx, "maxmemory-policy", redisMaxMemoryPolicy)

	return &RedisStore{client: rdb}
}
