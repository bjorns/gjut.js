module.exports = (function() {
  function modifyBody(element) {
    element.attributes.push({
      name: 'id',
      value: ["syntheticId"]
    });
  }

  function listItem(element, i) {
    element.content.push({
      type: 'text',
      content: '=== ' + i + " ==="
    });
  }

  return {
    title: "My Title",
    body: "Blah blah body.",
    modifyBody: modifyBody,
    listItem: listItem,
    array: ['foo', 'bar', 'baz']
  };
})();
