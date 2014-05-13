module.exports = (function() {
  var Arrays = require('./arrays.js'),
    Renderer = require('./renderer.js');

  function get_parent(element, index) {
    return index['@' + element.parent_id];
  }

  function make_error(element, rule) {
    return {
      type: 'verification_error',
      element: element,
      rule: rule,
      message: "Failed to verify rule '" + Renderer.render_rule(rule) +
        "' element does not meet condition " +
        (element ? Renderer.render_element(element) : "")
    };
  }

  function is_child_of_any(element, parents, index) {
    while (element) {
      for (var i = 0; i < parents.length; ++i) {
        var parent = parents[i];
        if (element === parent) {
          return true;
        }
      }
      element = get_parent(element, index);
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

        if (!is_child_of_any(child, parents, index)) {
          return make_error(child, rule);
        } else {
          // console.log("Success "+ JSON.stringify(parent, null, 2))
        }
      }
    } else {
      console.log("info: Checked child selector " + rule.selector1.value + " does not exist.");
    }
  }

  function is_parent_of_any(element, children, index) {
    for (var i = 0; i < children.length; ++i) {
      var child = children[i];
      while (child) {
        if (child === element) {
          return true;
        }
        child = get_parent(child, index);
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

        if (!is_parent_of_any(parent, children, index)) {
          return make_error(parent, rule);
        } else {
          // console.log("Success "+ JSON.stringify(parent, null, 2))
        }
      }
    } else {
      console.log("info: Checked parent selector " + rule.selector0.value + " does not exist.");
    }
  }

  function verify_exists(rule, index) {
    if (!index[rule.selector.value]) {
      return make_error(null, rule);
    }
  }

  function verify_rule(rule, index) {
    if (rule.type === 'unary_rule') {
      if (rule.predicate === 'exist') {
        return verify_exists(rule, index);
      } else {
        console.log("error: Unknown predicate " + rule.predicate);
        return null;
      }
    } else if (rule.type === 'binary_rule') {
      if (rule.relation.subtype === 'has_child_relation') {
        return verify_has_child_rule(rule, index);
      } else if (rule.relation.subtype === 'has_parent_relation') {
        return verify_has_parent_rule(rule, index);
      } else {
        console.log("error: Unknown rule type " + rule.relation.subtype)
        return null;
      }
    } else {
      console.log("error: Unknown rule type " + rule.type);
    }

  }

  function verify_rules(rules, index) {
    var errors = [];
    for (var i = 0; i < rules.length; ++i) {
      rule = rules[i];
      var error = verify_rule(rule, index);
      if (error != null) {
        errors.push(error);
      }
    }
    return errors;
  }


  return {
    verify_rules: verify_rules
  };
})();
