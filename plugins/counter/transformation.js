if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['underscore', './definition'], function (_, definition) {
    function CounterTransformer(config) {
        this.config = config;
    }

    /**
     *
     * @param {[{type: 'counter', min: number|null, max: number|null, default: number, step: number|null}]} input
     * @param output
     */
    CounterTransformer.prototype.process = function (input, output) {
        if (!input.data) {
            return;
        }

        if (output.data === undefined) {
            output.data = {};
        }

        _.each(input.data, function(instanceConfig, name) {
            output.data[name] = _.extend(instanceConfig, definition);
        });
    };

    return CounterTransformer;
});