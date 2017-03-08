var specialCommand = (function(state, actions) {
  function isSpecialCommand(text) {
    return /^clear$/.test(text)
    || /^export$/.test(text)
    || /^import ->/.test(text);  
  }

  function runSpecialCommand(text, callback) {
    if(/^clear$/.test(text)) return chrome.storage.sync.set({scripts: [], commandHistory: []}, callback);
    if(/^export$/.test(text)) return chrome.storage.sync.get('scripts', exportList(callback));
    if(/^import ->/.test(text)) return importList(text, callback);
    
    return callback();
  }

  function importList(text, callback) {
    var scripts;
    try {
      var strScripts = text.split('->')[1];
      scripts = JSON.parse(strScripts);

      if(!Array.isArray(scripts)) throw new Error('Not valid array');

      chrome.storage.sync.set({scripts: scripts}, callback);
    
    } catch(e) {
      state.dispatch(actions.makeAction(actions.SET_INPUT_VALUE, 'import is not a valid array'));
    }
  }

  function exportList(callback) {
    return function(vals) {
      var result = JSON.stringify(vals.scripts, null, 4);
      var url = 'data:application/json;base64,' + btoa(result);
      callback();

      chrome.downloads.download({
        url: url,
        filename: 'bookie_scripts.json'
      });
    };
  }

  return {
    isSpecialCommand: isSpecialCommand,
    runSpecialCommand: runSpecialCommand
  };
})(state, actions);