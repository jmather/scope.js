var dot = require('dot');
var _ = require('underscore');
var Context = require('./context');

/**
 *
 * @param valueManager
 * @constructor
 */
function ExpressionExecutor(valueManager) {
    this.context = new Context(valueManager);

    this.templateSettings = _.defaults({varname: 'context'}, dot.templateSettings);

    this.expressions = {};
}

/**
 * This function is named all weird because the only solution
 * I could find right now is a template parser, which always returns
 * strings. Later we will find a better solution, but this works for now.
 *
 * @param {string} expression
 * @return {bool}
 */
ExpressionExecutor.prototype.evaluateStringBoolean = function(expression) {
    if (this.expressions[expression] === undefined) {
        this.expressions[expression] = dot.template(expression, this.templateSettings);
    }

    return (this.expressions[expression](this.context) === 'true');
};

module.exports = ExpressionExecutor;