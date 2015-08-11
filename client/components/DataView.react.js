var React = require('react');
var _ = require('underscore');

var ScopeStore = require('../store/VMStore');

var ButtonGroup = require('./ScopeView/ButtonGroup.react.js');

function getState(display) {
    return { data: ScopeStore.getData() };
}

var TypeEditor = React.createClass({
    getInitialState: function() {
        var state = getState();
        state.value = null;
        return state;
    },

    componentDidMount: function() {
        ScopeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ScopeStore.removeChangeListener(this._onChange);
    },

    updateValue: function(e) {
        this.setState({value: e.target.getAttribute('data-value')});
    },

    addEntry: function(e) {

    },

    doSave: function(value) {
        var data = _.clone(this.state.data);
        data[this.state.value] = value;
        ScopeStore.replaceVMState(data);
        this.setState({data: data});
    },

    /**
     * @return {object}
     */
    render: function() {
        var types = this.state.data;

        var contents = [];
        _.each(types, function(config, name) {
            contents.push(<button key={name} data-value={name} onClick={this.updateValue} className="list-group-item btn-block">{name}</button>);
        }.bind(this));

        var TypeEditor = require('./TypesView/TypeEditor.react');

        var editorContent = (types[this.state.value]) ? types[this.state.value] : undefined;

        var editorKey = this.state.value;

        return (
            <div className="container">
                <div className="col-xs-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Edit data entries
                            <button type="button" className="btn btn-default" onClick={this.addEntry}>Add Entry</button>
                        </div>
                        <div className="panel-body">
                            <div className="btn-group-vertical" style={{width: "100%"}} role="group">
                                {contents}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-8">
                    <TypeEditor key={editorKey} title={this.state.value} doSave={this.doSave} content={editorContent} />
                </div>
            </div>
        );
    },

    /**
     * Event handler for 'change' events coming from the ScopeStore
     */
    _onChange: function() {
        this.setState(getState(this.props.view.display));
    }
});

module.exports = TypeEditor;