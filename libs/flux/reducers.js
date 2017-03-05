var reducers = (function(actions) {
  function saveReducer(state, action) {
    switch(action.type) {
    
    case actions.SET_EXECUTED_COMMANDS:
      return Object.assign({}, state, {commandHistory: action.payload});

    case actions.SET_COMMAND_HISTORY_POINTER:
      return Object.assign({}, state, {commandHistoryPointer: action.payload});
    
    default:
      return state;
    }
  }

  return [
    saveReducer
  ];
})(actions);