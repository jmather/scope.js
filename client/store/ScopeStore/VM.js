var VM = require('../../../lib/vm/index');
var valueConfig = require('../../../build/config');

var plugins = [];

console.log(valueConfig.plugins);

for (var plugin in valueConfig.plugins) {
    plugins.push(require(valueConfig.plugins[plugin]));
}


console.log(plugins);

var vmConfig = new VM.Config({}, valueConfig, new Date().getTime(), plugins);