if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['underscore', './type-manager', './value-manager', './instruction-executor'], function (_, TypeManager, ValueManager, InstructionExecutor) {
    /**
     *
     * @param {VMTime} time
     * @param {DataManager} dataManager
     * @param {InputManager} inputManager
     * @param {Array.string} plugins
     * @constructor
     */
    function VM(time, dataManager, inputManager, plugins) {
        this.time = time;
        this.dataManager = dataManager;
        this.valueManager = new ValueManager(dataManager, new TypeManager(plugins), new InstructionExecutor(inputManager, plugins));
    }

    VM.prototype.execute = function(instruction, answers) {
        var valueManager = this.valueManager.clone();

    };

    function exeucte(valueManager, inputManager, valueName, methodName) {
        var value = valueManager.get(valueName);

        if (typeof value[actionName] !== 'function') {
            throw new Error("Value '" + valueName + "' is type '" + typeof value + "' and has no method named '" + actionName + "'");
        }

        var methodArgs = getArgumentsForMethod(value[actionName]);

        var argsToSend = [];

        _.map(methodArgs, function(arg) {

        });
    }

    function getArgumentsForMethod(method) {
        var argString = method.toString().match(/\(([^)]+)\)/)[1];
        return argString.replace(/[^a-zA-Z0-9,]+/g, '').split(',');
    }

    return VM;
});