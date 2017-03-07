var command = (function(U) {
  var port = chrome.extension.connect({name: 'Run scripts'});

  function runCommand(e, scripts) {
    var text = getCommand(e, scripts);
    port.postMessage(text);
  }

  function getCommand(e, scripts) {
    if(U.isNumberTag(e.target.value)) {
      var index = U.numberTagToNumber(e.target.value);
      var command = scripts.find(U.hasId(index));
      return command ? command.text : '';
    }

    return e.target.value;
  }

  function runLiCommand(text) {
    port.postMessage(text);
  }

  function resetCommandQueue() {
    port.postMessage('reset');
  }

  return {
    resetCommandQueue: resetCommandQueue,
    runCommand: runCommand,
    runLiCommand: runLiCommand
  };

})(utils);