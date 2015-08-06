if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore', 'JSONSelect'], function(_, JSONSelect) {
    /**
     *
     * @param {{}} config
     * @exports CardDeckTransformer
     * @constructor
     */
    function DeckTransformer(config) {
        this.config = config;
    }

    DeckTransformer.prototype.init = function(input, output) {
        output.decks = {};
    };

    /**
     *
     * @param {{decks: Object.<string, {suits: Array.<string>, faces: Array.<string>, extra: Array.<string>}>}} input
     * @param {{decks: Object.<string, Array.<{type: string, suit: string, face: string}>>}} output
     */
    DeckTransformer.prototype.copy = function (input, output) {
        _.each(input, function (config, name) {
            if (config.type !== 'deck-definition') {
                return;
            }

            output.decks[name] = processDeck(config);
        });
    };

    /**
     *
     * @param {{suits: Array.<string>, faces: Array.<string>, extra: Array.<string>}} config
     *
     * @return {Array.<{type: string, suit: string, face: string}>}
     */
    function processDeck(config) {
        var cards = [];

        _.each(config.suits, function (suit) {
            _.each(config.faces, function (face) {
                cards.push({type: "card", suit: suit, face: face});
            });
        });

        _.each(config.extra, function (extra) {
            cards.push({type: extra, suit: extra, face: extra});
        });

        return cards;
    }

    return DeckTransformer;
});