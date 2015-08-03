if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function (require) {
    /**
     *
     * @constructor
     */
    function InputManager() {
        this.questions = {};
    }

    return InputManager;
});