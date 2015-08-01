if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function (require) {
    /**
     *
     * @param {DataManager} dataManager
     * @param {TypeManager} typeManager
     * @constructor
     */
    function ValueManager(dataManager, typeManager) {
        this.dataManager = dataManager;
        this.typeManager = typeManager;
        this.instances = {};
    }

    ValueManager.prototype.initialize = function(name) {
        var valueConfiguration = this.getData('data.' + name);
        var builder = this.typeManager.getBuilder(name);
        this.instances[name] = builder(name, valueConfiguration, this);
    };

    /**
     *
     * @param {string} name
     * @returns {*}
     */
    ValueManager.prototype.get = function(name) {
        if (this.instances[name] === undefined) {
            this.initialize(name);
        }

        return this.instances[name];
    };

    /**
     *
     * @param {string} name
     * @param {*} [fallback] Returns if _name_ is not set.
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

    /**
     * @return {ValueManager}
     */
    ValueManager.prototype.clone = function() {
        var dataManager = this.dataManager.clone();
        return new ValueManager(dataManager, this.typeManager);
    };

    return ValueManager;
});