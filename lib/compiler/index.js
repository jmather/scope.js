var fs = require('fs');
var _ = require('underscore');

/**
 *
 * @param {Array.<{process: function}>} transformers
 * @param {Array.string} lifecycleEvents
 * @constructor
 */
function Transformer(transformers, lifecycleEvents) {
    this.transformers = transformers;
    this.lifecycleEvents = lifecycleEvents || ['preProcess', 'process', 'postProcess'];
}

/**
 *
 * @param {Array.string} directories
 * @returns {{}}
 */
Transformer.loadData = function(directories) {
    var data = {};

    _.each(directories, function(directory) {
        _.extend(data, loadDataDirectory('', directory));
    });

    return data;
};

/**
 *
 * @param {string} prefix
 * @param {string} directoryPath
 * @returns {{}}
 */
function loadDataDirectory(prefix, directoryPath) {
    var data = {};

    var files = fs.readdirSync(directoryPath);
    var directories = [];
    _.each(files, function(file) {
        var filePath = directoryPath + '/' + file;
        if (fs.statSync(filePath).isDirectory()) {
            directories.push(file);
            return;
        }

        if (file.substr(-5) !== '.json') {
            return;
        }

        var key = file.substr(0, file.length -5);
        var fileData = JSON.parse(fs.readFileSync(filePath));

        _.each(fileData, function(val, valKey) {
            data[prefix + key + '.' + valKey] = val;
        });
    });

    _.each(directories, function(directory) {
        _.extend(data, loadDataDirectory(directory + '.', directoryPath + '/' + directory));
    });

    return data;
}

/**
 *
 * @param {*} data
 * @returns {*}
 */
Transformer.prototype.transform = function(data) {
    var compiledData = {};

    _.each(this.lifecycleEvents, function(event) {
        _.each(this.transformers, function(transformer) {
            if (typeof transformer[event] === 'function') {
                transformer[event].apply(transformer, [data, compiledData]);
            }
        });
    }.bind(this));

    return compiledData;
};

module.exports = Transformer;
