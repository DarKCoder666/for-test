export default ({ redirect, store }) => {
  if (store.state.order.cart.length === 0) {
    redirect('/')
  }
};
