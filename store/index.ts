export const state = () => ({

});

export const actions = {
  nuxtClientInit(this: any, { dispatch }) {
    dispatch('auth/initAuth');
    dispatch('auth/checkAuth');
  }
};
