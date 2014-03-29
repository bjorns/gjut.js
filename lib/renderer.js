module.exports = (function() {
  "use strict";
  var INDENT = "  ",
    util = require('./util.js');

  function indent(str, indent_level) {
    var ret = "";
    for (var i=0; i < indent_level; ++i) {
      ret += INDENT;
    }
    return ret + str;
  }

  function render_attribute(attribute) {
    var ret = attribute.name;
    if (attribute.value.length > 0) {
      ret += "=\"" + attribute.value.join(" ") + "\"";
    }
    return ret;
  }

  function render_attributes(element) {
    var rendered_attrs = [];

    for (var i=0; i < element.attributes.length; ++i) {
      var attr = element.attributes[i];
      rendered_attrs.push(render_attribute(attr));
    }
    return (rendered_attrs.length > 0 ? " " : "") + rendered_attrs.join(' ');
  }

  function render_element(context, element, indent_level) {
    var ret = indent("<" + element.name + render_attributes(element) + ">\n", indent_level);
    for (var i=0; i < element.content.length; ++i) {
      ret += render_content(context, element.content[i], indent_level + 1);
    }
    ret += indent("</" + element.name + ">\n", indent_level);
    return ret;
  }

  function substitute_variables(context, text) {
    var tokens = text.split(' ');
    for (var i = 0; i < tokens.length; ++i) {
      var t = tokens[i];
      if (t[0] === '@') {
        var varname = t.substring(1,t.length),
            ref = util.split_annotation(varname);
        if (!context[ref.modulename][ref.objectname]) {
          console.log("error: Variable " + t + " does not seem to be defined.");
        } else {
          tokens[i] = context[ref.modulename][ref.objectname];  
        }
      }
    }
    return tokens.join(' ');
  }

  function render_content(context, content, indent_level) {
    if (content.type === 'text') {
      return indent(content.content.trim() + '\n', indent_level);
    } else if (content.type === 'macro') {
      return indent(substitute_variables(context, content.content) + '\n', indent_level);
    } else if (content.type === 'element') {
      return render_element(context, content.content, indent_level);
    }
  }

  function render(doc, context) {
    var ret = "";
    for (var i=0; i < doc.content.length; ++i) {
      var e = doc.content[i],
        indent_level = 0;
      ret += render_content(context, e, indent_level); // TODO: Inefficient?
    }
    return ret;
  }

  return {
    render: render
  };
})();