module.exports = (function() {
  "use strict";

  function clone(node) {
    var destination = {};
    for (var property in node) {
      if (typeof node[property] === "object" && node[property] !== null && destination[property]) {
        clone(destination[property], node[property]);
      } else {
        destination[property] = node[property];
      }
    }
    return destination;
  }

  return {
    clone: clone
  };
})();
