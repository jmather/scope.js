'use strict';

var interpolationPattern = /\{\{=([\s\S]+?)\}\}/g;

function template(source, settings) {
    var varname = settings && settings.varname ? settings.varname : 'it';
    var parts = [];
    var lastIndex = 0;
    var match;

    while ((match = interpolationPattern.exec(source)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ type: 'text', value: source.slice(lastIndex, match.index) });
        }
        parts.push({
            type: 'expression',
            evaluate: new Function(varname, 'return (' + match[1].trim() + ');')
        });
        lastIndex = interpolationPattern.lastIndex;
    }

    if (lastIndex < source.length) {
        parts.push({ type: 'text', value: source.slice(lastIndex) });
    }

    return function(context) {
        return parts.map(function(part) {
            return part.type === 'text' ? part.value : String(part.evaluate(context));
        }).join('');
    };
}

module.exports = {
    templateSettings: {},
    template: template
};
