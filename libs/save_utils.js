var saveUtils = (function(state, actions) {
  var COMMAND_HISTORY = 'commandHistory';
  
  function getCommandHistory(callback) {
    return chrome.storage.sync.get(COMMAND_HISTORY, callback);
  }

  function saveCommandToHistory(e) {
    return chrome.storage.sync.get(COMMAND_HISTORY, addCommandToHistory(e));
  }

  function addCommandToHistory(e) {
    return function(vals) {
      var array = (vals && vals.commandHistory) ? vals.commandHistory : [];
      array.push(e.target.value);

      var obj = {};
      obj.commandHistory = array;

      state.dispatch(actions.makeAction(actions.SET_EXECUTED_COMMANDS, array));
      return chrome.storage.sync.set(obj);
    };
  }

  return {
    COMMAND_HISTORY: COMMAND_HISTORY,
    getCommandHistory: getCommandHistory,
    saveCommandToHistory: saveCommandToHistory
  };
})(state, actions);