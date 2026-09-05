var React = require('react');

var Body = React.createClass({
    /**
     * @return {object}
     */
    render: function() {
        return (
            <main role="main">
                <div className="container-fluid">
                    <div className="row">
                        {this.props.children}
                    </div>
                </div>
            </main>
        );
    }
});

module.exports = Body;
