var _ = require('underscore');

var ScopeDefinition = require('../definitions/scope');
var ChoiceDefinition = require('../definitions/choice');
var InstructionDefinition = require('../definitions/instruction');

/**
 *
 * @param config
 * @exports ExpressionTransformer
 * @constructor
 */
function ExpressionTransformer(config) {
    this.config = config;
}

/**
 *
 * @param {*} input
 * @param {*} output
 */
ExpressionTransformer.prototype.init = function (input, output) {
    output.expressionTemplates = {};
};

/**
 *
 * @param {*} input
 * @param {*} output
 */
ExpressionTransformer.prototype.copy = function (input, output) {
    _.each(input, function(instanceConfig, name) {
        if (instanceConfig.type === 'expression') {
            output.values[name] = instanceConfig;
        }

        if (instanceConfig.type === 'expression-template') {
            output.expressionTemplates[name] = instanceConfig;
        }
    });
};

/**
 *
 * @param {*} input
 * @param {*} output
 */
ExpressionTransformer.prototype.resolve = function (input, output) {
    output.scopes = [];

    _.each(output.values, function(config, name) {
        if (config.type !== 'expression') {
            return;
        }

        var resolver = new ExpressionValueNameResolver(name, output.values);

        output.values[name] = processExpression(name, instanceConfig, resolver, output.expressionTemplates);
        output.scopes.push(name);
    });
};

/**
 *
 * @param {string} expressionName
 * @param {Object.<string, *>} values
 * @constructor
 */
function ExpressionValueNameResolver(expressionName, values) {
    this.expressionName = expressionName;
    this.values = values;
}

/**
 *
 * @param {string} name
 * @param {string} value
 * @returns {*}
 */
ExpressionValueNameResolver.prototype.resolve = function(name, value) {
    // name should be value or somethingValue
    if (name.match(/^(([a-zA-Z0-9]+V|v)alue|entity)$/) === false) {
        return value;
    }

    var parentName = this.expressionName.split('.').slice(0, -1) + '.';

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
 * @param {ExpressionValueNameResolver} resolver
 * @param {Object.<string, *>} templates
 * @returns {*}
 */
function processExpression(name, config, resolver, templates) {

    if (config.template) {
        config = _.defaults(templates[config.template], config);
    }

    var pieces = config.expression.split(' ');
    _.each(pieces, function(piece, index) {
        var resolved = resolver.resolve('value', piece);
        pieces[index] = (typeof resolved === "object") ? "context.getValue('" + resolved.value + "')" : piece;
    });
    config.expression = '{{= ' + pieces.join(' ') + ' }}';

    return config;
}

module.exports = ExpressionTransformer;
