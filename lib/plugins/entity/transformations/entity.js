if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore', '../definitions/repository'], function (_, RepositoryDefinition) {
    /**
     *
     * @param {*} config
     * @constructor
     */
    function EntityTransformer(config) {
        this.config = config;
    }

    /**
     *
     * @param {*} input
     * @param {*} output
     */
    EntityTransformer.prototype.copy = function(input, output) {
        output.entities = {};

        _.each(input, function(config, name) {
            if (config.type !== 'entity') {
                return;
            }

            var entity = {};

            _.extend(entity, config);

            delete entity.type;

            output.entities[name] = entity;

            output.values[name] = {
                type: "repository",
                entity: name
            };

            _.each(RepositoryDefinition.subDefinitions, function(subDef, subDefName) {
                output.values[name + '.' + subDefName] = subDef;
            });
        });
    };

    EntityTransformer.prototype.resolve = function(input, output) {
        var repositoryDefinition = {};
        _.extend(repositoryDefinition, RepositoryDefinition);
        delete repositoryDefinition.subDefinitions;

        _.each(output.values, function(config, name) {
            if (config.type !== 'repository') {
                return;
            }

            var repository = {};

            _.extend(repository, repositoryDefinition, config);

            output.values[name] = repository;
        });
    };


    EntityTransformer.prototype.validate = function(input, output) {
        _.each(output.values, function(config, name) {
            if (config.type !== 'repository') {
                return;
            }

            if (config.entity === null) {
                throw new Error('No entity defined for repository ' + name);
            }

            if (output.entities[config.entity] === undefined) {
                throw new Error("Entity " + config.entity + " was not found. Referenced by repository " + name);
            }
        });
    };

    return EntityTransformer;
});