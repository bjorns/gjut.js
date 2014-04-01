module.exports = (function() {
  "use strict";
  var parser_util = require('./parser_util.js');

  function perform_iteration(node, context) {
    var collection = context.get_object(node.annotation.collection),
      f = context.get_object(node.annotation.funcall),
      ret = [];

    for (var i = 0; i < collection.length; ++i) {
      var clone = parser_util.copy_element(node);
      f(clone, collection[i]);
      ret.push(clone);
    }
    return ret;
  }

  function perform_annotation(node, context) {
    if (node.annotation.type == 'funcall') {
      var ref = node.annotation,
        f = context.get_object(ref);
      f(node);
      return [node];
    } else if (node.annotation.type == 'iteration') {
      return perform_iteration(node, context);
    } else {
      console.log("Warning unknown annotation: " + node.annotation.type);
      return [node];
    }
  }

  function execute_annotations(node, context) {
    // Need to copy because iteration might introduce new elements.
    // console.log("Input:")
    // console.log(node)
    var new_content = [];
    for (var i = 0; i < node.content.length; ++i) {
      var subnode = node.content[i];
      if (subnode.type === 'element') {
        var new_subnode = execute_annotations(subnode, context);
        //console.log("Concatenating");
        //console.log(new_subnode);
        new_content = new_content.concat(new_subnode);
        //console.log(new_content);
      } else {
        //console.log("Pushing");
        //console.log(subnode);
        new_content.push(subnode)
      }
    }
    //console.log("Finished new_content");
    //console.log(new_content);

    node.content = new_content;

    var ret = null;
    if (node.annotation != null) {
      ret = perform_annotation(node, context);
    } else {
      ret = [node];
    }
    //console.log("Output:")
    //console.log(ret);
    return ret;
  }

  return {
    execute_annotations: execute_annotations
  };
})();
