var AppDispatcher = require('../dispatcher/AppDispatcher');
var ConfigConstants = require('../constants/ConfigConstants');

var ConfigActions = {

    /**
     *
     * @param {string} section
     * @param {string} value
     * @param {*} config
     */
    update: function(section, value, config) {
        AppDispatcher.dispatch({
            actionType: ConfigConstants.CONFIG_UPDATE,
            section: section,
            value: value,
            config: config
        });
    }

};

module.exports = ConfigActions;
