var searchResultListItem = (function(window) {
  var document = window.document;
  
  function makeElement(headerText, contentText, index) {
    var li = document.createElement('li');
    li.tabIndex = index;
    li.className = 'bookie_searchbox__li';
    li.appendChild(makeHeader(headerText));
    li.appendChild(makeContent(contentText));
    
    return li;
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
})(window);