all: build test

build: docs docsrc
	mkdir -p build
	cp index.js package.json package-lock.json Readme.md build

test: docsrc build
	npm test
	cp -r test build/test

docsrc: clean
	cd docsrc && $(MAKE) html

docs: docsrc
	cp -r docsrc/build/html/ docs

clean:
	cd docsrc && $(MAKE) clean
	rm -rf build

clean-docs:
	rm -rf docs;

.PHONY: test clean build clean-docs
