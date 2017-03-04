var KeyUtils = (function() {
  var shiftKeyHeld = false;
  var SHIFT_KEY_CODE = 16;

  function isHoldingShift(e) {
    if(e.keyCode === SHIFT_KEY_CODE) {
      shiftKeyHeld = true;
    }
  }

  function setShiftKeyHeld(bool) {
    shiftKeyHeld = bool;
    return shiftKeyHeld;
  }

  function getShiftKeyHeld() {
    return shiftKeyHeld;
  }

  return {
    SHIFT_KEY_CODE: SHIFT_KEY_CODE,
    getShiftKeyHeld: getShiftKeyHeld,
    setShiftKeyHeld: setShiftKeyHeld,
    isHoldingShift: isHoldingShift
  };
})();