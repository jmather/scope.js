describe('CounterType', function() {
    var DataManager = require.main.require('vm/data-manager');
    var ValueManager = require.main.require('vm/value-manager');
    var CounterType = require.main.require('plugins/counter/type');

    it('Instantiates correctly', function() {
        var valManager = new ValueManager();
        var counter = new CounterType('test', {max: null, min: 0}, valManager);
    });

    describe('increment', function() {
        var dataManager, valManager, counter;

        beforeEach(function() {
            dataManager = new DataManager();
            valManager = new ValueManager(dataManager);
            counter = new CounterType('test', {max: 10, min: 0, step: 1, default: 0}, valManager);
        });

        afterEach(function() {
            valManager = null;
            counter = null;
        });

        it('allows incrmenting when it should', function() {
            for (var i = 0; i < 10; i++) {
                counter.increment();
            }
        });

        it('throws an exception on invalid increment', function() {
            (function() {
                counter.increment(11);
            }).should.throw();
        });

        it('stores the increments correctly', function() {
            counter.getValue().should.equal(0);
            counter.increment(1);
            counter.getValue().should.equal(1);
        });
    });

    describe('decrement', function() {
        var dataManager, valManager, counter;

        beforeEach(function() {
            dataManager = new DataManager();
            valManager = new ValueManager(dataManager);
            counter = new CounterType('test', {max: 10, min: 0, step: 1, default: 10}, valManager);
        });

        afterEach(function() {
            valManager = null;
            counter = null;
        });

        it('allows decrementing when it should', function() {
            for (var i = 0; i < 10; i++) {
                counter.decrement();
            }
        });

        it('throws an exception on invalid decrement', function() {
            (function() {
                counter.decrement(11);
            }).should.throw();
        });

        it('stores the decrements correctly', function() {
            counter.getValue().should.equal(10);
            counter.decrement(1);
            counter.getValue().should.equal(9);
        });
    });
});
