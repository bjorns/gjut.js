module.exports = (function() {

  function index_value(index, key, value) {
    if (!index[key]) {
      index[key] = [];
    }
    index[key].push(value);
  }

  function index_array(index, node, array, prefix) {
    for (var i = 0; i < array.length; ++i) {
      index_value(index, prefix + array[i], node);
    }
  }

  function index_element(index, node) {
    index_value(index, node.name, node);
    if (node.attributes['class']) {
      index_array(index, node, node.attributes['class'], '.');
    }
    if (node.attributes['id']) {
      index_array(index, node, node.attributes['id'], '#');
    }
    index['@' + node.id] = node;
  }

  function index_tree(index, node) {
    if (node.type === 'element') {
      index_element(index, node);
    }

    for (var i = 0; i < node.content.length; ++i) {
      var subnode = node.content[i];
      if (subnode.type === 'element') {
        index_tree(index, subnode);
      }
    }
    return index;
  }


  return {
    index_tree: index_tree
  };
})();
