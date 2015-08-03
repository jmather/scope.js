if (typeof define !== 'function') { var define = require('amdefine')(module) }

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
     * @param {string} instruction
     * @param {InputManager} input
     */
    InstructionExecutor.prototype.execute = function(instruction, scope) {
        if (this.instructions[instruction] === undefined) {
            throw new Error("No such instruction: " + instruction);
        }

        _.each(this.instructions[instruction], function(instructionData) {
            var args = _.map(instructionData.arguments, function(arg) {
                return input.get(arg, null);
            });

            instructionData.method.apply(scope, args);
        });
    };


    function getArgumentsForMethod(method) {
        var argString = method.toString().match(/\(([^)]+)\)/)[1];
        return argString.replace(/[^a-zA-Z0-9,]+/g, '').split(',');
    }

    return InstructionExecutor;
});