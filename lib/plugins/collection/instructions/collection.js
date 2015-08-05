if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore'], function(_) {
    var instructions = {};

    /**
     *
     * @param {string} value
     * @param {*} properties
     */
    instructions.create = function(value, properties) {
        var collection = this.get(value);
        var templateName = collection.getTemplate();
        var template = this.getConfig('instanceTemplates', templateName);
        var container = {template: templateName};

        var failed = false;

        _.each(template, _.bind(function(val, name) {
            if (properties[name] !== undefined) {
                container[name] = properties[name];
                return;
            }

            failed = true;
            this.questionManager.ask(name, val.type, val.choices);
        }, this));

        if (failed) {
            throw this.questionManager.getThrowable();
        }
    };

    /**
     *
     * @param {string} value
     * @param {number} amount
     */
    instructions.decrement = function(value, amount) {
        this.get(value).decrement(amount);
    };

    return instructions;
});