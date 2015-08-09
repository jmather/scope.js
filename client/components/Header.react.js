var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var _ = require('underscore');

var Header = React.createClass({
    changeView: function(e) {
        this.props.changeView(e.target.getAttribute('data-name'));
    },

    /**
     * @return {object}
     */
    render: function() {
        var links = [];

        _.each(this.props.views, function(view, name) {
            var activeClass = (this.props.view === name) ? 'active': '';
            links.push(<li key={name} className={activeClass}><a href="#" className="btn" data-name={name} onClick={this.changeView}>{view.title}</a></li>);
        }.bind(this));

        return (
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                    {links}
                </ul>
            </div>
        );
    }
});

module.exports = Header;
