if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['./type-manager', './data-manager', './input-manager', './time', './vm'], function (TypeManager, DataManager, InputManager, Time, VM) {
    VM.Time = Time;
    VM.DataManager = DataManager;
    VM.TypeManager = TypeManager;
    VM.InputManager = InputManager;

    return VM;
});