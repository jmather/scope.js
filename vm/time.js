if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function (require) {
    function VMTime(currentTime) {
        this.setTime(currentTime);
    }

    VMTime.prototype.setTime = function(currentTime) {
        this.currentTime = currentTime;
    };

    return VMTime;
});