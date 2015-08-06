module.exports = {
    type: "repository",
    entity: null,
    default: {},
    subDefinitions: {
        lastId: {
            type: "counter",
            min: 0
        },
        size: {
            type: "counter"
        }
    }
};