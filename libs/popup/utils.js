var Utils = (function() {

  function isMatch(text) {
    return function(d) {
      return d.name.indexOf(text) !== -1 
      || d.text.indexOf(text) !== -1
      || d.id.toString().indexOf(text.slice(1, text.length)) !== -1;
    };
  }

  function isNumberTag(e) {
    return /^#\d+/.test(e.target.value);
  }

  function hasId(id) {
    return function(e) {
      return e.id === id;
    };
  }

  return {
    hasId: hasId,
    isNumberTag: isNumberTag,
    isMatch: isMatch
  };
})();