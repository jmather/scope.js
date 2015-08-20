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

    if (cell === null) {
        var referenceGrid = valueManager.get(referenceGridValue);
        questionManager.ask('cell', 'pick-one', referenceGrid.getAvailableCellIds());
        throw questionManager.getThrowable();
    }

    grid.setCellById(cell, data);
};

module.exports = instructions;
