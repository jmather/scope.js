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
    if (args.length < 1) {
        console.error('Not enough arguments.');
        console.log('usage: vm.js <scope_value> <choice>');
        process.exit(1);
    }

    var pluginPath = __dirname + '/../lib/plugins';
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

    var VM = require(__dirname + '/../lib/vm/index');

    var config = new VM.Config(state, valueConfig, new Date().getTime(), plugins);

    var vm = new VM(config);

    if (options.verbose) {
        console.log('Loaded state');
        _.each(vm.valueManager.dataManager.data.toJS(), function(value, key) {
            console.log('  ' + key + ': ' + JSON.stringify(value));
        });
    }

    try {
        var changes = vm.execute(args[0], args[1]);

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
        }
    }

    fs.writeFileSync(statePath, JSON.stringify(vm.valueManager.dataManager.data.toJS()));
});

