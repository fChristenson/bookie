var CommandUtils = (function() {
  function runCommand(e) {
    console.log('run');
  }

  function saveCommand(e) {
    console.log('save');
  }

  return {
    runCommand: runCommand,
    saveCommand: saveCommand
  };
})();