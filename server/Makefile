all: build

build:
	@go build -o ./bin/main

run: build
	./bin/main

test:
	@go test

build_image:
	@-docker tag server-go:latest server-go:temp
	docker build -t server-go:latest .
	@-docker image rm server-go:temp
