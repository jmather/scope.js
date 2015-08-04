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
          "type": "choice",
          "when": [],
          "notWhen": [],
          "instructions": [
            {
              "type": "instruction",
              "instruction": "increment",
              "value": "test.a",
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
              "value": "test.b",
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
              "value": "test.a",
              "amount": 1
            },
            {
              "type": "instruction",
              "instruction": "increment",
              "value": "test.b",
              "amount": 1
            }
          ]
        }
      }
    }
  }
};