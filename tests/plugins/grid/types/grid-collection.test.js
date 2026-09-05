'use strict';

var describe = require('node:test').describe;
var it = require('node:test').it;
var beforeEach = require('node:test').beforeEach;
var assert = require('node:assert/strict');
var DepBuilder = require('../../../../lib/build/fixture-builder');
var plugins = DepBuilder.loadPlugins(['grid']);
var data;

describe('Scope.js', function () {
    beforeEach(function () {
        data = DepBuilder.byFileName(__filename, plugins);
    });

    describe('GridCollectionType', function () {
        it('instantiates correctly', function () {
            assert.ok(data.valueManager.get('collection'));
        });

        it('reports all collection cells', function () {
            assert.deepEqual(
                data.valueManager.get('collection').getAllCellIds(),
                ['1-1', '1-2', '1-3', '2-1', '2-2', '2-3', '3-1', '3-2', '3-3']
            );
        });

        it('combines availability across included grids', function () {
            var collection = data.valueManager.get('collection');
            var grid1 = data.valueManager.get('grid1');
            var grid2 = data.valueManager.get('grid2');

            assert.equal(collection.getAvailableCellIds().length, 9);
            grid1.setCell(1, 1, 'hello');
            assert.equal(collection.getAvailableCellIds().length, 8);
            grid2.setCell(1, 2, 'hello');
            assert.equal(collection.getAvailableCellIds().length, 7);
            assert.equal(collection.getOccupiedCellIds().length, 2);
        });

        it('merges values and lets later grids win', function () {
            var collection = data.valueManager.get('collection');
            var grid1 = data.valueManager.get('grid1');
            var grid2 = data.valueManager.get('grid2');

            assert.deepEqual(collection.getValue(), {});
            grid1.setCell(1, 1, 'hello');
            assert.deepEqual(collection.getValue(), {'1-1': 'hello'});
            grid2.setCell(1, 1, 'goodbye');
            assert.deepEqual(collection.getValue(), {'1-1': 'goodbye'});
        });
    });
});