all: build

build: docs docsrc
	mkdir -p build
	cp -r test build/test
	cp *.js *.json LICENSE CHANGELOG.md Readme.md build

test:
	npm test

docsrc: clean
	cd docsrc && $(MAKE) html

docs: docsrc
	cp -r docsrc/build/html/ docs

clean: clean-build-only clean-docs

clean-build-only:
	rm -rf build

clean-docs:
	cd docsrc && $(MAKE) clean
	rm -rf docs;

.PHONY: test clean docs build clean-docs clean-build-only
