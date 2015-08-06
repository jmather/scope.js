if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore', '../definitions/collection'], function (_, CollectionDefinition) {
    function ObjectTransformer(config) {
        this.config = config;
    }

    /**
     *
     * @param {Array.Object} input
     * @param output
     */
    ObjectTransformer.prototype.preProcess = function (input, output) {
        output.objects = {};

        var subDefinitions = CollectionDefinition.subDefinitions;
        var collectionDefinition = {};
        _.extend(collectionDefinition, CollectionDefinition);
        delete collectionDefinition.subDefinitions;

        _.each(input, function(config, name) {
            if (config.type !== 'object') {
                return;
            }

            var object = {};

            _.extend(object, config);

            delete object.type;

            output.objects[name] = object;
            output.values[name] = {
                type: "collection",
                object: name
            };

            _.each(subDefinitions, function(subConfig, subName) {
                var subDef = {};
                _.extend(subDef, subConfig);
                output.values[name + '.' + subName] = subDef;
            });
        });
    };

    return ObjectTransformer;
});