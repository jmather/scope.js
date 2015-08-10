var React = require('react');
var _ = require('underscore');

var Button = require('./Button.react');

var ButtonGroup = React.createClass({
    /**
     * @return {object}
     */
    render: function() {
        var buttons = [];

        _.each(this.props.commands, function(command) {
            var label = (this.props.view.commandMap && this.props.view.commandMap[command]) ? this.props.view.commandMap[command] : command;
            buttons.push(<Button key={command} scope={this.props.view.value} command={command} label={label} onQuestion={this.props.onQuestion} />)
        }.bind(this));

        return (
            <div className="panel-footer">{buttons}</div>
        );
    }
});

module.exports = ButtonGroup;