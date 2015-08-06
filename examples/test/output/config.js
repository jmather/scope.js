module.exports = {
  "values": {
    "entity.things": {
      "type": "list",
      "default": []
    },
    "counter.a": {
      "type": "counter",
      "min": null,
      "max": null,
      "step": 1,
      "default": 0
    },
    "counter.b": {
      "type": "counter",
      "min": null,
      "max": null,
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
        "incrementA": {
          "type": "choice",
          "when": [],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "increment",
              "value": "counter.a",
              "amount": 1
            }
          ]
        },
        "incrementB": {
          "type": "choice",
          "when": [],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "increment",
              "value": "counter.b",
              "amount": 1
            }
          ]
        },
        "incrementBoth": {
          "type": "choice",
          "when": [],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "increment",
              "value": "counter.a",
              "amount": 1
            },
            {
              "type": "instruction",
              "instruction": "increment",
              "value": "counter.b",
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
        "doSomething": {
          "type": "choice",
          "when": [],
          "notWhen": [],
          "instructions": []
        }
      },
      "default": {}
    }
  },
  "decks": {},
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
  }
};