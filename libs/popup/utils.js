var utils = (function() {

  var ENTER_KEY_CODE = 13;

  function getPointerWithLowerBound(commandHistoryPointer) {
    return Math.max(commandHistoryPointer - 1, 0);
  }

  function getPointerWithUpperBound(commandHistoryPointer, commandHistory) {
    return Math.min(commandHistoryPointer + 1, commandHistory.length - 1);
  }

  function isMatch(text) {
    return function(d) {
      return nameFound(d.name, text) 
      || textFound(d.text, text)
      || idFound(d.id, text);
    };
  }

  function nameFound(name, text) {
    return name && name.indexOf(text) !== -1;
  }

  function textFound(text, textToMatch) {
    return text && text.indexOf(textToMatch) !== -1;
  }

  function idFound(id, text) {
    return id && id.toString().indexOf(numberTagToNumber(text)) !== -1;
  }

  function isNumberTag(e) {
    return /^#\d+/.test(e.target.value);
  }

  function numberTagToNumber(value) {
    return parseInt(value.slice(1, value.length));
  }

  function hasId(id) {
    return function(e) {
      return e.id === id;
    };
  }

  function renderList(list, data, value, callback) {
    if(!value) {
      data.forEach(addItems(list, callback));
    } else {
      data.filter(isMatch(value)).forEach(addItems(list, callback));
    }
  }

  function addItems(list, callback) {
    return function(d, i) {
      return list.appendChild(makeLiElement(d, i + 2, callback));
    };
  }

  function makeLiElement(data, index, callback) {
    var li = document.createElement('li');
    li.tabIndex = index;
    li.className = 'bookie_searchbox__li';
    li.appendChild(makeIdLabel(data.id));
    li.appendChild(makeHeader(data.name, index));
    li.appendChild(makeContent(data.text));
    li.addEventListener('keyup', selectByKey(li, callback));
    li.addEventListener('click', selectByClick(li, callback));
    
    return li;
  }

  function selectByClick(el, callback) {
    return function(e) {
      callback(e, el);
    };
  }

  function selectByKey(el, callback) {
    return function(e) {
      if(e.keyCode === ENTER_KEY_CODE) {
        callback(e, el);
      }
    };
  }

  function makeIdLabel(index) {
    var header = document.createElement('div');
    header.innerHTML = '#' + index;
    header.className = 'bookie_searchbox__li__header';
    return header;
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
    getPointerWithLowerBound: getPointerWithLowerBound,
    getPointerWithUpperBound: getPointerWithUpperBound,
    renderList: renderList,
    addItems: addItems,
    numberTagToNumber: numberTagToNumber,
    hasId: hasId,
    isNumberTag: isNumberTag,
    isMatch: isMatch,
    makeLiElement: makeLiElement
  };
})();