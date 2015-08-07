var React = require('react');

var Body = React.createClass({
    /**
     * @return {object}
     */
    render: function() {
        return (
            <div className="container-fluid">
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Body;
