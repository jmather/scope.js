if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function(requre) {
    var instructions = {};

    /**
     *
     * @param {string} value
     * @param {string} choice
     */
    instructions.execute = function(value, choice) {
        this.get(value).executeChoice(choice);
    };

    return instructions;
});