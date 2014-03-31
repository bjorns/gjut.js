module.exports = (function() {
  "use strict";

  var fs = require('fs'),
    sys = require('sys'),
    parser = require("./html-parser.js"),
    imports = require("./imports.js"),
    assembler = require('./assembler.js'),
    annotations = require("./annotations.js"),
    renderer = require('./renderer.js');

  /**
   * input: fs.Readable -- An source html file as readable.
   * output: fs.Writeable
   * basedir: a string representing the import path for the template.
   */
  function render(input, output, basedir) {
    input.setEncoding('utf-8');
    input.on('readable', function() {
      var data;
      while (null !== (data = input.read())) {

        var doc = parser.parse(data),
          context = imports.load_imports(doc, basedir);

        assembler.assemble_document(doc, basedir);
        
        annotations.execute_annotations(doc, context)
        output.write(renderer.render(doc, context));
      }
    });
  }

  return {
    render: render
  };
})();
