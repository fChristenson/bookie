var Utils = (function() {

  function isMatch(text) {
    return function(d) {
      return nameFound(d.name, text) 
      || textFound(d.text)
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

  return {
    numberTagToNumber: numberTagToNumber,
    hasId: hasId,
    isNumberTag: isNumberTag,
    isMatch: isMatch
  };
})();