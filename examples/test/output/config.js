module.exports = {
  "values": {
    "entity.things": {
      "type": "list",
      "default": []
    },
    "counter.min0max10": {
      "type": "counter",
      "min": 0,
      "max": 10,
      "step": 1,
      "default": 0
    },
    "entity.thing": {
      "type": "repository",
      "entity": "entity.thing",
      "default": {}
    },
    "entity.thing.lastId": {
      "type": "counter",
      "min": 0,
      "max": null,
      "step": 1,
      "default": 0
    },
    "entity.thing.size": {
      "type": "counter",
      "min": null,
      "max": null,
      "step": 1,
      "default": 0
    },
    "grid.grid": {
      "type": "grid",
      "rows": 3,
      "cols": 3,
      "default": {},
      "nestedGrids": []
    },
    "counter.scope": {
      "type": "scope",
      "choices": {
        "increment": {
          "type": "choice",
          "when": [],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "increment",
              "value": "counter.min0max10",
              "amount": 1
            }
          ]
        },
        "decrement": {
          "type": "choice",
          "when": [],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "decrement",
              "value": "counter.min0max10",
              "amount": 1
            }
          ]
        }
      },
      "default": {}
    },
    "entity.scope": {
      "type": "scope",
      "choices": {
        "doSomething": {
          "type": "choice",
          "when": [],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "create",
              "entity": "entity.thing",
              "listValue": "entity.things"
            }
          ]
        }
      },
      "default": {}
    },
    "grid.scope": {
      "type": "scope",
      "choices": {
        "placeX": {
          "type": "choice",
          "when": [],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "grid.grid",
              "value": "X"
            }
          ]
        },
        "placeO": {
          "type": "choice",
          "when": [],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "place",
              "gridValue": "grid.grid",
              "value": "O"
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
            "value": "counter.scope",
            "title": "Counters",
            "display": [
              {
                "value": "counter.min0max10",
                "title": "Min 0 Max 10"
              }
            ],
            "commandMap": {
              "increment": "Increment",
              "decrement": "Decrement"
            }
          },
          {
            "value": "entity.scope",
            "title": "Entities",
            "display": [
              {
                "value": "entity.thing.size",
                "title": "Number of Things"
              }
            ]
          },
          {
            "value": "grid.scope",
            "title": "Grid Example",
            "display": [
              {
                "value": "grid.grid"
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
  "entities": {
    "entity.thing": {
      "thing": {
        "type": "pick-one",
        "choices": [
          "a",
          "b"
        ]
      }
    }
  },
  "scopes": [
    "counter.scope",
    "entity.scope",
    "grid.scope"
  ],
  "plugins": [
    "scope-plugin-core",
    "scope-plugin-counter",
    "scope-plugin-entity",
    "scope-plugin-grid",
    "scope-plugin-scope"
  ]
};