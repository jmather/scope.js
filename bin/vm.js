#!/usr/bin/env node
var fs = require('fs');
var _ = require('underscore');
var cli = require('cli');

cli.parse({
    state: ['s', 'State file', 'path', 'state.json'],
    values: [ 'd', 'Data file', 'path', 'data.js'],
    verbose: ['v', 'Verbose output']
});

cli.main(function(args, options) {
    var pluginPaths = [__dirname + '/../lib/vm/plugins', __dirname + '/../lib/plugins'];
    var plugins = [];

    _.each(pluginPaths, function(pluginPath) {
        var pluginNames = fs.readdirSync(pluginPath);
        _.each(pluginNames, function(plugin) {
            var pluginModulePath = pluginPath + '/' + plugin + '/index';

            if (fs.existsSync(pluginModulePath + '.js') === false) {
                return;
            }

            plugins.push(require(pluginModulePath));
        });
    });

    var valuePath = '../build/config';

    var valueConfig = require(valuePath);

    if (args.length < 1) {
        console.error('Not enough arguments.');
        console.log('usage: vm.js <scope> <choice>');

        var scopes = [];
        _.each(valueConfig.values, function(value, name) {
            if (value.type !== 'scope') {
                return;
            }

            scopes.push(name);
        });

        console.log('Scopes: ', scopes.join(', '));
        process.exit(1);
    }

    var statePath = '../build/state';

    var state = (fs.existsSync(__dirname + '/' + statePath + '.js')) ? require(statePath) : {};

    var VM = require(__dirname + '/../lib/vm/index');

    var config = new VM.Config(state, valueConfig, new Date().getTime(), plugins);

    var vm = new VM(config);

    if (options.verbose) {
        console.log('Loaded state');
        _.each(vm.valueManager.dataManager.data.toJS(), function(value, key) {
            console.log('  ' + key + ': ' + JSON.stringify(value));
        });
    }

    var extraArgs = {};
    if (args[2] !== undefined) {
        extraArgs = JSON.parse(args[2]);
    }

    try {
        var changes = vm.execute(args[0], args[1], extraArgs);

        if (options.verbose) {
            console.log('Changes to the data');
            _.each(changes, function(change) {
                console.log('  ' + change.value + ': ' + JSON.stringify(change.old) + ' -> ' + JSON.stringify(change.new));
            });
        }
    } catch (e) {
        if (e.questions) {
            console.error('The command you executed requires more information.');
            _.each(e.questions, function(question) {
                console.log(JSON.stringify(question));
            });
        } else {
            console.error('Received an error:');
            console.log(e);
            console.log(e.stack);
        }
    }

    fs.writeFileSync(__dirname + '/' + statePath + '.js', 'module.exports = ' + JSON.stringify(vm.valueManager.dataManager.data.toJS()) + ';');
});

