if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore', '../definitions/list', '../transformations/list'], function (_, definition, transformation) {
    /**
     *
     * @param {string} name
     * @param {{max: integer, min: integer, step: integer, default: integer}} config
     * @param {ValueManager} valueManager
     * @constructor
     */
    function ListType(name, config, valueManager) {
        this.config = config;
        this.name = name;
        this.valueManager = valueManager;
    }

    ListType.definition = definition;
    ListType.transformation = transformation;

    /**
    /**
     *
     * @param {*} value
     * @returns {number}
     */
    ListType.prototype.push = function(value) {
        var list = this.valueManager.getData(this.name);

        list.push(value);

        this.valueManager.setData(this.name, list);

        return list.length;
    };

    /**
     *
     * @param {integer} index
     * @return {number}
     */
    ListType.prototype.removeByIndex = function(index) {
        var list = this.valueManager.getData(this.name);

        if (list[index] === undefined) {
            throw new Error(index + ' does not exist in list ' + this.name);
        }

        list = list.splice(index, 1);

        this.valueManager.setData(this.name, list);

        return list.length;
    };

    /**
     *
     * @param {*} value
     * @return {number}
     */
    ListType.prototype.removeByValue = function(value) {
        var list = this.valueManager.getData(this.name);

        var id = null;

         _.each(list, function(val, index) {
            if (val === value) {
                id = index;
            }
         });

        if (id === null) {
            throw new Error("Could not find passed value in list " + this.name);
        }

        this.removeById(id);
    };

    /**
     * @return {number}
     */
    ListType.prototype.getValue = function() {
        return this.valueManager.getData(this.name, this.config.default);
    };

    /**
     *
     * @param {string} value
     * @returns {*}
     */
    ListType.prototype.setValue = function(value) {
        return this.valueManager.setData(this.name, value);
    };

    return ListType;
});