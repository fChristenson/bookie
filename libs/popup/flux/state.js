var state = (function(reducers) {
  var subs = [];
  var data = {
    scripts: [],
    commandHistory: [],
    shiftKeyHeld: false,
    commandHistoryPointer: 0,
    showCommandFromHistory: false
  };

  function subscribe(obj) {
    return subs.push(obj);
  }

  function dispatch(action) {
    data = reducers.reduce(getNewState(action), data);
    subs.forEach(updateState(data));
  }

  function getNewState(action) {
    return function(acc, reducer) {
      return reducer(acc, action);
    };
  }

  function updateState(state) {
    return function(sub) {
      return sub.updateState(state);
    };
  }

  return {
    dispatch: dispatch,
    subscribe: subscribe,
    data: data
  };
})(reducers);