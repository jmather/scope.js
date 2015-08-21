var VM = require('scope-vm');

module.exports = {
    /**
     *
     * @param {function} VM Class
     * @param state
     * @param config
     * @param plugins
     * @returns {VM}
     */
    build: function (VM, state, config, plugins) {
        var vmConfig = new VM.Config(state, config, new Date().getTime(), plugins);

        return new VM(vmConfig);
    }
};