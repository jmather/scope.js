#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');

var projectRoot = path.resolve(__dirname, '..');
var example = process.argv[2] || 'test';

function requireBuildDependency(name) {
    try {
        return require(name);
    } catch (error) {
        console.error('Missing web build dependency ' + JSON.stringify(name) + '. Run npm install first.');
        throw error;
    }
}

function main() {
    childProcess.execFileSync(process.execPath, [path.join(__dirname, 'build-example.js'), example], {
        cwd: projectRoot,
        stdio: 'inherit'
    });

    var esbuild = requireBuildDependency('esbuild');
    var { nodeModulesPolyfillPlugin } = requireBuildDependency('esbuild-plugins-node-modules-polyfill');
    var outputDirectory = path.join(projectRoot, 'www/js');
    fs.mkdirSync(outputDirectory, { recursive: true });

    return esbuild.build({
        entryPoints: [path.join(projectRoot, 'client/app.js')],
        outfile: path.join(outputDirectory, 'system.js'),
        bundle: true,
        sourcemap: true,
        platform: 'browser',
        format: 'iife',
        plugins: [nodeModulesPolyfillPlugin()],
        loader: { '.js': 'jsx' },
        define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') },
        logLevel: 'info'
    }).then(function() {
        var bootstrapDirectory = path.join(projectRoot, 'node_modules/bootstrap/dist/css');
        var vendorDirectory = path.join(projectRoot, 'www/vendor');
        fs.mkdirSync(vendorDirectory, { recursive: true });
        fs.copyFileSync(path.join(bootstrapDirectory, 'bootstrap.css'), path.join(vendorDirectory, 'bootstrap.css'));
        fs.copyFileSync(path.join(bootstrapDirectory, 'bootstrap-theme.css'), path.join(vendorDirectory, 'bootstrap-theme.css'));
        console.log('Built browser UI for example ' + example + '.');
    });
}

main().catch(function(error) {
    console.error(error.stack || error.message);
    process.exitCode = 1;
});
