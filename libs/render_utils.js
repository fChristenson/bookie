var RenderUtils = (function(U, C, K) {
  function renderList(list, data, e) {
    if(!e.target.value) {
      list.innerHTML = '';
      data.forEach(addItems(list));
    } else {
      list.innerHTML = '';
      data.filter(U.isMatch(e.target.value)).forEach(addItems(list));
    }
  }

  function addItems(list) {
    return function(d, i) {
      return list.appendChild(makeLiElement(d, i + 2));
    };
  }

  function makeLiElement(data, index) {
    var li = document.createElement('li');
    li.tabIndex = index;
    li.className = 'bookie_searchbox__li';
    li.appendChild(makeIdLabel(data.id));
    li.appendChild(makeHeader(data.name, index));
    li.appendChild(makeContent(data.text));
    li.addEventListener('keyup', selectByKey(li));
    li.addEventListener('click', selectByClick(li));
    
    return li;
  }

  function selectByClick(el) {
    return function(e) {
      C.runLiCommand(e, el);
    };
  }

  function selectByKey(el) {
    return function(e) {
      if(e.keyCode === K.ENTER_KEY_CODE) {
        C.runLiCommand(e, el);
      }
    };
  }

  function makeIdLabel(index) {
    var header = document.createElement('div');
    header.innerHTML = '#' + index;
    header.className = 'bookie_searchbox__li__header';
    return header;
  }

  function makeHeader(text, index) {
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
    renderList: renderList,
    addItems: addItems,
    makeLiElement: makeLiElement
  };
})(Utils, CommandUtils, KeyUtils);