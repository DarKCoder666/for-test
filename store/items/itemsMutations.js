function setItemsData(state, { data }) {
  state.currentItems = data.results
  state.totalItems = data.count
}

function setCurrentItem(state, { data }) {
  state.currentItem = data
}

function changePage(state, { newPage }) {
  state.currentPage = newPage
}

function setShopInfo(state, { shopInfo }) {
  state.currentShopInfo = shopInfo
}

function resetPage(state) {
  state.currentPage = 0
}



export default {
  setItemsData,
  changePage,
  setCurrentItem,
  setShopInfo,
  resetPage
}