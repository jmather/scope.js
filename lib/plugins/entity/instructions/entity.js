var _ = require('underscore');

/**
 *
 * @exports EntityInstructions
 */
var instructions = {};

/**
 *
 * @param {string} entity
 * @param {string} listValue
 * @param {InputManager} inputManager
 */
instructions.create = function(entity, listValue, inputManager) {
    var repository = this.get(entity);
    var template = this.getConfig('entities', entity);
    var container = {entity: entity};

    var failed = false;

    _.each(template, _.bind(function(val, name) {
        if (inputManager.get(name, undefined) !== undefined) {
            container[name] = inputManager.get(name);
            return;
        }

        failed = true;
        this.questionManager.ask(name, val.type, val.choices);
    }, this));

    if (failed) {
        throw this.questionManager.getThrowable();
    }

    var reference = repository.insert(container);
    var list = this.get(listValue);
    list.push(reference);
};

module.exports = instructions;