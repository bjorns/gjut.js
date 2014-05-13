module.exports = (function() {
  "use strict";
  var path = require('path');

  function make_context() {
    return {
      get_object: function(ref) {
        return this[ref.module][ref.object];
      }
    };
  }

  function load_imports(doc, basedir) {
    var context = make_context();
    for (var i = 0; i < doc.imports.length; ++i) {
      var imp = doc.imports[i].module,
        parts = imp.split('.'),
        varname = parts[parts.length - 1],
        filename = path.join(basedir, parts.join(path.sep) + '.js'),
        x = require(filename);
      context[imp] = x;
    }
    return context;
  }

  return {
    load_imports: load_imports,
    make_context: make_context
  };
})();
