var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

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
    init: function(VMConstructor, state, config, plugins) {
        this.config = config;
        this.plugins = plugins;
        this.VMConstructor = VMConstructor;
        this.vm = vmBuilder.build(this.VMConstructor, state, this.config, this.plugins);
        this.emit(INITIALIZE_EVENT);
    },

    replaceVMConfig: function(config) {
        this.config = config;
        this.vm = vmBuilder.build(this.VMConstructor, this.vm.valueManager.dataManager.data.toJS(), config, this.plugins);
        this.emitChange();
    },

    replaceVMState: function(state) {
        this.vm = vmBuilder.build(this.VMConstructor, state, this.vm.valueManager.valueConfig, this.plugins);
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
    config: false,
    plugins: false,
    VMConstructor: false
};

function attemptToInit() {
    // this is crappy -- checks to see if any are not receeived and returns false,
    // otherwise it returns true
    if (_.reduce(received, function(memo, val) { return (val) ? memo : false; }, true) === false) {
        return;
    }

    VMStore.init(received.VMConstructor, received.state, received.config, received.plugins);
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
        case VMActions.RECEIVED_PLUGINS:
            received.plugins = action.plugins;
            attemptToInit();
            break;
        case VMActions.RECEIVED_CONSTRUCTOR:
            received.VMConstructor = action.constructor;
            attemptToInit();
            break;
        default:
        // no op
    }
});

window.VMStore = VMStore;

module.exports = VMStore;