module.exports = (function() {
  "use strict";
  var INDENT = "  ";

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
      ret += "\"" + attribute.value.join(" ") + "\"";
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

  function subarray(array, start, end) {
    return array.filter( function( _, i ) {
      return ( i >= start && i < (end-1) );
    });
  }

  function substitute_variables(context, text) {
    var tokens = text.split(' ');
    for (var i = 0; i < tokens.length; ++i) {
      var t = tokens[i];
      if (t[0] === '@') {
        var varname = t.substring(1,t.length),
            parts = varname.split('.'),
            first = subarray(parts, 0, parts.length).join('.'),
            last = parts[parts.length-1];
        console.log("=== " + first)
        console.log("--> " + last)
        if (!context[first][last.trim()]) {
          console.log("error: Variable " + t + " does not seem to be defined.");
        } else {
          tokens[i] = context[first][last.trim()];  
        }
      }
    }
    return tokens.join(' ');
  }

  function render_content(context, content, indent_level) {
    if (content.type === 'text') {
      return indent(substitute_variables(context, content.content) + '\n', indent_level);
    } else if (content.type === 'element') {
      return render_element(context, content.content, indent_level);
    }
  }

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

  function render(doc) {
    var ret = "",
        context = load_imports(doc);

    console.log(context);
    for (var i=0; i < doc.content.length; ++i) {
      var e = doc.content[i];
      ret += render_content(context, e, 0); // TODO: Inefficient?
    }
    return ret;
  }

  return {
    render: render
  };
})();