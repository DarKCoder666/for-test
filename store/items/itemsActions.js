async function receiveItems({ commit, state }, { searchLine = "" }) {
  const data = await this.$axios.$get('/market/', {
    params: {
      limit: state.itemsPerPage,
      offset: (state.currentPage - 1) * state.itemsPerPage,
      search: searchLine
    }
  });
  commit('setItemsData', { data });
}

async function receiveItem({ commit }, {shopID, itemID}) {
  const data = await this.$axios.$get(`/market/shops/${shopID}/goods/${itemID}`);
  commit('setCurrentItem', { data })
}

async function receiveStoreItems({ commit, state }, {storeID}) {
  const goods = await this.$axios.$get(`/market/shops/${storeID}/goods`, {
    params: {
      limit: state.itemsPerPage,
      offset: state.currentPage * state.itemsPerPage
    }
  });

  commit('setItemsData', { data: goods })
}

async function receiveShopInfo({ commit, state }, {storeID}) {
  const shopInfo = await this.$axios.$get(`/market/shops/${storeID}`);
  commit('setShopInfo', { shopInfo });
}

async function changePage({ commit, dispatch, state }, {newPage}) {
  if( newPage === state.currentPage && state.currentItems.length !== 0 ) return;

  commit('changePage', {newPage});
  dispatch('receiveItems', {searchLine: ""});
}

export default {
  receiveItems,
  receiveItem,
  changePage,
  receiveStoreItems,
  receiveShopInfo
}

