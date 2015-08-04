if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['underscore'], function(_) {
    /**
     *
     * @constructor
     */
    function VMTransformer() {
    }

    /**
     *
     * @param {*} input
     * @param {*} output
     */
    VMTransformer.prototype.preProcess = function(input, output) {
        output.values = {};
    };

    return VMTransformer;
});