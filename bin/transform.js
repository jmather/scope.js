#!/usr/bin/env node
var fs = require('fs');
var cli = require('cli');
var _ = require('underscore');

cli.parse({
    pretty: ['p', 'Output pretty', 'bool', false],
    verbose: ['v', 'Verbose output']
});

cli.main(function(args, options) {
    var Transformer = require('../lib/compiler/index');

    var basedir = __dirname + '/..';
    var pluginsDir = basedir + '/lib/plugins/';

    var transformerModules = getTrasformerModules([process.cwd() + '/lib/vm/plugins', pluginsDir]);

    var transformers = _.map(transformerModules, function(TransformerClass) {
        return new TransformerClass({});
    });

    var transformer = new Transformer(transformers, ['init', 'copy', 'resolve', 'validate']);

    if (args.length < 2) {
        console.error('Cannot proceed because we are missing arguments.');
        printHelp();
        process.exit(1);
    }

    options.configPath = args[0];
    options.outputPath = args[1];

    var data = Transformer.loadData([options.configPath]);

    var compiledData = transformer.transform(data);

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

function printHelp() {
    console.log('usage: ' + process.argv[1] + ' [-h|--help] [options] <config path> <output path>');
}