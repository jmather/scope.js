var React = require('react');
var _ = require('underscore');

var List = React.createClass({
    render: function() {
        var listItems = [];

        _.each(this.props.value, function(data, index) {
            listItems.push(<li>{JSON.stringify(data)}</li>);
        });

        return (
            <div>
                <strong>{this.props.title}:</strong>
                <ol>{listItems}</ol>
            </div>
        );
    }
});

module.exports = List;