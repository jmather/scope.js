if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore', '../definitions/collection'], function (_, CollectionDefinition) {
    function CollectionTransformer(config) {
        this.config = config;
    }

    CollectionTransformer.prototype.preProcess = function(input, output) {
        var subDefinitions = CollectionDefinition.subDefinitions;
        var collectionDefinition = {};
        _.extend(collectionDefinition, CollectionDefinition);
        delete collectionDefinition.subDefinitions;

        _.each(input, function(instanceConfig, name) {
            if (instanceConfig.type !== 'collection') {
                return;
            }

            output.values[name] = instanceConfig;

            _.each(subDefinitions, function(subConfig, subName) {
                var subDef = {};
                _.extend(subDef, subConfig);
                output.values[name + '.' + subName] = subDef;
            });
        });
    };

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

            if (config.template === null) {
                throw new Error('No template defined for collection ' + name);
            }

            if (output.instanceTemplates[config.template] === undefined) {
                throw new Error("Instance Template " + config.template + " was not found. Referenced by collection " + name);
            }
        });
    };

    return CollectionTransformer;
});