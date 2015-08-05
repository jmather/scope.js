if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore', './../definitions/counter'], function (_, definition) {
    function CounterTransformer(config) {
        this.config = config;
    }

    /**
     *
     * @param {Array.<{type: 'counter', min: number|null, max: number|null, default: number, step: number|null}>} input
     * @param output
     */
    CounterTransformer.prototype.preProcess = function (input, output) {
        _.each(input, function(instanceConfig, name) {
            if (instanceConfig.type !== 'counter') {
                return;
            }

            output.values[name] = instanceConfig;
        });
    };

    /**
     *
     * @param {Array.<{type: 'counter', min: number|null, max: number|null, default: number, step: number|null}>} input
     * @param output
     */
    CounterTransformer.prototype.process = function (input, output) {
        _.each(output.values, function(instanceConfig, name) {
            if (instanceConfig.type !== 'counter') {
                return;
            }

            var counter = {};

            output.values[name] = _.extend(counter, definition, instanceConfig);
        });
    };

    return CounterTransformer;
});