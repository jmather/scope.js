var _ = require('underscore');

/**
 *
 * @param {string} name
 * @param {{max: integer, min: integer, step: integer, default: integer}} config
 * @param {ValueManager} valueManager
 * @exports EntityRepositoryType
 * @constructor
 */
function RepositoryType(name, config, valueManager) {
    this.config = config;
    this.name = name;
    this.lastId = this.name + '.lastId';
    this.size = this.name + '.size';
    this.valueManager = valueManager;
}

RepositoryType.definition = require('../definitions/repository');
RepositoryType.transformation = require('../transformations/repository');

/**
 *
 * @returns {string}
 */
RepositoryType.prototype.getEntityName = function() {
    return this.config.entity;
};

/**
 *
 * @param {*} entity
 * @returns {{value: (string), id: {integer}}}
 */
RepositoryType.prototype.insert = function(entity) {
    var lastId = this.valueManager.get(this.lastId);
    var size = this.valueManager.get(this.size);

    var repository = this.getValue();

    lastId.increment();
    size.increment();
    var record = { "value": this.name, "id": lastId.getValue() };
    repository[record.id] = entity;
    this.setValue(repository);

    return record;
};

/**
 *
 * @param {{value: string, id: integer}} reference
 */
RepositoryType.prototype.removeByReference = function(reference) {
    if (reference.value !== this.name) {
        throw new Error("Passed reference is for repository " + reference.value + " not " + this.name);
    }

    this.removeById(reference.id);
};

/**
 *
 * @param {integer} id
 */
RepositoryType.prototype.removeById = function(id) {
    var size = this.valueManager.get(this.size);

    var repository = this.getValue();

    if (repository[id] === undefined) {
        throw new Error(id + ' does not exist in repository ' + this.name);
    }

    delete repository[id];

    this.setValue(repository);
    size.decrement();
};

/**
 *
 * @param {*} entity
 */
RepositoryType.prototype.removeByEntity = function(entity) {
    var repository = this.getValue();

    var id = null;
    _.each(repository, function(value, index) {
        if (value === object) {
            id = entity;
        }
    });

    if (id === null) {
        throw new Error("Could not find passed entity in repository " + this.name);
    }

    this.removeById(id);
};

/**
 * @return {*}
 */
RepositoryType.prototype.getValue = function() {
    return this.valueManager.getData(this.name, this.config.default);
};

/**
 *
 * @param {string} value
 * @returns {*}
 */
RepositoryType.prototype.setValue = function(value) {
    return this.valueManager.setData(this.name, value);
};

module.exports = RepositoryType;
