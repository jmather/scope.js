if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['./types/repository', './instructions/entity'],function(RepositoryType, EntityInstructions) {
    /**
     *
     * @type {EntityPlugin}
     */
    var EntityPlugin = {
        types: {
            repository: RepositoryType
        },
        instructions: [ EntityInstructions ]
    };

    return EntityPlugin;
});
