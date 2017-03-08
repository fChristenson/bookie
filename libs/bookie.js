var Bookie = {
  foo: function() {
    console.log('foo');
  }
};

// TODO: wrap this in the api functions
document.dispatchEvent(new CustomEvent('RW759_connectExtension', {
  detail: GLOBALS // Some variable from Gmail.
}));