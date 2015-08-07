/**
 *
 * @type {GridPlugin}
 */
var GridPlugin = {
    types: {
        grid: require('./types/grid')
    },
    instructions: [ require('./instructions/grid') ]
};

module.exports = GridPlugin;

