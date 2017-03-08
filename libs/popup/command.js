var command = (function(U) {
  var port = chrome.extension.connect({name: 'Run scripts'});

  function runCommand(commandString, scripts) {
    var text = getCommand(commandString, scripts);
    port.postMessage(text);
  }

  function getCommand(commandString, scripts) {
    if(U.hasNumberTag(commandString)) {
      return scripts.reduce(U.numberTagToScript, commandString);
    }

    return commandString;
  }

  function resetCommandQueue() {
    port.postMessage('reset');
  }

  return {
    resetCommandQueue: resetCommandQueue,
    runCommand: runCommand
  };

})(utils);
