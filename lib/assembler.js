module.exports = (function() {
  "use strict";

  var path = require('path'),
    fs = require('fs'),
    parser = require("./html-parser.js");
    
  function assemble_document(node, basedir) {
    for (var i = 0; i < node.content.length; ++i) {
      var c = node.content[i];
      if (c.type === 'element') {
        assemble_document(c.content, basedir);
      } else if (c.type === 'macro' && c.content === '@insert') {
        var filename = basedir + path.sep + c.argument,
          data = fs.readFileSync(filename, {'encoding': 'utf-8'}),
          subnode = parser.parse(data);
        assemble_document(subnode, basedir);
        node.content[i] = subnode;
      } else {
        // console.log(c);
      }
    }
  }

  return {
    assemble_document: assemble_document
  };
})();
