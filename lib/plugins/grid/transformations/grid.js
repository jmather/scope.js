if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore', '../definitions/grid', '../definitions/nestedGrid'], function (_, GridDefinition, NestedGridDefinition) {
    function GridTransformer(config) {
        this.config = config;
    }

    /**
     *
     * @param output
     */
    GridTransformer.prototype.process = function (input, output) {
        if (!input) {
            return;
        }

        _.each(input, function(instanceConfig, name) {
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

    return GridTransformer;
});