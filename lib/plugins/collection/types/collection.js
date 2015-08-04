if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore', '../definitions/collection', '../transformations/collection'], function (_, definition, transformation) {
    /**
     *
     * @param {string} name
     * @param {{max: integer, min: integer, step: integer, default: integer}} config
     * @param {ValueManager} valueManager
     * @constructor
     */
    function CollctionType(name, config, valueManager) {
        this.config = config;
        this.name = name;
        this.valueManager = valueManager;
    }


    CollctionType.definition = definition;
    CollctionType.transformation = transformation;

    /**
     * @return {number}
     */
    CollctionType.prototype.getValue = function() {
        return this.valueManager.getData(this.name, this.config.default);
    };

    /**
     *
     * @param {string} value
     * @returns {*}
     */
    CollctionType.prototype.setValue = function(value) {
        return this.valueManager.setData(this.name, value);
    };

    return CollctionType;
});