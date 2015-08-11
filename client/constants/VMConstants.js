var keyMirror = require('keymirror');

module.exports = {
    actionTypes: keyMirror({
        VM_REPLACE_STATE: null,
        VM_REPLACE_CONFIG: null,
        VM_EXECUTE: null,
        RECEIVED_CONFIG: null,
        RECEIVED_STATE: null,
        INITIALIZED: null
    })
};
