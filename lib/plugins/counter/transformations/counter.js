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
    CounterTransformer.prototype.process = function (input, output) {
        if (!input) {
            return;
        }

        _.each(input, function(instanceConfig, name) {
            if (instanceConfig.type !== 'counter') {
                return;
            }

            var counter = {};

            output.values[name] = _.extend(counter, definition, instanceConfig);
        });
    };

    return CounterTransformer;
});