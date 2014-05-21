module.exports = (function() {
  "use strict";
  var Arrays = require('./arrays.js'),
    Objects = require('./objects.js')


  function split_variable(variable) {
    var parts = variable.split('.'),
      first = Arrays.subarray(parts, 0, parts.length).join('.').trim(),
      last = parts[parts.length - 1].trim();
    return {
      type: ( first === '' ? 'local_variable' : 'module_variable'),
      module: first,
      object: last
    };

  }

  function make_variable(str) {
    return split_variable(str);
  }

  function shallow_copy_array(attributes) {
    var ret = [];
    for (var i = 0; i < attributes.length; ++i) {
      ret.push(attributes[i]);
    }
    return ret;
  }

  function count_instances(str, ch) {
    return (str.length - str.replace(new RegExp(ch, "g"), '').length) / ch.length;
  }

  function count_linebreaks(str) {
    return count_instances(str, '\n')
  }

  function make_array(str) {
    return str.split(' ').filter(function(x) {
      return x.length > 0
    });
  }

  function merge_attributes(attrmap, attr) {
    if (!attrmap.hasOwnProperty(attr.name)) {
      attrmap[attr.name] = [];
    }
    attrmap[attr.name] = attrmap[attr.name].concat(attr.value);
    return attrmap;
  }

  function setup_parent_links(element) {
    for (var i = 0; i < element.content.length; ++i) {
      var child = element.content[i];
      if (child.type == 'element') {
        child.parent_id = element.id;
      }
    }
  }

  return {
    make_variable: make_variable,
    count_linebreaks: count_linebreaks,
    make_array: make_array,
    merge_attributes: merge_attributes,
    setup_parent_links: setup_parent_links
  };

})();
