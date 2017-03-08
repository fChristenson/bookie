var port = chrome.extension.connect({name: 'Run scripts'});
port.postMessage('done');

var script = document.createElement('script');
script.src = chrome.extension.getURL('libs/bookie.js');
document.body.appendChild(script);

document.addEventListener('RW759_connectExtension', function(e) {
  alert(e.detail);
});