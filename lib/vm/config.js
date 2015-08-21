var TimeManager = require('./time-manager');
var DataManager = require('./data-manager');
var TypeManager = require('./type-manager');
var ValueManager = require('./value-manager');
var InputManager = require('./input-manager');
var QuestionManager = require('./question-manager');
var InstructionExecutor = require('./plugins/scope/lib/instruction-executor');

/**
 *
 * @param {Object.<string, *>} state
 * @param {Object.<string, *>} config
 * @param {number} time
 * @param {Array.<{types: Object.<string, function>, instructions: Object.<string, function>}>} plugins
 * @exports VM.Config
 * @constructor
 */
function VMConfig(state, config, time, plugins) {
    this.state = state;
    this.config = config;
    this.time = time;
    this.plugins = plugins;
    this.instructionExecutor = null;
    this.inputManager = null;
    this.questionManager = null;
}

/**
 *
 * @returns {DataManager}
 */
VMConfig.prototype.getDataManager = function() {
    return new DataManager(this.state);
};

/**
 *
 * @returns {TypeManager}
 */
VMConfig.prototype.getTypeManager = function() {
    return new TypeManager(this.plugins);
};

/**
 *
 * @returns {TimeManager}
 */
VMConfig.prototype.getTimeManager = function() {
    return new TimeManager(this.time);
};

/**
 *
 * @returns {ValueManager}
 */
VMConfig.prototype.getValueManager = function() {
    return new ValueManager(this.config, this.getDataManager(), this.getTypeManager(), this.getInstructionExecutor());
};

/**
 *
 * @returns {InputManager}
 */
VMConfig.prototype.getInputManager = function() {
    if (this.inputManager === null) {
        this.inputManager = new InputManager();
    }

    return this.inputManager;
};

/**
 *
 * @returns {QuestionManager}
 */
VMConfig.prototype.getQuestionManager = function() {
    if (this.questionManager === null) {
        this.questionManager = new QuestionManager();
    }

    return this.questionManager;
};

/**
 *
 * @returns {InstructionExecutor}
 */
VMConfig.prototype.getInstructionExecutor = function() {
    if (this.instructionExecutor === null) {
        this.instructionExecutor = new InstructionExecutor(this.getInputManager(), this.getQuestionManager(), this.plugins);
    }

    return this.instructionExecutor;
};

module.exports = VMConfig;
