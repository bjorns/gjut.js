module.exports = (function() {
  "use strict";
  var path = require('path');

  function load_imports(doc, basedir) {
    var imports = {};
    for (var i=0; i < doc.imports.length; ++i) {
      var imp = doc.imports[i].module,
          parts = imp.split('.'),
          varname = parts[parts.length-1],
          filename = path.join(basedir, parts.join(path.sep) + '.js'),
          x = require(filename);
      imports[imp] = x;
    }
    return imports;
  }

  return {
    load_imports: load_imports
  };
})();
