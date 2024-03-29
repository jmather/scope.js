var _ = require('underscore');

var GridDefinition = require('../definitions/grid');
/**
 *
 * @param {*} config
 * @exports GridTransformer
 * @constructor
 */
function GridTransformer(config) {
    this.config = config;
}

/**
 *
 * @param {*} input
 * @param {*} output
 */
GridTransformer.prototype.copy = function (input, output) {
    _.each(input, function(instanceConfig, name) {
        if (instanceConfig.type !== 'grid') {
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
GridTransformer.prototype.resolve = function (input, output) {
    _.each(output.values, function(instanceConfig, name) {
        if (instanceConfig.type !== 'grid') {
            return;
        }

        output.values[name] = processGrid(name, instanceConfig);
    });
};

/**
 *
 * @param {string} name
 * @param {*} config
 * @returns {*}
 */
function processGrid(name, config) {
    var grid = {};
    _.extend(grid, GridDefinition, config);

    return grid;
}

module.exports = GridTransformer;
