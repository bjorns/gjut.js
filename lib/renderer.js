module.exports = (function() {
  "use strict";
  var INDENT = "  ",
    parser_util = require('./parser_util.js');

  function indent(str, indent_level) {
    var ret = "";
    for (var i=0; i < indent_level; ++i) {
      ret += INDENT;
    }
    return ret + str;
  }

  function render_attribute(name, value) {
    var ret = name;
    if (value.length > 0) {
      ret += "=\"" + value.join(" ") + "\"";
    }
    return ret;
  }

  function render_attributes(element) {
    var rendered_attrs = [];
    Object.keys(element.attributes).forEach(function(key) {
      var val = element.attributes[key];
      rendered_attrs.push(render_attribute(key, val));
    });
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
            ref = parser_util.make_variable(varname);
        if (!context[ref.module][ref.object]) {
          console.log("error: Variable " + t + " does not seem to be defined.");
        } else {
          tokens[i] = context[ref.module][ref.object];
        }
      }
    }
    return tokens.join(' ');
  }

  function render_content(context, content, indent_level) {
    if (content.type === 'document') {
      return render_document(context, content, indent_level);
    } else if (content.type === 'text') {
      if (content.content.trim() !== '') {
        return indent(content.content.trim()  + '\n', indent_level);
      } else {
        return ''; // Hashtag #fulhack.
      }
    } else if (content.type === 'macro') {
      return indent(substitute_variables(context, content.content) + '\n', indent_level);
    } else if (content.type === 'element') {
      return render_element(context, content, indent_level);
    } else {
      console.log("warning: Found unknown content type " + content.type)
    }
  }

  function render_document(context, doc, indent_level) {
    var ret = "";
    for (var i=0; i < doc.content.length; ++i) {
      var e = doc.content[i];
      ret += render_content(context, e, indent_level);
    }
    return ret;
  }

  function render(doc, context) {
    return render_document(context, doc, 0);
  }

  return {
    render: render
  };
})();
