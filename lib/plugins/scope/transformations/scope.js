var _ = require('underscore');

var ScopeDefinition = require('../definitions/scope');
var ChoiceDefinition = require('../definitions/choice');
var InstructionDefinition = require('../definitions/instruction');

/**
 *
 * @param config
 * @exports ScopeTransformer
 * @constructor
 */
function ScopeTransformer(config) {
    this.config = config;
}

/**
 *
 * @param {*} input
 * @param {*} output
 */
ScopeTransformer.prototype.copy = function (input, output) {
    _.each(input, function(instanceConfig, name) {
        if (instanceConfig.type !== 'scope') {
            return;
        }

        output.values[name] = instanceConfig;
    });
};

/**
 *
 * @param {*} input
 * @param {*} output
 */
ScopeTransformer.prototype.resolve = function (input, output) {
    output.scopes = [];

    _.each(output.values, function(instanceConfig, name) {
        if (instanceConfig.type !== 'scope') {
            return;
        }

        output.values[name] = processScope(name, instanceConfig);
        output.scopes.push(name);
    });
};

/**
 *
 * @param {string} name
 * @param {*} config
 * @returns {*}
 */
function processScope(name, config) {
    var scope = {};
    _.extend(scope, ScopeDefinition, config);

    _.each(scope.choices, function(choiceConfig, choiceName) {
        scope.choices[choiceName] = processChoice(choiceName, choiceConfig);
    });

    return scope;
}

/**
 *
 * @param {string} name
 * @param {*} config
 * @returns {*}
 */
function processChoice(name, config) {
    var choice = {};
    _.extend(choice, ChoiceDefinition, config);

    choice.instructions = _.map(choice.instructions, function(config) {
        return processInstruction(config);
    });

    return choice;
}

/**
 *
 * @param {*} config
 * @returns {*}
 */
function processInstruction(config) {
    var instruction = {};
    _.extend(instruction, InstructionDefinition, config);
    return instruction;
}

module.exports = ScopeTransformer;
