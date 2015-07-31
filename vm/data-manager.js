if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function (require) {

    /**
     *
     * @param {Object.<string, *>} data
     * @constructor
     */
    function DataManager(data) {
        this.data = data || {};
    }

    /**
     *
     * @param {string} name
     * @param {*} fallback Returns if _name_ is not set.
     * @returns {*}
     */
    DataManager.prototype.get = function(name, fallback) {
        if (this.data[name] === undefined) {
            return fallback;
        }

        return this.data[name];
    };

    /**
     * Set a new value for key _name_, returns prior value
     * @param {string} name
     * @param {*} value
     * @returns {*}
     */
    DataManager.prototype.set = function(name, value) {
        var oldValue = this.data[name];

        this.data[name] = value;

        return (oldValue === undefined) ? null : oldValue;
    };

    return DataManager;
});