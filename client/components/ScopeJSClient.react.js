var React = require('react');

var Scope = require('./Scope.react');

/**
 * Retrieve the current data from the scope
 */
function getScopeState() {
    return {
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
                <Scope/>
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
