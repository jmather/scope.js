#!/usr/bin/env node
'use strict';

var path = require('path');
var ConfigBuilder = require('../lib/build/config-builder');

function parseArguments(argv) {
    var options = { pretty: false, pluginPaths: [], positional: [] };

    for (var i = 0; i < argv.length; i++) {
        var argument = argv[i];
        if (argument === '-p' || argument === '--pretty') {
            options.pretty = true;
        } else if (argument === '-P' || argument === '--plugins') {
            i++;
            if (i >= argv.length) {
                throw new Error(argument + ' requires a path');
            }
            options.pluginPaths = options.pluginPaths.concat(argv[i].split(/[,:]/).filter(Boolean));
        } else if (argument === '-h' || argument === '--help') {
            options.help = true;
        } else if (argument === '-v' || argument === '--verbose') {
            options.verbose = true;
        } else {
            options.positional.push(argument);
        }
    }

    return options;
}

function printHelp() {
    console.log('usage: ' + process.argv[1] + ' [-p|--pretty] [-P|--plugins <path>] <config path> <output path>');
}

function main() {
    var options = parseArguments(process.argv.slice(2));
    if (options.help) {
        printHelp();
        return;
    }
    if (options.positional.length < 2) {
        printHelp();
        process.exitCode = 1;
        return;
    }

    var projectRoot = path.resolve(__dirname, '..');
    var pluginPaths = [
        path.join(projectRoot, 'lib/vm/plugins'),
        path.join(projectRoot, 'lib/plugins')
    ].concat(options.pluginPaths.map(function(pluginPath) {
        return path.resolve(pluginPath);
    }));

    var result = ConfigBuilder.compile({
        configPath: path.resolve(options.positional[0]),
        outputPath: path.resolve(options.positional[1]),
        pluginPaths: pluginPaths,
        pretty: options.pretty
    });

    console.log('Wrote config and ' + result.plugins.length + ' plugin registrations to ' + path.resolve(options.positional[1]));
}

try {
    main();
} catch (error) {
    console.error(error.stack || error.message);
    process.exitCode = 1;
}
