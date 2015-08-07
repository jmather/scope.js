var React = require('react');

var config = require('../build/config');

var ScopeJSClient = require('./components/ScopeJSClient.react');

React.render(
    <ScopeJSClient config={config} />,
    document.body
);