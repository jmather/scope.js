var fs = require('fs');
var _ = require('underscore');

/**
 *
 * @module DepBuilder
 * @type {{loadPlugins: Function, byDirectory: Function, byPassThrough: Function}}
 */
module.exports = {
    loadPlugins: function(plugins) {
        var plugs = {};

        _.each(plugins, function(plugin) {
            var path = 'lib/plugins/' + plugin + '/index';
            if (fs.existsSync(path + '.js')) {
                plugs[plugin] = require.main.require('lib/plugins/' + plugin + '/index');
            }
        });

        return plugs;
    },
    byFileName: function(filePath, plugins) {
        var useful = filePath.replace('/tests/', '/test-data/');
        return this.byDirectory(useful, plugins);
    },
    byDirectory: function(sourcePath, plugins) {
        var statePath = sourcePath + '/state.json';

        var state = {};

        if (fs.existsSync(statePath)) {
            state = JSON.parse(fs.readFileSync(statePath));
        }

        var configPath = sourcePath + '/config.json';

        if (fs.existsSync(configPath) === false) {
            throw new Error("Could not find the config in " + configPath);
        }

        var config = JSON.parse(fs.readFileSync(configPath));

        return this.byPassThrough(state, config, plugins);
    },
    byPassThrough: function(state, config, plugins) {
        var DataManager = require.main.require('lib/vm/data-manager');
        var ValueManager = require.main.require('lib/vm/value-manager');
        var TypeManager = require.main.require('lib/vm/type-manager');
        var InputManager = require.main.require('lib/vm/input-manager');
        var InstructionExecutor = require.main.require('lib/vm/plugins/scope/lib/instruction-executor');

        var dataManager = new DataManager(state);
        var typeManager = new TypeManager(plugins);
        var inputManager = new InputManager();
        var instructionExecutor = new InstructionExecutor(inputManager, plugins);
        var valueManager = new ValueManager(config, dataManager, typeManager, instructionExecutor);

        return {
            dataManager: dataManager,
            typeManager: typeManager,
            inputManager: inputManager,
            instructionExecutor: InstructionExecutor,
            valueManager: valueManager
        };
    }
};
