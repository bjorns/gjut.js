module.exports = (function() {
  "use strict";
  var INDENT = '  ';

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

  function render_element_shallow(element) {
    var ret = "<" + element.name + render_attributes(element) + ">";
    ret += "</" + element.name + ">";
    return ret;
  }

  function render_element(element, indent_level) {
    var ret = indent("<" + element.name + render_attributes(element) + ">\n", indent_level);
    for (var i=0; i < element.content.length; ++i) {
      ret += render_content(element.content[i], indent_level + 1);
    }
    ret += indent("</" + element.name + ">\n", indent_level);
    return ret;
  }

  function render_content(content, indent_level) {
    if (content.type === 'document') {
      return render_document(content, indent_level);
    } else if (content.type === 'text') {
      if (content.content.trim() !== '') {
        return indent(content.content.trim()  + '\n', indent_level);
      } else {
        return ''; // Hashtag #fulhack.
      }
    } else if (content.type === 'element') {
      return render_element(content, indent_level);
    } else {
      console.log("warning: Found unknown content type " + content.type)
    }
  }

  function render_document(doc, indent_level) {
    var ret = "";
    for (var i=0; i < doc.content.length; ++i) {
      var e = doc.content[i];
      ret += render_content(e, indent_level);
    }
    return ret;
  }

  function render_html(doc) {
    return render_document(doc, 0);
  }

  function make_dag(node) {

  }

  function render_json(doc) {
    doc = make_dag(doc);
    return JSON.stringify(doc, null, 2)
  }

  return {
    render: render_html,
    render_json: render_json,
    render_element: render_element_shallow
  };
})();
