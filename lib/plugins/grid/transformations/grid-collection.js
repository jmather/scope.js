var _ = require('underscore');

var GridCollectionDefinition = require('../definitions/grid-collection');
/**
 *
 * @param {*} config
 * @exports GridCollectionTransformer
 * @constructor
 */
function GridCollectionTransformer(config) {
    this.config = config;
}

/**
 *
 * @param {*} input
 * @param {*} output
 */
GridCollectionTransformer.prototype.copy = function (input, output) {
    _.each(input, function(instanceConfig, name) {
        if (instanceConfig.type !== 'grid-collection') {
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
GridCollectionTransformer.prototype.resolve = function (input, output) {
    _.each(output.values, function(instanceConfig, name) {
        if (instanceConfig.type !== 'grid-collection') {
            return;
        }

        var parentName = name.split('.').slice(0, -1) + '.';

        var nameResolver = function(valueName) {
            if (output.values[parentName + valueName] !== undefined) {
                return parentName + valueName;
            }

            if (output.values[valueName] !== undefined) {
                return valueName;
            }

            throw new Error("Cannot find value " + valueName);
        };

        output.values[name] = processGridCollection(name, instanceConfig, nameResolver);
    });
};

/**
 *
 * @param {string} name
 * @param {*} config
 * @param {function} valueResolver
 * @returns {*}
 */
function processGridCollection(name, config, valueResolver) {
    var grid = {};
    _.extend(grid, GridCollectionDefinition, config);

    grid.includes = _.map(grid.includes, function(include) {
        if (typeof include === "string") {
            return { gridValue: valueResolver(include) };
        }

        throw Error("Invalid grid-collection definition: " + name + ' ' + JSON.stringify(config));
    });

    return grid;
}

module.exports = GridCollectionTransformer;
