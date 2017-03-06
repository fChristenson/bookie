(function(window, U, C, R, K, S, state, actions) {
  var document = window.document;
  var list = document.querySelector('.bookie_searchbox__ul');
  var input = document.querySelector('.bookie_searchbox__input');
  var BACK_SPACE_KEY_CODE = 8;
  var UP_KEY_CODE = 38;
  var DOWN_KEY_CODE = 40;
  var updatedState = {
    scripts: []
  };
  var app = {updateState: updateState};

  state.subscribe(app);
  S.getCommandHistory(initCommandHistory);
  S.getScripts(initScriptList);
  C.resetCommandQueue();

  input.addEventListener('keyup', update(list));
  input.addEventListener('keydown', K.isHoldingShift);

  function updateState(state) {
    updatedState = state;
    
    if(updatedState.showCommandFromHistory) {
      input.value = updatedState.commandHistory[updatedState.commandHistoryPointer];
    }
    
  }

  function initScriptList(vals) {
    var scripts = vals.scripts || [];

    state.dispatch(actions.makeAction(actions.SET_SCRIPTS, scripts));
    scripts.forEach(R.addItems(list));
  }

  function initCommandHistory(vals) {
    var history = vals.commandHistory || [];
    state.dispatch(actions.makeAction(actions.SET_EXECUTED_COMMANDS, history));
    state.dispatch(actions.makeAction(actions.SET_COMMAND_HISTORY_POINTER, history.length));
  }

  function update(list) {
    return function(e) {
      console.log(e.keyCode);
      if(updatedState.shiftKeyHeld && e.keyCode === K.ENTER_KEY_CODE) {
        state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
        return S.saveScript(e, updateList(e.target.value));
      }

      if(e.keyCode === BACK_SPACE_KEY_CODE) {
        var scriptToDelete = updatedState.scripts.find(U.isMatch(e.target.value));
        state.dispatch(actions.makeAction(actions.MOVE_COMMAND_HISTORY_POINTER_BACK));
        return S.deleteScript(scriptToDelete, updateList(scriptToDelete.name));
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
      return R.renderList(list, updatedState.scripts, e.target.value);
    };
  }

  function updateList(value) {
    return function() {
      input.value = '';
      R.renderList(list, updatedState.scripts, value);
    };
  }
  
  return app;

})(window, Utils, CommandUtils, RenderUtils, KeyUtils, saveUtils, state, actions);
