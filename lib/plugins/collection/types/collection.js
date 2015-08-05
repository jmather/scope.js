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