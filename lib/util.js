module.exports = (function() {
  "use strict";

  function subarray(array, start, end) {
    return array.filter( function( _, i ) {
      return ( i >= start && i < (end-1) );
    });
  }

  return {
    subarray: subarray
  };
})();
