module.exports = {

  setUp: function (callback) {
    callback();
  },
  tearDown: function (callback) {
    callback();
  },
  testClone: function (test) {
    var Objects = require('../lib/objects.js');
      source = { foo: {'bar': 3}},
      dst = Objects.clone(source);

    source.foo['bar'] = 4;

    test.ok(source.foo['bar'] === 4);
    test.ok(dst.foo['bar'] === 3);
    test.done();
  },
  testUnion: function (test) {
    var Objects = require('../lib/objects.js'),
      x0 = { foo: 'foo'},
      x1 = { bar: 'bar'},
      y0 = Objects.union(x0,x1);


    x0.foo = 'changed';
    x1.bar = 'changed';

    test.deepEqual(y0, {foo:'foo',bar:'bar'});

    test.done();
  }

};
