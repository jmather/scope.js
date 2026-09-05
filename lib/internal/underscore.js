'use strict';

function each(collection, iteratee, context) {
    if (collection == null) {
        return collection;
    }

    if (Array.isArray(collection) || typeof collection.length === 'number') {
        for (var index = 0; index < collection.length; index += 1) {
            iteratee.call(context, collection[index], index, collection);
        }
        return collection;
    }

    Object.keys(collection).forEach(function(key) {
        iteratee.call(context, collection[key], key, collection);
    });
    return collection;
}

function bind(fn, context) {
    var boundArguments = Array.prototype.slice.call(arguments, 2);
    return function() {
        return fn.apply(context, boundArguments.concat(Array.prototype.slice.call(arguments)));
    };
}

function extend(target) {
    Array.prototype.slice.call(arguments, 1).forEach(function(source) {
        if (source != null) {
            Object.keys(source).forEach(function(key) {
                target[key] = source[key];
            });
        }
    });
    return target;
}

function defaults(target) {
    Array.prototype.slice.call(arguments, 1).forEach(function(source) {
        if (source != null) {
            Object.keys(source).forEach(function(key) {
                if (target[key] === undefined) {
                    target[key] = source[key];
                }
            });
        }
    });
    return target;
}

function range(start, stop, step) {
    if (stop === undefined) {
        stop = start;
        start = 0;
    }

    step = step === undefined ? 1 : step;
    if (step === 0) {
        throw new Error('range step cannot be zero');
    }

    var output = [];
    var current;
    if (step > 0) {
        for (current = start; current < stop; current += step) {
            output.push(current);
        }
    } else {
        for (current = start; current > stop; current += step) {
            output.push(current);
        }
    }
    return output;
}

function difference(array) {
    var excluded = new Set([].concat.apply([], Array.prototype.slice.call(arguments, 1)));
    return array.filter(function(value) {
        return excluded.has(value) === false;
    });
}

function unique(array) {
    return Array.from(new Set(array));
}

function map(collection, iteratee, context) {
    var output = [];
    each(collection, function(value, key, source) {
        output.push(iteratee.call(context, value, key, source));
    });
    return output;
}

function filter(collection, predicate, context) {
    var output = [];
    each(collection, function(value, key, source) {
        if (predicate.call(context, value, key, source)) {
            output.push(value);
        }
    });
    return output;
}

function reduce(collection, iteratee, initial) {
    var accumulator = initial;
    var initialized = arguments.length >= 3;
    each(collection, function(value, key, source) {
        if (!initialized) {
            accumulator = value;
            initialized = true;
        } else {
            accumulator = iteratee(accumulator, value, key, source);
        }
    });
    return accumulator;
}

function clone(value) {
    if (Array.isArray(value)) {
        return value.slice();
    }
    if (value && typeof value === 'object') {
        return Object.assign({}, value);
    }
    return value;
}

module.exports = {
    bind: bind,
    clone: clone,
    defaults: defaults,
    difference: difference,
    each: each,
    extend: extend,
    filter: filter,
    keys: Object.keys,
    map: map,
    range: range,
    reduce: reduce,
    unique: unique
};
