if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore', '../definitions/collection'], function (_, CollectionDefinition) {
    function CollectionTransformer(config) {
        this.config = config;
    }

    CollectionTransformer.prototype.process = function(input, output) {
        var collectionDefinition = {};
        _.extend(collectionDefinition, CollectionDefinition);
        delete collectionDefinition.subDefinitions;

        _.each(output.values, function(instanceConfig, name) {
            if (instanceConfig.type !== 'collection') {
                return;
            }


            var collection = {};

            _.extend(collection, collectionDefinition, instanceConfig);

            output.values[name] = collection;
        });
    };


    CollectionTransformer.prototype.postProcess = function(input, output) {
        _.each(output.values, function(config, name) {
            if (config.type !== 'collection') {
                return;
            }

            if (config.object === null) {
                throw new Error('No object defined for collection ' + name);
            }

            if (output.objects[config.object] === undefined) {
                throw new Error("Object " + config.object + " was not found. Referenced by collection " + name);
            }
        });
    };

    return CollectionTransformer;
});