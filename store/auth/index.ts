import mutations from './authMutations';
import actions from './authActions';

export const state = () => ({
  loggedIn: false,
  token: null
});

export {
  mutations,
  actions
};
