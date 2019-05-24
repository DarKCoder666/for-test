export const state = () => ({

});

export const actions = {
  nuxtClientInit({ dispatch }, context) {
    dispatch('auth/initAuth')
  }
}