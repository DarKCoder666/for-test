async function makeOrder(this: any, { rootState, commit }) {
  const cart = rootState.order.cart[0];
  const sizes = cart.currentSize ? [cart.currentSize.id] : [];
  const data = {
    sizes
  };
  const shopID = cart.data.shop_id;

  await this.$axios({
    method: 'POST',
    url: `/market/shops/${shopID}/goods/${cart.data.id}/orders`,
    data
  });

  alert('Ваш заказ успешно принят!');
  commit('cleanCart');
  this.$router.push('/');
}

async function receiveMyOrders(this: any, { commit }) {
  const result = await this.$axios({
    method: 'GET',
    url: `/market/profile/orders`
  });

  commit('setMyOrders', { orders: result.data })
}

async function cancelItem(this: any, { rootState, dispatch }, { itemID }) {
  await this.$axios({
    method: 'POST',
    url: `/market/profile/orders/${itemID}/cancel`,
    data: {
      customer: rootState.auth.token
    }
  });

  dispatch('receiveMyOrders')
}

async function confirmItem(this: any, { rootState, dispatch }, { itemID }) {
  await this.$axios({
    method: 'POST',
    url: `/market/profile/orders/${itemID}/confirm`,
    data: {
      customer: rootState.auth.token
    }
  });

  dispatch('receiveMyOrders')
}

export default {
  makeOrder,
  receiveMyOrders,
  cancelItem,
  confirmItem
};
