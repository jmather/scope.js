var React = require('react');

var Wrapper = React.createClass({
    /**
     * @return {object}
     */
    render: function() {
        return (
            <div className="container">{this.props.children}</div>
        );
    }
});

module.exports = Wrapper;
