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
 * @param {string} scopeName
 * @constructor
 */
function ScopeValueNameResolver(scopeName) {
    this.scopeName = scopeName;
}

/**
 *
 * @param {string} name
 * @param {string} value
 * @returns {*}
 */
ScopeValueNameResolver.prototype.resolve = function(name, value) {
    // name should be value or somethingValue, value should be a string with no dots and at least one letter
    if (name.match(/^(([a-z]+V|v)alue|entity)$/) && value.match(/^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/)) {
        return this.scopeName.split('.').slice(0, -1) + '.' + value;
    }

    return value;
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

    var resolver = new ScopeValueNameResolver(name);

    _.each(scope.choices, function(choiceConfig, choiceName) {
        scope.choices[choiceName] = processChoice(resolver, choiceName, choiceConfig);
    });

    return scope;
}

/**
 *
 * @param {ScopeValueNameResolver} resolver
 * @param {string} name
 * @param {*} config
 * @returns {*}
 */
function processChoice(resolver, name, config) {
    var choice = {};
    _.extend(choice, ChoiceDefinition, config);

    choice.when = _.map(choice.when, function(when) {
        return processWhen(resolver, when);
    });

    choice.instructions = _.map(choice.instructions, function(config) {
        return processInstruction(resolver, config);
    });

    return choice;
}

/**
 *
 * @param {ScopeValueNameResolver} resolver
 * @param {*} config
 * @returns {*}
 */
function processInstruction(resolver, config) {
    var instruction = {};
    _.extend(instruction, InstructionDefinition, config);

    _.each(instruction, function(value, name) {
        instruction[name] = resolver.resolve(name, value);
    });

    return instruction;
}

/**
 *
 * @param {ScopeValueNameResolver} resolver
 * @param {string} when
 */
function processWhen(resolver, when) {
    var pieces = when.split(' ');
    _.each(pieces, function(piece, index) {
        var resolved = resolver.resolve('value', piece);
        pieces[index] = (resolved === piece) ? piece : "context.getValue('" + resolved + "')";
    });
    return '{{= ' + pieces.join(' ') + ' }}';
}

module.exports = ScopeTransformer;
