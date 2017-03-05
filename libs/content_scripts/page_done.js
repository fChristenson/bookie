var port = chrome.extension.connect({name: 'Run scripts'});
port.postMessage('done');