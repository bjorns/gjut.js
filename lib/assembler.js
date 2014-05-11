module.exports = (function() {
  "use strict";

  var path = require('path'),
    fs = require('fs'),
    parser = require("./html-parser.js");

  /**
   * Replace all @insert macros with the template of that
   * particular file.
   */
  function assemble_document(node, basedir) {
    for (var i = 0; i < node.content.length; ++i) {
      var subnode = node.content[i];
      if (subnode.type === 'element') {
        assemble_document(subnode, basedir);
      } else if (subnode.type === 'macro' && subnode.content === '@insert') {
        var filename = basedir + path.sep + subnode.argument,
          data = fs.readFileSync(filename, {'encoding': 'utf-8'}),
          subtemplate = parser.parse(data);
        assemble_document(subtemplate.doc, basedir);
        node.content[i] = subtemplate.doc;
      } else {
        // console.log(c);
      }
    }
  }

  return {
    assemble_document: assemble_document
  };
})();
