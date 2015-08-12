var React = require('react');
var _ = require('underscore');

var ScopeStore = require('../../store/VMStore');

function getState(display) {
    return { definitions: ScopeStore.getValueDefinitions() };
}

var TypeEditor = React.createClass({
    getInitialState: function() {
        var state = getState();
        state.section = 'values';
        state.value = null;
        return state;
    },

    componentDidMount: function() {
        ScopeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ScopeStore.removeChangeListener(this._onChange);
    },

    updateSection: function(e) {
        this.setState({section: e.target.getAttribute('data-section'), value: null});
    },

    updateValue: function(e) {
        this.setState({value: e.target.getAttribute('data-value')});
    },

    addEntry: function(e) {

    },

    doSave: function(value) {
        var definitions = _.clone(this.state.definitions);
        definitions[this.state.section][this.state.value] = value;
        ScopeStore.replaceVMConfig(definitions);
        this.setState({definitions: definitions});
    },

    /**
     * @return {object}
     */
    render: function() {
        var types = this.state.definitions;

        var options = [];
        _.each(types, function(config, name) {
            if (name === this.state.section) {
                selected = name;
            }
            options.push(<li key={name}><a onClick={this.updateSection} data-section={name}>{name}</a></li>);
        }.bind(this));

        var contents = [];
        _.each(types[this.state.section], function(config, name) {
            contents.push(<button key={name} data-value={name} onClick={this.updateValue} className="list-group-item btn-block">{name}</button>);
        }.bind(this));

        var TypeEditor = require('./../Panels/JSONEditor.react.js');

        var editorContent = (types[this.state.section] && types[this.state.section][this.state.value]) ? types[this.state.section][this.state.value] : undefined;
        var editorKey = this.state.section + '.' + this.state.value;

        return (
            <div className="container">
                <div className="col-xs-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">

                            <div className="btn-group" role="group">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Edit entries in <span ref="selectedName">{this.state.section}</span> <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        {options}
                                    </ul>
                                    <button type="button" className="btn btn-default" onClick={this.addEntry}>Add Entry</button>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <div className="btn-group-vertical" style={{width: "100%"}} role="group">
                                {contents}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-8">
                    <TypeEditor key={editorKey} title={this.state.section + '.' + this.state.value} doSave={this.doSave} content={editorContent} />
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