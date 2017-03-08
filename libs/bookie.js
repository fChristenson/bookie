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
  }
};

document.addEventListener('bookie_page', function(e) {
  if(e.detail.type === 'init') {
    Bookie.store = e.detail.store;
  } else {
    Bookie.store[e.detail.key] = e.detail.val;
  }
});