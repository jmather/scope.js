/**
 *
 * @exports VM.InputManager
 * @constructor
 */
function InputManager() {
    this.answers = {};
}

/**
 *
 * @param {Object.<string, *>} data
 */
InputManager.prototype.setAnswers = function(data) {
    this.answers = data;
};

/**
 *
 * @param {string} name
 * @param {*} fallback
 * @returns {*}
 */
InputManager.prototype.get = function(name, fallback) {
    return (this.answers && this.answers[name]) ? this.answers[name] : fallback;
};

module.exports = InputManager;
