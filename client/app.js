var React = require('react');
React.createClass = require('create-react-class');
var ReactDom = require('react-dom');
var VMActionCreators = require('./actions/VMActionCreators');

var config = require('../build/config');
var plugins = require('../build/plugins');
var vm = require('../lib/vm');
var state = {};

var ScopeJSClient = require('./components/ScopeJSClient.react');

ReactDom.render(
    <ScopeJSClient config={config} />,
    document.body
);

// Doing this on purpose to simulate loading remotely...
VMActionCreators.receivedConfig(config);
VMActionCreators.receivedState(state);
VMActionCreators.receivedPlugins(plugins);
VMActionCreators.receivedConstructor(vm);
