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
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        {links}
                    </ul>
                </div>
            </header>
        );
    }
});

module.exports = Header;
