var port = chrome.extension.connect({name: 'Run scripts'});
port.postMessage('done');
port.postMessage('getStore');

var script = document.createElement('script');
script.src = chrome.extension.getURL('libs/bookie.js');
document.body.appendChild(script);

// we assume that there will only be one message as a response
// for the getStore message
port.onMessage.addListener(function(msg) {
  var obj = {detail: {type: 'init', store: msg}};
  document.dispatchEvent(new CustomEvent('bookie_page', obj));
});

document.addEventListener('bookie', function(e) {
  port.postMessage(e.detail);
});
