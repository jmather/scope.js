if (typeof define !== 'function') { var define = require('amdefine')(module) }

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
     * @param {*} falback
     * @returns {*}
     */
    InputManager.prototype.get = function(name, falback) {
        return (this.answers[name] !== undefined) ? this.answers[name] : falback;
    };

    return InputManager;
});