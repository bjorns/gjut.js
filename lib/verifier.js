module.exports = (function() {
  var Arrays = require('./arrays.js'),
    Elements = require('./elements.js')

  function is_parent_of(parent, children) {
    // console.log("Checking children of " + parent.name + " against " + children);
    for (var i = 0; i < children.length; ++i) {

      var child = children[i];
      while(child.type != 'document') {
        if (child === parent) {
          return true;
        }
        child = child.parent
      }
    }
    return false;
  }

  function verify_condition(index, condition, expected) {
    // console.log("Condition: " + condition);
    // console.log("Expected: " + expected);

    if (index[condition]) {
      var parents = index[condition];
      var children = index[expected] ? index[expected] : [];
      for (var i = 0; i < parents.length; ++i) {
        var parent = parents[i];

        if (!is_parent_of(parent, children)) {
          return parent;
        } else {
          // console.log("Success "+ JSON.stringify(parent, null, 2))
        }
      }
    } else {
      // TODO: should be warning.
      console.log("Condition " + "does not exits.");
    }

  }

  function verify_rule(index, rule) {
    // console.log("Checking " + JSON.stringify(rule, null, 2))

    for (var i = 0; i < rule.checks.length-1; ++i) {
      var condition = rule.checks[i],
        expected = rule.checks[i+1],
        misbehaved = verify_condition(index, condition, expected);
        if (misbehaved) {
          return misbehaved;
        }
    }
    return null;
  }

  function verify_rules(rules, index) {
    var errors = [];
    for (var i = 0; i < rules.length; ++i) {
      rule = rules[i];

      var element = verify_rule(index, rule);
      if (element != null) {
        errors.push({
          type: 'error',
          message: "Failed to verify rule '" + rule.checks.join(' ') +
                  "' element does not meet condition: " +
                  Elements.html(element)
                });
      }
    }
    return errors;
  }


  return {
    verify_rules: verify_rules
  };
})();
