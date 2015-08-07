/**
 *
 * @exports ScopeInstructions
 */
var instructions = {};

/**
 *
 * @param {string} value
 * @param {string} choice
 */
instructions.execute = function(value, choice) {
    var scope = this.get(value);

    if (choice === null) {
        this.questionManager.ask('choice', 'pick-one', scope.getAvailableChoices());
        throw this.questionManager.getThrowable();
    }

    scope.executeChoice(choice);
};

module.exports = instructions;
