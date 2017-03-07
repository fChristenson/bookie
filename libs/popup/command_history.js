var commandHistory = (function(state, actions, U) {
  var MAX_HISTORY_LENGTH = 100;
  
  function addCommandToHistory(e) {
    return function(vals) {
      var array = U.getExectutedCommands(e, vals);

      if(array.length >= MAX_HISTORY_LENGTH) {
        array.shift();
      }

      state.dispatch(actions.makeAction(actions.SET_EXECUTED_COMMANDS, array));
      return chrome.storage.sync.set({commandHistory: array});
    };
  }

  return {
    addCommandToHistory: addCommandToHistory
  };
})(state, actions, utils);