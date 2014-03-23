var fs = require('fs'),
  sys = require('sys'),
  parser = require("./reaper-parser.js"),
  renderer = require('./renderer.js');

fs.readFile('./example.html', { encoding: 'utf-8' }, function(err,data) {
  if (!err) {
    doc = parser.parse(data);
    console.log(renderer.render(doc));
  } else {
    console.log(err);
  }
});
