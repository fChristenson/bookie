var script = (function(state, actions) {

  function removeScript(id) {
    return function(vals) {
      var scripts = vals.scripts || [];
      var updatedScripts = scripts.filter(isNotScript(id));

      var obj = {
        scripts: updatedScripts
      };

      state.dispatch(actions.makeAction(actions.SET_SCRIPTS, updatedScripts));
      state.dispatch(actions.makeAction(actions.RESET_FOCUS));
      chrome.storage.sync.set(obj);
    };
  }

  function isNotScript(id) {
    return function(s) {
      return s.id !== id;
    };
  }

  function scriptToId(script) {
    return script.id || 0;
  }

  function addScript(e) {
    return function(vals) {
      var name = getName(e);
      var text = getText(e);
      var scripts = vals.scripts || [];
      var idArray = scripts.map(scriptToId);
      var maxId = Math.max.apply(Math, idArray);
      var id = (maxId >= 0) ? maxId + 1 : 1;
      var updatedScripts = [{id: id, name: name, text: text}].concat(scripts);

      var obj = {
        scripts: updatedScripts
      };

      state.dispatch(actions.makeAction(actions.SET_SCRIPTS, updatedScripts));
      state.dispatch(actions.makeAction(actions.SET_INPUT_VALUE, ''));
      return chrome.storage.sync.set(obj);
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

  return {
    addScript: addScript,
    removeScript: removeScript
  };

})(state, actions);