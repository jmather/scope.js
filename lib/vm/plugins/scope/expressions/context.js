/**
 *
 * @param {ValueManager} valueManager
 * @constructor
 */
function ExecutorContext(valueManager) {
    this.valueManager = valueManager;
}

/**
 *
 * @param {string} value
 */
ExecutorContext.prototype.getValue = function(value) {
    return this.valueManager.get(value).getValue();
};

module.exports = ExecutorContext;