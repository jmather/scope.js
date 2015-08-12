module.exports = {
  "values": {
    "tictactoe.turn": {
      "type": "counter",
      "min": 1,
      "max": null,
      "step": 1,
      "default": 1
    },
    "tictactoe.board": {
      "type": "grid",
      "rows": 3,
      "cols": 3,
      "default": {},
      "nestedGrids": []
    },
    "tictactoe.game": {
      "type": "scope",
      "choices": {
        "placeX": {
          "type": "choice",
          "when": [
            "{{= context.getValue('tictactoe.turn') % 2 == 0 }}"
          ],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.board",
              "data": "X"
            },
            {
              "type": "instruction",
              "instruction": "increment",
              "counterValue": "tictactoe.turn",
              "amount": 1
            }
          ]
        },
        "placeO": {
          "type": "choice",
          "when": [
            "{{= context.getValue('tictactoe.turn') % 2 == 1 }}"
          ],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "tictactoe.board",
              "data": "O"
            },
            {
              "type": "instruction",
              "instruction": "increment",
              "counterValue": "tictactoe.turn",
              "amount": 1
            }
          ]
        }
      },
      "default": {}
    }
  },
  "decks": {},
  "client": {
    "views": {
      "client.views.home": {
        "title": "Home",
        "type": "view",
        "default": true,
        "scopes": [
          {
            "value": "tictactoe.game",
            "title": "Tic Tac Toe",
            "display": [
              {
                "value": "tictactoe.board"
              }
            ]
          }
        ]
      },
      "client.views.config": {
        "title": "Config",
        "type": "view"
      },
      "client.views.data": {
        "title": "Data",
        "type": "view"
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
    "scope-plugin-counter",
    "scope-plugin-entity",
    "scope-plugin-grid",
    "scope-plugin-scope"
  ]
};