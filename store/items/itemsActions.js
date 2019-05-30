import { LIST_STORE, LIST_ALL } from '../../keys/itemsKeys'

async function receiveItem({ commit }, { shopID, itemID }) {
  commit('clearCurrentItem')
  const data = await this.$axios.$get(`/market/shops/${shopID}/goods/${itemID}`)
  commit('setCurrentItem', { data })
}

async function loadMoreItems({ commit, state }, { listType, storeID }) {
  if(state.isLoading || !state.canLoadMore) { return }

  let reqUrl = '', search = '', goods
  if (listType === LIST_ALL) {
    reqUrl = '/market/'
    search = state.currentItemsSearchParams
  } else if (listType === LIST_STORE) {
    reqUrl = `/market/shops/${storeID}/goods`
    search = state.currentStoreItemsSearchParams
  } else { return }
  
  if(process.browser) {
    // Changing current page before request
    commit('changePage', { newPage: state.currentPage + 1 })
    commit('changeLoadingState', {value: true})
  }
  
  goods = await this.$axios.$get(reqUrl, {
    params: {
      limit: state.itemsPerPage,
      offset: state.currentPage * state.itemsPerPage,
      search
    }
  })
  
  commit('changeLoadingState', {value: false})
  // Set data to the store
  commit('setItemsData', { data: goods, listType })

  if(goods.next === null) {
    commit('changeCanLoadState', { value: false })
  }
}

async function receiveShopInfo({ commit }, { storeID }) {
  const shopInfo = await this.$axios.$get(`/market/shops/${storeID}`);
  commit('setShopInfo', { shopInfo })
}

async function changePage({ commit, dispatch, state }, { newPage }) {
  if (newPage === state.currentPage && state.currentItems.length !== 0) return;

  commit('changePage', { newPage });
  dispatch('receiveItems', { searchLine: "" });
}

async function subscribeStore({ state, rootState, commit }) {
  const shop_id = state.currentShopInfo.id
  const token = rootState.auth.token

  await this.$axios({
    method: 'POST',
    url: `/market/shops/${shop_id}/subscriptions`,
    data: {
      user: token,
      shop: shop_id
    }
  })

  dispatch('receiveShopInfo', { storeID: state.currentShopInfo.id })
}

export default {
  receiveItem,
  changePage,
  receiveShopInfo,
  loadMoreItems,
  subscribeStore
}
