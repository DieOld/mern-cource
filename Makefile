COMPOSE ?= docker-compose -f compose.yml

build:
	$(COMPOSE) build

remove-compose:
	$(COMPOSE) rm -f

run: build
run:
	$(COMPOSE) up -d