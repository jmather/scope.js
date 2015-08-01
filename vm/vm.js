if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['./value-manager'], function (ValueManager) {
    /**
     *
     * @param {VMTime} time
     * @param {DataManager} dataManager
     * @param {TypeManager} typeManager
     * @param {InputManager} inputManager
     * @constructor
     */
    function VM(time, dataManager, typeManager, inputManager) {
        this.time = time;
        this.dataManager = dataManager;
        this.typeManager = typeManager;
        this.valueManager = new ValueManager(dataManager, typeManager);
        this.inputManager = inputManager;
    }

    VM.prototype.execute = function(valueName, actionName) {
        var valueManager = this.valueManager.clone();

        var value = valueManager.get(value);
    }

});