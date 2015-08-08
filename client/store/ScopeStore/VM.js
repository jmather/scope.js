var VM = require('scope-vm');

module.exports = {
    /**
     *
     * @param state
     * @param config
     * @returns {VM}
     */
    build: function (state, config) {
        var plugins = [];

        for (var plugin in config.plugins) {
            plugins.push(require(config.plugins[plugin]));
        }

        var vmConfig = new VM.Config(state, config, new Date().getTime(), plugins);

        return new VM(vmConfig);
    }
};