var CommandUtils = (function(window, U, state) {
  var port = chrome.extension.connect({name: 'Run scripts'});
  var updatedState = {};

  var app = {
    updateState: updateState,
    resetCommandQueue: resetCommandQueue,
    runCommand: runCommand,
    runLiCommand: runLiCommand
  };

  function updateState(state) {
    updatedState = state;
  }

  state.subscribe(app);

  function runCommand(e) {
    var text = getCommand(e);
    port.postMessage(text);
  }

  function getCommand(e) {
    if(U.isNumberTag(e)) {
      var index = U.numberTagToNumber(e.target.value);
      var command = updatedState.scripts.find(U.hasId(index));
      return command ? command.text : '';
    }

    return e.target.value;
  }

  function runLiCommand(e, li) {
    var text = li.lastChild.innerText;
    port.postMessage(text);
  }

  function resetCommandQueue() {
    port.postMessage('reset');
  }

  return app;

})(window, Utils, state);