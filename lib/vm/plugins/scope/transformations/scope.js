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

        var resolver = new ScopeValueNameResolver(name, output.values);

        output.values[name] = processScope(name, instanceConfig, resolver);
        output.scopes.push(name);
    });
};

/**
 *
 * @param {string} scopeName
 * @param {Object.<string, *>} values
 * @constructor
 */
function ScopeValueNameResolver(scopeName, values) {
    this.scopeName = scopeName;
    this.values = values;
}

/**
 *
 * @param {string} name
 * @param {string} value
 * @returns {*}
 */
ScopeValueNameResolver.prototype.resolve = function(name, value) {
    // name should be value or somethingValue
    if (name.match(/^(([a-zA-Z0-9]+V|v)alue|entity)$/) === false) {
        return value;
    }

    var parentName = this.scopeName.split('.').slice(0, -1) + '.';

    if (this.values[parentName + value] !== undefined) {
        return { value: parentName + value };
    }

    if (this.values[value] !== undefined) {
        return { value: value };
    }

    return value;
};

/**
 *
 * @param {string} name
 * @param {*} config
 * @param {ScopeValueNameResolver} resolver
 * @returns {*}
 */
function processScope(name, config, resolver) {
    var scope = {};
    _.extend(scope, ScopeDefinition, config);


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
        var resolvedValue = resolver.resolve(name, value);

        instruction[name] = (resolvedValue !== null && typeof resolvedValue === "object") ? resolvedValue.value : value;
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
        pieces[index] = (typeof resolved === "object") ? "context.getValue('" + resolved.value + "')" : piece;
    });
    return '{{= ' + pieces.join(' ') + ' }}';
}

module.exports = ScopeTransformer;
