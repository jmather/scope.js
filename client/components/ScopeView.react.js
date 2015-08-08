var React = require('react');

var Scope = require('./ScopeView/Scope.react.js');

/**
 *
 * @type {*|Function}
 */
var ScopeView = React.createClass({
    /**
     * @return {object}
     */
    render: function() {

        var view = this.props.view;

        var scopes = [];

        for (var i = 0; i < view.scopes.length; i++) {
            scopes.push(<Scope key={view.scopes[i].value} config={this.props.config} view={view.scopes[i]} />);
        }

        return (

            <div>
                {scopes}
            </div>
        );
    }
});

module.exports = ScopeView;
