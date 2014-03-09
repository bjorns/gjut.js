var fs = require('fs'),
  sys = require('sys'),
  parser = require("./reaper-parser.js");

fs.readFile('./example.html', { encoding: 'utf-8' }, function(err,data) {
  if (!err) {
    doc = parser.parse(data);
    console.log(doc);
  } else {
    console.log(err);
  }
});
