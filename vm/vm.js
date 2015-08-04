if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['underscore', './type-manager', './value-manager', './instruction-executor'], function (_, TypeManager, ValueManager, InstructionExecutor) {
    /**
     *
     * @param {VMConfig} config
     * @constructor
     */
    function VM(config) {
        this.timeManager = config.getTimeManager();
        this.dataManager = config.getDataManager();
        this.valueManager = config.getValueManager();
        this.inputManager = config.getInputManager();
    }

    VM.prototype.execute = function(value, choice, input) {
        var valueManager = this.valueManager.clone();
        valueManager.enableChangeLogging();
        this.inputManager.setAnswers(input);

        var executor = valueManager.getInstructionExecutor();

        executor.execute(valueManager, {type: "instruction", instruction: "execute"}, {value: value, choice: choice});

        var changes = valueManager.disableChangeLogging();

        this.valueManager = valueManager;

        return changes;
    };

    return VM;
});