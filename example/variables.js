module.exports = (function() {
  return {
    title: "My Title",
    body: "Blah blah body.",
    modifyBody: function(element) {
      console.log(element);
      element.attributes.push({
        name: 'id',
        value: ["syntheticId"]
      });
    }
  };
})();
