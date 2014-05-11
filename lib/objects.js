module.exports = (function() {
  "use strict";

  function merge(destination, source) {
    for (var property in source) {
      var member = source[property];
      if (typeof member === "object" && member !== null) {
        if (property !== 'parent') {
          destination[property] = clone(member);
        }
      } else {
        destination[property] = source[property];
      }
    }
    return destination;
  }

  function merge_arrays(destination, source) {
    for (var index in source) {
      var member = source[index];
      if (member instanceof Array) {
        destination.push(member.slice(0));
      } else if (typeof member === "object" && member !== null) {
        destination.push(merge({}, member));
      } else {
        destination.push(member);
      }
    }
    return destination;
  }

  function clone(object) {
    if (object instanceof Array) {
      return merge_arrays([], object);
    } else {
      return merge({}, object);
    }
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
