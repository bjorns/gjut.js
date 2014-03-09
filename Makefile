all: reaper-parser.js
	node main.js

reaper-parser.js:
	pegjs reaper-parser.peg 

