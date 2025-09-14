all: up

build_server_image:
	(cd ./server && make build_image)

build_client_image:
	(cd ./client && make build_image)

build_images: build_client_image build_server_image

up: build_images
	docker compose up

down:
	docker compose down

up_dev_server: build_server_image
	docker compose run --rm -p 8080:8080 dev-server-go


# docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' running-server-go