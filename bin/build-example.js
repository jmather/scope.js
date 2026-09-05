#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var ConfigBuilder = require('../lib/build/config-builder');

var projectRoot = path.resolve(__dirname, '..');
var examplesRoot = path.join(projectRoot, 'examples');

function printHelp() {
    console.log('usage: ' + process.argv[1] + ' [-c|--clean] <example>');
    console.log('Available examples: ' + fs.readdirSync(examplesRoot).filter(function(name) {
        return fs.statSync(path.join(examplesRoot, name)).isDirectory();
    }).join(', '));
}

function main() {
    var args = process.argv.slice(2);
    var clean = false;
    args = args.filter(function(argument) {
        if (argument === '-c' || argument === '--clean') {
            clean = true;
            return false;
        }
        return true;
    });

    if (args.length === 0) {
        console.error('No example given.');
        printHelp();
        process.exitCode = 1;
        return;
    }

    var example = args[0];
    var exampleDir = path.join(examplesRoot, example);
    if (!fs.existsSync(exampleDir)) {
        console.error('Example ' + JSON.stringify(example) + ' does not exist.');
        printHelp();
        process.exitCode = 1;
        return;
    }

    var outputPath = path.join(exampleDir, 'output');
    var buildPath = path.join(projectRoot, 'build');
    if (clean) {
        fs.rmSync(outputPath, { recursive: true, force: true });
        fs.rmSync(buildPath, { recursive: true, force: true });
    }

    var pluginPaths = [
        path.join(projectRoot, 'lib/vm/plugins'),
        path.join(projectRoot, 'lib/plugins'),
        path.join(exampleDir, 'plugins')
    ];

    var result = ConfigBuilder.compile({
        configPath: path.join(exampleDir, 'config'),
        outputPath: outputPath,
        pluginPaths: pluginPaths,
        pretty: true
    });

    fs.mkdirSync(buildPath, { recursive: true });
    fs.copyFileSync(path.join(outputPath, 'config.json'), path.join(buildPath, 'config.json'));
    fs.writeFileSync(path.join(buildPath, 'state.json'), "{}\n");
    fs.copyFileSync(path.join(outputPath, 'config.js'), path.join(buildPath, 'config.js'));
    fs.writeFileSync(path.join(buildPath, 'state.js'), "'use strict';\nmodule.exports = {};\n");
    ConfigBuilder.writePluginLoader(buildPath, result.plugins);

    console.log('Built example ' + example + ' into examples/' + example + '/output and build/');
}

try {
    main();
} catch (error) {
    console.error(error.stack || error.message);
    process.exitCode = 1;
}
