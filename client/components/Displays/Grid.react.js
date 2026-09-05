var React = require('react');
var Table = require('react-bootstrap').Table;

var Grid = React.createClass({
    render: function() {
        var cellKey = (row, col) => {
            var cell = row + '-' + col;
            return this.props.title + '_cell_' + cell;
        }
        var rowKey = (row) => this.props.title + '_row_' + row;
        var headerKey = (col) => this.props.title + '_head_col_' + col;
        var thead = [<td key={headerKey(0)}></td>];
        var tbody = [];
        var tbodyCols = [];
        var i, j;

        for (i = 1; i <= this.props.definition.cols; i++) {
            thead.push(<td key={this.props.title + '_head_col_' + i}>{i}</td>);

            tbodyCols = [<td key={cellKey(i, 0)}>{i}</td>];
            for (j = 1; j <= this.props.definition.rows; j++) {
                var cell = i + '-' + j;
                var display = this.props.value[cell] ? this.props.value[cell] : '';
                tbodyCols.push(<td key={cellKey(i, j)} title={cell}>{display}</td>)
            }

            tbody.push(<tr key={rowKey(i)}>{tbodyCols}</tr>);
        }

        var caption = (this.props.title) ? <caption>{this.props.title}</caption> : null;

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