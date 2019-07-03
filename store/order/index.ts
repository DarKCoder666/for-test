import actions from '~/store/order/orderActions';
import mutations from '~/store/order/orderMutations';
import getters from '~/store/order/orderGetters';

const state = () => ({
  cart: [],
  myOrders: []
});

export {
  state,
  actions,
  mutations,
  getters
};
