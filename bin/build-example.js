#!/usr/bin/env node
var fs = require('fs');
var cli = require('cli');
var _ = require('underscore');

cli.parse({
    example: ['e', 'Example', 'string'],
    verbose: ['v', 'Verbose output']
});

cli.main(function(args, options) {
    var exampleDir = process.cwd() + '/examples/' + options.example;
    var fs = require('fs');
    if (fs.existsSync(exampleDir) === false) {
        console.error('Example "' + options.example +'" does not exist.');
        process.exit(1);
    }

    var sys = require('sys');
    var exec = require('child_process').exec;
    var child;
    // executes `pwd`
    var configDir = exampleDir + '/config';
    var outputPath = exampleDir + '/output';

    child = exec(__dirname + "/transform.js -p -c " + configDir + ' -o ' + outputPath, function (error, stdout, stderr) {
        console.log(stdout);

        if (stderr) {
            console.error(stderr);
        }
        if (error !== null) {
            console.error('error: ' + error);
        }
    });

    var etcPath = __dirname + '/../etc';

    child = exec("cp " + outputPath + '/data.json ' + etcPath + '/data.json', function (error, stdout, stderr) {
        console.log(stdout);

        if (stderr) {
            console.error(stderr);
        }
        if (error !== null) {
            console.error('error: ' + error);
        }
    });

});