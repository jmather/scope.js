if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore', '../definitions/collection', '../transformations/collection'], function (_, definition, transformation) {
    /**
     *
     * @param {string} name
     * @param {{max: integer, min: integer, step: integer, default: integer}} config
     * @param {ValueManager} valueManager
     * @constructor
     */
    function CollectionType(name, config, valueManager) {
        this.config = config;
        this.name = name;
        this.lastId = this.name + '.lastId';
        this.size = this.name + '.size';
        this.valueManager = valueManager;
    }

    CollectionType.definition = definition;
    CollectionType.transformation = transformation;

    /**
     *
     * @returns {string}
     */
    CollectionType.prototype.getTemplate = function() {
        return this.config.template;
    };

    /**
     *
     * @param {*} container
     * @returns {{value: (string), id: {integer}}}
     */
    CollectionType.prototype.insert = function(container) {
        var lastId = this.valueManager.get(this.lastId);
        var size = this.valueManager.get(this.size);

        var collection = this.valueManager.getData(this.name);

        lastId.increment();
        size.increment();
        var record = { "value": this.name, "id": lastId.getValue() };
        collection[record.id] = container;
        this.valueManager.setData(this.name, collection);

        return record;
    };

    /**
     *
     * @param {{value: string, id: integer}} reference
     */
    CollectionType.prototype.removeByReference = function(reference) {
        if (reference.value !== this.name) {
            throw new Error("Passed reference is for collection " + reference.value + " not " + this.name);
        }

        this.removeById(reference.id);
    };

    /**
     *
     * @param {integer} id
     */
    CollectionType.prototype.removeById = function(id) {
        var size = this.valueManager.get(this.size);

        var collection = this.valueManager.getData(this.name);

        if (collection[id] === undefined) {
            throw new Error(id + ' does not exist in collection ' + this.name);
        }

        delete collection[id];

        this.valueManager.setData(this.name, collection);
        size.decrement();
    };

    /**
     *
     * @param {*} object
     */
    CollectionType.prototype.removeByValue = function(object) {
        var collection = this.valueManager.getData(this.name);

        var id = null;
        _.each(collection, function(value, index) {
            if (value === object) {
                id = index;
            }
        });

        if (id === null) {
            throw new Error("Could not find passed object in collection " + this.name);
        }

        this.removeById(id);
    };

    /**
     * @return {number}
     */
    CollectionType.prototype.getValue = function() {
        return this.valueManager.getData(this.name, this.config.default);
    };

    /**
     *
     * @param {string} value
     * @returns {*}
     */
    CollectionType.prototype.setValue = function(value) {
        return this.valueManager.setData(this.name, value);
    };

    return CollectionType;
});