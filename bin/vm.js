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
    var pluginPath = __dirname + '/../plugins';
    var pluginNames = fs.readdirSync(pluginPath);
    var plugins = [];

    var pluginPaths = _.map(pluginNames, function(plugin) {
        var pluginModulePath = pluginPath + '/' + plugin + '/index';

        if (fs.existsSync(pluginModulePath + '.js') === false) {
            return;
        }

        plugins.push(require(pluginModulePath));
    });

    var valuePath = __dirname + '/../etc/data.json';

    var valueConfig = JSON.parse(fs.readFileSync(valuePath));

    var statePath = __dirname + '/../state.json';

    var state = (fs.existsSync(statePath)) ? JSON.parse(fs.readFileSync(statePath)) : {};

    var VM = require(__dirname + '/../vm/index');

    var config = new VM.Config(state, valueConfig, new Date().getTime(), plugins);

    var vm = new VM(config);

    if (options.verbose) {
        console.log('Loaded state');
        _.each(vm.valueManager.dataManager.data.toJS(), function(value, key) {
            console.log('  ' + key + ': ' + JSON.stringify(value));
        });
    }

    var methodArgs = (args[2]) ? JSON.parse(args[2]) : {};

    var changes = vm.execute(args[0], args[1], methodArgs);

    if (options.verbose) {
        console.log('Changes to the data');
        _.each(changes, function(change) {
            console.log('  ' + change.value + ': ' + JSON.stringify(change.old) + ' -> ' + JSON.stringify(change.new));
        });
    }

    fs.writeFileSync(statePath, JSON.stringify(vm.valueManager.dataManager.data.toJS()));
});

