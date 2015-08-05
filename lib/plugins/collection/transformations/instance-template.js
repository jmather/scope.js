if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore'], function (_) {
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

            _.extend(template, instanceConfig);

            delete template.type;

            output.instanceTemplates[name] = template;
        });
    };

    return InstanceTemplateTransformer;
});