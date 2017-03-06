var reducers = (function(actions) {
  function saveReducer(state, action) {
    switch(action.type) {
    
    case actions.SET_EXECUTED_COMMANDS:
      return Object.assign({}, state, {commandHistory: action.payload});

    case actions.SET_COMMAND_HISTORY_POINTER:
      return Object.assign({}, state, {commandHistoryPointer: action.payload});

    case actions.MOVE_COMMAND_HISTORY_POINTER_FORWARD:
      var pointer = Math.min(state.commandHistoryPointer + 1, state.commandHistory.length - 1);
      var newState = {commandHistoryPointer: pointer, showCommandFromHistory: true};
      return Object.assign({}, state, newState);

    case actions.MOVE_COMMAND_HISTORY_POINTER_BACK:
      var pointer = Math.max(state.commandHistoryPointer - 1, 0);
      var newState = {commandHistoryPointer: pointer, showCommandFromHistory: true};
      return Object.assign({}, state, newState);

    case actions.SET_SHOW_COMMAND_FROM_HISTORY:
      return Object.assign({}, state, {showCommandFromHistory: action.payload});

    case actions.SET_SCRIPTS:
      return Object.assign({}, state, {scripts: action.payload});
    
    default:
      return state;
    }
  }

  function keyReducer(state, action) {
    switch(action.type) {

    case actions.SET_SHIFT_KEY_HELD:
      return Object.assign({}, state, {shiftKeyHeld: true});

    case actions.UNSET_SHIFT_KEY_HELD:
      return Object.assign({}, state, {shiftKeyHeld: false});

    default:
      return state;
    }
  }

  return [
    saveReducer,
    keyReducer
  ];
})(actions);