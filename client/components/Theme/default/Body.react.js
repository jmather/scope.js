var React = require('react');

var Body = React.createClass({
    /**
     * @return {object}
     */
    render: function() {
        return (
            <div class="container-fluid">
                <div class="row">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Body;
