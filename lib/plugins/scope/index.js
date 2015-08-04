if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['./types/scope', './instructions/scope'],function(TypeScope, ScopeInstructions) {
    /**
     *
     * @type {ScopePlugin}
     */
    var ScopePlugin = {
        types: {
            scope: TypeScope
        },
        instructions: [ ScopeInstructions ]
    };

    return ScopePlugin;
});
