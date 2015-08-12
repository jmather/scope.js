var React = require('react');

var BootstrapButton = require('react-bootstrap').Button;

var ScopeStore = require('../../../store/VMStore');

var VMActionCreators = require('../../../actions/VMActionCreators');

var Button = React.createClass({
    handleClick: function(event) {
        try {
            ScopeStore.execute(this.props.scope, this.props.command);
        } catch (e) {
            if (e.questions !== undefined) {
                this.props.onQuestion(event, this.props.scope, this.props.command, e.questions);
                return;
            }

            throw e;
        }
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