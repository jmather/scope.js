if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['./types/counter', './transformations/counter', './instructions/counter'],function(CounterType, CounterTransformation, CounterInstructions) {
    /**
     *
     * @type {CounterPlugin}
     */
    var CounterPlugin = {
        types: {
            counter: CounterType
        },
        instructions: [ CounterInstructions ]
    };

    return CounterPlugin;
});
