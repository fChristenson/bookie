(function(U, C, S, state, actions) {
  var UP_KEY_CODE = 38;
  var DOWN_KEY_CODE = 40;
  var ENTER_KEY_CODE = 13;
  var SCRIPTS = 'scripts';
  var COMMAND_HISTORY = 'commandHistory';
  var MAX_HISTORY_LENGTH = 100;
  var app = {updateState: updateState};
  var newState = state.data;

  state.subscribe(app);
  chrome.storage.sync.get(COMMAND_HISTORY, initCommandHistory);
  chrome.storage.sync.get(SCRIPTS, initScriptList);
  C.resetCommandQueue();

  newState.input.addEventListener('keyup', update);

  function updateState(update) {
    newState = update;

    if(newState.showCommandFromHistory) {
      var val = newState.commandHistory[newState.commandHistoryPointer];
      state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
      state.dispatch(actions.makeAction(actions.SET_INPUT_VALUE, val));
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

    if(e.keyCode === ENTER_KEY_CODE && U.isSave(e.target.value)) {
      state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
      return chrome.storage.sync.get(SCRIPTS, addScript(e));
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
      state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
      chrome.storage.sync.get(COMMAND_HISTORY, addCommandToHistory(e));

      return C.runCommand(e);
    }

    state.dispatch(actions.makeAction(actions.SET_SHOW_COMMAND_FROM_HISTORY, false));
    state.dispatch(actions.makeAction(actions.CLEAR_LIST));
    return state.dispatch(actions.makeAction(actions.SET_LIST_ITEMS, e.target.value));
  }

  function addScript(e) {
    return function(vals) {
      var name = getName(e);
      var text = getText(e);
      var scripts = vals.scripts || [];
      var id = scripts.length;
      var updatedScripts = [{id: id, name: name, text: text}].concat(scripts);

      var obj = {
        scripts: updatedScripts
      };

      state.dispatch(actions.makeAction(actions.SET_SCRIPTS, updatedScripts));
      state.dispatch(actions.makeAction(actions.SET_INPUT_VALUE, ''));
      state.dispatch(actions.makeAction(actions.CLEAR_LIST));
      chrome.storage.sync.set(obj);

      return state.dispatch(actions.makeAction(actions.SET_LIST_ITEMS));
    };
  }

  function getText(e) {
    var array = e.target.value.split('->');
    return array[1].trim();
  }

  function getName(e) {
    var array = e.target.value.split('->');
    var nameCommand = array[0]; // name <name>
    return nameCommand.slice(4, nameCommand.length).trim();
  }

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
  
  return app;

})(utils, command, save, state, actions);
