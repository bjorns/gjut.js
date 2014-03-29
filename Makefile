example: lib/html-parser.js
	./bin/gjut-cli example/index.html

test:
	nodeunit test

lib/%.js: lib/%.peg /usr/local/bin/pegjs
	pegjs $< 

# Based on npm from homebrew on MacOS
/usr/local/bin/pegjs:
	npm install -g pegjs

clean: lib/html-parser.js
	rm -f $^

.PHONY: clean test example
