import { LIST_STORE, LIST_ALL } from '../../keys/itemsKeys'

function setItemsData(state, { data, listType }) {
  if (!data.results) return

  if (listType === LIST_ALL) {
    state.currentItems = [
      ...state.currentItems,
      ...data.results
    ]
  } else if (listType === LIST_STORE) {
    state.currentStoreItems = [
      ...state.currentStoreItems,
      ...data.results
    ]
  }
}

function setCurrentItem(state, { data, listType }) {
  state.currentItem = data
}

function changePage(state, { newPage }) {
  state.currentPage = newPage
}

function setShopInfo(state, { shopInfo }) {
  state.currentShopInfo = shopInfo
}

function changeLoadingState(state, { value }) {
  state.isLoading = value
}

function changeCanLoadState(state, { value }) {
  state.canLoadMore = value
}

function resetPaginationStates(state) {
  state.canLoadMore = true
  state.isLoading = false
  state.currentPage = -1
  state.currentItems = []
  state.currentStoreItems = []
}

function setSearchLine(state, { value, listType }) {
  if (listType === LIST_ALL) {
    state.currentItemsSearchParams = value
  } else if (listType === LIST_STORE) {
    state.currentStoreItemsSearchParams = value
  }
}

export default {
  setItemsData,
  changePage,
  setCurrentItem,
  setShopInfo,
  resetPaginationStates,
  changeLoadingState,
  changeCanLoadState,
  setSearchLine
}