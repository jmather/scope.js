describe('CounterType', function() {
    var DepBuilder = require.main.require('test-data/bootstrap/builder');
    var plugins = DepBuilder.loadPlugins(['counter']);
    var data;

    beforeEach(function() {
        data = DepBuilder.byFileName(__filename, plugins);
    });

    it('Instantiates correctly', function() {
        var counter = data.valueManager.get('incrementCounter');
    });

    describe('increment', function() {
        var counter;

        beforeEach(function() {
            counter = data.valueManager.get('incrementCounter');
        });

        afterEach(function() {
            counter = null;
        });

        it('allows incrmenting when it should', function() {
            for (var i = 0; i < 10; i++) {
                counter.increment();
            }
        });

        it('throws an exception on invalid increment', function() {
            (function() {
                counter.increment(400);
            }).should.throw();
        });

        it('stores the increments correctly', function() {
            counter.getValue().should.equal(0);
            counter.increment(1);
            counter.getValue().should.equal(1);
        });
    });

    describe('decrement', function() {
        var counter;

        beforeEach(function() {
            counter = data.valueManager.get('decrementCounter');
        });

        afterEach(function() {
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
