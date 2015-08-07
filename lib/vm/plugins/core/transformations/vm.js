/**
 *
 * @exports VMTransformer
 * @constructor
 */
function VMTransformer() {
}

/**
 *
 * @param {*} input
 * @param {*} output
 */
VMTransformer.prototype.init = function(input, output) {
    output.values = {};
};

module.exports = VMTransformer;
