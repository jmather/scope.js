var React = require('react');

var Button = React.createClass({
    /**
     * @return {object}
     */
    render: function() {
        return (
            <button key={this.props.command}>{this.props.command}</button>
        );
    }
});

module.exports = Button;