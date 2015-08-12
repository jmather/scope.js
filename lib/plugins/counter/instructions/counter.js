/**
 * @exports CounterInstructions
 */
var instructions = {};

/**
 *
 * @param {string} counterValue
 * @param {number} amount
 */
instructions.increment = function(counterValue, amount) {
    this.get(counterValue).increment(amount);
};

/**
 *
 * @param {string} counterValue
 * @param {number} amount
 */
instructions.decrement = function(counterValue, amount) {
    this.get(counterValue).decrement(amount);
};

module.exports = instructions;
