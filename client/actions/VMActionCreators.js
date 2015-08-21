var AppDispatcher = require('../dispatcher/AppDispatcher');
var VMConstants = require('../constants/VMConstants');

var VMActions = VMConstants.actionTypes;

module.exports = {
    /**
     *
     * @param {string} scope
     * @param {string} [command]
     * @param {Object.<string, *>} [arguments]
     * @param {{target: Node}} source
     */
    executeScope: function(scope, command, arguments, source) {
        AppDispatcher.dispatch({
            actionType: VMActions.VM_EXECUTE,
            scope: scope,
            command: command,
            arguments: arguments,
            source: source
        });
    },

    receivedState: function(state) {
        AppDispatcher.dispatch({
            actionType: VMActions.RECEIVED_STATE,
            state: state
        });
    },

    receivedConfig: function(config) {
        AppDispatcher.dispatch({
            actionType: VMActions.RECEIVED_CONFIG,
            config: config
        });
    },

    receivedConstructor: function(constructor) {
        AppDispatcher.dispatch({
            actionType: VMActions.RECEIVED_CONSTRUCTOR,
            constructor: constructor
        });
    },

    receivedPlugins: function(plugins) {
        AppDispatcher.dispatch({
            actionType: VMActions.RECEIVED_PLUGINS,
            plugins: plugins
        });
    },

    initialized: function() {
        AppDispatcher.dispatch({
            actionType: VMActions.INITIALIZED
        });
    },

    /**
     *
     * @param {Object.<string, *>} state
     */
    replaceState: function(state) {
        AppDispatcher.dispatch({
            type: VMActions.VM_REPLACE_STATE,
            state: state
        });
    },

    /**
     *
     * @param {Object.<string, *>} config
     */
    replaceConfig: function(config) {
        AppDispatcher.dispatch({
            type: VMActions.VM_REPLACE_CONFIG,
            config: config
        });
    }
};