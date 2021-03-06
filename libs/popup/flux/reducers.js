var reducers = (function(actions, U) {
  function saveReducer(state, action) {
    var pointer; 
    var newState;
    
    switch(action.type) {
    
    case actions.SET_EXECUTED_COMMANDS:
      return Object.assign({}, state, {commandHistory: action.payload});

    case actions.SET_COMMAND_HISTORY_POINTER:
      return Object.assign({}, state, {commandHistoryPointer: action.payload});

    case actions.MOVE_COMMAND_HISTORY_POINTER_FORWARD:
      pointer = U.getPointerWithUpperBound(state.commandHistoryPointer, state.commandHistory);
      newState = {commandHistoryPointer: pointer, showCommandFromHistory: true};
      return Object.assign({}, state, newState);

    case actions.MOVE_COMMAND_HISTORY_POINTER_BACK:
      pointer = U.getPointerWithLowerBound(state.commandHistoryPointer);
      newState = {commandHistoryPointer: pointer, showCommandFromHistory: true};
      return Object.assign({}, state, newState);

    case actions.SET_SHOW_COMMAND_FROM_HISTORY:
      return Object.assign({}, state, {showCommandFromHistory: action.payload});

    case actions.SET_SCRIPTS:
      return Object.assign({}, state, {scripts: action.payload});
    
    default:
      return state;
    }
  }

  function renderReducer(state, action) {
    switch(action.type) {

    case actions.SET_INPUT_VALUE:
      state.input.value = action.payload;
      return state;

    case actions.RESET_FOCUS:
      state.input.focus();
      return state;

    default:
      return state;
    }
  }

  return [
    saveReducer,
    renderReducer
  ];
})(actions, utils);