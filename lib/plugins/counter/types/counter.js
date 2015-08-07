var _ = require('underscore');

/**
 *
 * @param {string} name
 * @param {{max: integer, min: integer, step: integer, default: integer}} config
 * @param {ValueManager} valueManager
 * @exports CounterType
 * @constructor
 */
function CounterType(name, config, valueManager) {
    this.config = config;
    this.name = name;
    this.valueManager = valueManager;
}


CounterType.definition = require('../definitions/counter');
CounterType.transformation = require('../transformations/counter');

/**
 *
 * @param {number} [amount]
 */
CounterType.prototype.increment = function(amount) {
    var currentValue = this.getValue();

    if (amount === undefined) {
        amount = this.config.step;
    }

    var newValue = currentValue + amount;

    if (isAboveMax.call(this, newValue)) {
        throw new Error('Counter limit hit: ' + currentValue + ' + ' + amount + ' > ' + this.config.max);
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
        amount = this.config.step;
    }

    var newValue = currentValue - amount;

    if (isBelowMin.call(this, newValue)) {
        throw new Error('Counter limit hit: ' + currentValue + ' - ' + amount + ' < ' + this.config.min);
    }

    setValue.call(this, newValue);

    return newValue;
};

/**
 * @return {number}
 */
CounterType.prototype.getValue = function() {
    return this.valueManager.getData(this.name, this.config.default);
};

/**
 *
 * @param {string} value
 * @returns {*}
 */
CounterType.prototype.setValue = function(value) {
    if (isAboveMax.call(this, value) || isBelowMin.call(this, value)) {
        throw new Error('Value is out of bounds: ' + JSON.stringify({min: this.config.min, max: this.config.max}));
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
    return (this.config.min !== null && value < this.config.min);
}

/**
 *
 * @param {number} value
 * @returns {boolean}
 */
function isAboveMax(value) {
    return (this.config.max !== null && value > this.config.max);
}

module.exports = CounterType;
