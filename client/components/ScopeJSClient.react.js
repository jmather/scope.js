var React = require('react');

var Scope = require('./ScopeView/Scope.react.js');

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

    changeView: function(view) {
        this.setState({view: view});
    },

    /**
     * @return {object}
     */
    render: function() {
        var Header = require('./Theme/default/Header.react');
        var Body = require('./Theme/default/Body.react');

        var view = this.props.config.client.views[this.state.view];

        var content = null;

        // @TODO This should be cleaned up to use input from this.props.config.client
        if (this.state.view == 'client.views.home') {
            var ScopeView = require('./ScopeView.react');
            content = <ScopeView view={view} config={this.props.config} />;
        } else if (this.state.view == 'client.views.config') {
            var TypesView = require('./TypesView.react');
            content = <TypesView view={view} />
        }

        var ContentHeader = require('./Header.react');

        return (

            <div className="container">
                <Header brand="Scope.js">
                    <ContentHeader changeView={this.changeView} views={this.props.config.client.views} view={this.state.view} />
                </Header>
                <Body>
                    {content}
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
