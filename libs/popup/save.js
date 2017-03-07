var save = (function(state, actions) {
  var COMMAND_HISTORY = 'commandHistory';
  var SCRIPTS = 'scripts';
  var MAX_HISTORY_LENGTH = 100;

  function saveScript(e, callback) {
    return chrome.storage.sync.get(SCRIPTS, addScript(e, callback));
  }

  function deleteScript(e, callback) {
    return chrome.storage.sync.get(SCRIPTS, removeScript(e, callback));
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

  function removeScript(script, callback) {
    return function(vals) {
      var scripts = vals.scripts || [];
      var updatedScripts = scripts.filter(isNotScript(script));

      var obj = {
        scripts: updatedScripts
      };

      state.dispatch(actions.makeAction(actions.SET_SCRIPTS, updatedScripts));
      chrome.storage.sync.set(obj);
      return callback();
    };
  }

  function isNotScript(script) {
    return function(s) {
      return s.id !== script.id;
    };
  }

  function addScript(e, callback) {
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
      chrome.storage.sync.set(obj);
      return callback();
    };
  }

  function getScripts(callback) {
    return chrome.storage.sync.get(SCRIPTS, callback);
  }
  
  function getCommandHistory(callback) {
    return chrome.storage.sync.get(COMMAND_HISTORY, callback);
  }

  function saveCommandToHistory(e) {
    return chrome.storage.sync.get(COMMAND_HISTORY, addCommandToHistory(e));
  }

  function addCommandToHistory(e) {
    return function(vals) {
      var array = (vals && vals.commandHistory) ? vals.commandHistory : [];
      array.push(e.target.value);

      if(array.length >= MAX_HISTORY_LENGTH) {
        array.shift();
      }

      var obj = {};
      obj.commandHistory = array;

      state.dispatch(actions.makeAction(actions.SET_EXECUTED_COMMANDS, array));
      return chrome.storage.sync.set(obj);
    };
  }

  return {
    COMMAND_HISTORY: COMMAND_HISTORY,
    SCRIPTS: SCRIPTS,
    getScripts: getScripts,
    saveScript: saveScript,
    deleteScript: deleteScript,
    getCommandHistory: getCommandHistory,
    saveCommandToHistory: saveCommandToHistory
  };
})(state, actions);