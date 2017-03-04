(function(window, U, C, R, K, data) {
  var document = window.document;
  var list = document.querySelector('.bookie_searchbox__ul');
  var input = document.querySelector('.bookie_searchbox__input');
  
  input.addEventListener('keyup', update(list));
  input.addEventListener('keydown', K.isHoldingShift);
  data.forEach(R.addItems(list));

  function update(list) {
    return function(e) {
      if(K.getShiftKeyHeld() && e.keyCode === K.ENTER_KEY_CODE) {
        return C.saveCommand(e);
      }

      if(e.keyCode === K.SHIFT_KEY_CODE) {
        return K.setShiftKeyHeld(false);
      }

      if(e.keyCode === K.ENTER_KEY_CODE) {
        return C.runCommand(e);
      }

      return R.renderList(list, data, e);
    };
  }
  
})(window, Utils, CommandUtils, RenderUtils, KeyUtils, data);
