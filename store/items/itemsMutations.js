function setItemsData(state, {data}) {
  state.currentItems = data.results
  state.totalItems = data.count
}

function setCurrentItem(state, { data }) {
  state.currentItem = data;
}

function changePage(state, {newPage}) {
  state.currentPage = newPage
}

export default {
  setItemsData,
  changePage,
  setCurrentItem
}