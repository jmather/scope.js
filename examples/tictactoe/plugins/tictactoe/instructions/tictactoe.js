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
 * @param {*} data
 * @param {number} min Minimum number in a row to win
 * @param {ValueManager} valueManager
 */
instructions.hasWon = function(gridValue, dataValue, data, min, valueManager) {
    var grid = valueManager.get(gridValue);

    if (checkDiagonals(grid, min) === false && checkRowsAndCols(grid, min) === false) {
        return;
    }

    valueManager.get(dataValue).setValue(data);
};

/**
 *
 * @param {GridType} grid
 * @param {number} min
 */
function checkDiagonals(grid, min) {
    // Let's not check diagonals on non-square grids for now...
    if (grid.config.rows != grid.config.cols) {
        return false;
    }

    var values = grid.getOccupiedCellIds();

    var lr_diagonal = 0;
    var rl_diagonal = 0;

    for (var row = 1; row <= grid.config.rows; row++) {
        var lr_diagonal_col = row;
        var rl_diagonal_col = (grid.config.cols - (row - 1));

        if (values.indexOf(row + '-' + lr_diagonal_col) !== -1) {
            lr_diagonal++;
        }

        if (values.indexOf(row + '-' + rl_diagonal_col) !== -1) {
            rl_diagonal++;
        }
    }

    return (lr_diagonal >= min || rl_diagonal >= min);
}

/**
 *
 * @param {GridType} grid
 * @param {number} min
 */
function checkRowsAndCols(grid, min) {
    var rows = {}, cols = {};
    _.each(_.range(grid.config.rows), function(i) { rows[i + 1] = 0; });
    _.each(_.range(grid.config.cols), function(i) { cols[i + 1] = 0; });

    var hasWon = false;

    _.each(grid.getOccupiedCellIds(), function(value) {
        var data = value.split('-');
        rows[data[0]]++;
        cols[data[1]]++;

        if (rows[data[0]] === 3 || cols[data[1]] === 3) {
            hasWon = true;
        }
    });

    return hasWon;
}

module.exports = instructions;
