var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ScopeConstants = require('../constants/ScopeConstants');
var assign = require('object-assign');

var vm = require('./ScopeStore/VM');

var CHANGE_EVENT = 'change';

/**
 * @exports ScopeStore
 */
var ScopeStore = assign({}, EventEmitter.prototype, {

    getCommandsForScope: function(scope) {
        try {
            vm.execute(scope);
        } catch (e) {
            if (e.questions && e.questions.length > 0) {
                return e.questions[0].choices;
            }

            return [];
        }
    },

    /**
     *
     * @return {*}
     */
    getValueDefinitions: function() {
        return vm.getValueDefinitions();
    },

    /**
     *
     * @return {*}
     */
    getValueDefinitionNames: function() {
        return _.keys(vm.getValueDefinitions());
    },

    /**
     *
     * @param {*} value
     */
    getValue: function(value) {
        return vm.getValue(value);
    },

    /**
     *
     * @param scope
     * @param command
     * @returns {Array.<{value: string, old: *, new: *, caller: *}>}
     */
    execute: function(scope, command) {
        var changes = vm.execute(scope, command);
        this.emitChange();
        return changes;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var text;

    switch(action.actionType) {
        default:
        // no op
    }
});

module.exports = ScopeStore;