module.exports = (function() {
  var Arrays = require('./arrays.js'),
    Elements = require('./elements.js'),
    Renderer = require('./renderer.js')

  function is_child_of_any(child, parents) {
    while(child) {
      for (var i = 0; i < parents.length; ++i) {
        var parent = parents[i];
        if (child === parent) {
          return true;
        }
      }
      child = child.parent;
    }
    return false;
  }

  function verify_has_parent_rule(rule, index) {

    var condition = rule.selector1.value;
    var expected = rule.selector0.value;

    if (index[condition]) {
      var children = index[condition];

      var parents = index[expected] ? index[expected] : [];


      for (var i = 0; i < children.length; ++i) {
        var child = children[i];

        if (!is_child_of_any(child, parents)) {
          return child;
        } else {
          // console.log("Success "+ JSON.stringify(parent, null, 2))
        }
      }
    } else {
      console.log("info: Checked child selector " + rule.selector1.value + " does not exist.");
    }
  }

  function is_parent_of_any(parent, children) {
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

  function verify_has_child_rule(rule, index) {
    var condition = rule.selector0.value;
    var expected = rule.selector1.value;

    if (index[condition]) {
      var parents = index[condition];
      var children = index[expected] ? index[expected] : [];


      for (var i = 0; i < parents.length; ++i) {
        var parent = parents[i];

        if (!is_parent_of_any(parent, children)) {
          return parent;
        } else {
          // console.log("Success "+ JSON.stringify(parent, null, 2))
        }
      }
    } else {
      console.log("info: Checked parent selector " + rule.selector0.value + " does not exist.");
    }
  }

  function verify_rule(rule, index) {
    if (rule.relation.subtype === 'has_child_relation') {
      return verify_has_child_rule(rule, index);
    } else if (rule.relation.subtype === 'has_parent_relation') {
      return verify_has_parent_rule(rule, index);
    } else {
      console.log("error: Unknown rule type " + rule.relation.subtype)
      return null;
    }

  }

  function verify_rules(rules, index) {
    var errors = [];
    for (var i = 0; i < rules.length; ++i) {
      rule = rules[i];
      var element = verify_rule(rule, index);
      if (element != null) {
        errors.push({
          type: 'error',
          message: "Failed to verify rule '" + rule +
                  "' element does not meet condition: " +
                  Renderer.render_element(element)
        });
      }
    }
    return errors;
  }


  return {
    verify_rules: verify_rules
  };
})();
