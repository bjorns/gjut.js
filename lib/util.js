module.exports = (function() {
  "use strict";

  function subarray(array, start, end) {
    return array.filter( function( _, i ) {
      return ( i >= start && i < (end-1) );
    });
  }

  function split_annotation(annotation) {
    var parts = annotation.split('.'),
      first = subarray(parts, 0, parts.length).join('.').trim(),
      last = parts[parts.length-1].trim();
    return {
      modulename: first,
      objectname: last
    };
  }

  return {
    split_annotation: split_annotation
  };
})();
