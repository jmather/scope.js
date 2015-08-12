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

    executor.execute(valueManager, {type: "instruction", instruction: "execute", scopeValue: value, choice: choice});

    var changes = valueManager.disableChangeLogging();

    this.valueManager = valueManager;

    return changes;
};

/**
 *
 * @param {string} value
 * @returns {*}
 */
VM.prototype.getValue = function(value) {
    return this.valueManager.get(value).getValue();
};

/**
 *
 * @returns {*}
 */
VM.prototype.getValueDefinitions = function() {
    return this.valueManager.valueConfig;
};

/**
 *
 * @param {string} name
 * @returns {*}
 */
VM.prototype.getValueDefinition = function(name) {
    if (this.valueManager.valueConfig.values[name] === undefined) {
        throw new Error("No definition for " + name);
    }

    return this.valueManager.valueConfig.values[name];
};

/**
 *
 * @returns {*}
 */
VM.prototype.getData = function() {
    return this.valueManager.dataManager.data.toJS();
};

module.exports = VM;