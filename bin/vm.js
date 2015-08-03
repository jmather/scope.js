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

    var time = new VM.Time(new Date().getTime());

    var dataManager = new VM.DataManager(state);

    var inputManager = new VM.InputManager();

    var vm = new VM(time, dataManager, inputManager, valueConfig, plugins);

    console.log(dataManager);

    var methodArgs = (args[2]) ? JSON.parse(args[2]) : {};

    console.log(vm.executeInstructionOnValue(args[0], args[1], methodArgs));
});

