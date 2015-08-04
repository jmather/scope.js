module.exports = {
  "decks": {},
  "values": {
    "test.a": {
      "type": "counter",
      "min": null,
      "max": null,
      "step": 1,
      "default": 0
    },
    "test.b": {
      "type": "counter",
      "min": null,
      "max": null,
      "step": 1,
      "default": 0
    },
    "test.store": {
      "type": "scope",
      "choices": {
        "incrementA": {
          "type": "grid",
          "when": [],
          "notWhen": [],
          "instructions": [
            {
              "type": "grid",
              "rows": 1,
              "cols": 1,
              "default": {},
              "nestedGrids": [],
              "instruction": "increment",
              "value": "test.a",
              "amount": 1
            }
          ],
          "rows": 1,
          "cols": 1,
          "default": {},
          "nestedGrids": []
        },
        "incrementB": {
          "type": "grid",
          "when": [],
          "notWhen": [],
          "instructions": [
            {
              "type": "grid",
              "rows": 1,
              "cols": 1,
              "default": {},
              "nestedGrids": [],
              "instruction": "increment",
              "value": "test.b",
              "amount": 1
            }
          ],
          "rows": 1,
          "cols": 1,
          "default": {},
          "nestedGrids": []
        },
        "incrementBoth": {
          "type": "grid",
          "when": [],
          "notWhen": [],
          "instructions": [
            {
              "type": "grid",
              "rows": 1,
              "cols": 1,
              "default": {},
              "nestedGrids": [],
              "instruction": "increment",
              "value": "test.a",
              "amount": 1
            },
            {
              "type": "grid",
              "rows": 1,
              "cols": 1,
              "default": {},
              "nestedGrids": [],
              "instruction": "increment",
              "value": "test.b",
              "amount": 1
            }
          ],
          "rows": 1,
          "cols": 1,
          "default": {},
          "nestedGrids": []
        }
      }
    }
  }
};