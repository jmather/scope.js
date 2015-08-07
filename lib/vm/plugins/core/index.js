/**
 *
 * @type {CorePlugin}
 */
var CorePlugin = {
    types: {
        list: require('./types/list')
    },
    instructions: [ require('./instructions/list') ]
};

module.exports = CorePlugin;

