var React = require('react');

var DefaultTheme = require('./Theme/default/index');
var VMStore = require('../store/VMStore');

var viewTypes = {
    panel: require('./Views/Panel.react'),
    config: require('./Views/Config.react'),
    data: require('./Views/Data.react')
};

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

        var viewConfig = this.state.config.views[this.state.view];

        var View = viewTypes[viewConfig.layout];

        var ContentHeader = require('./Header.react');

        return (

            <DefaultTheme.Wrapper className="container">
                <DefaultTheme.Header brand="Scope.js">
                    <ContentHeader changeView={this.changeView} views={this.state.config.views} view={this.state.view} />
                </DefaultTheme.Header>
                <DefaultTheme.Body>
                    <View view={viewConfig} />
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
