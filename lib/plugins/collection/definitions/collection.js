module.exports = {
    type: "collection",
    template: null,
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