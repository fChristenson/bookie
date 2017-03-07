var actions = (function() {
  function makeAction(key, payload) {
    return {
      type: key,
      payload: payload
    };
  }

  return {
    makeAction: makeAction,
    CLEAR_LIST: 'CLEAR_LIST',
    SET_INPUT_VALUE: 'SET_INPUT_VALUE',
    SET_LIST_ITEMS: 'SET_LIST_ITEMS',
    SET_SCRIPTS: 'SET_SCRIPTS',
    MOVE_COMMAND_HISTORY_POINTER_BACK: 'MOVE_COMMAND_HISTORY_POINTER_BACK',
    MOVE_COMMAND_HISTORY_POINTER_FORWARD: 'MOVE_COMMAND_HISTORY_POINTER_FORWARD',
    SET_SHOW_COMMAND_FROM_HISTORY: 'SET_SHOW_COMMAND_FROM_HISTORY',
    SET_EXECUTED_COMMANDS: 'SET_EXECUTED_COMMANDS',
    SET_COMMAND_HISTORY_POINTER: 'SET_COMMAND_HISTORY_POINTER'
  };
})();