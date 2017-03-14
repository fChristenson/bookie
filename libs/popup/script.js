var script = (function(state, actions, U) {

  function removeScript(id) {
    return function(vals) {
      var scripts = vals.scripts || [];
      var updatedScripts = scripts.filter(U.isNotScript(id));

      var obj = {
        scripts: updatedScripts
      };

      state.dispatch(actions.makeAction(actions.SET_SCRIPTS, updatedScripts));
      state.dispatch(actions.makeAction(actions.RESET_FOCUS));
      chrome.storage.sync.set(obj);
    };
  }

  function addScript(e) {
    return function(vals) {
      var name = U.getName(e);
      var text = U.getText(e);
      var scripts = vals.scripts || [];
      var id = U.getId(e, scripts);
      var userId = U.getUserId(e, scripts) || id;
      var save = {id: id, userId: userId, name: name, text: text};

      var updatedScripts = [save].concat(scripts);

      var obj = {
        scripts: updatedScripts
      };

      state.dispatch(actions.makeAction(actions.SET_SCRIPTS, updatedScripts));
      state.dispatch(actions.makeAction(actions.SET_INPUT_VALUE, ''));
      return chrome.storage.sync.set(obj);
    };
  }

  return {
    addScript: addScript,
    removeScript: removeScript
  };

})(state, actions, utils);