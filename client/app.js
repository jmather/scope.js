var React = require('react');
var VMActionCreators = require('./actions/VMActionCreators');

var config = require('../build/config');
var state = {};

var ScopeJSClient = require('./components/ScopeJSClient.react');

React.render(
    <ScopeJSClient config={config} />,
    document.body
);

// Doing this on purpose to simulate loading remotely...
VMActionCreators.receivedConfig(config);
VMActionCreators.receivedState(state);