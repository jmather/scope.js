module.exports = {
    type: "collection",
    template: null,
    default: {},
    subDefinitions: {
        nextId: {
            type: "counter",
            min: 1,
            default: 1
        },
        size: {
            type: "counter"
        }
    }
};