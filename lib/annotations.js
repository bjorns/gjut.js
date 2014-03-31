module.exports = (function() {
  "use strict";
  var parser_util = require('./parser_util.js');

  function perform_annotation(node, context) {
    if (node.annotation.type == 'funcall') {
      var ref = node.annotation,
        f = context.get_object(ref);
      f(node);
    }
  }

  function execute_annotations(node, context) {
    for (var i = 0; i < node.content.length; ++i) {
      var c = node.content[i];
      if (c.type === 'element') {
        execute_annotations(c.content, context);
      }
    }
    if (node.annotation != null) {
      perform_annotation(node, context);
    }
  }

  return {
    execute_annotations: execute_annotations
  };
})();
