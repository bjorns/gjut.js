var fs = require('fs'),
  sys = require('sys'),
  parser = require("./html-parser.js"),
  imports = require("./imports.js")
  annotations = require("./annotations.js"),
  renderer = require('./renderer.js');

fs.readFile('./example.html', { encoding: 'utf-8' }, function(err,data) {
  if (!err) {
    doc = parser.parse(data);
    context = imports.load_imports(doc)
    annotations.execute_annotations(doc, context)
    console.log(renderer.render(doc, context));
  } else {
    console.log(err);
  }
});
