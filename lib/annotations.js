module.exports = (function() {
  "use strict";
  var parser_util = require('./parser_util.js');

  function execute_annotations(node, context) {
    for (var i = 0; i < node.content.length; ++i) {
      var c = node.content[i];
      if (c.type === 'element') {
        execute_annotations(c.content, context);
      }
    }
    if (node.annotation != null && node.annotation.type == 'funcall') {
      console.log(node.annotation);
      var ref = node.annotation,
        f = context[ref.module][ref.object];
      f(node);
    }
  }

  return {
    execute_annotations: execute_annotations
  };
})();
