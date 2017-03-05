(function(window, U, C, R, K, data, S, state, actions) {
  var document = window.document;
  var list = document.querySelector('.bookie_searchbox__ul');
  var input = document.querySelector('.bookie_searchbox__input');
  var UP_KEY_CODE = 38;
  var DOWN_KEY_CODE = 40;
  var updatedState = {};

  S.getCommandHistory(initCommandHistory);
  C.resetCommandQueue();

  input.addEventListener('keyup', update(list));
  input.addEventListener('keydown', K.isHoldingShift);
  data.forEach(R.addItems(list));

  function updateState(state) {
    updatedState = state;
    
    if(updatedState.showCommandFromHistory) {
      input.value = updatedState.commandHistory[updatedState.commandHistoryPointer];
    }
  }

  function initCommandHistory(vals) {
    var history = vals.commandHistory || [];
    state.dispatch(actions.makeAction(actions.SET_EXECUTED_COMMANDS, history));
    state.dispatch(actions.makeAction(actions.SET_COMMAND_HISTORY_POINTER, history.length));
  }

  function update(list) {
    return function(e) {
      if(updatedState.shiftKeyHeld && e.keyCode === K.ENTER_KEY_CODE) {
        state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
        return C.saveCommand(e);
      }

      if(e.keyCode === UP_KEY_CODE) {
        return state.dispatch(actions.makeAction(actions.MOVE_COMMAND_HISTORY_POINTER_BACK));
      }

      if(e.keyCode === DOWN_KEY_CODE) {
        return state.dispatch(actions.makeAction(actions.MOVE_COMMAND_HISTORY_POINTER_FORWARD));
      }

      if(e.keyCode === K.SHIFT_KEY_CODE) {
        state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
        return state.dispatch(actions.makeAction(actions.UNSET_SHIFT_KEY_HELD));
      }

      if(e.keyCode === K.ENTER_KEY_CODE) {
        state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
        S.saveCommandToHistory(e);
        return C.runCommand(e);
      }

      state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
      return R.renderList(list, data, e);
    };
  }
  
  var app = {
    updateState: updateState
  };
  
  state.subscribe(app);
  return app;

})(window, Utils, CommandUtils, RenderUtils, KeyUtils, data, saveUtils, state, actions);
