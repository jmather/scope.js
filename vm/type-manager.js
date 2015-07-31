if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function (require) {

    /**
     *
     * @param {Object.<string, *>} types
     * @constructor
     */
    function TypeManager(types) {
        this.types = types || {};
    }

    /**
     *
     * @param {string} name
     * @returns {*}
     */
    TypeManager.prototype.getBuilder = function(name) {
        if (this.types[name] === undefined) {
            throw new Error("No type: " + name);
        }

        return this.data[name];
    };

    /**
     * Set a new value for key _name_, returns prior value
     * @param {string} name
     * @param {*} value
     * @returns {*}
     */
    TypeManager.prototype.add = function(name, value) {
        var oldValue = this.data[name];

        this.data[name] = value;

        return (oldValue === undefined) ? null : oldValue;
    };

    return TypeManager;
});