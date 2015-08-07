/**
 * @exports CounterInstructions
 */
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

module.exports = instructions;
