if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore'], function (_) {

    /**
     *
     * @param {Array.<{types: Object.<string, function>}>} plugins
     * @exports VM.TypeManager
     * @constructor
     */
    function TypeManager(plugins) {
        this.types = {};

        _.each(plugins, _.bind(function(plugin) {
            this.importTypes(plugin.types);
        }, this));
    }

    /**
     *
     * @param {Object.<string, function>} types
     */
    TypeManager.prototype.importTypes = function(types) {
        _.each(types, _.bind(function(typeConstructor, typeName) {
            this.importType(typeName, typeConstructor);
        }, this));
    };

    /**
     *
     * @param {string} name
     * @param {function} constructor
     */
    TypeManager.prototype.importType = function(name, constructor) {
        this.types[name] = constructor;
    };

    /**
     *
     * @param {string} name
     * @returns {*}
     */
    TypeManager.prototype.get = function(name) {
        if (this.types[name] === undefined) {
            throw new Error("No type: " + name);
        }

        return this.types[name];
    };

    return TypeManager;
});