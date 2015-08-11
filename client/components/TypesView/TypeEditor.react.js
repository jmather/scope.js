var React = require('react');
var _ = require('underscore');

var ScopeStore = require('../../store/VMStore');

var ButtonGroup = require('../ScopeView/ButtonGroup.react.js');

var TypeEditor = React.createClass({
    getInitialState: function() {
        var rendered = require('pretty-data').pd.json(this.props.content);

        return {
            value: (rendered === null) ? this.props.content : rendered
        };
    },

    handleChange: function(event) {
        this.setState({value: event.target.value});
    },

    doSave: function(e) {
        this.props.doSave(JSON.parse(this.state.value));
    },

    /**
     * @return {object}
     */
    render: function() {
        if (this.props.content === undefined) {
            return (<div>Select a value to edit.</div>);
        }

        var jsonInvalid = false;
        try {
            JSON.parse(this.state.value);
            jsonInvalid = false;
        } catch (exc) {
            jsonInvalid = true;
        }

        var value = this.state.value;

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    Edit {this.props.title}
                </div>
                <div className="panel-body">
                    <textarea rows="10" onChange={this.handleChange} value={value} className="form-control"></textarea>
                </div>
                <div className="panel-footer text-right">
                    <button disabled={jsonInvalid} className="btn btn-primary" onClick={this.doSave}>Save</button>
                </div>
            </div>
        );
    }

});

module.exports = TypeEditor;