async function receiveItems({ commit, state }) {
  const data = await this.$axios.$get('/marketplace/barcodes/', {
    params: {
      limit: state.itemsPerPage,
      offset: state.currentPage * state.itemsPerPage
    }
  });
  commit('setItemsData', { data });
}

async function receiveItem({ commit }, {itemID}) {
  const data = await this.$axios.$get(`/marketplace/barcodes/${itemID}`);
  commit('setCurrentItem', { data })
}

async function changePage({ commit, dispatch, state }, {newPage}) {
  if( newPage === state.currentPage && state.currentItems.length !== 0 ) return;

  commit('changePage', {newPage});
  dispatch('receiveItems');
}

export default {
  receiveItems,
  receiveItem,
  changePage
}