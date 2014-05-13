// Annotation engine.
// ------------------
//
// Execute dynamic code after template assemby.
//
module.exports = (function() {
  "use strict";

  var ParserUtil = require('./parser_util.js'),
    Objects = require('./objects.js');

  function substitute_variable(token, locals, context) {
    var varname = token.substring(1, token.length),
        ref = ParserUtil.make_variable(varname);

    if (ref.type === 'local_variable') {
      if (!locals[ref.object]) {
        console.log("error: Undefined local variable " + ref.object);
      }
      return locals[ref.object];
    } else {
      if (!context[ref.module][ref.object]) {
        console.log("error: Variable " + token + " does not seem to be defined.");
      } else {
        return context[ref.module][ref.object];
      }
    }
  }

  function substitute_variables(text, locals, context) {
    var tokens = text.split(' ');
    for (var i = 0; i < tokens.length; ++i) {
      var t = tokens[i];
      if (t[0] === '@') {
        tokens[i] = substitute_variable(t, locals, context);
      }
    }
    return {
      type: 'text',
      content: tokens.join(' ')
    };
  }

  function replace_content_variables(element, locals, context) {
    for (var i = 0; i < element.content.length; ++i) {
      var c = element.content[i];
      if (c.type == 'macro') {
        element.content[i] = substitute_variables(c.content, locals, context);
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
      var clone = Objects.clone(node);
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
  function execute_subnode_annotations(node, locals, context) {
    var new_content = [];
    for (var i = 0; i < node.content.length; ++i) {
      var subnode = node.content[i];
      if (subnode.type === 'element') {
        var new_subnode = execute_annotations(subnode, locals, context);
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
  function execute_annotations(node, locals, context) {
    node.content = execute_subnode_annotations(node, locals, context);
    replace_content_variables(node, locals, context);

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
