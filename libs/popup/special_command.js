var specialCommand = (function() {
  function isSpecialCommand(text) {
    return /^clear$/.test(text)
    || /^export$/.test(text); 
  }

  function runSpecialCommand(text, callback) {
    if(/^clear$/.test(text)) return chrome.storage.sync.set({scripts: [], commandHistory: []}, callback);
    if(/^export$/.test(text)) return chrome.storage.sync.get('scripts', exportList(callback));
    
    return callback();
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