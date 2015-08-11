/**
 *
 * @exports GridInstructions
 */
var instructions = {};

/**
 *
 * @param {string} gridValue
 * @param {string} cell
 * @param {*} value
 * @param {ValueManager} valueManager
 * @param {InputManager} inputManager
 * @param {QuestionManager} questionManager
 */
instructions.place = function(gridValue, cell, value, valueManager, inputManager, questionManager) {
    var grid = valueManager.get(gridValue);

    if (cell === null) {
        questionManager.ask('cell', 'pick-one', grid.getAvailableCellIds());
        throw questionManager.getThrowable();
    }

    grid.setCellById(cell, value);
};

module.exports = instructions;
