var React = require('react');
var Table = require('react-bootstrap').Table;
var _ = require('underscore');

var Map = React.createClass({
    render: function() {
        var listItems = [];

        _.each(this.props.value, (data, index) => {
            listItems.push(<tr key={this.props.title + '_list_item_' + index}><td>{index}</td><td>{JSON.stringify(data)}</td></tr>);
        });

        return (
            <div>
                <strong>{this.props.title}:</strong>
                <Table bordered striped responsive>
                    <thead>
                        <tr><th>Key</th><th>Value</th></tr>
                    </thead>
                    <tbody>{listItems}</tbody>
                </Table>
            </div>
        );
    }
});

module.exports = Map;