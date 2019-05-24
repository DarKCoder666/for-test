import mutations from './itemsMutations'
import actions from './itemsActions'

export const state = () => ({
  currentItems: [],
  currentStoreItems: [],
  
  currentItem: {},
  isLoading: false,

  currentItemsSearchParams: '',
  currentStoreItemsSearchParams: '',
  
  currentShopInfo: {},
  currentPage: -1,
  itemsPerPage: 9,
  canLoadMore: true
});

export {
  mutations,
  actions
}