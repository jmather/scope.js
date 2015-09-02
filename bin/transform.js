#!/usr/bin/env node
var fs = require('fs');
var cli = require('cli');
var _ = require('underscore');
var $ = require('jquery');

cli.parse({
    pretty: ['p', 'Output pretty', 'bool', false],
    plugins: ['P', 'Additional plugin paths (comma separated)', 'string', ''],
    verbose: ['v', 'Verbose output']
});

cli.main(function(args, options) {
    var Transformer = require('../lib/compiler/index');

    var basedir = __dirname + '/..';
    var pluginsDir = basedir + '/lib/plugins';

    var pluginPaths = [__dirname + '/../lib/vm/plugins', pluginsDir];

    if (options.plugins !== '') {
        var extraPlugins = options.plugins.split(' ');
        _.each(extraPlugins, function(extraPlugin) {
            if (fs.existsSync(extraPlugin) === false) {
                return;
            }

            pluginPaths.push(fs.realpathSync(extraPlugin));
        });
    }

    var transformerModules = getTrasformerModules([__dirname + '/../lib/vm/plugins', pluginsDir]);

    var transformers = _.map(transformerModules, function(TransformerClass) {
        return new TransformerClass({});
    });

    var transformer = new Transformer(transformers, ['init', 'copy', 'resolve', 'validate', 'metadata']);

    if (args.length < 2) {
        console.error('Cannot proceed because we are missing arguments.');
        printHelp();
        process.exit(1);
    }

    options.configPath = args[0];
    options.outputPath = args[1];

    var data = Transformer.loadData([options.configPath]);

    var compiledData = transformer.transform(data);

    compiledData.plugins = getPlugins([__dirname + '/../lib/vm/plugins', pluginsDir]);

    var output = JSON.stringify(compiledData);

    if (options.pretty) {
        var pd = require('pretty-data').pd;
        output = pd.json(compiledData);
    }

    if (options.outputPath) {
        require('fs').writeFileSync(options.outputPath + '/config.json', output);
        require('fs').writeFileSync(options.outputPath + '/config.js', 'module.exports = ' + output + ';');
        console.log('Wrote data to ' + options.outputPath + '/config.json');
        console.log('Wrote js loadable data to ' + options.outputPath + '/config.js');
        console.log('Building plugins...');
        var pluginIndexes = getPluginIndexes(pluginPaths);

        var pluginDefers = [];
        var loaderFile = 'module.exports = {##PLUGINS##};';
        var loaderFilePlugins = [];

        _.each(pluginIndexes, function(pluginIndex) {
            var pieces = pluginIndex.split('/');
            var name = pieces[pieces.length - 2];
            loaderFilePlugins.push('"' + name + '": require("' + pluginIndex + '")');
            pluginDefers.push(name);
        });

        fs.writeFileSync(options.outputPath + '/plugins.js', loaderFile.replace('##PLUGINS##', loaderFilePlugins.join(',')));
        console.log('plugins.js written');
    } else {
        console.log(output);
    }
});

/**
 *
 * @param {Array.<string>} paths
 */
function getTrasformerModules(paths) {
    var transformers = [];

    _.each(paths, function(path) {
        var dirFiles = fs.readdirSync(path);

        _.each(dirFiles, function(file) {
            var filePath =  path + '/' + file + '/transformation';

            if (fs.existsSync(filePath + '.js')) {
                transformers.push(require(filePath));
            }

            if (fs.existsSync(filePath + 's')) {
                var dirPath = filePath + 's';

                _.each(fs.readdirSync(dirPath), function(path) {
                    var filePath = dirPath + '/' + path;

                    if (fs.existsSync(filePath)) {
                        transformers.push(require(filePath));
                    }
                });
            }
        });
    });

    return transformers;
}

/**
 *
 * @param {Array.<string>} paths
 */
function getPlugins(paths) {
    var plugins = [];

    _.each(paths, function(path) {
        var dirFiles = fs.readdirSync(path);

        _.each(dirFiles, function(file) {
            var filePath =  path + '/' + file + '/index';

            if (fs.existsSync(filePath + '.js')) {
                plugins.push('scope-plugin-' + file);
            }
        });
    });

    return plugins;
}

/**
 *
 * @param {Array.<string>} paths
 */
function getPluginIndexes(paths) {
    var plugins = [];

    _.each(paths, function(path) {
        var dirFiles = fs.readdirSync(path);

        _.each(dirFiles, function(file) {
            var filePath =  path + '/' + file + '/index';

            if (fs.existsSync(filePath + '.js')) {
                plugins.push(filePath + '.js');
            }
        });
    });

    return plugins;
}

function printHelp() {
    console.log('usage: ' + process.argv[1] + ' [-h|--help] [options] <config path> <output path>');
}