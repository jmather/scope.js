'use strict';

var describe = require('node:test').describe;
var it = require('node:test').it;
var assert = require('node:assert/strict');
var VM = require('../../lib/vm');
var config = require('../../examples/tictactoe/output/config');

function loadPlugins() {
    return {
        core: require('../../lib/vm/plugins/core'),
        scope: require('../../lib/vm/plugins/scope'),
        counter: require('../../lib/plugins/counter'),
        entity: require('../../lib/plugins/entity'),
        grid: require('../../lib/plugins/grid'),
        tictactoe: require('../../examples/tictactoe/plugins/tictactoe')
    };
}

describe('Scope.js', function () {
    describe('VM integration', function () {
        it('loads the public VM entry point', function () {
            assert.equal(typeof VM, 'function');
            assert.equal(typeof VM.Config, 'function');
        });

        it('executes a complete tic-tac-toe choice', function () {
            var vmConfig = new VM.Config({}, config, Date.now(), loadPlugins());
            var vm = new VM(vmConfig);
            var changes = vm.execute('tictactoe.game', 'instantWinPlayer1', {});

            assert.equal(vm.getValue('tictactoe.winner'), '1');
            assert.deepEqual(vm.getValue('tictactoe.player1.board'), {
                '1-1': '1',
                '2-2': '1',
                '3-3': '1'
            });
            assert.ok(changes.length >= 4);
        });
    });

    describe('legacy compatibility repairs', function () {
        it('resolves nested expression value names without comma-joining the namespace', function () {
            var ExpressionTransformer = require('../../lib/vm/plugins/scope/transformations/expressions');
            var transformer = new ExpressionTransformer({});
            var input = {
                'game.round.score': {type: 'data', default: 0},
                'game.round.canContinue': {type: 'expression', expression: 'score < 3'}
            };
            var output = {
                values: {
                    'game.round.score': input['game.round.score']
                }
            };

            transformer.init(input, output);
            transformer.copy(input, output);
            transformer.resolve(input, output);

            assert.equal(
                output.values['game.round.canContinue'].expression,
                "{{= context.getValue('game.round.score') < 3 }}"
            );
        });

        it('accepts zero-argument instructions during dependency inspection', function () {
            var InputManager = require('../../lib/vm/input-manager');
            var QuestionManager = require('../../lib/vm/question-manager');
            var InstructionExecutor = require('../../lib/vm/plugins/scope/lib/instruction-executor');
            var called = false;
            var executor = new InstructionExecutor(new InputManager(), new QuestionManager(), [{
                instructions: [{
                    ping: function () {
                        called = true;
                    }
                }]
            }]);

            executor.execute({}, {instruction: 'ping'});
            assert.equal(called, true);
        });
    });
});