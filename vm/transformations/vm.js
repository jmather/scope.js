if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['underscore'], function(_) {
    function VMTransformer() {
    }

    VMTransformer.prototype.preProcess = function(input, output) {
        output.values = {};
    };

    return VMTransformer;
});