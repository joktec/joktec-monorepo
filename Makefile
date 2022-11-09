.PHONY: init build test deploy start-local

# init packages
init:
	docker network create infrastructure || true

# build project
build:
	docker-compose build

# Unit tests
# --exit-code-from <service> to get exit code form docker-compose: 0-success, other-fail
# docker-compose -f docker-compose.test.yml up --build --exit-code-from test
test:
	echo "Test"

# deploy
deploy:
	docker-compose -f docker-compose.local.example.yml up -d --build $(service)

# run dev
dev:
	docker-compose -f docker-compose.local.yml up -d --build $(service)

local:
	docker-compose -f docker-compose.local.yml up -d --no-build $(service)

# make gen-module path=gateways/public name=test
# make gen-res path=microservices/user name=user
# make gen-res path=gateways/jobseeker name=quizz
# make gen-middleware path=gateways/public module=industry name=auth-industry
# make gen-service path=microservices/quizz module=quizz name=auth-industry
# make gen-res path=microservices/quizz name=quizz-category

# make gen-res path=microservices/cv name=quizz-category
gen-module:
	nest g module src/$(path)/src/modules/$(name)

gen-controller:
	nest g co src/$(path)/src/modules/$(module)/controllers/$(name)

gen-middleware:
	nest g middleware src/$(path)/src/modules/$(module)/middlewares/$(name)

gen-interceptor:
	nest g interceptor src/$(path)/src/modules/$(module)/interceptors/$(name)

gen-provider:
	nest g provider src/$(path)/src/modules/$(module)/providers/$(name)

gen-service:
	nest g service src/$(path)/src/modules/$(module)/services/$(name)

gen-interface:
	nest g interface src/$(path)/src/modules/$(module)/interfaces/$(name)

gen-gateway:
	nest g gateway src/$(path)/src/modules/$(module)/gateways/$(name)

gen-filter:
	nest g filter src/$(path)/src/modules/$(module)/filters/$(name)

gen-decorator:
	nest g decorator src/$(path)/src/modules/$(module)/decorators/$(name)

gen-guard:
	nest g guard src/$(path)/src/modules/$(module)/guards/$(name)

gen-pipe:
	nest g pipe src/$(path)/src/modules/$(module)/pipes/$(name)

gen-res:
	nest g res src/$(path)/src/modules/$(name)