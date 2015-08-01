if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['immutable'], function (Immutable) {

    /**
     *
     * @param {Object.<string, *>} data
     * @constructor
     */
    function DataManager(data) {
        this.data = new Immutable.Map(data || {});
    }

    /**
     *
     * @param {string} name
     * @param {*} [fallback] Returns if _name_ is not set.
     * @returns {*}
     */
    DataManager.prototype.get = function(name, fallback) {
        if (this.data.has(name) === false) {
            return (fallback !== undefined) ? fallback : null;
        }

        return this.data.get(name);
    };

    /**
     * Set a new value for key _name_, returns prior value
     * @param {string} name
     * @param {*} value
     * @returns {*}
     */
    DataManager.prototype.set = function(name, value) {
        var oldData = this.data;
        this.data = oldData.set(name, value);

        return (oldData.has(name)) ? oldData.get(name) : null;
    };

    /**
     *
     * @returns {DataManager}
     */
    DataManager.prototype.clone = function() {
        var data = this.data;
        return new DataManager(data);
    };

    return DataManager;
});