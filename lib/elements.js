module.exports = (function() {
  "use strict";


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

  return {
    html: render_element_shallow,
    render_attributes: render_attributes
  }
})();
