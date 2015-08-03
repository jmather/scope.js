#!/usr/bin/env node
var fs = require('fs');
var _ = require('underscore');

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

var statePath = __dirname + '/../state.json';

var state = (fs.existsSync(statePath)) ? JSON.parse(fs.readFileSync(statePath)) : {};


var VM = require(__dirname + '/../vm/index');

var time = new VM.Time(new Date().getTime());

var dataManager = new VM.DataManager(state);

var inputManager = new VM.InputManager();

var vm = new VM(time, dataManager, inputManager, plugins);

