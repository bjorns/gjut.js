module.exports = (function() {
  "use strict";
  var util = require('./util.js');

  function execute_annotations(node, context) {
    for (var i = 0; i < node.content.length; ++i) {
      var c = node.content[i];
      if (c.type === 'element') {
        execute_annotations(c.content, context);
      }
    }
    if (node.annotation != null) {
      var ref = util.split_annotation(node.annotation),
        f = context[ref.modulename][ref.objectname];
      f(node);
    }
  }

  return {
    execute_annotations: execute_annotations
  };
})();
