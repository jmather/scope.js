#!/usr/bin/env node
var fs = require('fs');
var cli = require('cli');
var _ = require('underscore');
var examplePath = __dirname + '/../examples';

cli.parse({
    clean: ['c', 'Clean state', 'boolean', false],
    verbose: ['v', 'Verbose output']
});

cli.main(function(args, options) {
    if (args.length === 0) {
        console.error("No example given.");
        printHelp();
        process.exit(1);
    }

    var example = args[0];

    var exampleDir = examplePath + '/' + example;
    var fs = require('fs');
    if (fs.existsSync(exampleDir) === false) {
        console.error('Example "' + example +'" does not exist.');
        printHelp();
        process.exit(1);
    }

    var sys = require('sys');
    var exec = require('child_process').exec;
    var child;
    // executes `pwd`
    var configDir = exampleDir + '/config';
    var outputPath = exampleDir + '/output';

    child = exec(__dirname + "/transform.js -p " + configDir + ' ' + outputPath, function (error, stdout, stderr) {
        console.log(stdout);

        if (stderr) {
            console.error(stderr);
        }
        if (error !== null) {
            console.error('error: ' + error);
        }

        var etcPath = __dirname + '/../etc';

        child = exec("cp " + outputPath + '/config.json ' + etcPath + '/config.json', function (error, stdout, stderr) {
            console.log(stdout);

            if (stderr) {
                console.error(stderr);
            }
            if (error !== null) {
                console.error('error: ' + error);
            }
        });
    });
});

function printHelp() {
    console.log('usage: ' + process.argv[1] + ' [-c|--clean] <example>');
    console.log('Available examples: ' + fs.readdirSync(examplePath).join(', '));
}