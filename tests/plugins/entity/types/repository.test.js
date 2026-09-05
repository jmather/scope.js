'use strict';

var describe = require('node:test').describe;
var it = require('node:test').it;
var beforeEach = require('node:test').beforeEach;
var assert = require('node:assert/strict');
var DepBuilder = require('../../../../lib/build/fixture-builder');
var plugins = DepBuilder.loadPlugins(['entity', 'counter']);
var data;

describe('Scope.js', function () {
    beforeEach(function () {
        data = DepBuilder.byFileName(__filename, plugins);
    });

    describe('RepositoryType', function () {
        describe('constructor', function () {
            it('instantiates correctly', function () {
                assert.ok(data.valueManager.get('entity.thing'));
            });

            it('sets initial size to zero', function () {
                assert.equal(data.valueManager.get('entity.thing.size').getValue(), 0);
            });

            it('sets last id to zero', function () {
                assert.equal(data.valueManager.get('entity.thing.lastId').getValue(), 0);
            });
        });

        describe('insert', function () {
            it('returns a reference and updates counters', function () {
                var repository = data.valueManager.get('entity.thing');
                var ref = repository.insert({a: 'b'});

                assert.deepEqual(ref, {value: 'entity.thing', id: 1});
                assert.equal(data.valueManager.get('entity.thing.size').getValue(), 1);
                assert.equal(data.valueManager.get('entity.thing.lastId').getValue(), 1);
            });
        });

        describe('removeByReference', function () {
            it('removes the entity, decrements size, and retains lastId', function () {
                var repository = data.valueManager.get('entity.thing');
                var ref = repository.insert({a: 'b'});
                repository.removeByReference(ref);

                assert.equal(repository.getValue()[ref.id], undefined);
                assert.equal(data.valueManager.get('entity.thing.size').getValue(), 0);
                assert.equal(data.valueManager.get('entity.thing.lastId').getValue(), 1);
            });
        });

        describe('removeByEntity', function () {
            it('removes the entity, decrements size, and retains lastId', function () {
                var repository = data.valueManager.get('entity.thing');
                var entity = {a: 'b'};
                var ref = repository.insert(entity);
                repository.removeByEntity(entity);

                assert.equal(repository.getValue()[ref.id], undefined);
                assert.equal(data.valueManager.get('entity.thing.size').getValue(), 0);
                assert.equal(data.valueManager.get('entity.thing.lastId').getValue(), 1);
            });
        });
    });
});