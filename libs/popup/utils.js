var utils = (function() {

  var ENTER_KEY_CODE = 13;
  var BACKSPACE_KEY_CODE = 8;

  function isSave(value) {
    return /^name/.test(value);
  }

  function getPointerWithLowerBound(commandHistoryPointer) {
    return Math.max(commandHistoryPointer - 1, 0);
  }

  function getPointerWithUpperBound(commandHistoryPointer, commandHistory) {
    return Math.min(commandHistoryPointer + 1, commandHistory.length - 1);
  }

  function isMatch(text) {
    return function(d) {
      return idFound(d.id, text) || nameFound(d.name, text) || textFound(d.text, text);
    };
  }

  function nameFound(name, text) {
    return name && name.indexOf(text) !== -1;
  }

  function textFound(text, textToMatch) {
    return text && text.indexOf(textToMatch) !== -1;
  }

  function idFound(id, text) {
    return id === numberTagToNumber(text);
  }

  function hasNumberTag(val) {
    return /(#\d)+/.test(val);
  }

  function numberTagToNumber(value) {
    return parseInt(value.slice(1, value.length));
  }

  function hasId(id) {
    return function(e) {
      return e.id === id;
    };
  }

  function renderList(list, scripts, value, selectCallback, removeCallback) {
    list.innerHTML = '';

    if(!value) {
      scripts.forEach(addItems(list, scripts, selectCallback, removeCallback));
    } else {
      scripts.filter(isMatch(value)).forEach(addItems(list, scripts, selectCallback, removeCallback));
    }
  }

  function addItems(list, scripts, selectCallback, removeCallback) {
    return function(d, i) {
      return list.appendChild(makeLiElement(d, i + 2, scripts, selectCallback, removeCallback));
    };
  }

  function makeLiElement(data, index, scripts, selectCallback, removeCallback) {
    var li = document.createElement('li');
    li.tabIndex = index;
    li.className = 'bookie_searchbox__li';
    li.appendChild(makeIdLabel(data.id));
    li.appendChild(makeHeader(data.name, index));
    li.appendChild(makeContent(data.text));
    li.addEventListener('keyup', selectByKey(scripts, selectCallback, removeCallback));
    li.addEventListener('click', selectByClick(li, scripts, selectCallback));
    
    return li;
  }

  function getExectutedCommands(e, vals) {
    var array = (vals && vals.commandHistory) ? vals.commandHistory : [];
    array.push(e.target.value);
    return array;
  }

  function selectByClick(li, scripts, callback) {
    return function() {
      var text = li.lastChild.innerText;
      return callback(text, scripts);
    };
  }

  function selectByKey(scripts, selectCallback, removeCallback) {
    return function(e) {
      var id = numberTagToNumber(e.target.firstChild.innerText);
      var text = e.target.lastChild.innerText;
      
      if(e.keyCode === ENTER_KEY_CODE) {
        return selectCallback(text, scripts);
      }

      if(e.keyCode === BACKSPACE_KEY_CODE) {
        return removeCallback(id);
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

  function numberTagToScript(str, script) {
    return str.replace(new RegExp('#' + script.id, 'g'), script.text);
  }

  return {
    numberTagToScript: numberTagToScript,
    getPointerWithLowerBound: getPointerWithLowerBound,
    getPointerWithUpperBound: getPointerWithUpperBound,
    renderList: renderList,
    getExectutedCommands: getExectutedCommands,
    isSave: isSave,
    addItems: addItems,
    numberTagToNumber: numberTagToNumber,
    hasId: hasId,
    hasNumberTag: hasNumberTag,
    isMatch: isMatch,
    makeLiElement: makeLiElement
  };
})();