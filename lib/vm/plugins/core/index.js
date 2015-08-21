/**
 *
 * @type {CorePlugin}
 */
var CorePlugin = {
    types: {
        list: require('./types/list'),
        data: require('./types/data')
    },
    instructions: [ require('./instructions/list') ]
};

module.exports = CorePlugin;

