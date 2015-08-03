#!/usr/bin/env node
var fs = require('fs');
var cli = require('cli');
var _ = require('underscore');

cli.parse({
    configPath:   ['c', 'Config path', 'path'],
    outputPath: ['o', 'Output path', 'path'],
    pretty: ['p', 'Output pretty', 'bool', false],
    verbose: ['v', 'Verbose output']
});

cli.main(function(args, options) {
    var Transformer = require('json-data-transformer');

    var basedir = __dirname + '/..';
    var pluginsDir = basedir + '/pluginNames/';

    var transformerModules = getTrasformerModules([pluginsDir, process.cwd()]);

    var transformers = _.map(transformerModules, function(TransformerClass) {
        return new TransformerClass({});
    });

    var transformer = new Transformer(transformers);

    if (options.configPath === null) {
        console.error("No config path set, bailing...");
        process.exit(1);
    }

    if (options.outputPath === null) {
        console.error("No output destination set, bailing...");
        process.exit(1);
    }

    var data = Transformer.loadData([options.configPath]);

    var compiledData = transformer.transform(data);

    var output = JSON.stringify(compiledData);

    if (options.pretty) {
        var pd = require('pretty-data').pd;
        output = pd.json(compiledData);
    }

    if (options.outputPath) {
        require('fs').writeFileSync(options.outputPath + '/data.json', output);
        require('fs').writeFileSync(options.outputPath + '/data.js', 'module.exports = ' + output + ';');
        console.log('Wrote data to ' + options.outputPath + '/data.json');
        console.log('Wrote js loadable data to ' + options.outputPath + '/data.js');
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