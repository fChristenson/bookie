var command = (function(U) {
  var port = chrome.extension.connect({name: 'Run scripts'});

  function runCommand(commandString, scripts) {
    var text = getCommand(commandString, scripts);
    port.postMessage(text);
  }

  function getCommand(commandString, scripts) {
    if(U.hasVariableName(commandString)) {
      return scripts.reduce(U.variableNameToScript, commandString);
    }

    return commandString;
  }

  return {
    runCommand: runCommand
  };

})(utils);
