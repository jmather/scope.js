if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore', '../definitions/instance-template'], function (_, TemplateDefinition) {
    function InstanceTemplateTransformer(config) {
        this.config = config;
    }

    /**
     *
     * @param {Array.Object} input
     * @param output
     */
    InstanceTemplateTransformer.prototype.preProcess = function (input, output) {
        output.instanceTemplates = {};

        _.each(input, function(instanceConfig, name) {
            if (instanceConfig.type !== 'instance-template') {
                return;
            }

            var template = {};

            _.extend(template, TemplateDefinition, instanceConfig);

            output.instanceTemplates[name] = template;
        });
    };

    return InstanceTemplateTransformer;
});