var commands = [];
var store = {};
var tabId;

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg, conn) {
    if(msg === 'reset') {
      commands = [];
      return;
    }

    if(msg === 'done') {
      tabId = conn.sender.tab.id;
      if(commands.length > 0) chrome.tabs.query({id: conn.sender.tab.id}, runInTab);
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
    
    chrome.tabs.query({id: tabId}, runInTab);

    function runInTab(tabs) {
      if(tabs && tabs[0]) {
        chrome.tabs.executeScript(tabs[0].id, {
          code: commands.shift()
        });
      }
    }
  });
});
