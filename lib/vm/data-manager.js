if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['immutable'], function (Immutable) {

    /**
     *
     * @param {Object.<string, *>} data
     * @exports VM.DataManager
     * @constructor
     */
    function DataManager(data) {
        this.data = new Immutable.Map(data || {});
        this.logChanges = false;
    }

    /**
     *
     */
    DataManager.prototype.enableChangeLogging = function() {
        if (this.logChanges) {
            throw new Error("Logging already enabled");
        }

        this.logChanges = true;
        this.changeLog = [];
    };

    /**
     *
     * @returns {Array.<{value: string, old: *, new: *, caller: *}>}
     */
    DataManager.prototype.disableChangeLogging = function() {
        if (this.logChanges === false) {
            throw new Error("Logging already disabled");
        }

        this.logChanges = false;
        return this.changeLog;
    };

    /**
     *
     * @returns {Array.<{value: string, old: *, new: *, caller: *}>}
     */
    DataManager.prototype.getChangeLog = function() {
        return this.changeLog;
    };

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
        var oldData = (this.data.has(name)) ? this.data.get(name) : null;
        this.data = this.data.set(name, value);

        if (this.logChanges) {
            this.changeLog.push({value: name, old: oldData, new: value, caller: arguments.callee.caller});
        }

        return oldData;
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