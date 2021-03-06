var AppDispatcher = require('../dispatcher/AppDispatcher');
var ScopeConstants = require('../constants/ScopeConstants');

var ScopeActions = {

    /**
     * @param  {string} text
     */
    create: function(text) {
        AppDispatcher.dispatch({
            actionType: ScopeConstants.TODO_CREATE,
            text: text
        });
    },

    /**
     * @param  {string} id The ID of the ToDo item
     * @param  {string} text
     */
    updateText: function(id, text) {
        AppDispatcher.dispatch({
            actionType: ScopeConstants.TODO_UPDATE_TEXT,
            id: id,
            text: text
        });
    },

    /**
     * Toggle whether a single ToDo is complete
     * @param  {object} todo
     */
    toggleComplete: function(todo) {
        var id = todo.id;
        var actionType = todo.complete ?
            ScopeConstants.TODO_UNDO_COMPLETE :
            ScopeConstants.TODO_COMPLETE;

        AppDispatcher.dispatch({
            actionType: actionType,
            id: id
        });
    },

    /**
     * Mark all ToDos as complete
     */
    toggleCompleteAll: function() {
        AppDispatcher.dispatch({
            actionType: ScopeConstants.TODO_TOGGLE_COMPLETE_ALL
        });
    },

    /**
     * @param  {string} id
     */
    destroy: function(id) {
        AppDispatcher.dispatch({
            actionType: ScopeConstants.TODO_DESTROY,
            id: id
        });
    },

    /**
     * Delete all the completed ToDos
     */
    destroyCompleted: function() {
        AppDispatcher.dispatch({
            actionType: ScopeConstants.TODO_DESTROY_COMPLETED
        });
    }

};

module.exports = ScopeActions;
