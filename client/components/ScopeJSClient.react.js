var React = require('react');
var VMActions = require('../constants/VMConstants').actionTypes;

var DefaultTheme = require('./Theme/default/index');
var VMStore = require('../store/VMStore');

var Scope = require('./ScopeView/Scope.react.js');

var ScopeJSClient = React.createClass({
    getInitialState: function() {
        return {
            view: false,
            theme: 'default',
            initialized: false
        };
    },

    changeView: function(view) {
        this.setState({view: view});
    },

    /**
     * @return {object}
     */
    render: function() {
        if (this.state.initialized === false) {
            return this.renderWaiting();
        }

        var view = this.state.config.views[this.state.view];

        var content = null;

        // @TODO This should be cleaned up to use input from this.props.config.client
        if (this.state.view == 'client.views.home') {
            var ScopeView = require('./ScopeView.react');
            content = <ScopeView view={view} />;
        } else if (this.state.view == 'client.views.config') {
            var TypesView = require('./TypesView.react');
            content = <TypesView view={view} />
        } else if (this.state.view == 'client.views.data') {
            var DataView = require('./DataView.react');
            content = <DataView view={view} />
        }

        var ContentHeader = require('./Header.react');

        return (

            <DefaultTheme.Wrapper className="container">
                <DefaultTheme.Header brand="Scope.js">
                    <ContentHeader changeView={this.changeView} views={this.state.config.views} view={this.state.view} />
                </DefaultTheme.Header>
                <DefaultTheme.Body>
                    {content}
                </DefaultTheme.Body>
            </DefaultTheme.Wrapper>
        );
    },

    renderWaiting: function() {
        return (

            <DefaultTheme.Wrapper className="container">
                <DefaultTheme.Header brand="Scope.js" />
                <DefaultTheme.Body>
                    Loading engine...
                </DefaultTheme.Body>
            </DefaultTheme.Wrapper>
        );
    },

    componentDidMount: function() {
        VMStore.addInitListener(this._onInit);
    },

    componentWillUnmount: function() {
        VMStore.removeInitListener(this._onInit);
    },

    /**
     * Event handler for 'change' events coming from the TodoStore
     */
    _onInit: function() {
        var config = VMStore.getConfigCategory('client');
        this.setState({
            config: config,
            initialized: true,
            view: this.state.view || config.defaultView
        });
    }

});

module.exports = ScopeJSClient;