import { LIST_STORE, LIST_ALL } from '../../keys/itemsKeys';

async function receiveItem(this: any, { commit }, { shopID, itemID }): Promise<void> {
  commit('clearCurrentItem');
  const data = await this.$axios.$get(`/market/shops/${shopID}/goods/${itemID}`);
  commit('setCurrentItem', { data });
}

async function loadMoreItems(this: any, { commit, state }, { listType, storeID }): Promise<void> {
  if (state.isLoading || !state.canLoadMore) { return; }

  let reqUrl: string = '';
  let search: string = '';
  if (listType === LIST_ALL) {
    reqUrl = '/market/';
    search = state.currentItemsSearchParams;
  } else if (listType === LIST_STORE) {
    reqUrl = `/market/shops/${storeID}/goods`;
    search = state.currentStoreItemsSearchParams;
  } else { return; }

  if (process.browser) {
    // Changing current page before request
    commit('changePage', { newPage: state.currentPage + 1 });
    commit('changeLoadingState', { value: true });
  }

  const goods = await this.$axios.$get(reqUrl, {
    params: {
      limit: state.itemsPerPage,
      offset: state.currentPage * state.itemsPerPage,
      search
    }
  });

  commit('changeLoadingState', { value: false });
  // Set data to the store
  commit('setItemsData', { data: goods, listType });

  if (goods.next === null) {
    commit('changeCanLoadState', { value: false });
  }
}

async function receiveShopInfo(this: any, { commit }, { storeID }): Promise<void> {
  const shopInfo = await this.$axios.$get(`/market/shops/${storeID}`);
  commit('setShopInfo', { shopInfo });
}

function changePage({ commit, dispatch, state }, { newPage }): void {
  if (newPage === state.currentPage && state.currentItems.length !== 0) return;

  commit('changePage', { newPage });
  dispatch('receiveItems', { searchLine: '' });
}

async function subscribeStore(this: any, { state, rootState, dispatch }): Promise<void> {
  if (!rootState.auth.loggedIn) {
    this.$router.push('/auth/login');
    return;
  }

  const shopId = state.currentShopInfo.id;
  const token = rootState.auth.token;

  await this.$axios({
    method: 'POST',
    url: `/market/shops/${shopId}/subscriptions`,
    data: {
      user: token,
      shop: shopId
    }
  });

  dispatch('receiveShopInfo', { storeID: state.currentShopInfo.id });
}

export default {
  receiveItem,
  changePage,
  receiveShopInfo,
  loadMoreItems,
  subscribeStore
};
