import mutations from './itemsMutations'
import actions from './itemsActions'

export const state = () => ({
  currentItems: [],
  currentItem: {},
  currentShopInfo: {},
  currentPage: 1,
  itemsPerPage: 9,
  totalItems: 0,
});

export {
  mutations,
  actions
}