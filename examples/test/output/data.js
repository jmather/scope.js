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
          "instructions": [],
          "type": "choice",
          "when": [],
          "notWhen": []
        },
        "incrementB": {
          "instructions": [],
          "type": "choice",
          "when": [],
          "notWhen": []
        },
        "incrementBoth": {
          "instructions": [],
          "type": "choice",
          "when": [],
          "notWhen": []
        }
      }
    }
  }
};