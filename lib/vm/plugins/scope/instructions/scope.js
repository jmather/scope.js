/**
 *
 * @exports ScopeInstructions
 */
var instructions = {};

/**
 *
 * @param {string} scopeValue
 * @param {string} choice
 */
instructions.execute = function(scopeValue, choice) {
    var scope = this.get(scopeValue);

    if (choice === null) {
        this.questionManager.ask('choice', 'pick-one', scope.getAvailableChoices());
        throw this.questionManager.getThrowable();
    }

    scope.executeChoice(choice);
};

module.exports = instructions;
