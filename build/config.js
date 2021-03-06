module.exports = {
  "values": {
    "entity.things": {
      "type": "list",
      "default": []
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
              "counterValue": "counter.min0max10",
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
              "counterValue": "counter.min0max10",
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
        "createThing": {
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
              "data": "X"
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
              "data": "O"
            }
          ]
        }
      },
      "default": {}
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
    }
  },
  "expressionTemplates": {},
  "decks": {},
  "client": {
    "views": {
      "client.views.home": {
        "title": "Home",
        "type": "view",
        "layout": "panel",
        "default": true,
        "panels": [
          {
            "value": "counter.scope",
            "title": "Counters",
            "type": "panel",
            "display": [
              {
                "value": "counter.min0max10",
                "title": "Min 0 Max 10"
              }
            ],
            "commandMap": {
              "increment": "Increment Counter",
              "decrement": "Decrement Counter"
            }
          },
          {
            "value": "entity.scope",
            "title": "Entities",
            "display": [
              {
                "value": "entity.thing.size",
                "title": "Number of Things"
              },
              {
                "value": "entity.thing",
                "title": "Thing Repository"
              },
              {
                "value": "entity.things",
                "title": "Things List"
              }
            ],
            "commandMap": {
              "createThing": "Create New Thing"
            }
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
      "client.views.simple": {
        "title": "Simple",
        "type": "view",
        "layout": "panel",
        "panels": [
          {
            "value": "counter.scope",
            "title": "Counters",
            "type": "panel",
            "display": [
              {
                "value": "counter.min0max10",
                "title": "Min 0 Max 10"
              }
            ],
            "commandMap": {
              "increment": "Increment Counter",
              "decrement": "Decrement Counter"
            }
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
    "scope-plugin-scope",
    "scope-plugin-counter",
    "scope-plugin-entity",
    "scope-plugin-grid"
  ]
};