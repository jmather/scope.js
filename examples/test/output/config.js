module.exports = {
  "values": {
    "collection.thing": {
      "type": "collection",
      "template": null,
      "default": {},
      "object": "collection.thing"
    },
    "collection.thing.lastId": {
      "type": "counter",
      "min": 0,
      "max": null,
      "step": 1,
      "default": 0
    },
    "collection.thing.size": {
      "type": "counter",
      "min": null,
      "max": null,
      "step": 1,
      "default": 0
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
          "instructions": [
            {
              "type": "instruction",
              "instruction": "create",
              "object": "collection.thing",
              "value": "collection.things"
            }
          ]
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
  },
  "decks": {},
  "objects": {
    "collection.thing": {
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