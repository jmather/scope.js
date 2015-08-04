if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['./type-manager', './data-manager', './input-manager', './time-manager', './config', './vm'], function (TypeManager, DataManager, InputManager, TimeManager, Config, VM) {
    VM.TimeManager = TimeManager;
    VM.DataManager = DataManager;
    VM.TypeManager = TypeManager;
    VM.InputManager = InputManager;
    VM.Config = Config;

    return VM;
});