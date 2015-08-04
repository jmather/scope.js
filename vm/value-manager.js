if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function (require) {
    /**
     *
     * @param {Object.<string, Object>} valueConfig
     * @param {DataManager} dataManager
     * @param {TypeManager} typeManager
     * @param {InstructionExecutor} instuctionExecutor
     * @constructor
     */
    function ValueManager(valueConfig, dataManager, typeManager, instuctionExecutor) {
        this.valueConfig = valueConfig;
        this.dataManager = dataManager;
        this.typeManager = typeManager;
        this.instructionExecutor = instuctionExecutor;
        this.instances = {};
    }

    ValueManager.prototype.initialize = function(name) {
        if (this.valueConfig.values[name] === undefined) {
            throw new Error("No value definition for " + name);
        }

        var config = this.valueConfig.values[name];
        var builder = this.typeManager.get(config.type);

        this.instances[name] = new builder(name, config, this);
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
     *
     * @returns {ValueManager}
     */
    ValueManager.prototype.clone = function() {
        var dataManager = this.dataManager.clone();
        return new ValueManager(this.valueConfig, dataManager, this.typeManager, this.instructionExecutor);
    };

    /**
     * @return {ValueManager}
     */
    ValueManager.prototype.enableChangeLogging = function() {
        this.dataManager.enableChangeLogging();
    };

    /**
     *
     * @returns {Array.<{value: string, old: *, new: *, caller: *}>}
     */
    ValueManager.prototype.disableChangeLogging = function() {
        return this.dataManager.disableChangeLogging();
    };

    /**
     *
     * @returns {InstructionExecutor|*}
     */
    ValueManager.prototype.getInstructionExecutor = function() {
        return this.instructionExecutor;
    };

    return ValueManager;
});