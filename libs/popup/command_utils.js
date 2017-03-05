var CommandUtils = (function(window, U, data) {
  var port = chrome.extension.connect({name: 'Run scripts'});

  function runCommand(e) {
    var text = getCommand(e);
    port.postMessage(text);
  }

  function getCommand(e) {
    if(U.isNumberTag(e)) {
      var index = parseInt(e.target.value.slice(1, e.target.value.length));
      var command = data.find(U.hasId(index));
      return command ? command.text : '';
    }

    return e.target.value;
  }

  function runLiCommand(e, li) {
    var text = li.lastChild.innerText;
    port.postMessage(text);
  }

  function saveCommand(e) {
    console.log('save');
  }

  function resetCommandQueue() {
    port.postMessage('reset');
  }

  return {
    resetCommandQueue: resetCommandQueue,
    runCommand: runCommand,
    runLiCommand: runLiCommand,
    saveCommand: saveCommand
  };
})(window, Utils, data);