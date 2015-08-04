if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['underscore', '../definitions/scope', '../definitions/choice', '../definitions/instruction'], function (_, ScopeDefinition, ChoiceDefinition, InstructionDefinition) {
    function ScopeTransformer(config) {
        this.config = config;
    }

    /**
     *
     * @param output
     */
    ScopeTransformer.prototype.process = function (input, output) {
        if (!input) {
            return;
        }

        _.each(input, function(instanceConfig, name) {
            if (instanceConfig.type !== 'scope') {
                return;
            }

            output.values[name] = processScope(name, instanceConfig);
        });
    };


    function processScope(name, config) {
        var scope = {};
        _.extend(scope, ScopeDefinition, config);

        _.each(scope.choices, function(choiceConfig, choiceName) {
            scope.choices[choiceName] = processChoice(choiceName, choiceConfig);
        });

        return scope;
    }

    function processChoice(name, config) {
        var choice = {};
        _.extend(choice, ChoiceDefinition, config);

        choice.instructions = _.map(choice.instructions, function(config) {
            return processInstruction(config);
        });

        return choice;
    }

    function processInstruction(config) {
        var instruction = {};
        _.extend(instruction, InstructionDefinition, config);
        return instruction;
    }

    return ScopeTransformer;
});