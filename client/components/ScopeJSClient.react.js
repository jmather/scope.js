var React = require('react');

var ScopeStore = require('../store/ScopeStore');

/**
 * Retrieve the current data from the scope
 */
function getScopeState() {
    return {
        scopes: ScopeStore.getCommandsForScope('counter.scope')
    };
}

var ScopeJSClient = React.createClass({
    getInitialState: function() {
        return getScopeState();
    },

    /**
     * @return {object}
     */
    render: function() {
        return (
            <div>
                Hello!
            </div>
        );
    },

    /**
     * Event handler for 'change' events coming from the TodoStore
     */
    _onChange: function() {
        this.setState(getScopeState());
    }

});

module.exports = ScopeJSClient;
