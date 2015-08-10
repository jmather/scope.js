var React = require('react');
var _ = require('underscore');

var Scope = require('./ScopeView/Scope.react.js');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

/**
 *
 * @type {*|Function}
 */
var ScopeView = React.createClass({
    getInitialState: function() {
        return {
            showModal: false,
            questions: []
        }
    },

    onQuestion: function(event, questions) {
        this.setState({
            questions: questions
        });
    },

    /**
     * @return {object}
     */
    render: function() {

        var view = this.props.view;

        var scopes = [];

        for (var i = 0; i < view.scopes.length; i++) {
            scopes.push(<Scope key={view.scopes[i].value} config={this.props.config} view={view.scopes[i]} onQuestion={this.onQuestion} />);
        }

        var modal = this.buildModal();

        return (

            <div>
                {scopes}
                {modal}
            </div>
        );
    },

    close: function() {
        this.setState({
            questions: []
        });
    },

    buildModal: function() {
        var questions = buildQuestions(this.state.questions);

        return (
            <Modal show={questions.length > 0} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Need INPUT!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {questions}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
});

function buildQuestions(questions) {
    return _.map(questions, buildQuestion);
}

function buildQuestion(question) {
    switch(question.type) {
        case 'pick-one':
            return buildPickOneQuestion(question);
    }

    throw new Error("Question type " + question.type + " not supported");
}

function buildPickOneQuestion(question) {
    var options = [];

    _.each(question.choices, function(choice) {
        options.push(<option key={choice} value={choice}>{choice}</option>);
    });

    return (
        <label>{question.name}: <select className="form-control" name={question.name}>{options}</select></label>
    );
}

module.exports = ScopeView;
