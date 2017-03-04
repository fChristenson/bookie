var data = [
  {
    name: 'fill form with foo and alert',
    text: 'fill(#form, foo) click(#button) alert(done!)'
  },
  {
    name: 'visit lolcats several times',
    text: 'open(http://www.google.com) fill(#search, lolcats) click(.result-link) open(http://www.google.com) fill(#search, lolcats) click(.result-link) open(http://www.google.com) fill(#search, lolcats) click(.result-link) open(http://www.google.com) fill(#search, lolcats) click(.result-link) open(http://www.google.com) fill(#search, lolcats) click(.result-link) open(http://www.google.com) fill(#search, lolcats) click(.result-link)'
  }
];

(function(window, searchResultListItem, U, C, R, K) {
  var document = window.document;
  var list = document.querySelector('.bookie_searchbox__ul');
  var input = document.querySelector('.bookie_searchbox__input');
  var ENTER_KEY_CODE = 13;
  
  input.addEventListener('keyup', update(list));
  input.addEventListener('keydown', K.isHoldingShift);
  data.forEach(R.addItems(list));

  function update(list) {
    return function(e) {
      if(K.getShiftKeyHeld() && e.keyCode === ENTER_KEY_CODE) {
        return C.saveCommand(e);
      }

      if(e.keyCode === K.SHIFT_KEY_CODE) {
        return K.setShiftKeyHeld(false);
      }

      if(e.keyCode === ENTER_KEY_CODE) {
        return C.runCommand(e);
      }

      return R.renderList(list, data, e);
    };
  }
  
})(window, searchResultListItem, Utils, CommandUtils, RenderUtils, KeyUtils);
