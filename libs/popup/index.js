(function(U, C, S, state, actions) {
  var UP_KEY_CODE = 38;
  var DOWN_KEY_CODE = 40;
  var SHIFT_KEY_CODE = 16;
  var ENTER_KEY_CODE = 13;
  var app = {updateState: updateState};
  var newState = state.data;

  state.subscribe(app);
  S.getCommandHistory(initCommandHistory);
  S.getScripts(initScriptList);
  C.resetCommandQueue();

  newState.input.addEventListener('keyup', update);
  newState.input.addEventListener('keydown', isHoldingShift);

  function updateState(update) {
    newState = update;

    if(newState.showCommandFromHistory) {
      var val = newState.commandHistory[newState.commandHistoryPointer];
      state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
      state.dispatch(actions.makeAction(actions.SET_INPUT_VALUE, val));
    }
  }

  function isHoldingShift(e) {
    if(e.keyCode === SHIFT_KEY_CODE) {
      state.dispatch(actions.makeAction(actions.SET_SHIFT_KEY_HELD));
    }
  }

  function initScriptList(vals) {
    var scripts = vals.scripts || [];
    state.dispatch(actions.makeAction(actions.SET_SCRIPTS, scripts));
    state.dispatch(actions.makeAction(actions.SET_LIST_ITEMS));
  }

  function initCommandHistory(vals) {
    var history = vals.commandHistory || [];
    state.dispatch(actions.makeAction(actions.SET_EXECUTED_COMMANDS, history));
    state.dispatch(actions.makeAction(actions.SET_COMMAND_HISTORY_POINTER, history.length));
  }

  function update(e) {
    var val;

    if(newState.shiftKeyHeld && e.keyCode === ENTER_KEY_CODE) {
      state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
      return S.saveScript(e, updateList);
    }

    if(e.keyCode === UP_KEY_CODE) {
      state.dispatch(actions.makeAction(actions.MOVE_COMMAND_HISTORY_POINTER_BACK));
      val = newState.commandHistory[newState.commandHistoryPointer];
      return state.dispatch(actions.makeAction(actions.SET_INPUT_VALUE, val));
    }

    if(e.keyCode === DOWN_KEY_CODE) {
      state.dispatch(actions.makeAction(actions.MOVE_COMMAND_HISTORY_POINTER_FORWARD));
      val = newState.commandHistory[newState.commandHistoryPointer];
      return state.dispatch(actions.makeAction(actions.SET_INPUT_VALUE, val));
    }

    if(e.keyCode === SHIFT_KEY_CODE) {
      state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
      return state.dispatch(actions.makeAction(actions.UNSET_SHIFT_KEY_HELD));
    }

    if(e.keyCode === ENTER_KEY_CODE) {
      state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
      S.saveCommandToHistory(e);
      return C.runCommand(e);
    }

    state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
    state.dispatch(actions.makeAction(actions.CLEAR_LIST));
    return state.dispatch(actions.makeAction(actions.SET_LIST_ITEMS, e.target.value));
  }

  function updateList() {
    state.dispatch(actions.makeAction(actions.SET_INPUT_VALUE, ''));
    state.dispatch(actions.makeAction(actions.CLEAR_LIST));
    return state.dispatch(actions.makeAction(actions.SET_LIST_ITEMS));
  }
  
  return app;

})(Utils, commandUtils, saveUtils, state, actions);
