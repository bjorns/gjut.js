module.exports = (function() {
  "use strict";
  var util = require('./util.js');

  function split_variable(variable) {
    var parts = variable.split('.'),
      first = util.subarray(parts, 0, parts.length).join('.').trim(),
      last = parts[parts.length-1].trim();
    return {
      modulename: first,
      objectname: last
    };
  }

  function make_variable(str) {
    var ref = split_variable(str);

    return {
      module: ref.modulename,
      object: ref.objectname
    };
  }

  function shallow_copy_array(attributes) {
    var ret = [];
    for (var i = 0; i < attributes.length; ++i) {
      ret.push(attributes[i]);
    }
    return ret;
  }

  /**
   * Warning: this code is not secure and is highly preliminary.
   */
  function copy_element(element) {
    return {
      type: 'element',
      name: element.name,
      attributes: shallow_copy_array(element.attributes),
      content: shallow_copy_array(element.content),
    };
  }

  function count_instances(str, ch) {
    return (str.length - str.replace(new RegExp(ch, "g"), '').length) / ch.length;
  }

  function count_linebreaks(str) {
    return count_instances(str, '\n')
  }

  function make_array(str) {
    return str.split(' ').filter(function(x) { return x.length > 0 });
  }

  return {
    make_variable: make_variable,
    count_linebreaks: count_linebreaks,
    copy_element: copy_element,
    make_array: make_array
  };

})();
