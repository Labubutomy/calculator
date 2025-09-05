all: build_image

build_image:
	@-docker tag client-react:latest client-react:temp
	docker build -t client-react:latest .
	@-docker image rm client-react:temp

