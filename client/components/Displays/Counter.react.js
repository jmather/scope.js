var React = require('react');

var Counter = React.createClass({
    render: function() {
        var display = this.props.value;

        if (this.props.definition.labels && this.props.definition.labels[this.props.value]) {
            display = this.props.definition.labels[this.props.value]
        }

        return (
            <div><strong>{this.props.title}:</strong> {display}</div>
        );
    }
});

module.exports = Counter;