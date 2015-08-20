var _ = require('underscore');

/**
 *
 * @param {string} name
 * @param {{rows: number, cols: number, default: {}, includes: Array.<{ gridValue: string}>}} config
 * @param {ValueManager} valueManager
 * @exports GridCollectionType
 * @constructor
 */
function GridCollectionType(name, config, valueManager) {
    this.name = name;
    this.config = config;
    this.valueManager = valueManager;
}

/**
 *
 * @returns {Array.string}
 */
GridCollectionType.prototype.getAllCellIds = function() {
    var cells = [];

    _.each(_.range(1, this.config.rows + 1), _.bind(function(row) {
        _.each(_.range(1, this.config.cols + 1), function(col) {
            cells.push(row + '-' + col);
        });
    }, this));

    return cells;
};

/**
 * @return {Array.string}
 */
GridCollectionType.prototype.getAvailableCellIds = function() {
    return _.difference(this.getAllCellIds(), this.getOccupiedCellIds());
};

/**
 * @return {Array.string}
 */
GridCollectionType.prototype.getOccupiedCellIds = function() {
    var keys = [];

    _.each(this.config.includes, function(include) {
        keys = keys.concat(this.valueManager.get(include.gridValue).getOccupiedCellIds());
    }.bind(this));

    return _.unique(keys);
};

/**
 *
 * @param {number} row
 * @param {number} col
 * @param {*} value
 * @returns {*}
 */
GridCollectionType.prototype.setCell = function(row, col, value) {
    throw new Error("Cannot setCell on a GridCollection");
};

/**
 *
 * @param {string} cellId
 * @param {*} value
 */
GridCollectionType.prototype.setCellById = function(cellId, value) {
    throw new Error("Cannot setCell on a GridCollection");
};

/**
 *
 * @param {number} row
 * @param {number} col
 * @returns {*}
 */
GridCollectionType.prototype.getCell = function(row, col) {
    throw new Error("Cannot getCell on a GridCollection");
};

/**
 *
 * @param {string} cell
 * @returns {*}
 */
GridCollectionType.prototype.clearCell = function(cell) {
    throw new Error("Cannot clearCell on a GridCollection");
};

/**
 *
 * @returns {Object.<string, {}>}
 */
GridCollectionType.prototype.getValue = function() {
    var values = {};

    _.each(this.config.includes, function(include) {
        _.each(this.valueManager.get(include.gridValue).getValue(), function(val, key) {
            values[key] = val;
        });
    }.bind(this));

    return values;
};

module.exports = GridCollectionType;
