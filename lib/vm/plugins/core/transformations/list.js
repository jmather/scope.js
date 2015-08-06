if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore', '../definitions/list'], function (_, ListDefinition) {
    /**
     *
     * @param config
     * @exports ListTransformer
     * @constructor
     */
    function ListTransformer(config) {
        this.config = config;
    }

    /**
     *
     * @param {Array.Object} input
     * @param output
     */
    ListTransformer.prototype.copy = function (input, output) {
        _.each(input, function(config, name) {
            if (config.type !== 'list') {
                return;
            }

            output.values[name] = config;
        });
    };

    /**
     *
     * @param {Array.Object} input
     * @param output
     */
    ListTransformer.prototype.resolve = function (input, output) {
        _.each(output.values, function(config, name) {
            if (config.type !== 'list') {
                return;
            }

            var list = {};

            _.extend(list, ListDefinition, config);

            output.values[name] = list;
        });
    };

    return ListTransformer;
});