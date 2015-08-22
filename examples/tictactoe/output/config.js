module.exports = {
  "values": {
    "tictactoe.winner": {
      "type": "data",
      "default": null
    },
    "tictactoe.game": {
      "type": "scope",
      "choices": {
        "instantWinX": {
          "type": "choice",
          "when": [
            "{{= context.getValue('tictactoe.winner') === null }}"
          ],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.player1.board",
              "cell": "1-1",
              "referenceGridValue": "tictactoe.board",
              "data": "X"
            },
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.player1.board",
              "cell": "2-2",
              "referenceGridValue": "tictactoe.board",
              "data": "X"
            },
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.player1.board",
              "cell": "3-3",
              "referenceGridValue": "tictactoe.board",
              "data": "X"
            },
            {
              "type": "instruction",
              "instruction": "hasWon",
              "gridValue": "tictactoe.player1.board",
              "dataValue": "tictactoe.winner",
              "data": "X",
              "min": 3
            }
          ]
        },
        "placeX": {
          "type": "choice",
          "when": [
            "{{= context.getValue('tictactoe.turns') % 2 == 0 }}",
            "{{= context.getValue('tictactoe.winner') === null }}"
          ],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.player1.board",
              "referenceGridValue": "tictactoe.board",
              "data": "X"
            },
            {
              "type": "instruction",
              "instruction": "hasWon",
              "gridValue": "tictactoe.player1.board",
              "dataValue": "tictactoe.winner",
              "data": "X",
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
        "placeO": {
          "type": "choice",
          "when": [
            "{{= context.getValue('tictactoe.turns') % 2 == 1 }}",
            "{{= context.getValue('tictactoe.winner') === null }}"
          ],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.player2.board",
              "referenceGridValue": "tictactoe.board",
              "data": "O"
            },
            {
              "type": "instruction",
              "instruction": "hasWon",
              "gridValue": "tictactoe.player2.board",
              "dataValue": "tictactoe.winner",
              "data": "O",
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
            "{{= context.getValue('tictactoe.winner') !== null }}"
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
      "min": 1,
      "max": null,
      "step": 1,
      "default": 1
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