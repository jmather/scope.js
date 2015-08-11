var React = require('react');
var _ = require('underscore');

var ScopeStore = require('../../store/VMStore');

var ButtonGroup = require('./ButtonGroup.react.js');

var DisplayCounter = require('./Display/Counter.react');
var DisplayGrid = require('./Display/Grid.react');

function getState(display) {
    var results = {};
    if (display === undefined) {
        return results;
    }

    _.each(display, function(val) {
        results[val.value] = ScopeStore.getValue(val.value);
    });

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
        console.log(this.props);
        var commands = ScopeStore.getCommandsForScope(this.props.view.value);
        var info = [];

        if (this.props.view.display !== undefined) {
            _.each(this.props.view.display, function(val) {
                info.push(buildTagForValue(val, this.state[val.value]))
            }.bind(this));
        }
        return (
            <div className="col-xs-4">
                <div className="panel panel-default">
                    <div className="panel-heading">{this.props.view.title}</div>
                    <div className="panel-body">{info}</div>
                    <ButtonGroup view={this.props.view} commands={commands} onQuestion={this.props.onQuestion} />
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


function buildTagForValue(val, renderedValue) {
    var definition = ScopeStore.getValueDefinition(val.value);
    var type = definition.type;

    switch(type) {
        case 'counter':
            return <DisplayCounter key={val.value} title={val.title} value={renderedValue} />;
        case 'grid':
            return <DisplayGrid key={val.value} title={val.title} value={renderedValue} definition={definition} />;
    }
}

module.exports = Scope;