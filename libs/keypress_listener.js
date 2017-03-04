(function(window) {

  if(!window) return;
  var Q_KEY_CODE = 81;
  var BODY_TAG_NAME = 'BODY';

  window.addEventListener('keyup', openSearch);

  function openSearch(e) {
    console.log(e.target);
    if(e.keyCode === Q_KEY_CODE && e.target.tagName === BODY_TAG_NAME) {
      alert('Foo');
    }
  }
  
})(window);
