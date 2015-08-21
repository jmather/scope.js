/**
 *
 * @exports GridInstructions
 */
var instructions = {};

/**
 *
 * @param {string} gridValue
 * @param {string} referenceGridValue
 * @param {string} cell
 * @param {*} data
 * @param {ValueManager} valueManager
 * @param {InputManager} inputManager
 * @param {QuestionManager} questionManager
 */
instructions.place = function(gridValue, referenceGridValue, cell, data, valueManager, inputManager, questionManager) {
    var grid = valueManager.get(gridValue);

    var referenceGrid = valueManager.get(referenceGridValue);
    var available = referenceGrid.getAvailableCellIds();

    if (cell === null) {
        questionManager.ask('cell', 'pick-one', available);
        throw questionManager.getThrowable();
    }

    if (available.indexOf(cell) === -1) {
        throw new Error("Cell " + cell + " is not available for placement");
    }

    grid.setCellById(cell, data);
};

module.exports = instructions;
