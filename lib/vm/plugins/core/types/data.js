var _ = require('underscore');

/**
 *
 * @param {string} name
 * @param {{max: number, min: number, step: number, default: number}} config
 * @param {ValueManager} valueManager
 * @exports DataType
 * @constructor
 */
function DataType(name, config, valueManager) {
    this.config = config;
    this.name = name;
    this.valueManager = valueManager;
}

DataType.definition = require('../definitions/data');
DataType.transformation = require('../transformations/data');

/**
 * @return {number}
 */
DataType.prototype.getValue = function() {
    return this.valueManager.getData(this.name, this.config.default);
};

/**
 *
 * @param {string} value
 * @returns {*}
 */
DataType.prototype.setValue = function(value) {
    return this.valueManager.setData(this.name, value);
};

/**
 *
 * @returns {*}
 */
DataType.prototype.clearValue = function() {
    return this.valueManager.clearData(this.name);
};

module.exports = DataType;