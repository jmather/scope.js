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

    describe('GridType', function () {
        it('instantiates correctly', function () {
            assert.ok(data.valueManager.get('smallGrid'));
        });

        describe('cell ids', function () {
            it('reports the expected small-grid ids', function () {
                var cells = data.valueManager.get('smallGrid').getAllCellIds();
                assert.deepEqual(cells, ['1-1', '1-2', '1-3', '2-1', '2-2', '2-3', '3-1', '3-2', '3-3']);
            });

            it('reports 100 cells for the large grid', function () {
                assert.equal(data.valueManager.get('largeGrid').getAllCellIds().length, 100);
            });
        });

        describe('availability', function () {
            it('tracks available and occupied cells', function () {
                var grid = data.valueManager.get('smallGrid');
                assert.equal(grid.getAvailableCellIds().length, 9);
                assert.equal(grid.getOccupiedCellIds().length, 0);
                grid.setCell(1, 1, 'hello');
                assert.equal(grid.getAvailableCellIds().length, 8);
                assert.equal(grid.getOccupiedCellIds().length, 1);
            });
        });

        describe('getCell/setCell', function () {
            it('returns null when unset and prior values when overwritten', function () {
                var grid = data.valueManager.get('smallGrid');
                var payload = {test: 'payload'};
                assert.equal(grid.getCell(1, 1), null);
                assert.equal(grid.setCell(1, 1, payload), null);
                assert.deepEqual(grid.getCell(1, 1), payload);
                assert.deepEqual(grid.setCell(1, 1, true), payload);
            });
        });
    });
});