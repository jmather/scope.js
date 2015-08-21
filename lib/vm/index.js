var VM = require('./vm');
VM.TimeManager = require('./time-manager');
VM.DataManager = require('./data-manager');
VM.TypeManager = require('./type-manager');
VM.InputManager = require('./input-manager');
VM.InstructionExecutor = require('./plugins/scope/lib/instruction-executor');
VM.Config = require('./config');

module.exports = VM;