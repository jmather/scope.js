if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['underscore', './definition'], function (_, definition) {
    /**
     *
     * @param {string} name
     * @param {{max: number, min: number}} config
     * @param {ValueManager} valueManager
     * @constructor
     */
    function CounterType(name, config, valueManager) {
        _.extend(this, definition, config);
        this.name = name;
        this.valueManager = valueManager;
    }

    /**
     *
     * @param {number} [amount]
     */
    CounterType.prototype.increment = function(amount) {
        var currentValue = this.getValue();

        if (amount === undefined) {
            amount = this.step;
        }

        var newValue = currentValue + amount;

        if (isAboveMax.call(this, newValue)) {
            throw new Error('Counter limit hit: ' + currentValue + ' + ' + amount + ' > ' + this.max);
        }

        setValue.call(this, newValue);

        return newValue;
    };

    /**
     *
     * @param {number} [amount]
     */
    CounterType.prototype.decrement = function(amount) {
        var currentValue = this.getValue();

        if (amount === undefined) {
            amount = this.step;
        }

        var newValue = currentValue - amount;

        if (isBelowMin.call(this, newValue)) {
            throw new Error('Counter limit hit: ' + currentValue + ' - ' + amount + ' < ' + this.min);
        }

        setValue.call(this, newValue);

        return newValue;
    };

    /**
     * @return {number}
     */
    CounterType.prototype.getValue = function() {
        return this.valueManager.getData(this.name, this.default);
    };

    /**
     *
     * @param {string} value
     * @returns {*}
     */
    CounterType.prototype.setValue = function(value) {
        if (isAboveMax.call(this, value) || isBelowMin.call(this, value)) {
            throw new Error('Value is out of bounds: ' + JSON.stringify({min: this.min, max: this.max}));
        }

        return setValue.call(this, value);
    };

    /**
     *
     * @param {number} value
     * @returns {*}
     */
    function setValue(value) {
        return this.valueManager.setData(this.name, value);
    }

    /**
     *
     * @param {number} value
     * @returns {boolean}
     */
    function isBelowMin(value) {
        return (this.min !== null && value < this.min);
    }

    /**
     *
     * @param {number} value
     * @returns {boolean}
     */
    function isAboveMax(value) {
        return (this.max !== null && value > this.max);
    }

    return CounterType;
});