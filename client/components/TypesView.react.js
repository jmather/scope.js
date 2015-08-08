var React = require('react');
var _ = require('underscore');

var ScopeStore = require('../store/ScopeStore');

var ButtonGroup = require('./ScopeView/ButtonGroup.react.js');

function getState(display) {
    return { definitions: ScopeStore.getValueDefinitions() };
}

var TypesView = React.createClass({
    getInitialState: function() {
        return getState();
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
        var types = this.state.definitions;

        var contents = [];

        var Type = require('./TypesView/Type.react.js');
        _.each(types, function(config, name) {
            contents.push(<Type key={name} name={name} config={config}/>);
        });

        return (
            <div className="container">
                <div className="col-xs-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">Types</div>
                        <div className="panel-body">
                        </div>
                    </div>
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

module.exports = TypesView;