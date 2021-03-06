var React = require('react');
var _ = require('underscore');

var ScopeStore = require('../../store/VMStore');

var ButtonGroup = require('./Scope/ButtonGroup.react.js');

var Displays = require('./../Displays/index');

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
        var commands = ScopeStore.getCommandsForScope(this.props.view.value);
        var info = [];

        if (this.props.view.display !== undefined) {
            _.each(this.props.view.display, function(val) {
                info.push(buildTagForValue(val, this.state[val.value]))
            }.bind(this));
        }

        var bg = null;

        if (commands.length > 0) {
            bg = (<ButtonGroup view={this.props.view} commands={commands} onQuestion={this.props.onQuestion} />);
        }

        return (
            <div className="col-xs-4">
                <div className="panel panel-default">
                    <div className="panel-heading">{this.props.view.title}</div>
                    <div className="panel-body">{info}</div>
                    {bg}
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

    var DisplayTag = false;

    switch(type) {
        case 'counter':
            DisplayTag = Displays.Counter;
            break;
        case 'grid':
        case 'grid-collection':
            DisplayTag = Displays.Grid;
            break;
        case 'list':
            DisplayTag = Displays.List;
            break;
        case 'repository':
            DisplayTag = Displays.Map;
            break;
    }

    if (DisplayTag) {
        return <DisplayTag key={val.value} title={val.title} value={renderedValue} definition={definition} />
    }

    return <div key={val.value}><strong>{val.title}:</strong> {renderedValue}</div>;
}

Scope.ButtonGroup = ButtonGroup;

module.exports = Scope;