if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['./types/grid', './instructions/grid'],function(TypeGrid, GridInstructions) {
    /**
     *
     * @type {GridPlugin}
     */
    var GridPlugin = {
        types: {
            grid: TypeGrid
        },
        instructions: [ GridInstructions ]
    };

    return GridPlugin;
});
