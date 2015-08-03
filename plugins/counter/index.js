if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['./type', './transformation', './instructions'],function(CounterType, CounterTransformation, CounterInstructions) {
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
