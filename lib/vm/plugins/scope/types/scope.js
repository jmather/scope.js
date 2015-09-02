var _ = require('underscore');
var InstructionExecutor = require('../lib/instruction-executor');
var ExpressionExecutor = require('../expressions/executor');
var dots = require('dot');

/**
 *
 * @param {string} name
 * @param {{choices: Object.<string, {instructions: Array.Object}>}} config
 * @param {ValueManager} valueManager
 * @exports ScopeType
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
    var executor = new ExpressionExecutor(this.valueManager);

    return _.filter(this.getChoices(), function(choice) {
        return isAvailable(this.config.choices[choice], executor);
    }.bind(this));
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
    if (this.getAvailableChoices().indexOf(name) === -1) {
        throw new Error("Choice is not available.");
    }

    var executor = this.valueManager.getInstructionExecutor();
    var choice = this.getChoice(name);

    _.each(choice.instructions, _.bind(function(instruction) {
        executor.execute(this.valueManager, instruction);
    }, this));
};

/**
 *
 * @param {{ when: [] }} choice
 * @param {ExpressionExecutor} executor
 */
function isAvailable(choice, executor) {
    var success = true;

    _.each(choice.when, function(criteria) {
        if (executor.evaluateStringBoolean(criteria) === false) {
            success = false;
        }
    });

    return success;
}

module.exports = ScopeType;
