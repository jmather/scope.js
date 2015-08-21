/**
 *
 * @type {ScopePlugin}
 */
var ScopePlugin = {
    types: {
        scope: require('./types/scope')
    },
    instructions: [ require('./instructions/scope') ]
};

module.exports = ScopePlugin;
