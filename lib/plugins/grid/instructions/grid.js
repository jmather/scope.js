/**
 *
 * @exports GridInstructions
 */
var instructions = {};

/**
 *
 * @param {string} gridValue
 * @param {string} cell
 * @param {*} data
 * @param {ValueManager} valueManager
 * @param {InputManager} inputManager
 * @param {QuestionManager} questionManager
 */
instructions.place = function(gridValue, cell, data, valueManager, inputManager, questionManager) {
    var grid = valueManager.get(gridValue);

    if (cell === null) {
        questionManager.ask('cell', 'pick-one', grid.getAvailableCellIds());
        throw questionManager.getThrowable();
    }

    grid.setCellById(cell, data);
};

module.exports = instructions;
