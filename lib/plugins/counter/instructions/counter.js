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

/**
 *
 * @param {string} counterValue
 */
instructions.reset = function(counterValue) {
    this.get(counterValue).reset();
};

/**
 *
 * @param {string} counterValue
 */
instructions.setValue = function(counterValue, value) {
    this.get(counterValue).setValue(value);
};

module.exports = instructions;
