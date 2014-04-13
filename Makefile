example: lib/html-parser.js lib/rule-parser.js
	./bin/gjutc example/index.html

debug: lib/html-parser.js lib/rule-parser.js
	node debug ./bin/gjutc example/index.html

test:
	nodeunit test

doc:
	docco lib/*.js

lib/%.js: lib/%.peg /usr/local/bin/pegjs
	pegjs $<

# Based on npm from homebrew on MacOS
/usr/local/bin/pegjs:
	npm install -g pegjs

clean: lib/html-parser.js
	rm -f $^

.PHONY: clean test example doc
