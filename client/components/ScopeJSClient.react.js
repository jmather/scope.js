var React = require('react');

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
