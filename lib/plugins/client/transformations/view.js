var _ = require('underscore');

/**
 *
 * @param {{}} config
 * @exports CardDeckTransformer
 * @constructor
 */
function ViewTransformer(config) {
    this.config = config;
}

ViewTransformer.prototype.init = function(input, output) {
    output.client = {};
};

/**
 *
 * @param {{decks: Object.<string, {suits: Array.<string>, faces: Array.<string>, extra: Array.<string>}>}} input
 * @param {{decks: Object.<string, Array.<{type: string, suit: string, face: string}>>}} output
 */
ViewTransformer.prototype.copy = function (input, output) {
    output.client.views = {};
    _.each(input, function (config, name) {
        if (config.type !== 'view') {
            return;
        }

        var view = {};
        _.extend(view, config);

        output.client.views[name] = view;
    });
};

/**
 *
 * @param {{decks: Object.<string, {suits: Array.<string>, faces: Array.<string>, extra: Array.<string>}>}} input
 * @param {{decks: Object.<string, Array.<{type: string, suit: string, face: string}>>}} output
 */
ViewTransformer.prototype.metadata = function (input, output) {
    _.each(output.client.views, function (config, name) {
        if (config.default === true) {
            output.client.defaultView = name;
        }
    });
};

module.exports = ViewTransformer;
