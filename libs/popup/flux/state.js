var state = (function(reducers) {
  var subs = [];
  var data = {
    list:  document.querySelector('.bookie_searchbox__ul'),
    input: document.querySelector('.bookie_searchbox__input'),
    scripts: [],
    commandHistory: [],
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