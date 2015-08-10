var React = require('react');

var Counter = React.createClass({
    render: function() {
        return (
            <div><strong>{this.props.title}:</strong> {this.props.value}</div>
        );
    }
});

module.exports = Counter;