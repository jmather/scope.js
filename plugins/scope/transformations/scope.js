if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['underscore', '../definitions/scope', '../definitions/choice'], function (_, ScopeDefinition, ChoiceDefinition) {
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

        scope.choices = _.each(scope.choices, function(choiceConfig, choiceName) {
            return _.extend(choiceConfig, ChoiceDefinition);
        });

        return scope;
    }

    return ScopeTransformer;
});