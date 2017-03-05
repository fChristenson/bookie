var commands = [];

chrome.extension.onConnect.addListener(function(port) {

  port.onMessage.addListener(function(msg) {
    if(msg === 'reset') {
      commands = [];
      return;
    }

    if(msg === 'done') {
      var command = commands.shift();
      
      if(command) {
        chrome.tabs.executeScript({
          code: command
        });
      }

      return;
    }

    // split on arrow to know what scripts will run on the next page
    commands = msg.split('->');
    
    chrome.tabs.executeScript({
      code: commands.shift()
    });
  });
 
});
