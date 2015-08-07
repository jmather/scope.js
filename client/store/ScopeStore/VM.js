var VM = require('scope-vm');
var valueConfig = require('../../../build/config');

var plugins = [];

for (var plugin in valueConfig.plugins) {
    plugins.push(require(valueConfig.plugins[plugin]));
}

var vmConfig = new VM.Config({}, valueConfig, new Date().getTime(), plugins);

module.exports = new VM(vmConfig);