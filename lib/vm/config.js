if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['./time-manager', './data-manager', './type-manager', './value-manager', './input-manager', './instruction-executor'], function(TimeManager, DataManager, TypeManager, ValueManager, InputManager, InstructionExecutor) {
    /**
     *
     * @param {Object.<string, *>} state
     * @param {Object.<string, *>} config
     * @param {integer} time
     * @param {Array.<{types: Object.<string, function>, instructions: Object.<string, function>}>} plugins
     * @constructor
     */
    function VMConfig(state, config, time, plugins) {
        this.state = state;
        this.config = config;
        this.time = time;
        this.plugins = plugins;
        this.instructionExecutor = null;
        this.inputManager = null;
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
        return new ValueManager(this.config, this.getDataManager(), this.getTypeManager(), this.getInstructionExecutor())
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
     * @returns {InstructionExecutor}
     */
    VMConfig.prototype.getInstructionExecutor = function() {
        if (this.instructionExecutor === null) {
            this.instructionExecutor = new InstructionExecutor(this.getInputManager(), this.plugins);
        }

        return this.instructionExecutor;
    };

    return VMConfig;
});