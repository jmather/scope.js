'use strict';

var describe = require('node:test').describe;
var it = require('node:test').it;
var beforeEach = require('node:test').beforeEach;
var assert = require('node:assert/strict');
var DepBuilder = require('../../../../lib/build/fixture-builder');
var plugins = DepBuilder.loadPlugins(['counter']);
var data;

beforeEach(function() {
    data = DepBuilder.byFileName(__filename, plugins);
});

describe('Scope.js', function () {
    describe('CounterType', function () {
        it('instantiates correctly', function () {
            assert.ok(data.valueManager.get('incrementCounter'));
        });

        describe('increment', function () {
            it('allows valid increments', function () {
                var counter = data.valueManager.get('incrementCounter');
                for (var index = 0; index < 10; index += 1) {
                    counter.increment();
                }
            });

            it('throws on an invalid increment', function () {
                var counter = data.valueManager.get('incrementCounter');
                assert.throws(function () {
                    counter.increment(400);
                });
            });

            it('stores increments', function () {
                var counter = data.valueManager.get('incrementCounter');
                assert.equal(counter.getValue(), 0);
                counter.increment(1);
                assert.equal(counter.getValue(), 1);
            });
        });

        describe('decrement', function () {
            it('allows valid decrements', function () {
                var counter = data.valueManager.get('decrementCounter');
                for (var index = 0; index < 10; index += 1) {
                    counter.decrement();
                }
            });

            it('throws on an invalid decrement', function () {
                var counter = data.valueManager.get('decrementCounter');
                assert.throws(function () {
                    counter.decrement(11);
                });
            });

            it('stores decrements', function () {
                var counter = data.valueManager.get('decrementCounter');
                assert.equal(counter.getValue(), 10);
                counter.decrement(1);
                assert.equal(counter.getValue(), 9);
            });
        });
    });
});
