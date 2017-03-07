(function(U, C, state, actions, S, H, SC) {
  var UP_KEY_CODE = 38;
  var DOWN_KEY_CODE = 40;
  var ENTER_KEY_CODE = 13;
  var SCRIPTS = 'scripts';
  var COMMAND_HISTORY = 'commandHistory';
  var app = {updateState: updateState};
  var newState = state.data;

  state.subscribe(app);
  newState.input.addEventListener('keyup', update);
  init();

  function init() {
    chrome.storage.sync.get(COMMAND_HISTORY, initCommandHistory);
    chrome.storage.sync.get(SCRIPTS, initScriptList);
    C.resetCommandQueue();
    state.dispatch(actions.makeAction(actions.SET_INPUT_VALUE, ''));
  }

  function updateState(update) {
    newState = update;

    U.renderList(
        newState.list, 
        newState.scripts, 
        newState.input.value, 
        C.runLiCommand,
        deleteScript);

    if(newState.showCommandFromHistory) {
      var val = newState.commandHistory[newState.commandHistoryPointer];
      state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
      state.dispatch(actions.makeAction(actions.SET_INPUT_VALUE, val));
    }
  }

  function deleteScript(id) {
    return chrome.storage.sync.get(SCRIPTS, S.removeScript(id));
  }

  function initScriptList(vals) {
    var scripts = vals.scripts || [];
    state.dispatch(actions.makeAction(actions.SET_SCRIPTS, scripts));
  }

  function initCommandHistory(vals) {
    var history = vals.commandHistory || [];
    state.dispatch(actions.makeAction(actions.SET_EXECUTED_COMMANDS, history));
    state.dispatch(actions.makeAction(actions.SET_COMMAND_HISTORY_POINTER, history.length));
  }

  function update(e) {
    var val;

    if(e.keyCode === ENTER_KEY_CODE && U.isSave(e.target.value)) {
      state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
      return chrome.storage.sync.get(SCRIPTS, S.addScript(e));
    }

    if(e.keyCode === ENTER_KEY_CODE && SC.isSpecialCommand(e.target.value)) {
      return SC.runSpecialCommand(e.target.value, init);
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

    if(e.keyCode === ENTER_KEY_CODE) {
      C.runCommand(e, newState.scripts);
      state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
      return chrome.storage.sync.get(COMMAND_HISTORY, H.addCommandToHistory(e));
    }

    return state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
  }
  
  return app;

})(utils, command, state, actions, script, commandHistory, specialCommand);
