module.exports = (function() {
  var index = {};

  function index_value(key, value) {
    if (!index[key]) {
      index[key] = [];
    }
    index[key].push(value);
  }

  function index_array(node, array, prefix) {
    for (var i = 0; i < array.length; ++i) {
      index_value(prefix + array[i], node);
    }
  }

  function index_element(node) {
    index_value(node.name, node);
    if (node.attributes['class']) {
      index_array(node, node.attributes['class'], '.');
    }
    if (node.attributes['id']) {
      index_array(node, node.attributes['id'], '#');
    }
  }

  function index_tree(node) {
    if (node.type === 'element') {
      index_element(node);
    }

    for (var i = 0; i < node.content.length; ++i) {
      var subnode = node.content[i];
      if (subnode.type === 'element') {
        index_tree(subnode);
      }
    }

  }

  function get_index() {
    return index;
  }

  return {
    index_tree: index_tree,
    get_index: get_index
  };
})();
