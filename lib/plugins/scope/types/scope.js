if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['underscore', '../../../vm/instruction-executor'], function (_, InstructionExecutor) {
    /**
     *
     * @param {string} name
     * @param {{choices: Object.<string, {instructions: Array.Object}>}} config
     * @param {ValueManager} valueManager
     * @constructor
     */
    function ScopeType(name, config, valueManager) {
        this.config = config;
        this.name = name;
        this.valueManager = valueManager;
    }

    /**
     * @return {Array.string}
     */
    ScopeType.prototype.getChoices = function() {
        return _.keys(this.config.choices);
    };

    /**
     *
     * @returns {Array.string}
     */
    ScopeType.prototype.getAvailableChoices = function() {
        return this.getChoices();
    };

    /**
     *
     * @param {string} name
     * @returns {{instructions: Array.Object}}
     */
    ScopeType.prototype.getChoice = function(name) {
        if (this.config.choices[name] === undefined) {
            throw new Error("No choice " + name);
        }
        return this.config.choices[name];
    };

    /**
     *
     * @param {string} name
     */
    ScopeType.prototype.executeChoice = function(name) {
        var executor = this.valueManager.getInstructionExecutor();
        var choice = this.getChoice(name);

        _.each(choice.instructions, _.bind(function(instruction) {
            executor.execute(this.valueManager, instruction)
        }, this));
    };

    return ScopeType;
});