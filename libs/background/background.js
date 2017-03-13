var tabs = {};

function addCommandToActiveTab(msg, port, callback) {
  return chrome.tabs.getSelected(null, function(tab) {
    return callback(msg, port, tab.id);
  });
}

function runCommandFromQueue(msg, port, id) {
  if(!tabs[id]) tabs[id] = {store: {}, commands: []};

  if(msg === 'done') {
    if(tabs[id].commands.length > 0) chrome.tabs.get(id, runInTab(id));
    return;
  }

  // this will get the store and send it to page_done.js
  // so it can be put on the Bookie object
  if(msg === 'getStore') return port.postMessage(tabs[id].store);

  // this sets a key val pair so it can be saved for a page transfer
  if(msg.type === 'setValueOnStore') {
    tabs[id].store = msg.store;
    return;
  }

  // split on arrow to know what scripts will run on the next page
  tabs[id].commands = msg.split('->');
    
  chrome.tabs.get(id, runInTab(id));
}

function runInTab(id) {
  return function(tab) {
    if(tab) {
      chrome.tabs.executeScript(tab.id, {
        code: tabs[id].commands.shift()
      });
    }
  };
}

chrome.tabs.onRemoved.addListener(function(tabId) {
  delete tabs[tabId];
});

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg, conn) {    
    var id = conn.sender && conn.sender.tab && conn.sender.tab.id;

    if(!id) return addCommandToActiveTab(msg, port, runCommandFromQueue);
    
    return runCommandFromQueue(msg, port, id);
  });
});
