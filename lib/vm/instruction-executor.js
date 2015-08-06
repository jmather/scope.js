if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore'], function (_) {
    /**
     *
     * @param {InputManager} inputManager
     * @param {Array.<{instructions: Object.<string, function>}>} plugins
     * @constructor
     */
    function InstructionExecutor(inputManager, plugins) {
        this.inputManager = inputManager;
        this.instructions = {};

        _.each(plugins, _.bind(function(plugin) {
            _.each(plugin.instructions, _.bind(this.importInstructions, this));
        }, this));
    }

    /**
     *
     * @param {Object.<string, function>} instructions
     */
    InstructionExecutor.prototype.importInstructions = function(instructions) {
        _.each(instructions, _.bind(function(instructionFunction, instructionName) {
            this.importInstruction(instructionName, instructionFunction);
        }, this));
    };

    /**
     *
     * @param {string} instructionName
     * @param {function} instructionFunction
     */
    InstructionExecutor.prototype.importInstruction = function(instructionName, instructionFunction) {
        if (this.instructions[instructionName] === undefined) {
            this.instructions[instructionName] = [];
        }

        this.instructions[instructionName].push({
            method: instructionFunction,
            arguments: getArgumentsForMethod(instructionFunction)
        });
    };

    /**
     *
     * @param {ValueManager} valueManager
     * @param {{type: "instruction", instruction: string }} instruction
     */
    InstructionExecutor.prototype.execute = function(valueManager, instruction) {
        if (this.instructions[instruction.instruction] === undefined) {
            throw new Error("No such instruction: " + instruction.instruction);
        }


        _.each(this.instructions[instruction.instruction], _.bind(function(instructionData) {
            var args = resolveInstructionArguments(instruction, instructionData, valueManager, this.inputManager);

            instructionData.method.apply(valueManager, args);
        }, this));
    };

    /**
     *
     * @param {{type: "instruction", instruction: string }} instruction
     * @param {{method: function, arguments: Array.string}} instructionData
     * @param {ValueManager} valueManager
     * @param {InputManager} inputManager
     */
    function resolveInstructionArguments(instruction, instructionData, valueManager, inputManager) {
        return _.map(instructionData.arguments, function(arg) {
            if (arg === 'valueManager') {
                return valueManager;
            }

            if (arg === 'inputManager') {
                return inputManager;
            }

            if (instruction[arg] !== undefined) {
                return instruction[arg];
            }

            return inputManager.get(arg, null);
        });
    }

    /**
     *
     * @param {function} method
     * @returns {Array.string}
     */
    function getArgumentsForMethod(method) {
        var argString = method.toString().match(/\(([^)]+)\)/)[1];
        return argString.replace(/[^a-zA-Z0-9,]+/g, '').split(',');
    }

    return InstructionExecutor;
});