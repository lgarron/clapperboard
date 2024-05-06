.PHONY: build
build: clean
	bun run script/build.ts

.PHONY: dev
dev:
	bun run script/dev.ts

.PHONY: lint
lint:
	npx @biomejs/biome check ./src

.PHONY: format
format:
	npx @biomejs/biome format --write ./src

.PHOHY: deploy
deploy: build
	bun x @cubing/deploy

.PHONY: clean
clean:
	rm -rf ./dist
