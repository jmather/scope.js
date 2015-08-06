if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore'], function(_) {
    /**
     *
     * @exports VMTransformer
     * @constructor
     */
    function VMTransformer() {
    }

    /**
     *
     * @param {*} input
     * @param {*} output
     */
    VMTransformer.prototype.init = function(input, output) {
        output.values = {};
    };

    return VMTransformer;
});