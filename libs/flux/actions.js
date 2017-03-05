var actions = (function() {
  function makeAction(key, payload) {
    return {
      type: key,
      payload: payload
    };
  }

  return {
    makeAction: makeAction,
    SET_SHIFT_KEY_HELD: 'SET_SHIFT_KEY_HELD',
    UNSET_SHIFT_KEY_HELD: 'UNSET_SHIFT_KEY_HELD',
    SET_EXECUTED_COMMANDS: 'SET_EXECUTED_COMMANDS',
    SET_COMMAND_HISTORY_POINTER: 'SET_COMMAND_HISTORY_POINTER'
  };
})();