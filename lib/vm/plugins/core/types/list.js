var _ = require('underscore');

/**
 *
 * @param {string} name
 * @param {{max: number, min: number, step: number, default: number}} config
 * @param {ValueManager} valueManager
 * @exports ListType
 * @constructor
 */
function ListType(name, config, valueManager) {
    this.config = config;
    this.name = name;
    this.valueManager = valueManager;
}

ListType.definition = require('../definitions/list');
ListType.transformation = require('../transformations/list');

/**
/**
 *
 * @param {*} value
 * @returns {number}
 */
ListType.prototype.push = function(value) {
    var list = this.getValue();

    list.push(value);

    this.setValue(list);

    return list.length;
};

/**
 *
 * @param {number} index
 * @return {number}
 */
ListType.prototype.removeByIndex = function(index) {
    var list = this.getValue();

    if (list[index] === undefined) {
        throw new Error(index + ' does not exist in list ' + this.name);
    }

    list = list.splice(index, 1);

    this.setValue(list);

    return list.length;
};

/**
 *
 * @param {*} value
 * @return {number}
 */
ListType.prototype.removeByValue = function(value) {
    var list = this.getValue();

    var id = null;

     _.each(list, function(val, index) {
        if (val === value) {
            id = index;
        }
     });

    if (id === null) {
        throw new Error("Could not find passed value in list " + this.name);
    }

    this.removeById(id);
};

/**
 * @return {number}
 */
ListType.prototype.getValue = function() {
    return this.valueManager.getData(this.name, this.config.default);
};

/**
 *
 * @param {string} value
 * @returns {*}
 */
ListType.prototype.setValue = function(value) {
    return this.valueManager.setData(this.name, value);
};

/**
 *
 * @returns {*}
 */
ListType.prototype.clearValue = function() {
    return this.valueManager.clearData(this.name);
};

module.exports = ListType;