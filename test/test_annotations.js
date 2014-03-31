module.exports = {

  setUp: function (callback) {
    callback();
  },
  tearDown: function (callback) {
    callback();
  },
  testFunctionCalled: function (test) {
    annotations = require('../lib/annotations.js');
    imports = require('../lib/imports.js');

    var element = {
        content: [],
        annotation: {
          type: 'funcall',
          module: 'module',
          object: 'function'
        }
      },
      context = imports.make_context();
    
    context['module'] = {
      'function': function(node) {
        element.callbackSuccessful = true;
      }
    };
    
    
    annotations.execute_annotations(element, context);
    test.ok(element.callbackSuccessful);
    test.done();
  }
};