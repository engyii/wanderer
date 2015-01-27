'use strict';

describe('wanderer', function () {

    var myinstance = new window.wanderer();

    it('should have someProperty', function () {
        assert.equal(myinstance.someProperty, 'value');
    });

    it('should run someMethod', function () {
        assert.equal(myinstance.someMethod('hello '), 'hello value');
    });

});

