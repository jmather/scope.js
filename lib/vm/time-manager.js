/**
 *
 * @param {integer} currentTime
 * @exports VM.TimeManager
 * @constructor
 */
function TimeManager(currentTime) {
    this.setTime(currentTime);
}

/**
 *
 * @param {integer} currentTime
 */
TimeManager.prototype.setTime = function(currentTime) {
    this.currentTime = currentTime;
};

/**
 *
 * @returns {integer}
 */
TimeManager.prototype.getCurrentTime = function() {
    return this.currentTime;
};

module.exports = TimeManager;
