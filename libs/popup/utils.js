var utils = (function() {

  var ENTER_KEY_CODE = 13;
  var BACKSPACE_KEY_CODE = 8;

  function isSave(value) {
    return /^name|id/.test(value);
  }

  function getPointerWithLowerBound(commandHistoryPointer) {
    return Math.max(commandHistoryPointer - 1, 0);
  }

  function getPointerWithUpperBound(commandHistoryPointer, commandHistory) {
    return Math.min(commandHistoryPointer + 1, commandHistory.length - 1);
  }

  function isMatch(text) {
    return function(d) {
      return textFound(d.userId, text) || textFound(d.name, text) || textFound(d.text, text);
    };
  }

  function textFound(text, textToMatch) {
    return new RegExp(text, 'gi').test(textToMatch);
  }

  function hasVariableName(val) {
    return /(#\w)+/.test(val);
  }

  function numberTagToNumber(value) {
    return parseInt(value.slice(1, value.length));
  }

  function hasUserId(id) {
    return function(e) {
      return e.userId === id;
    };
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
    li.appendChild(makeVariableLabel(data.userId));
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
      var id = parseInt(e.target.firstChild.value);
      var text = e.target.lastChild.innerText;
      
      if(e.keyCode === ENTER_KEY_CODE) {
        return selectCallback(text, scripts);
      }

      if(e.keyCode === BACKSPACE_KEY_CODE) {
        return removeCallback(id);
      }
    };
  }

  function makeVariableLabel(index) {
    var header = document.createElement('div');
    header.innerHTML = '#' + index;
    header.className = 'bookie_searchbox__li__header';
    return header;
  }

  function makeIdLabel(id) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.value = id;

    return input;
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

  function variableNameToScript(str, script) {
    return str.replace(new RegExp('#' + script.userId, 'gi'), script.text);
  }

  function getText(e) {
    var array = e.target.value.split('->');
    var str = array.slice(1, array.length).join('->');

    return str.trim();
  }

  function getName(e) {
    var array = e.target.value.split('->');
    var nameCommand = array[0];
    var match = nameCommand.match(/name\s([\w\d]+)\s/);

    return match ? match[1].trim() : '';
  }

  function scriptToId(script) {
    return script.id || 0;
  }

  function isNotScript(id) {
    return function(s) {
      return s.id !== id;
    };
  }

  function getUserId(e, scripts) {
    var array = e.target.value.split('->');
    var idCommand = array[0];
    var match = idCommand.match(/\s*id\s([\w\d]+)\s/);
    
    if(match) {
      var desiredId = match[1].trim();
      if(!scripts.some(hasUserId(desiredId))) return desiredId;
    }

    return '';
  }

  function getId(e, scripts) {
    var idArray = scripts.map(scriptToId);
    var maxId = Math.max.apply(Math, idArray);
    
    return (maxId >= 0) ? maxId + 1 : 1;
  }

  return {
    getId: getId,
    getUserId: getUserId,
    isNotScript: isNotScript,
    scriptToId: scriptToId,
    getName: getName,
    getText: getText,
    hasUserId: hasUserId,
    variableNameToScript: variableNameToScript,
    getPointerWithLowerBound: getPointerWithLowerBound,
    getPointerWithUpperBound: getPointerWithUpperBound,
    renderList: renderList,
    getExectutedCommands: getExectutedCommands,
    isSave: isSave,
    addItems: addItems,
    numberTagToNumber: numberTagToNumber,
    hasId: hasId,
    hasVariableName: hasVariableName,
    isMatch: isMatch,
    makeLiElement: makeLiElement
  };
})();