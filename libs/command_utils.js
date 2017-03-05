var CommandUtils = (function(U, data) {
  function runCommand(e) {
    var text = getCommand(e);

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

  function getCommand(e) {
    if(U.isNumberTag(e)) {
      var index = parseInt(e.target.value.slice(1, e.target.value.length));
      return data.find(U.hasId(index)).text;
    }

    return e.target.value;
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