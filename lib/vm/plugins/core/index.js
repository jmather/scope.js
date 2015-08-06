if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['./types/list', './instructions/list'],function(ListType, ListInstructions) {
    /**
     *
     * @type {CorePlugin}
     */
    var CorePlugin = {
        types: {
            list: ListType
        },
        instructions: [ ListInstructions ]
    };

    return CorePlugin;
});
