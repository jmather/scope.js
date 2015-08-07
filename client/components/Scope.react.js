var React = require('react');
var _ = require('underscore');

var ScopeStore = require('../store/ScopeStore');

var Button = require('./Scope/Button.react');

var Scope = React.createClass({
    /**
     * @return {object}
     */
    render: function() {
        var commands = ScopeStore.getCommandsForScope('counter.scope');
        var buttons = [];

        _.each(commands, function(command) {
            buttons.push(<Button command={command} />);
        });
        return (
            <div>{buttons}</div>
        );
    }
});

module.exports = Scope;