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
     * @return Array.string
     */
    ScopeType.prototype.getChoices = function() {
        return _.keys(this.config.choices);
    };

    ScopeType.prototype.executeChoice = function(choice) {
        var executor = new InstructionExecutor
    };

    return ScopeType;
});