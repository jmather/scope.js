var _ = require('underscore');

/**
 *
 * @param {string} name
 * @param {{rows: integer, cols: integer, default: {}, nestedGrids: Array.<{mode: string, value: string}>}} config
 * @param {ValueManager} valueManager
 * @exports GridType
 * @constructor
 */
function GridType(name, config, valueManager) {
    this.name = name;
    this.config = config;
    this.valueManager = valueManager;
}

/**
 *
 * @returns {Array.string}
 */
GridType.prototype.getAllCellIds = function() {
    var cells = [];

    _.each(_.range(1, this.config.rows + 1), _.bind(function(row) {
        _.each(_.range(1, this.config.cols + 1), function(col) {
            cells.push(row + '-' + col);
        });
    }, this));

    return cells.sort();
};

/**
 * @return {Array.string}
 */
GridType.prototype.getAvailableCellIds = function() {
    return _.difference(this.getAllCellIds(), this.getOccupiedCellIds()).sort();
};

/**
 * @return {Array.string}
 */
GridType.prototype.getOccupiedCellIds = function() {
    return _.keys(this.getValue()).sort();
};

/**
 *
 * @param {integer} row
 * @param {integer} col
 * @param {*} value
 * @returns {*}
 */
GridType.prototype.setCell = function(row, col, value) {
    var cell = row + '-' + col;
    var values = this.getValue();
    var oldValue = null;

    if (values[cell] !== undefined) {
        oldValue = values[cell];
    }

    values[cell] = value;

    this.valueManager.setData(this.name, values);

    return oldValue;
};

/**
 *
 * @param {string} cellId
 * @param {*} value
 */
GridType.prototype.setCellById = function(cellId, value) {
    if (cellId.match(/^\d+-\d+$/) === false) {
        throw new Error('Invalid cellId ' + cellId + ' for GridValue ' + this.name);
    }
    var args = cellId.split('-', 2);

    this.setCell(parseInt(args[0], 10), parseInt(args[1], 10), value);
};

/**
 *
 * @param {integer} row
 * @param {integer} col
 * @returns {*}
 */
GridType.prototype.getCell = function(row, col) {
    var cell = row + '-' + col;
    var values = this.getValue();

    if (values[cell] !== undefined) {
        return values[cell];
    }

    return null;
};

/**
 *
 * @param {string} cell
 * @returns {*}
 */
GridType.prototype.clearCell = function(cell) {
    var values = this.getValue();
    var oldValue = null;

    if (values[cell] !== undefined) {
        oldValue = values[cell];
    }

    delete values[cell];

    this.valueManager.setData(this.name, values);

    return oldValue;
};

/**
 *
 * @returns {Object.<string, {}>}
 */
GridType.prototype.getValue = function() {
    return this.valueManager.getData(this.name, this.config.default);
};

/**
 *
 * @returns {*}
 */
GridType.prototype.clearValue = function() {
    return this.valueManager.clearData(this.name);
};

module.exports = GridType;
