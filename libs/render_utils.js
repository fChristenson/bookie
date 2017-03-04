var RenderUtils = (function(U, searchResultListItem) {
  function renderList(list, data, e) {
    if(!e.target.value) {
      list.innerHTML = '';
      data.forEach(addItems(list));
    } else {
      list.innerHTML = '';
      data.filter(U.isMatch(e.target.value)).forEach(addItems(list));
    }
  }

  function addItems(list) {
    return function(d, i) {
      return list.appendChild(searchResultListItem.makeElement(d.name, d.text, i + 2));
    };
  }

  return {
    renderList: renderList,
    addItems: addItems
  };
})(Utils, searchResultListItem);