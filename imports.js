module.exports = (function() {
  "use strict";

  function load_imports(doc) {
    var imports = {};
    for (var i=0; i < doc.imports.length; ++i) {
      var imp = doc.imports[i].module,
          parts = imp.split('.'),
          varname = parts[parts.length-1],
          filename = './' + parts.join('/') + '.js',
          x = require(filename);
      imports[imp] = x;
    }
    return imports;
  }

  return {
    load_imports: load_imports
  };
})();
