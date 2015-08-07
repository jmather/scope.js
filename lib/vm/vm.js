var _ = require('underscore');

/**
 *
 * @param {VMConfig} config
 * @exports VM
 * @constructor
 */
function VM(config) {
    this.timeManager = config.getTimeManager();
    this.dataManager = config.getDataManager();
    this.valueManager = config.getValueManager();
    this.inputManager = config.getInputManager();
}

/**
 *
 * @param {string} value
 * @param {string} choice
 * @param {Object.<string, *>} input
 * @returns {Array.<{value: string, old: *, new: *, caller: *}>}
 */
VM.prototype.execute = function(value, choice, input) {
    var valueManager = this.valueManager.clone();
    valueManager.enableChangeLogging();
    this.inputManager.setAnswers(input || {});

    var executor = valueManager.getInstructionExecutor();

    executor.execute(valueManager, {type: "instruction", instruction: "execute", value: value, choice: choice});

    var changes = valueManager.disableChangeLogging();

    this.valueManager = valueManager;

    return changes;
};

module.exports = VM;