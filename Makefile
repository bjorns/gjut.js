GENERATED=lib/html-parser.js
GENERATED+=lib/rule-parser.js

example: $(GENERATED)
	./bin/gjutc -q example/index.html --locals "localVariable:MyLocalVariable"

debug: lib/html-parser.js lib/rule-parser.js
	node debug ./bin/gjutc example/index.html

test: $(GENERATED)
	nodeunit test

doc:
	docco lib/*.js

release: test doc
	npm publish

lib/%.js: lib/%.peg /usr/local/bin/pegjs
	pegjs $<

# Based on npm from homebrew on MacOS
/usr/local/bin/pegjs:
	npm install -g pegjs

clean: lib/html-parser.js
	rm -f $^

.PHONY: clean test example doc
