var save = (function(state, actions) {
  var SCRIPTS = 'scripts';

  function deleteScript(e, callback) {
    return chrome.storage.sync.get(SCRIPTS, removeScript(e, callback));
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

  return {
    deleteScript: deleteScript,
  };
})(state, actions);