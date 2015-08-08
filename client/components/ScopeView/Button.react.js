var React = require('react');

var BootstrapButton = require('react-bootstrap').Button;

var ScopeStore = require('../../store/ScopeStore');

var Button = React.createClass({
    handleClick: function() {
        ScopeStore.execute(this.props.scope, this.props.command);
    },
    /**
     * @return {object}
     */
    render: function() {
        return (
            <BootstrapButton bsSize="small" key={this.props.command} onClick={this.handleClick}>{this.props.label}</BootstrapButton>
        );
    }
});

module.exports = Button;