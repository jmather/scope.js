/**
 *
 * @type {CounterPlugin}
 */
var CounterPlugin = {
    types: {
        counter: require('./types/counter')
    },
    instructions: [ require('./instructions/counter') ]
};

module.exports = CounterPlugin;

