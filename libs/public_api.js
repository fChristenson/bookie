Bookie = {
  store: {},
  reset: function() {
    this.store = {};
    var obj = {detail: {type: 'setValueOnStore', store: this.store}};
    document.dispatchEvent(new CustomEvent('bookie', obj));
  },
  set: function(key, val) {
    this.store[key] = val;
    var obj = {detail: {type: 'setValueOnStore', store: this.store}};
    document.dispatchEvent(new CustomEvent('bookie', obj));
  },
  done: function() {
    document.dispatchEvent(new CustomEvent('bookie', {detail: 'done'}));
  }
};

document.addEventListener('bookie_page', function(e) {
  if(e.detail.type === 'store') {
    Bookie.store = e.detail.store;

  } else if(e.detail.type === 'script') {
    eval(e.detail.script);
  }
});