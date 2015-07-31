if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function (require) {
    /**
     *
     * @param {DataManager} dataManager
     * @constructor
     */
    function ValueManager(dataManager) {
        this.dataManager = dataManager;
    }

    /**
     *
     * @param {string} name
     * @param {*} fallback Returns if _name_ is not set.
     * @returns {*}
     */
    ValueManager.prototype.getData = function(name, fallback) {
        return this.dataManager.get(name, fallback);
    };

    /**
     *
     * @param {string} name
     * @param {*} value
     * @returns {*}
     */
    ValueManager.prototype.setData = function(name, value) {
        return this.dataManager.set(name, value);
    };

    return ValueManager;
});