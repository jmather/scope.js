var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var VMConstants = require('../constants/VMConstants');
var VMActions = VMConstants.actionTypes;
var VMActionCreators = require('../actions/VMActionCreators');

var vmBuilder = require('./VMStore/VM');

var CHANGE_EVENT = 'change';
var INITIALIZE_EVENT = 'initialize';

/**
 * @exports VMStore
 */
var VMStore = assign({}, EventEmitter.prototype, {
    init: function(state, config) {
        this.config = config;
        this.vm = vmBuilder.build(state, config);
        this.emit(INITIALIZE_EVENT);
    },

    replaceVMConfig: function(config) {
        this.config = config;
        this.vm = vmBuilder.build(this.vm.valueManager.dataManager.data.toJS(), config);
        this.emitChange();
    },

    replaceVMState: function(state) {
        this.vm = vmBuilder.build(state, this.vm.valueManager.valueConfig);
        this.emitChange();
    },

    getCommandsForScope: function(scope) {
        try {
            this.vm.execute(scope);
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
        return this.vm.getValueDefinitions();
    },

    /**
     *
     * @param {string} name
     * @return {*}
     */
    getValueDefinition: function(name) {
        return this.vm.getValueDefinition(name);
    },

    /**
     *
     * @return {*}
     */
    getValueDefinitionNames: function() {
        return _.keys(this.vm.getValueDefinitions());
    },

    /**
     *
     * @param {*} value
     */
    getValue: function(value) {
        return this.vm.getValue(value);
    },

    getData: function() {
        return this.vm.getData();
    },

    getConfig: function() {
        return this.config;
    },

    getConfigCategory: function(category) {
        if (this.config[category] === undefined) {
            throw new Error("Unknown category: " + category);
        }

        return this.config[category];
    },

    /**
     *
     * @param scope
     * @param command
     * @param [arguments]
     * @returns {Array.<{value: string, old: *, new: *, caller: *}>}
     */
    execute: function(scope, command, arguments) {
        var changes = this.vm.execute(scope, command, arguments);
        this.emitChange(changes);
    },

    /**
     *
     * @param {*} [changes]
     */
    emitChange: function(changes) {
        this.emit(CHANGE_EVENT, changes);
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
    },

    /**
     * @param {function} callback
     */
    addInitListener: function(callback) {
        this.on(INITIALIZE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeInitListener: function(callback) {
        this.removeListener(INITIALIZE_EVENT, callback);
    }
});

var received = {
    state: false,
    config: false
};

function attemptToInit() {
    if (received.state === false || received.config === false) {
        return;
    }

    VMStore.init(received.state, received.config);
}

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case VMActions.RECEIVED_STATE:
            received.state = action.state;
            attemptToInit();
            break;
        case VMActions.RECEIVED_CONFIG:
            received.config = action.config;
            attemptToInit();
            break;
        default:
        // no op
    }
});

module.exports = VMStore;