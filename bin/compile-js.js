var fs = require('fs');
var cli = require('cli');
var exec = require('child_process').exec;

cli.main((args, options) => {
    child = exec("node " + __dirname + "/transform.js -p -P " + pluginPath + " " + configDir + ' ' + outputPath, (error, stdout, stderr) => {
        console.log(stdout);

        if (stderr) {
            console.error(stderr);
        }
        if (error !== null) {
            console.error('error: ' + error);
        }

        var buildPath = __dirname + '/../build';

        if (fs.existsSync(buildPath) === false) {
            fs.mkdirSync(buildPath);
        }
    })
})
