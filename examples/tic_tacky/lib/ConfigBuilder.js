var _ = require('underscore');

var ConfigBuilder = {
    configTemplate: {
        "values": {
            "tictactoe.winner": {
                "type": "data",
                "default": null
            },
            "tictactoe.game": {
                "type": "scope",
                "choices": {
                },
                "default": {}
            },
            "tictactoe.playerTurn": {
                "type": "scope",
                "choices": {
                },
                "default": {}
            },
            "tictactoe.turns": {
                "type": "counter",
                "min": 0,
                "max": null,
                "step": 1,
                "default": 0
            }
        },
        "input": {
            players: [],
            minForWin: 3,
            rows: 3,
            cols: 3
        }
    },

    choiceTemplate: {
        "type": "choice",
            "when": [
            "{{= context.getValue('tictactoe.turns') % ##MODULOUS_CONDITION## }}",
            "{{= context.getValue('tictactoe.winner') === null }}",
            "{{= context.getValue('tictactoe.turns') < ##MAX_TURNS## }}"
        ],
            "notWhen": [],
            "instructions": [
            {
                "type": "instruction",
                "instruction": "place",
                "gridValue": "tictactoe.##PLAYER_ID##.board",
                "referenceGridValue": "tictactoe.board",
                "data": "##PLAYER_MARKER##"
            },
            {
                "type": "instruction",
                "instruction": "hasWon",
                "gridValue": "tictactoe.##PLAYER_ID##.board",
                "dataValue": "tictactoe.winner",
                "data": "##PLAYER_MARKER##",
                "min": "##MIN_FOR_WIN##"
            },
            {
                "type": "instruction",
                "instruction": "increment",
                "counterValue": "tictactoe.turns",
                "amount": 1
            }
        ]
    },

    resetGameTemplate: {
        "type": "choice",
        "when": [],
        "notWhen": [],
        "instructions": [
            {
                "type": "instruction",
                "instruction": "resetGame",
                "gridValues": [],
                "dataValue": "tictactoe.winner",
                "counterValue": "tictactoe.turns"
            }
        ]
    },

    combinedBoardTemplate: {
        "type": "grid-collection",
        "rows": null,
        "cols": null,
        "default": {},
        "includes": [
        ]
    },

    playerBoardTemplate: {
        "type": "grid",
        "rows": 3,
        "cols": 3,
        "default": {},
        "nestedGrids": []
    },

    buildConfig: function(rows, cols, minForWin, players) {
        var config = JSON.parse(JSON.stringify(this.configTemplate));

        config.input = {
            players: players,
            minForWin: minForWin,
            rows: rows,
            cols: cols
        };

        var playerChoiceTemplate = JSON.stringify(this.choiceTemplate);

        var maxTurns = rows*cols;

        var playerCount = players.length;
        var playerIds = [];
        var playerBoardIds = [];

        for (var i = 0; i < players.length; i++) {
            var player = players[i];

            var modulusCondition = playerCount + ' == ' + i;

            playerIds.push(player.id);

            var render = playerChoiceTemplate
                .replace(/##PLAYER_ID##/g, player.id)
                .replace(/##PLAYER_MARKER##/g, player.marker)
                .replace(/##MODULOUS_CONDITION##/g, modulusCondition)
                .replace(/"##MIN_FOR_WIN##"/g, minForWin)
                .replace(/##MAX_TURNS##/g, maxTurns);


            config.values['tictactoe.playerTurn'].choices[player.id] = JSON.parse(render);

            var playerBoard = _.clone(this.playerBoardTemplate);
            playerBoard.rows = rows;
            playerBoard.cols = cols;

            var playerBoardId = 'tictactoe.' + player.id + '.board';

            playerBoardIds.push(playerBoardId);

            config.values[playerBoardId] = playerBoard;
        }

        var resetAction = JSON.parse(JSON.stringify(this.resetGameTemplate));

        resetAction.instructions[0].gridValues = playerBoardIds;

        config.values['tictactoe.game'].choices['reset'] = resetAction;

        var combinedBoard = _.clone(this.combinedBoardTemplate);
        combinedBoard.includes = _.map(playerBoardIds, function(id) { return {gridValue: id}; });
        combinedBoard.rows = rows;
        combinedBoard.cols = cols;

        config.values['tictactoe.board'] = combinedBoard;

        return config;
    }
};

module.exports = ConfigBuilder;

if (process.argv[1] == __filename) {
    console.log(JSON.stringify(ConfigBuilder.buildConfig(3, 3, 3, [{id: 'player1', marker: '1'}, {id: 'player2', marker: '2'}])));
}