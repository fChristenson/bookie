var tabs = {};

function addCommandToActiveTab(msg, port, callback) {
  return chrome.tabs.getSelected(null, function(tab) {
    return callback(msg, port, tab.id);
  });
}

function runCommandFromQueue(msg, port, id) {
  if(!tabs[id]) tabs[id] = {store: {}, commands: []};

  if(msg === 'done') {
    if(tabs[id].commands.length > 0) sendScript(port, id);
    return;
  }

  if(msg === 'getQueue') return port.postMessage({type: 'queue', queue: tabs[id]});

  // this will get the store and send it to page_done.js
  // so it can be put on the Bookie object
  if(msg === 'getStore') return port.postMessage({type: 'store', store: tabs[id].store});

  // this sets a key val pair so it can be saved for a page transfer
  if(msg.type === 'setValueOnStore') {
    tabs[id].store = msg.store;
    return;
  }

  // split on arrow to know what scripts will run on the next page
  tabs[id].commands = msg.split('->');
  
  // we trigger the done message on the content script
  chrome.tabs.executeScript({
    code: 'port.postMessage(\'done\')'
  });
}

function sendScript(port, id) {
  port.postMessage({type: 'script', script: tabs[id].commands.shift()});
}

chrome.tabs.onRemoved.addListener(function(tabId) {
  delete tabs[tabId];
});

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg, conn) {

    var id = conn.sender && conn.sender.tab && conn.sender.tab.id;

    if(!id) return addCommandToActiveTab(msg, conn, runCommandFromQueue);
    
    return runCommandFromQueue(msg, conn, id);
  });
});
