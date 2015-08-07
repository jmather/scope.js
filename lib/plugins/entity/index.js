/**
 *
 * @type {EntityPlugin}
 */
var EntityPlugin = {
    types: {
        repository: require('./types/repository')
    },
    instructions: [ require('./instructions/entity') ]
};

module.exports = EntityPlugin;

