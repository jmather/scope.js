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

instructions.resetGame = function(gridValues, dataValue, counterValue, valueManager) {
    _.each(gridValues, function(gridValue) {
        valueManager.get(gridValue).clearValue();
    });

    valueManager.get(dataValue).clearValue();
    valueManager.get(counterValue).clearValue();
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
    var lastLR = null;
    var maxLR = 0;
    var rl_diagonal = 0;
    var maxRL = null;
    var lastRL = 0;

    for (var row = 1; row <= grid.config.rows; row++) {
        var lr_diagonal_col = row;
        var rl_diagonal_col = (grid.config.cols - (row - 1));

        if (values.indexOf(row + '-' + lr_diagonal_col) !== -1) {
            if (lastLR === null || lastLR === row - 1) {
                lr_diagonal++;
                maxLR = Math.max(maxLR, lr_diagonal);
            } else {
                lr_diagonal = 0;
            }

            lastLR = row;
        }

        if (values.indexOf(row + '-' + rl_diagonal_col) !== -1) {
            if (lastRL === null || lastRL === row - 1) {
                rl_diagonal++;
                maxRL = Math.max(maxRL, rl_diagonal);
            } else {
                rl_diagonal = 0;
            }
        }
    }

    return (maxRL >= min || maxLR >= min);
}

/**
 *
 * @param {GridType} grid
 * @param {number} min
 */
function checkRowsAndCols(grid, min) {
    var rows = {}, cols = {};
    _.each(_.range(grid.config.rows), function(i) { rows[i + 1] = []; });
    _.each(_.range(grid.config.cols), function(i) { cols[i + 1] = []; });
    var lastRow = null;
    var lastCol = null;

    var hasWon = false;

    _.each(grid.getOccupiedCellIds(), function(value) {
        if (hasWon === true) {
            return;
        }

        var data = value.split('-');
        rows[data[0]].push(data[1]);
        cols[data[1]].push(data[0]);

        var checkContiguousCells = function(memo, value ) {
            value = parseInt(value, 10);
            memo = memo || { nextValue: null, running: 0 };
            if (memo.nextValue === null || memo.nextValue === value) {
                memo.nextValue = value + 1;
                memo.running++;
                return memo;
            }

            memo.nextValue = null;
            memo.running = 0;
            return memo;
        };

        if (rows[data[0]].length >= min) {
            if (_.reduce(rows[data[0]], checkContiguousCells, null).running >= min) {
                hasWon = true;
            }
        }

        if (cols[data[1]].length >= min) {
            if (_.reduce(cols[data[1]], checkContiguousCells, null).running >= min) {
                hasWon = true;
            }
        }
    });

    console.log(rows, cols);

    return hasWon;
}

module.exports = instructions;
