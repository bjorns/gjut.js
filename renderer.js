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

  function render_element(element, indent_level) {
    var ret = indent("<" + element.name + render_attributes(element) + ">\n", indent_level);
    for (var i=0; i < element.content.length; ++i) {
      ret += render_content(element.content[i], indent_level + 1);
    }
    ret += indent("</" + element.name + ">\n", indent_level);
    return ret;
  }

  function render_content(content, indent_level) {
    if (content.type === 'text') {
      return indent(content.content + '\n', indent_level);
    } else if (content.type === 'element') {
      return render_element(content.content, indent_level);
    }
  }

  function render(doc) {
    var ret = "";
    for (var i=0; i < doc.content.length; ++i) {
      var e = doc.content[i];
      ret += render_content(e, 0); // TODO: Inefficient?
    }
    return ret;
  }

  return {
    render: render
  };
})();