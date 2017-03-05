var CommandUtils = (function(U, data) {
  function runCommand(e) {
    var text = getCommand(e);
    run(text);
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
    run(text);
  }

  function run(text) {
    if(text) {
      // split on arrow to know what scripts will run on the next page
      var array = text.split('->');
      
      // use a for loop to force each script to run in synch
      for(var i = 0; i < array.length; i++) {
        chrome.tabs.executeScript({
          code: array[i]
        });
      }
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