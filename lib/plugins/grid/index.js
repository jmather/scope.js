/**
 *
 * @type {GridPlugin}
 */
var GridPlugin = {
    types: {
        grid: require('./types/grid'),
        'grid-collection': require('./types/grid-collection')
    },
    instructions: [ require('./instructions/grid') ]
};

module.exports = GridPlugin;

