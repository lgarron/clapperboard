.PHONY: build
build: clean
	npx parcel build --public-url ./ ./index.html

.PHONY: dev
dev:
	npx parcel ./index.html

SFTP_PATH = "towns.dreamhost.com:~/garron.net/app/clapperboard/"
URL       = "https://garron.net/app/clapperboard/"

.PHONY: deploy
deploy: build
	rsync -avz \
		--exclude .DS_Store \
		--exclude .git \
		./dist/ \
		${SFTP_PATH}
	echo "\nDone deploying. Go to ${URL}\n"

.PHONY: clean
clean:
	rm -rf /dist
