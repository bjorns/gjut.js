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

  function count_instances(str, ch) { 
    return (str.length - str.replace(new RegExp(ch, "g"), '').length) / ch.length;
  }

  function count_linebreaks(str) {
    return count_instances(str, '\n')
  }

  return {
    make_variable: make_variable,
    count_linebreaks: count_linebreaks
  };
  
})();