var KeyUtils = (function(state, actions) {
  var SHIFT_KEY_CODE = 16;
  var ENTER_KEY_CODE = 13;

  function isHoldingShift(e) {
    if(e.keyCode === SHIFT_KEY_CODE) {
      state.dispatch(actions.makeAction(actions.SET_SHIFT_KEY_HELD));
    }
  }

  return {
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    SHIFT_KEY_CODE: SHIFT_KEY_CODE,
    isHoldingShift: isHoldingShift
  };
})(state, actions);