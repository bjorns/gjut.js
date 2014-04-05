module.exports = (function() {
  function modifyBody(element) {
    element.attributes['id'] = ['syntheticId'];
  }

  function listItem(element, i) {
    element.content.push({
      type: 'text',
      content: '=== ' + i + " ==="
    });
  }

  function condition() {
    return true;
  }

  return {
    title: "My Title",
    body: "Blah blah body.",
    modifyBody: modifyBody,
    listItem: listItem,
    array: ['foo', 'bar', 'baz'],
    condition: condition
  };
})();
