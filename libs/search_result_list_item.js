var searchResultListItem = (function(window, C, K) {
  var document = window.document;
  
  function makeElement(data, index) {
    var li = document.createElement('li');
    li.tabIndex = index;
    li.className = 'bookie_searchbox__li';
    li.appendChild(makeHeader(data.name));
    li.appendChild(makeContent(data.text));
    li.addEventListener('keyup', selectScript);
    li.addEventListener('click', C.runCommand);
    
    return li;
  }

  function selectScript(e) {
    if(e.keyCode === K.ENTER_KEY_CODE) {
      C.runCommand(e);
    }
  }

  function makeHeader(text) {
    var header = document.createElement('div');
    header.innerHTML = text;
    header.className = 'bookie_searchbox__li__header';
    return header;
  }

  function makeContent(text) {
    var content = document.createElement('div');
    content.className = 'bookie_searchbox__li__content';
    content.innerHTML = text;
    return content;
  }

  return {
    makeElement: makeElement
  };
})(window, CommandUtils, KeyUtils);