var specialCommand = (function() {
  function isSpecialCommand(text) {
    return /^clear$/.test(text); 
  }

  function runSpecialCommand(text, callback) {
    if(/^clear$/.test(text)) return chrome.storage.sync.set({scripts: [], commandHistory: []}, callback);
    
    return callback();
  }

  return {
    isSpecialCommand: isSpecialCommand,
    runSpecialCommand: runSpecialCommand
  };
})();