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
      var id = getId(e, scripts);

      //TODO: make sure id is uniq
      var updatedScripts = [{id: id, name: name, text: text}].concat(scripts);

      var obj = {
        scripts: updatedScripts
      };

      state.dispatch(actions.makeAction(actions.SET_SCRIPTS, updatedScripts));
      state.dispatch(actions.makeAction(actions.SET_INPUT_VALUE, ''));
      return chrome.storage.sync.set(obj);
    };
  }

  function getId(e, scripts) {
    var array = e.target.value.split('->');
    var idCommand = array[0];
    var match = idCommand.match(/\s*id\s([\w\d]+)\s/)[1];
    
    if(match) {
      return parseInt(match.trim());
    }
    
    var idArray = scripts.map(scriptToId);
    var maxId = Math.max.apply(Math, idArray);
    
    return (maxId >= 0) ? maxId + 1 : 1;
  }

  function getText(e) {
    var array = e.target.value.split('->');
    var str = array.slice(1, array.length).join('->');

    return str.trim();
  }

  function getName(e) {
    var array = e.target.value.split('->');
    var nameCommand = array[0];
    var match = nameCommand.match(/name\s([\w\d]+)\s/)[1];

    return match.trim();
  }

  return {
    addScript: addScript,
    removeScript: removeScript
  };

})(state, actions);