if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function(requre) {
    /**
     *
     * @type {CounterPlugin}
     */
    var CounterPlugin = {
        definition: require('./definition'),
        type: require('./type'),
        transformation: require('./transformation')
    };

    return CounterPlugin;
});
