if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(requre) {
    var instructions = {};

    /**
     *
     * @param {string} value
     * @param {number} amount
     */
    instructions.increment = function(value, amount) {
        this.get(value).increment(amount);
    };

    /**
     *
     * @param {string} value
     * @param {number} amount
     */
    instructions.decrement = function(value, amount) {
        this.get(value).decrement(amount);
    };

    return instructions;
});