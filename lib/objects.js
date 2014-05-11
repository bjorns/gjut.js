module.exports = (function() {
  "use strict";

  function merge(destination, source) {
    for (var property in source) {
      if (typeof source[property] === "object" &&
          source[property] !== null) {
        destination[property] = clone(source[property]);
      } else {
        destination[property] = source[property];
      }
    }
    return destination;
  }

  function clone(object) {
    return merge({}, object);
  }

  function union(object0, object1) {
    var destination = clone(object0);
    return merge(destination, object1);
  }

  return {
    clone: clone,
    union: union
  };
})();
