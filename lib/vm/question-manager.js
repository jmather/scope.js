if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore'], function (_) {
    /**
     *
     * @constructor
     */
    function QuestionManager() {
        this.questions = [];
    }

    /**
     *
     * @param {string} name
     * @param {string} type
     * @param {Array.string} choices
     */
    QuestionManager.prototype.ask = function(name, type, choices) {
        this.questions.push(new Question(name, type, choices));
    };

    /**
     *
     * @returns {QuestionError}
     */
    QuestionManager.prototype.getThrowable = function() {
        var throwable = new QuestionError(this.questions);
        this.questions = [];
        return throwable;
    };

    /**
     *
     * @param {Array.Question} questions
     * @constructor
     */
    function QuestionError(questions) {
        this.questions = questions;
    }

    /**
     *
     * @param {string} name
     * @param {string} type
     * @param {Array.string} choices
     * @constructor
     */
    function Question(name, type, choices) {
        this.name = name;
        this.type = type;
        this.choices = choices || [];
    }

    QuestionManager.Question = Question;
    QuestionManager.QuestionError = QuestionError;

    return QuestionManager;
});