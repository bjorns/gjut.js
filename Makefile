test: reaper-parser.js
	node main.js

reaper-parser.js: reaper-parser.peg /usr/local/bin/pegjs
	pegjs $< 

# Based on npm from homebrew on MacOS
/usr/local/bin/pegjs:
	npm install -g pegjs

clean: reaper-parser.js
	rm -f $^

.PHONY: clean test
