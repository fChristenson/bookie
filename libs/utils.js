var Utils = (function() {

  function isMatch(text) {
    return function(d) {
      return d.name.indexOf(text) !== -1 || d.text.indexOf(text) !== -1;
    };
  }

  return {
    isMatch: isMatch
  };
})();