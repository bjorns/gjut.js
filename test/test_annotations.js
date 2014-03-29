module.exports = {

    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    testFunctionCalled: function (test) {
        annotations = require('../lib/annotations.js');

        
        var element = {
                content: [],
                annotation: 'module.function'
            },
            context = {
                'module': {
                    'function': function(node) {
                        element.callbackSuccessful = true;
                    }
                }
            };

        annotations.execute_annotations(element, context);
        test.ok(element.callbackSuccessful);
        test.done();
    }
};