module.exports = (function() {
  "use strict";

  var fs = require('fs'),
    sys = require('sys'),
    parser = require("./html-parser.js"),
    imports = require("./imports.js"),
    assembler = require('./assembler.js'),
    indexer = require('./indexer.js'),
    verifier = require('./verifier.js'),
    annotations = require("./annotations.js"),
    renderer = require('./renderer.js');

  function render_html(doc, output) {
    output.write(renderer.render(doc));
  }

  function render_json(doc, output) {
    output.write(renderer.render_json(doc));
  }

  /**
   * input: fs.Readable -- An source html file as readable.
   *
   * returns: an object representing the document
   */
  function build(filename, basedir) {
    var data = fs.readFileSync(filename, {'encoding': 'utf-8'}),
      doc = parser.parse(data),
      context = imports.load_imports(doc, basedir);

    assembler.assemble_document(doc, basedir);
    var index = indexer.index_tree({}, doc);
    doc.errors = verifier.verify_rules(doc.rules, index);
    annotations.execute_annotations(doc, context)

    doc.index = index;
    return doc;
  }

  return {
    build: build,
    render_html: render_html,
    render_json: render_json
  };
})();
