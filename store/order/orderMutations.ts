function addToCart(state, item) {
  state.cart.push(item);
}

function cleanCart(state) {
  state.cart = [];
}

function setMyOrders(state, { orders }) {
  state.myOrders = orders
}

export default {
  addToCart,
  cleanCart,
  setMyOrders
};
