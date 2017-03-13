var script = document.createElement('script');
script.src = chrome.extension.getURL('libs/public_api.js');
document.body.appendChild(script);

document.addEventListener('bookie', function(e) {
  port.postMessage(e.detail);
});

var port = chrome.extension.connect({name: 'Run scripts'});

port.onMessage.addListener(function(msg) {
  var obj;

  if(msg.type === 'script') {
    obj = {detail: {type: msg.type, script: msg.script}};
    document.dispatchEvent(new CustomEvent('bookie_page', obj));
  }

  if(msg.type === 'store') {
    obj = {detail: {type: msg.type, store: msg.store}};
    document.dispatchEvent(new CustomEvent('bookie_page', obj));
  }
});

port.postMessage('getStore');
port.postMessage('done');
