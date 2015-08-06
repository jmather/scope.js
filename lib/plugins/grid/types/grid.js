if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore'], function (_) {
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

        return cells;
    };

    /**
     * @return {Array.string}
     */
    GridType.prototype.getAvailableCellIds = function() {
        return _.difference(this.getAllCellIds(), this.getOccupiedCellIds());
    };

    /**
     * @return {Array.string}
     */
    GridType.prototype.getOccupiedCellIds = function() {
        return _.keys(this.getValue());
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

    return GridType;
});