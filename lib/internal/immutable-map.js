'use strict';

function ImmutableMap(initial) {
    if (initial instanceof ImmutableMap) {
        this.values = new Map(initial.values);
    } else if (initial instanceof Map) {
        this.values = new Map(initial);
    } else {
        this.values = new Map(Object.entries(initial || {}));
    }
}

ImmutableMap.prototype.has = function(key) {
    return this.values.has(key);
};

ImmutableMap.prototype.get = function(key) {
    return this.values.get(key);
};

ImmutableMap.prototype.set = function(key, value) {
    var next = new ImmutableMap(this);
    next.values.set(key, value);
    return next;
};

ImmutableMap.prototype.delete = function(key) {
    var next = new ImmutableMap(this);
    next.values.delete(key);
    return next;
};

ImmutableMap.prototype.toJS = function() {
    return Object.fromEntries(this.values);
};

module.exports = ImmutableMap;
