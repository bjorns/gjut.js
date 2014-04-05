// Annotation engine.
// ------------------
//
// Execute dynamic code after template assemby.
//
module.exports = (function() {
  "use strict";

  var parser_util = require('./parser_util.js');

  function substitute_variables(text, context) {
    var tokens = text.split(' ');
    for (var i = 0; i < tokens.length; ++i) {
      var t = tokens[i];
      if (t[0] === '@') {
        var varname = t.substring(1,t.length),
            ref = parser_util.make_variable(varname);
        if (!context[ref.module][ref.object]) {
          console.log("error: Variable " + t + " does not seem to be defined.");
        } else {
          tokens[i] = context[ref.module][ref.object];
        }
      }
    }
    return {
      type: 'text',
      content: tokens.join(' ')
    };
  }

  function replace_content_variables(element, context) {
    for (var i = 0; i < element.content.length; ++i) {
      var c = element.content[i];
      if (c.type == 'macro') {
        element.content[i] = substitute_variables(c.content, context);
      }

    }
  }

  // Iterations may be a little peculiar. They are
  // annotated on the element to be replicated, instead of
  // outside as in most templating languages.
  // This element is then cloned and the function is
  // iteratively applied to each new node.
  function execute_iteration(node, context) {
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

  function execute_funcall(node, context) {
    var ref = node.annotation,
      f = context.get_object(ref),
      keep = node.annotation.inverted ? !f(node) : f(node);

    // If the function call returns _false_ the node is
    // removed from the document.
    if (keep === undefined || keep === true) {
      return [node];
    } else {
      return [];
    }
  }

  function execute_annotation(node, context) {
    if (node.annotation.type == 'funcall') {
      return execute_funcall(node, context);
    } else if (node.annotation.type == 'iteration') {
      return execute_iteration(node, context);
    } else {
      console.log("warning: Unknown annotation: " + node.annotation.type);
      return [node];
    }
  }


  // Traverse subelements and recursively execute annotations.
  // Since the iterations may return multiple elements,
  // all annotations must return an array, which is then
  // concatenated. Not ideal but it makes for simpler
  // code for now.
  function execute_subnode_annotations(node, context) {
    var new_content = [];
    for (var i = 0; i < node.content.length; ++i) {
      var subnode = node.content[i];
      if (subnode.type === 'element') {
        var new_subnode = execute_annotations(subnode, context);
        new_content = new_content.concat(new_subnode);
      } else {
        new_content.push(subnode)
      }
    }
    return new_content;
  }

  // We traverse the document bottom up first replacing
  // any content variables, then any node annotations.
  // This way no code has to deal with not yet
  // rendered variables.
  function execute_annotations(node, context) {
    node.content = execute_subnode_annotations(node, context);
    replace_content_variables(node, context);

    if (node.annotation != null) {
      return execute_annotation(node, context);
    } else {
      return [node];
    }
  }

  return {
    execute_annotations: execute_annotations
  };
})();
