var React = require('react');

var Scope = require('./Scope.react');

/**
 * Retrieve the current data from the scope
 */
function getScopeState() {
    return {
    };
}

var ScopeJSClient = React.createClass({
    getInitialState: function() {
        var state = getScopeState();
        state.view = 'client.views.home';
        state.theme = 'default';

        return state;
    },

    /**
     * @return {object}
     */
    render: function() {
        var Header = require('./Theme/default/Header.react');
        var Body = require('./Theme/default/Body.react');

        var view = this.props.config.client.views[this.state.view];

        var scopes = [];

        for (var i = 0; i < view.scopes.length; i++) {
            scopes.push(<Scope key={view.scopes[i].value} config={this.props.config} view={view.scopes[i]} />);
        }

        return (

            <div className="container">
                <Header />
                <Body>
                    {scopes}
                </Body>
            </div>
        );
    },

    /**
     * Event handler for 'change' events coming from the TodoStore
     */
    _onChange: function() {
        this.setState(getScopeState());
    }

});

module.exports = ScopeJSClient;
