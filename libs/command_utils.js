var CommandUtils = (function(U, data) {
  function runCommand(e) {
    if(e.target.value) {
      e.target.value
      .split('->')
      .forEach(function(str) {
        chrome.tabs.executeScript({
          code: str
        });
      });
    }
  }

  function runLiCommand(e, li) {
    var text = li.lastChild.innerText;

    if(text) {
      text
      .split('->')
      .forEach(function(str) {
        chrome.tabs.executeScript({
          code: str
        });
      });
    }
  }

  function saveCommand(e) {
    console.log('save');
  }

  return {
    runCommand: runCommand,
    runLiCommand: runLiCommand,
    saveCommand: saveCommand
  };
})(Utils, data);