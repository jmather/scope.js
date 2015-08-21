var _ = require('underscore');

var DataDefinition = require('../definitions/data');

/**
 *
 * @param config
 * @exports DataTransformer
 * @constructor
 */
function DataTransformer(config) {
    this.config = config;
}

/**
 *
 * @param {Array.Object} input
 * @param output
 */
DataTransformer.prototype.copy = function (input, output) {
    _.each(input, function(config, name) {
        if (config.type !== 'data') {
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
DataTransformer.prototype.resolve = function (input, output) {
    _.each(output.values, function(config, name) {
        if (config.type !== 'data') {
            return;
        }

        var list = {};

        _.extend(list, DataDefinition, config);

        output.values[name] = list;
    });
};

module.exports = DataTransformer;
