example:
	./bin/gjut-cli example.html

test:
	nodeunit test

%.js: %.peg /usr/local/bin/pegjs
	pegjs $< 

# Based on npm from homebrew on MacOS
/usr/local/bin/pegjs:
	npm install -g pegjs

clean: html-parser.js
	rm -f $^

.PHONY: clean test example
