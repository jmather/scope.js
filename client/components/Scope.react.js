var React = require('react');
var _ = require('underscore');

var ScopeStore = require('../store/ScopeStore');

var ButtonGroup = require('./Scope/ButtonGroup.react');

function getState(display) {
    var results = {};
    if (display === undefined) {
        return results;
    }

    _.each(display, function(val) {
        results[val.value] = ScopeStore.getValue(val.value);
    });

    console.log('set state', results);
    return results;
}

var Scope = React.createClass({
    getInitialState: function() {
        return getState(this.props.view.display);
    },

    componentDidMount: function() {
        ScopeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ScopeStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function() {
        var commands = ScopeStore.getCommandsForScope(this.props.view.value);
        var info = [];
        console.log('state', this.state);
        if (this.props.view.display !== undefined) {
            _.each(this.props.view.display, function(val) {
                info.push(<div key={val.value}><strong>{val.title}:</strong> {this.state[val.value]}</div>);
            }.bind(this));
        }
        return (
            <div className="col-xs-4">
                <div className="panel panel-default">
                    <div className="panel-heading">{this.props.view.title}</div>
                    <div className="panel-body">{info}</div>
                    <ButtonGroup view={this.props.view} commands={commands} />
                </div>
            </div>
        );
    },

    /**
     * Event handler for 'change' events coming from the TodoStore
     */
    _onChange: function() {
        this.setState(getState(this.props.view.display));
    }
});

module.exports = Scope;