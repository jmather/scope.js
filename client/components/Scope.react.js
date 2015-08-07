var React = require('react');
var _ = require('underscore');

var ScopeStore = require('../store/ScopeStore');

var Button = require('./Scope/Button.react');

var Scope = React.createClass({
    /**
     * @return {object}
     */
    render: function() {
        var commands = ScopeStore.getCommandsForScope(this.props.view.value);
        var buttons = [];

        _.each(commands, function(command) {
            buttons.push(<Button key={command} scope={this.props.view.value} command={command} />);
        }.bind(this));

        return (
            <div className="col-xs-4">
                <div className="panel panel-default">
                    <div className="panel-heading">{this.props.view.title}</div>
                    <div className="panel-body"></div>
                    <div className="panel-footer">{buttons}</div>
                </div>
            </div>
        );
    }
});

module.exports = Scope;