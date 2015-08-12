var React = require('react');
var Table = require('react-bootstrap').Table;

var Grid = React.createClass({
    render: function() {
        var thead = [<td></td>];
        var tbody = [];
        var tbodyCols = [];

        var i, j;

        for (i = 1; i <= this.props.definition.cols; i++) {
            thead.push(<td key={this.props.title + '_' + i}>{i}</td>);

            tbodyCols = [<td>{i}</td>];
            for (j = 1; j <= this.props.definition.rows; j++) {
                var cell = i + '-' + j;
                var display = this.props.value[cell] ? this.props.value[cell] : '';
                tbodyCols.push(<td key={this.props.title + '_' + cell} title={cell}>{display}</td>)
            }

            tbody.push(<tr>{tbodyCols}</tr>);
        }

        var caption = (this.props.title) ? <caption>{this.props.title}</caption> : '';

        return (
            <Table bordered striped responsive>
                {caption}
                <thead>
                    <tr>{thead}</tr>
                </thead>
                <tbody>
                {tbody}
                </tbody>
            </Table>
        );
    }
});

module.exports = Grid;