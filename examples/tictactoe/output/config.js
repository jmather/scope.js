module.exports = {
  "values": {
    "tictactoe.winner": {
      "type": "data",
      "default": null
    },
    "tictactoe.game": {
      "type": "scope",
      "choices": {
        "instantWinPlayer1": {
          "type": "choice",
          "when": [
            "{{= context.getValue('tictactoe.winner') === null }}",
            "{{= context.getValue('tictactoe.turns') < 9 }}"
          ],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.player1.board",
              "cell": "1-1",
              "referenceGridValue": "tictactoe.board",
              "data": "1"
            },
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.player1.board",
              "cell": "2-2",
              "referenceGridValue": "tictactoe.board",
              "data": "1"
            },
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.player1.board",
              "cell": "3-3",
              "referenceGridValue": "tictactoe.board",
              "data": "1"
            },
            {
              "type": "instruction",
              "instruction": "hasWon",
              "gridValue": "tictactoe.player1.board",
              "dataValue": "tictactoe.winner",
              "data": "1",
              "min": 3
            }
          ]
        },
        "instantWinPlayer2": {
          "type": "choice",
          "when": [
            "{{= context.getValue('tictactoe.winner') === null }}",
            "{{= context.getValue('tictactoe.turns') < 9 }}"
          ],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.player2.board",
              "cell": "1-1",
              "referenceGridValue": "tictactoe.board",
              "data": "2"
            },
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.player2.board",
              "cell": "2-2",
              "referenceGridValue": "tictactoe.board",
              "data": "2"
            },
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.player2.board",
              "cell": "3-3",
              "referenceGridValue": "tictactoe.board",
              "data": "2"
            },
            {
              "type": "instruction",
              "instruction": "hasWon",
              "gridValue": "tictactoe.player2.board",
              "dataValue": "tictactoe.winner",
              "data": "2",
              "min": 3
            }
          ]
        },
        "player1": {
          "type": "choice",
          "when": [
            "{{= context.getValue('tictactoe.turns') % 2 == 0 }}",
            "{{= context.getValue('tictactoe.winner') === null }}",
            "{{= context.getValue('tictactoe.turns') < 9 }}"
          ],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.player1.board",
              "referenceGridValue": "tictactoe.board",
              "data": "1"
            },
            {
              "type": "instruction",
              "instruction": "hasWon",
              "gridValue": "tictactoe.player1.board",
              "dataValue": "tictactoe.winner",
              "data": "1",
              "min": 3
            },
            {
              "type": "instruction",
              "instruction": "increment",
              "counterValue": "tictactoe.turns",
              "amount": 1
            }
          ]
        },
        "player2": {
          "type": "choice",
          "when": [
            "{{= context.getValue('tictactoe.turns') % 2 == 1 }}",
            "{{= context.getValue('tictactoe.winner') === null }}",
            "{{= context.getValue('tictactoe.turns') < 9 }}"
          ],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.player2.board",
              "referenceGridValue": "tictactoe.board",
              "data": "2"
            },
            {
              "type": "instruction",
              "instruction": "hasWon",
              "gridValue": "tictactoe.player2.board",
              "dataValue": "tictactoe.winner",
              "data": "2",
              "min": 3
            },
            {
              "type": "instruction",
              "instruction": "increment",
              "counterValue": "tictactoe.turns",
              "amount": 1
            }
          ]
        },
        "newGame": {
          "type": "choice",
          "when": [
            "{{= context.getValue('tictactoe.winner') !== null || context.getValue('tictactoe.turns') >= 9 }}"
          ],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "resetGame",
              "gridValues": [
                "tictactoe.player1.board",
                "tictactoe.player2.board"
              ],
              "dataValue": "tictactoe.winner",
              "counterValue": "tictactoe.turns"
            }
          ]
        }
      },
      "default": {}
    },
    "tictactoe.turns": {
      "type": "counter",
      "min": 0,
      "max": null,
      "step": 1,
      "default": 0
    },
    "tictactoe.board": {
      "type": "grid-collection",
      "rows": 3,
      "cols": 3,
      "default": {},
      "includes": [
        {
          "gridValue": "tictactoe.player1.board"
        },
        {
          "gridValue": "tictactoe.player2.board"
        }
      ]
    },
    "tictactoe.player1.board": {
      "type": "grid",
      "rows": 3,
      "cols": 3,
      "default": {},
      "nestedGrids": []
    },
    "tictactoe.player2.board": {
      "type": "grid",
      "rows": 3,
      "cols": 3,
      "default": {},
      "nestedGrids": []
    }
  },
  "expressionTemplates": {},
  "decks": {},
  "client": {
    "views": {
      "client.views.home": {
        "title": "Home",
        "type": "view",
        "default": true,
        "layout": "panel",
        "panels": [
          {
            "value": "tictactoe.game",
            "title": "Tic Tac Toe",
            "display": [
              {
                "title": "Winner",
                "value": "tictactoe.winner"
              },
              {
                "value": "tictactoe.board"
              }
            ]
          }
        ]
      },
      "client.views.config": {
        "title": "Config",
        "type": "view",
        "layout": "config"
      },
      "client.views.data": {
        "title": "Data",
        "type": "view",
        "layout": "data"
      }
    },
    "defaultView": "client.views.home"
  },
  "entities": {},
  "scopes": [
    "tictactoe.game"
  ],
  "plugins": [
    "scope-plugin-core",
    "scope-plugin-scope",
    "scope-plugin-counter",
    "scope-plugin-entity",
    "scope-plugin-grid"
  ]
};