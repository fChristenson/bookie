var tabs = {};

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg, conn) {
    console.log('conn', conn);
    console.log('--------------------------');
    var url = conn.sender && conn.sender.tab && conn.sender.tab.url;
    if(!tabs[url]) tabs[url] = {store: {}, commands: []};
    
    if(msg === 'reset') {
      //tabs = {};
      return;
    }

    if(msg === 'done') {
      if(tabs[url].commands.length > 0) chrome.tabs.query({url: url}, runInTab);
      return;
    }

    // this will get the store and send it to page_done.js
    // so it can be put on the Bookie object
    if(msg === 'getStore') return port.postMessage(tabs[url].store);

    // this sets a key val pair so it can be saved for a page transfer
    if(msg.type === 'setValueOnStore') {
      tabs[url].store = msg.store;
      return;
    }

    // split on arrow to know what scripts will run on the next page
    tabs[url].commands = msg.split('->');
    
    chrome.tabs.query({url: url}, runInTab);

    function runInTab(results) {
      if(results && results[0]) {
        chrome.tabs.executeScript(results[0].id, {
          code: tabs[url].commands.shift()
        });
      }
    }
  });
});
