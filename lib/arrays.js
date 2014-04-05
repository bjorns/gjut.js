module.exports = (function() {
  "use strict";

  function subarray(array, start, end) {
    return array.filter( function( _, i ) {
      return ( i >= start && i < (end-1) );
    });
  }

  function remove_item(array, item) {
    var copy = []
    for(var i = 0; i < array.length; ++i) {
      if (array[i] != item) {
        copy.push(array[i]);
      }
    }
    return copy;
  }


  return {
    subarray: subarray,
    remove: remove_item
  };
})();
