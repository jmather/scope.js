module.exports = {
  "decks": {},
  "instanceTemplates": {
    "collection.thing": {
      "type": "instance-template",
      "thing": {
        "value": "collection.counter"
      }
    }
  },
  "values": {
    "collection.things": {
      "type": "collection",
      "template": "collection.thing",
      "default": {}
    },
    "collection.things.nextId": {
      "type": "counter",
      "min": 1,
      "default": 1
    },
    "collection.things.size": {
      "type": "counter"
    },
    "collection.gold": {
      "type": "counter",
      "min": null,
      "max": null,
      "step": 1,
      "default": 10
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
    "grid.grid": {
      "type": "grid",
      "rows": 3,
      "cols": 3,
      "default": {},
      "nestedGrids": []
    },
    "collection.scope": {
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
  }
};