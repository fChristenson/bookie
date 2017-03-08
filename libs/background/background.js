var commands = [];
var store = {};

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

    // this will get the store and send it to page_done.js
    // so it can be put on the Bookie object
    if(msg === 'getStore') return port.postMessage(store);

    // this sets a key val pair so it can be saved for a page transfer
    if(msg.type === 'setValueOnStore') {
      store = msg.store;
      return;
    }

    // split on arrow to know what scripts will run on the next page
    commands = msg.split('->');
    
    chrome.tabs.executeScript({
      code: commands.shift()
    });
  });
});
