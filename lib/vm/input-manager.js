if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function (require) {
    /**
     *
     * @constructor
     */
    function InputManager() {
        this.answers = {};
    }

    /**
     *
     * @param {Object.<string, *>} data
     */
    InputManager.prototype.setAnswers = function(data) {
        this.answers = data;
    };

    /**
     *
     * @param {string} name
     * @param {*} fallback
     * @returns {*}
     */
    InputManager.prototype.get = function(name, fallback) {
        return (this.answers.hasOwnProperty(name)) ? this.answers[name] : fallback;
    };

    return InputManager;
});