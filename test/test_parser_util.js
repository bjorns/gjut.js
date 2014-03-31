module.exports = {

    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    testMakeVariable: function (test) {
        var util = require('../lib/parser_util.js'),
          variable = util.make_variable("module.submodule.variable");

        test.equal('module.submodule', variable.module);
        test.done();
    }
};