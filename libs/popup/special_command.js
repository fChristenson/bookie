var specialCommand = (function() {
  function isSpecialCommand(text) {
    return /^clear$/.test(text)
    || /^export$/.test(text)
    || /^import$/.test(text);  
  }

  function runSpecialCommand(text, callback) {
    if(/^clear$/.test(text)) return chrome.storage.sync.set({scripts: [], commandHistory: []}, callback);
    if(/^export$/.test(text)) return chrome.storage.sync.get('scripts', exportList(callback));
    if(/^import$/.test(text)) importList(text, callback);
    
    return callback();
  }

  function importList(text, callback) {
    var scripts;
    try {
      scripts = JSON.parse(text);
      if(!Array.isArray(scripts)) throw new Error('Not array');

    } catch(e) {
      scripts = [];
    }

    return chrome.storage.sync.set({scripts: scripts}, callback);
  }

  function exportList(callback) {
    return function(vals) {
      var result = JSON.stringify(vals.scripts, null, 4);
      var url = 'data:application/json;base64,' + btoa(result);
      callback();

      chrome.downloads.download({
        url: url,
        filename: 'scripts.json'
      });
    };
  }

  return {
    isSpecialCommand: isSpecialCommand,
    runSpecialCommand: runSpecialCommand
  };
})();