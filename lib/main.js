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
    renderer = require('./renderer.js'),
    Objects = require('./objects.js');

  function render_html(doc, output) {
    var clone = Objects.clone(doc);
    annotations.execute_annotations(clone, clone.context);
    output.write(renderer.render(clone));
  }

  function render_json(doc, output) {
    var clone = Objects.clone(doc);
    annotations.execute_annotations(clone, clone.context);
    output.write(renderer.render_json(doc));
  }

  function compile_template(filename, basedir) {
    var data = fs.readFileSync(filename, {'encoding': 'utf-8'}),
      template = parser.parse(data);

    template.context = imports.load_imports(doc, basedir);
    assembler.assemble_document(template, basedir);
    template.index = indexer.index_tree({}, template);
    template.errors = verifier.verify_rules(template.rules, template.index);
    return template;
  }

  return {
    compile: compile_template,
    render_html: render_html,
    render_json: render_json
  };
})();
