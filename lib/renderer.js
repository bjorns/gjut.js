module.exports = (function() {
  "use strict";
  var INDENT = '  ',
    parser_util = require('./parser_util.js'),
    Elements = require('./elements.js');

  function indent(str, indent_level) {
    var ret = "";
    for (var i=0; i < indent_level; ++i) {
      ret += INDENT;
    }
    return ret + str;
  }

  function render_element(element, indent_level) {
    var ret = indent("<" + element.name + Elements.render_attributes(element) + ">\n", indent_level);
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

  function render(doc) {
    return render_document(doc, 0);
  }

  return {
    render: render
  };
})();
