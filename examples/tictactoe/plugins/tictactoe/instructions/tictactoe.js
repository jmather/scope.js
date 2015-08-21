var _ = require('underscore');

/**
 *
 * @exports GridInstructions
 */
var instructions = {};

/**
 *
 * @param {string} gridValue
 * @param {string} dataValue
 * @param {ValueManager} valueManager
 */
instructions.hasWon = function(gridValue, dataValue, valueManager) {
    var grid = valueManager.get(gridValue);

    var occupied = grid.getOccupiedCellIds();
    var hasWon = false;

    if (checkDiagonals(occupied) === false && checkRowsAndCols(occupied) === false) {
        return;
    }

    var data = valueManager.get(dataValue);
};

/**
 *
 * @param {Array.string} values
 */
function checkDiagonals(values) {
    if (values.indexOf('2-2') === -1) {
        return false;
    }

    if (values.indexOf('1-3') !== -1 && values.indexOf('3-1') !== -1) {
        return true;
    }

    if (values.indexOf('1-1') !== -1 && values.indexOf('3-3') !== -1) {
        return true;
    }

    return false;
}

/**
 *
 * @param {Array.string} values
 */
function checkRowsAndCols(values) {
    var counts = {rows: {'1': 0, '2': 0, '3': 0}, cols: {'1': 0, '2': 0, '3': 0}};
    var hasWon = false;

    _.each(values, function(value) {
        var data = value.split('-');
        counts.rows[data[0]]++;
        counts.cols[data[1]]++;

        if (counts.rows[data[0]] === 3 || counts.cols[data[1]] === 3) {
            hasWon = true;
        }
    });

    return hasWon;
}

module.exports = instructions;
